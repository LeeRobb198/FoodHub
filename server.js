const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/review_data";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
//this tells express we are using sesssions. These are variables that only belong to one user of the site at a time.
app.use(session({ secret: 'example' }));

app.use(bodyParser.urlencoded({
  extended: true
}))

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
  if(!req.session.loggedin){res.redirect('/FoodHub-Login');return;}
  //res.render('pages/Foodhub')
  db.collection('data').find({}).toArray(function(err, result) {
    res.render('pages/Foodhub', {
      users: result
    });
  });
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
app.get('/addReview', function(req, res){
  res.render('pages/addReview');
});


 // log out button

/*app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/FoodHub-Login.html');
});*/



//the dologin route deals with the data from the login screen.
//the post variables, username and password ceom from the form on the login page.

app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;


  db.collection('profiles').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){res.redirect('/FoodHub-Login');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){ req.session.loggedin = true;  res.redirect('/FoodHub') }
    //otherwise send them back to login
    else{res.redirect('/FoodHub-Login')}
  });
});
