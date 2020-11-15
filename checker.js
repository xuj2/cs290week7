var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('port', 6659);

var queryString = function (req, res, next) {
	res.locals.queryParam = req.query;
	next();
}

app.use(queryString);

app.get('/', function(req, res) {
	console.log("hello");
	res.send("home page");
})

app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('Error 404 - Not found');
});

app.use(function(req, res){
	res.type('text/plain');
	res.status(500);
	res.send('Error 500 - Server Error');
});

app.listen(app.get('port'), function(){
	console.log(`Express started on http://flip3.engr.oregonstate.edu:${app.get('port')}; press Ctrl-C to terminate.`);
  });