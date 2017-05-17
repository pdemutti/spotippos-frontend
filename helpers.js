var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var exphbs = require('express-handlebars');

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
      return '<input type="text" id="'+ id +'" class="filter-field" name="'+ id +'" placeholder="'+ id +'">';
    }
  }
});

exports.hbs = hbs.helpers
