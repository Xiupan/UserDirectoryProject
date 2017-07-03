const express = require('express');
const data = require('./data.js');
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

app.get('/', function (req, res) {
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
  res.render('index', {users:data.users});
})

app.get('/:id', function(req, res){
  var inputID = req.params.id - 1;
  res.render('user', {users:data.users[inputID]});
})

app.listen(3000, function () {
  console.log('Successfully started User Directory application!');
})
