var express = require('express')
var app = express()
var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')
var axios = require('axios');
// var hbs = require('express-handlebars');
var exphbs = require('express-handlebars');

app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/'}))

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        input_label: function (context, options) {
          var id = options.hash.id;
          return '<label for="'+ id +'" class="control-label">'+ context +'</label>';
         },
        bar: function () { return 'BAR!'; },
        foo: function(){
          return '<div>Demuttão</div>'
        }
    }
});
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', function (req, res) {
  // console.log(req);
  res.render('index', {title: 'Spotippos Anuncios'});
})

app.get('/filter', function (req, res, next) {

  console.log(req.query, getParams(req.query));
  axios.get('http://spotippos.vivareal.com/properties?' + getParams(req.query))
  .then(function (response) {
    res.render('index', {rooms: response.data.properties, title: "Novo Title", helpers: hbs.helpers})
    // console.log(response.data);

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

app.listen('3001')
