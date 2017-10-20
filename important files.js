//1.
  //This Is THe Code For Event Modules{{{

  var events = require('events');
  var util   = require('util');

  var Person = function(name, age){
    this.name = name;
    this.age = age;
  };

  util.inherits(Person, events.EventEmitter);

  var james = new Person('James',20);
  var mary  = new Person('Mary', 30);
  var ryu   = new Person('Ryu', 40);

  var people = [james, ryu, mary];

  people.forEach( function(person){
    person.on('speak', function(mssg){
        console.log(person.name + ' ' + person.age + ' said: ' + mssg);
    });
  });

  james.emit('speak', "hello There");
  }}}

// 2.Creating server........
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
       console.log('Request Has Submitted: ' + req.url);

       res.writeHead(200, {'content-type': 'text/html'});

       var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');

       myReadStream.pipe(res)
});


server.listen('3000', '127.0.0.1');
console.log('the server is running on port 3000');


//3.. Node JS Routing,,,,,
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
       console.log('Request Has Submitted: ' + req.url);

        if( req.url ==='/home' || req.url==='/'){
           res.writeHead(200, {'content-type': 'text/html'});
           fs.createReadStream(__dirname + '/index.html').pipe(res);
        }

        else if (req.url ==='/Contact') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.createReadStream(__dirname + '/contact.html').pipe(res);
        }


        else if(  req.url ==='/api/ninja'){
          res.writeHead(200, {'content-type': 'aplication/json'});
          var myObj = [{
            Name : "Rabbani",
            Profession : "Student",
            Age : 23
          },
          {
            Name: "Rashed",
            Profession: "Muchi",
            Age :23
          }
        ];

          res.end(JSON.stringify(myObj));
        }


        else{
          res.writeHead(404, {'Content-Type': 'text/html'});
          fs.createReadStream(__dirname + '/404.html').pipe(res);
        }

});


server.listen('3000', '127.0.0.1');
console.log('the server is running on port 3000');

//4. With express Routing basic.....
var express = require('express');
var app = express();
app.set('view engine', 'ejs');


app.get('/', function( req, res){
    res.sendfile(__dirname + '/index.html');
});

app.get('/contact', function(req, res){
  res.sendfile(__dirname + '/contact.html');
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
