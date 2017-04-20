/*** Libary Modules ***/ 
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var body_parser = require('body-parser');
var http = require('http');

/*** Global Vars ***/
var server_ip = '54.201.94.228';
app.set('port', 2000);

/*** Set View Engine: Handlebars (make public directory container for static assets) ***/
app.use(express.static(__dirname + '/public'));

/*** Set Body Parser middleware to parse incoming request bodies ***/
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

/*** Error Views (404/500) ***/
/*
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});
*/

/*** Server: Listen for requests ***/
var server = app.listen(app.get('port'), function(){
	console.log("Express started on " + server_ip + ":" + app.get('port') + ", press Ctrl-C to terminate");
});

var mongo = require('mongodb').MongoClient;
var io = require('socket.io').listen(server);
