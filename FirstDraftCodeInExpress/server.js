var express = require("express");
var app = express();
app.use('/public', express.static(__dirname + '/public'));

// I don't think I need this line.//
//Will delete in the end if app works without it.//
/* var router = express.Router(); */

// This sequence of commands routes to each web page//
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

app.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});



// I don't think I need this line. Will delete in the end if app works without it.//
/* app.use("/",router); */

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
