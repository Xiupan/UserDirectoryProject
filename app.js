const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const router = require('./routes/index');
const http = require('http');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/robotDB";

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  } else {
    console.log('Successfully connected to the database');
  }
  const data = require("./data");
  for (var i = 0; i < data.users.length; i++) {
    const user = data.users[i];
    db.collection("users").updateOne(
      {id: user.id},
      user,
      {upsert: true}
    )
  }
})

app.get('/', function (req, res) {
  MongoClient.connect(url, function(err, db){
    db.collection("users")
    .find()
    .toArray(function(err, users){
      res.render('index', {users:users});
    })
  })
})

app.get('/:id', function(req, res){
  MongoClient.connect(url, function(err, db){
    const inputID = parseInt(req.params.id);

    db.collection("users")
    .findOne({
      id: inputID
    }, function(err, user){
      console.log('user', user)
      res.render('user', {users: [user]});
    })
  })
})

app.listen(3000, function () {
  console.log('Successfully started User Directory application!');
})
