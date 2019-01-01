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
var urlParse = require('url-parse');

var app = express();

var input = {
  stage: 6,
  class: "Slow Course"
};

let input1 = {};
  input1.stage = 6;
  input1.methodClass = "Surprise";
  input1.methodName = "Cambridge Surprise";
let input2 = {};
  input2.stage = 6;
  input2.methodClass = "Surprise";
  input2.methodName = "London Surprise";



const handleInput3 = require('./src/directTraffic.js');
const buildPage = require('./src/buildPage2.js');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// http://expressjs.com/en/starter/basic-routing.html
/*
app.get("/methods/:stage", function (request, response) {
  //console.log('sending file ', __dirname + '/methods' + request.params.stage + '.json');
  response.sendFile(__dirname + '/methods' + request.params.stage + '.json');
  //response.sendFile(__dirname + '/methods' + request.params.stage + '.xml');
  //response.send("hello");
});
*/


app.get("/methodnames", function (request, response) {
  response.sendFile(__dirname + '/methodNames.json');
})

app.get("/sm", function (request, response) {
  response.sendFile(__dirname + '/minorsurprise.json');
})

///*




app.get("/", function (request, response) {
  response.send(handleInput3(request.query, 'grid'));
  //response.send(parsePN());
  //response.send(handleInput3(request.body));
});

app.get("/graphs", function (request, response) {
  response.send(handleInput3(request.query, 'graphs'));
  //response.sendFile(__dirname + '/src/mockupgrid.svg');
  //response.send(leadSVG());
});


app.get("/staff", function (request, response) {
  response.send(handleInput3(request.query,'staff'));
});

app.get("/staff2", function (request, response) {
  //response.send(urlParse(request.originalUrl, true).query);
  response.send(request.query);
  //response.send(handleInput3(urlParse(request.originalUrl, true).query, 'staff'));
});


app.get("/practice", function (request, response) {
  response.send(handleInput3(request.query,'practice'));
});

app.get("/surpriseminor", function (request, response) {
  response.sendFile(__dirname + "/views/surprise-minor.html");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
