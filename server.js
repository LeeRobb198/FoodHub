const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/review_data";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

var db;

MongoClient.connect(url, function(err, database){
  if(err) throw err;
  db = database;
  app.listen(8080);
});

app.get('/',function(req,res){
     res.sendFile('Foodhub.html');
});

app.get('/all', function(req, res) {
//    if (err) throw err;

/*    var output = "<h1>All the reviews</h1>";

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
    db.collection('data').find({}).toArray(function(err, result) {
	if (err) throw err;
        res.json(result);
        });
});

//Adding Route
app.post('/addreview', function (req, res) {
    db.collection('data').save(req.body, function(err, result) {
      if (err) throw err;
      console.log('saved to database');
      res.redirect('/');
  });
});

//Filtering Route
app.post('/search', function(req, res) {
  db.collection('data').find(req.body).toArray(function(err, result) {
    if (err) throw err;

    var output ="<h1>All the quotes</h1>";

    for (var i =0; i < result.length; i++) {
      output += "<div>"
      output += "<h3>" + result[i].name + "</h3>"
      output += "<p>" + result[i].date + "</p>"
      output += "<p>" + result[i].restaurant + "</p>"
      output += "<p>" + result[i].review + "</p>"
      output += "<p>" + result[i].rating
    }
    res.send(output);
  });
});

//Delete Route
app.post('/delete', function(req, res) {
    db.collection('data').deleteOne(req.body, function(err, result) {
      if (err) throw err;
      res.redirect('/');
  });
});

//Update Route
app.post('/update', function(req, res) {
  var query = { quote: req.body.quote };
  var newvalues = { $set: {name: req.body.newname, quote: req.body.newquote } };

  db.collection('reviews').updateOne(query,newvalues, function(err, result) {
    if (err) throw err;
    res.redirect('/');
  });
});
