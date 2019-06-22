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
var morgan = require('morgan');

var app = express();

var input = { 
  stage: '8',
  methodClass: 'Surprise',
  methodName: 'Bristol Surprise',
  placeNotation: '',
  leadhead: 'rounds',
  otherLeadhead: '',
  quantity: 'touch',
  touchType: 'leadend',
  comp: 'bbb',
  callType: 'a'
};

let input1 = {};
  input1.stage = 6;
  input1.methodClass = "Surprise";
  input1.methodName = "Cambridge Surprise";
let input2 = {};
  input2.stage = 6;
  input2.methodClass = "Surprise";
  input2.methodName = "London Surprise";



const tutorial = require('./src/tutorial/test.js');


const handleInput3 = require('./src/directTraffic.js');
const buildPage = require('./src/buildPage2.js');
const methodNames2 = require('./methodNames2.json');

const findOne = require('./src/library/findOneOrMany.js');
const findPost = require('./src/library/findPost.js');
const createNames = require('./src/library/methodNames.js');
const record = require('./src/record/router.js');
const rowGen = require('./src/rowArray.js');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan(':url'));

// http://expressjs.com/en/starter/basic-routing.html
//


/*
rowGen(input, (arr) => {
  //let stage = Number(input.stage);
  //console.log(tutorial(arr, 4, stage));
});
*/

const serialize = require('./src/library/serialize.js');
const max = require('./src/query/max.js');

let query = {
  //pn: {$regex: '^[123456]{4}\\.[123456]{4}\\.[123456]{2}\\.[123456]{4}', $options: 'gi'},
  stage: 7,
  //leadHeadCode: { $exists: false },
  //title: "Cambridge Surprise Minor"
  //leadHeadCode: {$in: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm']},
  //class: "Principle",
  //"classification.trebleDodging": true,
  //"classification.differential": false,
  leadHead: "1647253",
  //symmetry: "palindromic"
}
//['a', 'b', 'c', 'd', 'e', 'f']
//['g', 'h', 'j', 'k', 'l', 'm']
let q = {
  query: query,
  fields: "title leadHeadCode pbOrder"
}

//^-1[456]-[123]6-[12345]+6,1[26]
//console.log(methodNames2[0].classes[0].methods);
//findOne(query, 's', (result) => {console.log(result.length)});
//findPost(q, 's', (result) => {for (var i=0; i < result.length; i++) {console.log(result[i].title, result[i].leadHeadCode)}});
//console.log(result.length)
//console.log(max(result, "leadLength"))
//console.log(findMethod(input));
//console.log('♭');
//for (var i=0; i < result.length; i++) {console.log(result[i].title)}
//console.log(require('./methodNames.json')[2].classes[0].methods[0].length);
//createNames(() => {});

//methodSearch(input);

app.get("/methodnames", function (request, response) {
  response.sendFile(__dirname + '/methodNames2.json');
})

app.get("/sm", function (request, response) {
  response.sendFile(__dirname + '/minorsurprise.json');
})

app.get("/stages", function (request, response) {
  response.sendFile(__dirname + '/src/stages.json');
});

app.get("/compare", function (request, response) {
  //let inputs = findLeads(input1, input2);
  //let uniques = compare(inputs);
  //response.send({Leadheads: inputs, Uniques: uniques, "coursing orders": courseOrders(uniques)});
})
//*/
///*
app.get("/courseorder", function (request, response) {
  //response.send(courseOrder("123456"));
});

//*/
app.get("/updatenames"+process.env.SECRET, function (request, response) {
  createNames(() => {response.send('ok')});
});
///*

app.get("/teststaff", function (request, response) {
  response.sendFile(__dirname + '/views/stafftest.html');
});

app.post("/rowarray", function (req, res) {
  rowGen(req.body, (arr) => {
    res.send(arr);
  });
});




app.get("/", function (request, response) {
  //console.log("url " + request.url);
  record(request, response, (r) => console.log(r));
  handleInput3(request.query, 'grid', (results) => {
    response.send(results);
  });
  //response.send(parsePN());
  //response.send(handleInput3(request.body));
});
/*
app.post("/", function (request, response) {
  console.log(request.body);
  //response.sendStatus(200);
  //response.send(request.body);
  response.send(handleInput3(request.body, 'grid'));
});
*/

app.get("/graphs", function (request, response) {
  //console.log("path " + request.path);
  record(request, response, (r) => console.log(r));
  handleInput3(request.query, 'graphs', (results) => {
    response.send(results);
  });
  //response.sendFile(__dirname + '/src/mockupgrid.svg');
  //response.send(leadSVG());
});



app.get("/staff", function (request, response) {
  //console.log("path " + request.path);
  record(request, response, (r) => console.log(r));
  handleInput3(request.query, 'staff', (results) => {
    response.send(results);
  });
});

app.get("/staff2", function (request, response) {
  //response.send(urlParse(request.originalUrl, true).query);
  response.send(request.query);
  //response.send(handleInput3(urlParse(request.originalUrl, true).query, 'staff'));
});


app.get("/library", function (request, response) {
  //response.send(methodSearch(input));
});

app.get("/practice", function (request, response) {
  record(request, response, (r) => console.log(r));
  handleInput3(request.query, 'practice', (results) => {
    response.send(results);
  });
});


app.get("/surpriseminor", function (request, response) {
  record(request, response, (r) => console.log(r));
  response.sendFile(__dirname + "/views/surprise-minor.html");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
