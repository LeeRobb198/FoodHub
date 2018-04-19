

const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/profiles";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

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
  if(!req.session.loggedin){res.redirect('pages/FoodHub-Login');return;}
});
 // log out button

/*app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/FoodHub-Login.html');
});*/

app.get('pages/FoodHub-Login', function(req, res) {
  res.render('pages/FoodHub-Login');
});

//the dologin route detasl with the data from the login screen.
//the post variables, username and password ceom from the form on the login page.

app.post('pages/FoodHub-Login', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;


  db.collection('people').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){res.redirect('pages/FoodHub-Login');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){ req.session.loggedin = true;  res.redirect('/') }
    //otherwise send them back to login
    else{res.redirect('pages/FoodHub-Login')}
  });
});
