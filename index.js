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

      console.log(start, end, current);

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
    input_text: function (context, options) {
      id = options.hash.id;
      return '<input type="text" id="'+ id +'" class="filter-field" name="'+ id +'">';
    }
  }
});
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', function (req, res) {
  // console.log(req);
  res.render('index', {
      title: 'Spotippos Anuncios',
      helpers: hbs.helpers
    }
  );
})

app.get('/filter', function (req, res, next) {

  // console.log(req.query, getParams(req.query));
  console.log('http://spotippos.vivareal.com/properties?' + getParams(req.query));
  axios.get('http://spotippos.vivareal.com/properties?' + getParams(req.query))
  .then(function (response) {
    res.render('index', {
      title: 'Spotippos Anuncios',
      rooms: response.data.properties,
      foundProperties: response.data.foundProperties,
      atualPage: req.query.page || 1,
      helpers: hbs.helpers
    })
    // console.log(response.data);
    console.log('foundProperties', response.data.foundProperties);

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
