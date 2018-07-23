// server.js
// where your node app starts

/*
const nextRowFromPlaces = require('./src/nick.js');
let currentRow = [2,1,3,4,6,5,12,11,8,7,9,10];
console.log('currentRow', currentRow);
let changePlaces = [1,10];
console.log('places', changePlaces);
console.log('nextRow', nextRowFromPlaces(currentRow, changePlaces));
*/

// init project
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var input = {
  stage: 11,
  class: "Slow Course"
};




const handleInput3 = require('./src/directTraffic.js');
const buildPageBL = require('./src/buildPageBL.js');
const buildPage = require('./src/buildPage.js');
const buildPageP = require('./src/buildPageP.js');

const methodLib = require('./src/library/methodArray.js');
const methodSearch = require('./src/library/search.js');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// http://expressjs.com/en/starter/basic-routing.html
///*
app.get("/methods/:stage", function (request, response) {
  //console.log('sending file ', __dirname + '/methods' + request.params.stage + '.json');
  response.sendFile(__dirname + '/methods' + request.params.stage + '.json');
  //response.sendFile(__dirname + '/methods' + request.params.stage + '.xml');
  //response.send("hello");
});

app.get("/methodnames", function (request, response) {
  response.sendFile(__dirname + '/methodNames.json');
})

app.get("/bellpaths", function (request, response) {
  response.sendFile(__dirname + '/bellplaces.json');
})
//*/
/*
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/input.html');
});


*/
///*
app.get("/", function (request, response) {
  response.send(buildPageBL([],[],0));
  //response.send(parsePN());
  //response.send(handleInput3(request.body));
});

app.post("/", function (request, response) {
  //console.log(request.body);
  //response.sendStatus(200);
  //response.send(request.body);
  response.send(handleInput3(request.body, 'grid'));
});
//*/

app.get("/graphs", function (request, response) {
  response.send(buildPage([],[],0));
  //response.sendFile(__dirname + '/src/mockupgrid.svg');
  //response.send(leadSVG());
});

app.post("/graphs", function (request, response) {
  console.log(request.body);
  //response.sendStatus(200);
  response.send(handleInput3(request.body, 'graphs'));
});

app.get("/library", function (request, response) {
  response.send(methodSearch(input));
});

app.get("/practice", function (request, response) {
  response.send(buildPageP([],{svg:""},0));
});

app.post("/practice", function (request, response) {
  console.log(request.body);
  response.send(handleInput3(request.body, 'practice'));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
