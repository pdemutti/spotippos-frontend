var App = App || {};

App.Spotippos = (function ($, win, doc) {
  'use strict';

    var params = {}; // [{ax: 1}, {page: 4}, {bx: 20}]

    function setup () {
      var elements = doc.getElementsByClassName('filter-field');
      for (var i = 0; i < elements.length; i++) {
        addEvent(elements[i], 'change', function change() {
          filter();
        });
      }
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
      var current = doc.querySelector('body'),
          live = doc.createElement('html'),
          selector = 'div > ul';
      live.innerHTML = data;
      current.querySelector(selector).innerHTML = live.querySelector(selector).innerHTML;
    }
    function addEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    function removeEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }

    function filter () {
      var form = doc.getElementById('formFilter'),
        inputs = form.getElementsByTagName('input'),
        i,
        input;

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
