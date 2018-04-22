const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/review_data";
const path = require("path");
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
//app.use(bodyParser.urlencoded({extended:true}));
//this tells express we are using sesssions. These are variables that only belong to one user of the site at a time.
app.use(session({ secret: 'example' }));

app.use(bodyParser.urlencoded({
  extended: true
}))

// set the view engine to ejs
app.set('view engine', 'ejs');

var db;

//this is our connection to the mongo db, ts sets the variable db as our database
// set the view engine to ejs
app.set('view engine', 'ejs');

var db;


//this is our connection to the mongo db, ts sets the variable db as our database
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});

//this is our root route
app.get('/', function(req, res) {
  //if the user is not logged in redirect them to the login page
  //if(!req.session.loggedin){res.redirect('/FoodHub-Login');return;}
    res.render('pages/Foodhub');
});
//this is our login route, all it does is render the login.ejs page
app.get('/FoodHub-Login', function(req, res) {
  res.render('pages/FoodHub-Login');
});

app.get('/Foodhub', function(req, res) {
  res.render('pages/Foodhub');
 });
 app.get('/FoodHub-T&C', function(req, res) {
   res.render('pages/FoodHub-T&C');
  });


app.get('/all', function(req, res) {
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

/*
app.get('/', function(req, res) {
  //if the user is not logged in redirect them to the login page
  //if(!req.session.loggedin){res.redirect('/FoodHub');return;}
  res.render('pages/Foodhub')


 db.collection('data').find({}).toArray(function(err, result) {
     if (err) throw err;
      res.render(json(result));
  });
  /*
      db.data.find(function(err, docs){
        console.log("working");
        res.render('pages/Foodhub',{

        })
*/

//});
