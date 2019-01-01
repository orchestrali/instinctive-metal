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


const methodLib = require('./src/library/methodArray.js');
const methodSearch = require('./src/library/search.js');
const compareLeads = require('./src/prove/compareLeads.js');
const displayTest = require('./src/prove/display.js');
const findLeads = require('./src/prove/findLHs.js');
const compare = require('./src/prove/compare.js');
const courseOrders = require('./src/prove/listCOs.js');
const courseOrder = require('./src/prove/courseOrder.js');
const findOne = require('./src/library/findOne.js');

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

//findOne({title: 'Original Minimus'}, (result) => {console.log(result)});

app.get("/methodnames", function (request, response) {
  response.sendFile(__dirname + '/methodNames.json');
})

app.get("/sm", function (request, response) {
  response.sendFile(__dirname + '/minorsurprise.json');
})

app.get("/compare", function (request, response) {
  let inputs = findLeads(input1, input2);
  let uniques = compare(inputs);
  response.send({Leadheads: inputs, Uniques: uniques, "coursing orders": courseOrders(uniques)});
})
//*/
///*
app.get("/courseorder", function (request, response) {
  response.send(courseOrder("123456"));
});

//*/
///*




app.get("/", function (request, response) {
  response.send(handleInput3(request.query, 'grid'));
  //response.send(parsePN());
  //response.send(handleInput3(request.body));
});

app.post("/", function (request, response) {
  console.log(request.body);
  //response.sendStatus(200);
  //response.send(request.body);
  response.send(handleInput3(request.body, 'grid'));
});
//*/

app.get("/graphs", function (request, response) {
  response.send(handleInput3(request.query, 'graphs'));
  //response.sendFile(__dirname + '/src/mockupgrid.svg');
  //response.send(leadSVG());
});

app.post("/graphs", function (request, response) {
  console.log(request.body);
  //response.sendStatus(200);
  response.send(handleInput3(request.body, 'graphs'));
});

app.get("/staff", function (request, response) {
  response.send(handleInput3(request.query,'staff'));
});

app.get("/staff2", function (request, response) {
  //response.send(urlParse(request.originalUrl, true).query);
  response.send(request.query);
  //response.send(handleInput3(urlParse(request.originalUrl, true).query, 'staff'));
});

app.post("/staff", function (request, response) {
  //response.send(handleInput3(request.body, 'staff'));
});

app.get("/library", function (request, response) {
  response.send(methodSearch(input));
});

app.get("/practice", function (request, response) {
  response.send(handleInput3(request.query,'practice'));
});

app.post("/practice", function (request, response) {
  //console.log(request.body);
  response.send(handleInput3(request.body, 'practice'));
});

app.get("/surpriseminor", function (request, response) {
  response.sendFile(__dirname + "/views/surprise-minor.html");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
