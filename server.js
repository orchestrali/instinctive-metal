// server.js
// where your node app starts



// init project
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var input = { 
  stage: '8',
  methodClass: 'Surprise',
  methodName: 'London',
  placeNotation: '',
  leadhead: 'rounds',
  otherLeadhead: '',
  quantity: 'plaincourse',
  //touchType: 'numbers',
  //comp: '1.6.8s.12',
  //callType: 'cust',
  //bobPlaceNot: '5',
  //singlePlaceNot: '567',
  //callLoc: '1'
};

var compinput = {
  stage: '8',
  complibid: '16363'
}





const createNames = require('./src/library/methodNames.js');
const rowGen = require('./src/rowArray.js');
const router = require('./src/router.js');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan(':url'));

// http://expressjs.com/en/starter/basic-routing.html
//createNames(() => {});

const record = require('./src/record/router.js');
const findOne = require('./src/library/findOneOrMany.js');
const findPost = require('./src/library/findPost.js');
const findMod = require('./src/library/findMod.js');
const serialize = require('./src/library/serialize.js');
const max = require('./src/query/max.js');
const random = require('./src/random.js');


//random(compinput); //{id: 40936}
//findOne({title: "Cheeky Little Surprise Minor"}, '', (err, res) => {console.log(err || res)});
//findPost({query: {stage: 3}, fields: "title"}, null, (res) => {console.log(res[0])});

const routes = {
  app: function (request, response, type, raw) {
    request.query.type = type;
    //record(request, response, (r) => console.log(r));
    router(request.query, raw, (results) => {
      response.send(results);
    });
  },
  files: {
    methodnames: "/methodNames2.json",
    sm: "/minorsurprise.json",
    stages: "/src/stages.json",
    teststaff: "/views/stafftest.html",
    surpriseminor: "/views/surprise-minor.html",
    index: "/views/index.html",
    stedman: "/views/stedman.html",
    home: "/views/home.html",
    timing: "/views/timing.html",
    court: "/views/courtcambridge.html",
    surprise: "/views/surprise.html",
    callchange: "/views/callchange.html",
    placebells: "/views/placebells.html",
    grids: "/views/grids.html"
  },
  updatenames: function (request, response) {
    if (request.query.secret === process.env.SECRET) {
      createNames(() => {response.send('ok')});
    } else {
      response.send('ok');
    }
  },
  test: function(request, response, type, raw) {
    router(request.query, raw, (results) => {
      response.send(results);
    });
  }
}



app.post("/rowarray", function (req, res) {
  rowGen(req.body, (arr) => {
    res.send(arr);
  });
});


//

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
  } else if (p === "raw") {
    console.log("raw");
    let type = request.query.type;
    routes.app(request, response, type, true);
  } else {
    response.sendStatus(404);
  }
  //response.sendStatus(200);
  
});
//*/

//


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
