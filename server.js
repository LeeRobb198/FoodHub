const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/review_data";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.static('public'));

//set static path
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public', {index: 'Foodhub.html'}))

var db;

MongoClient.connect(url, function(err, database){
  if(err) throw err;
  db = database;
  app.listen(8080);
});

/*
app.get('/', function(req, res) {
  db.collection('data').find().toArray(function(err, result){
    if (err) throw err;

    var output = "<h1>All the reviews</h1>";

      for (var i = 0; i < result.length; i++){
        output += "<div>"
        output += "<h3>" + result[i].name + "</h3>"
        output +=  "<p>" + result[i].date
        output +=  result[i].restaurant
        output +=  result[i].review
        output +=  result[i].rating + "</p>"
        output += "</div>"
      }
      res.send(output);
    });
  });
*/
app.get('/', function(req, res) {
//    if (err) throw err;

/*  var output = "<h1>All the reviews</h1>";

    for (var i = 0; i < result.length; i++){
      output += "<div>"
      output += "<h3>" + result[i].name + "</h3>"
      output +=  "<p>" + result[i].date
      output +=  result[i].restaurant
      output +=  result[i].review
      output +=  result[i].rating + "</p>"
      output += "</div>"
    }
*/
    //Gathers review_data from mongodb, then outputs at JSON
    db.collection('data').find({}).toArray(function(err, result) {
	     if (err) throw err;
        res.json(result);
        });
});
