var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/assets', express.static('assets'));
app.get('/', function( req, res){
    res.render('index');
});

app.get('/contact', function(req, res){
  res.render('contact', {qs: req.query});
});



app.post('/contact', urlencodedParser, function(req, res){
  console.log(req.body);
  res.render('contact-success', {data: req.body});
});



app.get('/profile/:name', function(req, res){
  var data = {
    job : 'Student',
    age : 23,
    hobby:['eating', 'fighiting', 'Coding', 'Solving Problem']
  }
  res.render('profile', {person: req.params.name, data: data});
});
app.listen(3000);
