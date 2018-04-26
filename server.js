
const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.3
const url = "mongodb://localhost:27017/profiles";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();
app.use(express.static(__dirname + '/public')); // Get the public folder
app.set('views', __dirname + '/views'); // get the pages
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

  db.collection('reviews').find({}).toArray(function(err, result) {
        if (err) throw err;
    // the result of the query is sent to the users page as the "users" array
    //var review = req.review
    res.render('pages/Foodhub', {
      review: result
    });
  });
});






//this is our login route, all it does is render the login.ejs page
app.get('/FoodHub-Login', function(req, res) {
  res.render('pages/FoodHub-Login');
});
//Render FoodHub and check if logged in
app.get('/Foodhub', function(req, res) {
    if(!req.session.loggedin){res.redirect('/FoodHub-login');return;}
  res.render('pages/Foodhub');
 });
 //Render FoodHub-T&C and check if logged in
 app.get('/FoodHub-T&C', function(req, res) {
     if(!req.session.loggedin){res.redirect('/FoodHub-login');return;}
   res.render('pages/FoodHub-T&C');
  });
   //Render FoodHub-Register
  app.get('/FoodHub-Register', function(req, res) {
    res.render('pages/FoodHub-Register');
   });
    //Render FoodHub=addReview
   app.get('/addReview', function(req, res) {
     res.render('pages/addReview');
    });

   app.post('/review', function(req,res){
     var newReview = {
       name: req.body.full_name,
       date: req.body.date,
       city: req.body.location,
       restaurant: req.body.restaurant,
       rating: req.body.rating,
       review: req.body.review
     }
     db.collection('reviews').insert(newReview, function(err, result){
       if(err) throw err;{
         console.log(err);
       }
       res.redirect('/FoodHub');
     });
   });




 // log out button

app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/FoodHub-Login');
});

app.get('/pages/FoodHub',function(req,res) {
  console.log("req.body");
  res.render('review', {reviews:req.body}
  );
});

//the dologin route detasl with the data from the login screen.
//the post variables, username and password ceom from the form on the login page.

app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;


  db.collection('people').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){res.redirect('/FoodHub-Login');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){ req.session.loggedin = true;  res.redirect('/FoodHub') }
    //otherwise send them back to login
    else{res.redirect('/FoodHub-Login')}
  });
});

//Register and storing username and password to database
app.post('/FoodHub-Register', function(req, res) {

var datatostore = {

"login":{"username":req.body.username,"password":req.body.password}
}



//once registered redirect to FoodHub-Login
  db.collection('people').save(datatostore, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect('/FoodHub-Login')
  })
});
