var express = require('express')

var app = express()
var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')
var proxy = require('express-http-proxy');
var axios = require('axios');

app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

var users = []

fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
  if (err) throw err

  JSON.parse(data).forEach(function (user) {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  })

})
app.use('/proxy', proxy('http://spotippos.vivareal.com', {
  filter: function(req, res) {
     return req.method == 'GET';
  }
}));
app.get('/', function (req, res) {
  // res.render('index', {users: users})
  axios.get('http://spotippos.vivareal.com/properties?ax=1&ay=1&bx=20&by=20')
  .then(function (response) {
    res.render('index', {room: response})
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.use('/static', express.static(__dirname + '/public'));



app.listen('3000')
