var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  // console.log(host);
  var port = server.address().port;
  // console.log(port);
  console.log('Application listening at http://' + "127.0.0.1" + ':' + port);
}

app.use(express.static('public'));