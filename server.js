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



const methodNames2 = require('./methodNames2.json');

const findOne = require('./src/library/findOneOrMany.js');
const findPost = require('./src/library/findPost.js');
const createNames = require('./src/library/methodNames.js');
const record = require('./src/record/router.js');
const rowGen = require('./src/rowArray.js');
const findMod = require('./src/library/findMod.js');
const router = require('./src/router.js');


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




const routes = {
  app: function (request, response, type) {
    request.query.type = type;
    //record(request, response, (r) => console.log(r));
    router(request.query, (results) => {
      response.send(results);
    });
  },
  files: {
    methodnames: "/methodNames2.json",
    sm: "/minorsurprise.json",
    stages: "/src/stages.json",
    teststaff: "/views/stafftest.html",
    surpriseminor: "/views/surprise-minor.html",
    index: "/views/index.html"
  },
  updatenames: function (request, response) {
    if (request.query.secret === process.env.SECRET) {
      createNames(() => {response.send('ok')});
    } else {
      response.send('ok');
    }
  },
  test: function(request, response, type) {
    router(request.query, (results) => {
      response.send(results);
    });
  }
}



app.post("/rowarray", function (req, res) {
  rowGen(req.body, (arr) => {
    res.send(arr);
  });
});




app.get("/", function (request, response) {
  //console.log(request.headers.referer);
  routes.app(request, response, request.query.type ? request.query.type : "grid");
});

///*
app.get("/:param", function (request, response) {
  let p = request.params.param;
  if (['graphs', 'staff', 'practice'].includes(p)) {
    routes.app(request, response, p === "graphs" ? "graph" : p);
  } else if (routes.files[p]) {
    response.sendFile(__dirname + routes.files[p]);
  } else if (p === "updatenames") {
    routes.updatenames(request, response);
  } else if (p === "test") {
    routes.test(request, response, "test");
  } else {
    response.sendStatus(404);
  }
  //response.sendStatus(200);
  
});
//*/


app.get("/staff2", function (request, response) {
  //response.send(urlParse(request.originalUrl, true).query);
  response.send(request.query);
  
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
