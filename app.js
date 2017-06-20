const express = require('express');
const data = require('./data.js');
const path = require('path');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', {users:data.users});
})

app.get('/:id', function(req, res){
  var inputID = req.params.id - 1;
  res.render('user', {users:data.users[inputID]});
})

app.listen(3000, function () {
  console.log('Successfully started User Directory application!');
})
