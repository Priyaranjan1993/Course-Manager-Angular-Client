var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre');

/*mongoose.connect('mongodb://localhost/bookstore');*/
mongoose.connect('mongodb://priyaranjan:priya@93@ds143451.mlab.com:43451/coursemanagement');
var db = mongoose.connection;


app.get('/', function (req, res) {
  res.send('Hello World Priyaranjan!!');
});


app.listen(3000);
console.log('Running on port 3000');
