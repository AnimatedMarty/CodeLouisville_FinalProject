var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
 
var app = express();
 
/*
<!-- This section seems to be for JADE only -->
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
*/
 
app.use(express.bodyParser());
app.use(express.methodOverride());
<!-- Not sure that I need -->
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
 
mongoose.connect('mongodb://localhost/ENewsLetter');
 
var Schema = new mongoose.Schema({
	_id    : String,
	first_name: String,
	last_name: String,
    user_email:String
});
 
var user = mongoose.model('customer', Schema);
 
app.post('/new', function(req, res){
	new user({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		user_email: req.body.user_email				
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted!');
	});
});
 
 
/* 
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/