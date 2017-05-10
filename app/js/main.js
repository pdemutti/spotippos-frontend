var App = App || {};

App.Spotippos = (function ($, win, doc) {
  'use strict';

    function setup () {
        // var domainApi = '/proxy';
        // getData(domainApi + "/properties?beds=1&maxprice=420000&page=3", function(data){
        //     var json = JSON.parse(data);
        //     createHtml(json.properties);
        // });
    }
    function getData (url, success){
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('GET', url);
      xhr.onreadystatechange = function() {
          if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
      return xhr;
    }
    function createHtml (data){
 
    }
    function addEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    function removeEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }

    return {
      'setup': setup
    };

}(undefined, window, window.document));
App.Spotippos.setup();
