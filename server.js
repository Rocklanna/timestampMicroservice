// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/",function (req, res) {
  
  var unix,utc;

     unix = new Date().getTime();
     utc = new Date().toUTCString();
    res.json({"unix":unix, "utc":utc});

});


app.get("/api/timestamp/:date_string",function (req, res) {
  
  var input = req.params.date_string;
  var regex =/^\d+$/g;
  var unix,utc;
  
  if(regex.test(input)){ //if the input is in millsecs e.g 14510016
       unix = Number (input);
       utc = new Date(unix).toUTCString();
     res.json({"unix":unix, "utc":utc});
  }
  else{ 
    unix = new Date(input).getTime();
    utc = new Date(input).toUTCString();
    if(utc==="Invalid Date"){
      res.json({"error":utc});
    }
    else{
         res.json({"unix":unix, "utc":utc});
    }
  }
  

});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
