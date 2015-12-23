require('core-js/fn/object/assign');
var express = require("express");
var app = express();
var ENV_PORT = Number(process.env.PORT); // passed by Heroku

app.disable('x-powered-by');
app.use(express.static(__dirname + '/dist'));

var api = require('./api-server').run(app, ENV_PORT);
