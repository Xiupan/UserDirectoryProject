const express = require('express');
const app = express();
const data = require('../data.js');
const path = require('path');
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('/public'));

app.get('/', function (req, res) {
  res.render('index', {users:data.users});
})

app.get('/:id', function(req, res){
  var inputID = req.params.id - 1;
  res.render('user', {users:data.users[inputID]});
})
