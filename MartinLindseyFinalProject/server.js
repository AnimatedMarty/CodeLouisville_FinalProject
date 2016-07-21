var express = require("express");
var http = require("http");
var path = require("path");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(bodyParser());
app.use(methodOverride());

<!-- Not sure that I need these two-->
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/ENewsLetter');
 
var Schema = new mongoose.Schema({
	first_name: String,
	last_name: String,
    user_email:String
});
 
var user = mongoose.model('customer', Schema);
 
app.post('/new', function(req, res){
	user.create(req.body, function(err, doc) {
   res.json(doc);
 })
});
 
// Navigate to each web page file

var path = __dirname + '/views/';

app.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

app.get("/eblast",function(req,res){
  res.sendFile(path + "eblast.html");
});

app.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
