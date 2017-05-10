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

app.use('/proxy', proxy('http://spotippos.vivareal.com', {
  filter: function(req, res) {
     return req.method == 'GET';
  }
}));
app.get('/', function (req, res) {
  console.log(req);
  // res.render('index', {users: users})
  axios.get('http://spotippos.vivareal.com/properties?ax=1&ay=1&bx=20&by=20')
  .then(function (response) {
    res.render('index', {rooms: response.data.properties})
    // console.log(response.data.properties);
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.get('/filter', function (req, res) {
  console.log(req.query, getParams(req.query));
  axios.get('http://spotippos.vivareal.com/properties?' + getParams(req.query))
  .then(function (response) {
     console.log(response.data);
    res.json(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
});

function getParams(params) {
  var urlEncondedParams = '';
  var i;
  var prop;
  var date = new Date();

  for (prop in params) {
    urlEncondedParams += prop + "=" + params[prop] + "&";
  }

  urlEncondedParams += '_' + date.getTime();

  // retornará: ax=1&page=4&bx=20
  return urlEncondedParams;
}

app.use('/static', express.static(__dirname + '/public'));



app.listen('3000')
