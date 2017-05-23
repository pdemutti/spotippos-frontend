var express = require('express')
var app = express()
var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')
var axios = require('axios');
var exphbs = require('express-handlebars');

app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/'}))

var hbs = exphbs.create({
  helpers: {
    input_label: function (context, options) {
      id = options.hash.id;
      return '<label for="'+ id +'" class="control-label">'+ context +'</label>';
    },
    paginate: function (context, options) {
      var start = parseInt(options.data.root.atualPage, 10) - 4;
      var end = parseInt(options.data.root.atualPage, 10) + 5;
      var nmPages = parseInt(context / 20, 10); // ex. 220
      var current = parseInt(options.data.root.atualPage, 10);

      if (start < 1) start = 1;
      if (end < 10 && nmPages > 10) end = 10;
      if (end > nmPages) end = nmPages;

      var html = "<ul class='paginate-list'>";
        for (var i = start; i <= end; i++){
          html += "<li class='item' data-page>";
          if (i === current) {
            html +=  "<button type='button' class='item-page atual'>" + [i] + "</button>"
          } else {
            html +=  "<button type='button' class='item-page'>" + [i] + "</button>"
          }
          html +=  "</li>";
        }
      html +=  "</ul>";

      return html;
    },
    input_number: function (context, options) {
      id = options.hash.id;
      return '<input type="number" id="'+ id +'" class="filter-field" name="'+ id +'">';
    }
  }
});
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', function (req, res) {

  axios.get(`http://spotippos.vivareal.com/properties?page=${req.query.page || 1}`)
  .then(function (response) {
    res.render('index', {
      title: 'Spotippos - Anúncios',
      rooms: response.data.properties,
      foundProperties: response.data.foundProperties,
      atualPage: req.query.page || 1,
      helpers: hbs.helpers
    })

  })
  .catch(function (error) {
    console.log(error);
  });
})

app.get('/filter', function (req, res, next) {

  axios.get('http://spotippos.vivareal.com/properties?' + getParams(req.query))
  .then(function (response) {
    res.render('index', {
      title: 'Spotippos - Anúncios',
      rooms: response.data.properties,
      foundProperties: response.data.foundProperties,
      atualPage: req.query.page || 1,
      helpers: hbs.helpers
    })

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
  return urlEncondedParams;
}

app.use(express.static('public'));

app.listen('3001')
