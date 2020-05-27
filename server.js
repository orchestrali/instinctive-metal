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
  stage: '7',
  methodClass: 'Principle',
  methodName: 'Erin',
  placeNotation: '',
  leadhead: 'rounds',
  otherLeadhead: '',
  quantity: 'touch',
  touchType: 'numbers',
  comp: '1.6.8s.12',
  callType: 'cust',
  bobPlaceNot: '5',
  singlePlaceNot: '567',
  callLoc: '1'
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
const findMod = require('./src/library/findMod.js');

var chamberopen = false;

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
  name: {$regex: "camel", $options: 'i'}, //
  //stage: 12, //{$in: [5,7,9,11,13,15,17]},
  //leadHeadCode: { $exists: false },
  //oldtitle: {$size: 1}
  //leadHeadCode: {$in: ['g', 'h', 'j1', 'j2', 'j3', 'k1', 'k2', 'j4', 'j', 'k3', 'k4', 'k', 'l', 'm']},
  //class: "Hybrid",
  //"classification.trebleDodging": true,
  //"classification.plain": true,
  //methods: {$gt: 100},
  //huntBells: {$gt: 20},
  //leadHead: {$in: ["135264", "156342", "164523", "142635"]},
  //huntPath: [1,2,3,4,5,5,4,3,2,1]
  //$or: [{"classes.stages": 6}, {"classes.stages": 4}]
}
//['a', 'b', 'c', 'd', 'e', 'f']
//['g', 'h', 'j', 'k', 'l', 'm']
let q = {
  query: query,
  fields: "title"
}

//^-1[456]-[123]6-[12345]+6,1[26]
//console.log(methodNames2[0].classes[0].methods);
//findOne(query, 's', (result) => {for (var i=0; i < result.length; i++) {console.log(result[i].title)}});
//findPost(q, 's', (result) => {for (var i=0; i < result.length; i++) {if (!result[i].huntBells.includes(1)) {console.log(result[i].title, result[i].huntBells)}}});

//findMod(query, "methods", (result) => {
//if (result.length < 11) result.forEach(r => console.log(r.title));
//else console.log(result.length);
//});
//
//console.log(result.length)
//console.log(max(result, "leadLength"))
//console.log(findMethod(input));
//console.log('♭');
//for (var i=0; i < result.length; i++) {console.log(result[i].title)}
//console.log(require('./methodNames.json')[2].classes[0].methods[0].length);
//createNames(() => {});

//methodSearch(input);
const routes = {
  app: function (request, response, type) {
    record(request, response, (r) => console.log(r));
    handleInput3(request.query, type, (results) => {
      response.send(results);
    });
  },
  files: {
    methodnames: "/methodNames2.json",
    sm: "/minorsurprise.json",
    stages: "/src/stages.json",
    teststaff: "/views/stafftest.html",
    surpriseminor: "/views/surprise-minor.html",
    stedman: "/views/stedman.html",
    chamberofsecrets: chamberopen ? "/views/secretsopen.html" : "/views/secrets.html"
  },
  updatenames: function (request, response) {
    if (request.query.secret === process.env.SECRET) {
      createNames(() => {response.send('ok')});
    } else {
      response.send('ok');
    }
  },
  openchamber: function (request, response) {
    chamberopen = true;
    response.send('ok');
  }
}


//app.get("/compare", function (request, response) {
  //let inputs = findLeads(input1, input2);
  //let uniques = compare(inputs);
  //response.send({Leadheads: inputs, Uniques: uniques, "coursing orders": courseOrders(uniques)});
//});
//*/
///*
//app.get("/courseorder", function (request, response) {
  //response.send(courseOrder("123456"));
//});


app.post("/rowarray", function (req, res) {
  rowGen(req.body, (arr) => {
    res.send(arr);
  });
});




app.get("/", function (request, response) {
  //console.log(request.headers.referer);
  routes.app(request, response, 'grid');
});

///*
app.get("/:param", function (request, response) {
  let p = request.params.param;
  if (['graphs', 'staff', 'practice'].includes(p)) {
    routes.app(request, response, p);
  } else if (routes.files[p]) {
    response.sendFile(__dirname + routes.files[p]);
  } else if (p === "updatenames") {
    routes.updatenames(request, response);
  } else if (p === "openchamber") {
    routes.openchamber(request, response);
  } else {
    response.sendStatus(404);
  }
  //response.sendStatus(200);
  
});
//*/


app.get("/staff2", function (request, response) {
  //response.send(urlParse(request.originalUrl, true).query);
  response.send(request.query);
  //response.send(handleInput3(urlParse(request.originalUrl, true).query, 'staff'));
});


app.get("/library", function (request, response) {
  //console.log("test param: ", request.params.test);
  response.send("no");
  //response.send(methodSearch(input));
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
