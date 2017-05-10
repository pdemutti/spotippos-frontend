var App = App || {};

App.Spotippos = (function ($, win, doc) {
  'use strict';

    var params = {}; // [{ax: 1}, {page: 4}, {bx: 20}]

    function setup () {
        // var domainApi = '/proxy';
        // getData(domainApi + "/properties?beds=1&maxprice=420000&page=3", function(data){
        //     var json = JSON.parse(data);
        //     createHtml(json.properties);
        // });
        addEvent(doc.getElementById('ax'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('ay'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('bx'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('by'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('id'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('squareMeters'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('beds'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('baths'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('minprice'), 'change', function change() {
          filter();
        });

        addEvent(doc.getElementById('maxprice'), 'change', function change() {
          filter();
        });
    }

    function getParams() {
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

    function getData (url, success){
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('GET', url + "?" + getParams());
      xhr.onreadystatechange = function() {
          if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
      return xhr;
    }
    function success (data){
      console.log(data);
    }
    function addEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    function removeEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }

    function filter () {
      var form = doc.getElementById('formFilter');
      var inputs = form.getElementsByTagName('input');
      var i;
      var input;

      for (i = 0; i < inputs.length; i ++) {
        input = inputs[i];

        // {ax: 1}
        if (input.value !== '') {
          params[input.getAttribute('name')] = input.value;
        } else {
          delete params[input.getAttribute('name')];
        }
      }

      getData('/filter', success);
    }

    function paginate(pageNumber) {
      params.page = pageNumber;

      getData('/filter', success);
    }

    return {
      'setup': setup
    };

}(undefined, window, window.document));
App.Spotippos.setup();
