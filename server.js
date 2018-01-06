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

const buildPage = require('./src/buildPage.js');
const formatRows = require('./src/formatRows.js');
const parsePN = require('./src/parsePlaceNotation.js');
const handleInput = require('./src/handleInput.js');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// http://expressjs.com/en/starter/basic-routing.html
/*
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/src/mockup.svg');
});
*/
/*
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/input.html');
});


*/
///*
app.get("/", function (request, response) {
  //response.send(buildRows());
  response.send(buildPage([],[],0));
  //response.send(parsePN());
});

app.post("/", function (request, response) {
  //dreams.push(request.query.dream);
  //console.log(request.body);
  //response.sendStatus(200);
  response.send(handleInput(request.body));
});
//*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
