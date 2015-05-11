require(["../lib/jquery-2.1.4", "header"], function(jquery, header) {
	window.onresize = function(evt) {
    $('#wrapper').css('min-height',$(window).height());
  }

  var loadComplete = function(evt) {
    $('#wrapper').css('min-height',$(window).height());
    $('#wrapper').css('visibility','visible');
  };

  // register loadComplete with ready and load because requirejs fails at calling load
  $(document).ready(loadComplete);
  $(window).load(loadComplete);

   // get key
  $.ajax({
    url:"https://api.emonitor.us/customer/authenticate?login=Whirlpool&password=ReNEWWHouse&json=1",  // live site
    // url:"http://localhost/data/getEnergyData_stock.php",     // local testing
    crossDomain: true,
    // dataType: 'jsonp',
    // jsonp: 'jsonp',
    // jsonpCallback: 'callback',
    success: success,
    // callback: callback,
    error: function(e) {
      alert("error fetching security key: "+e);
    }
  });

  function callback(responseText) {
      console.debug(responseText);
    }
    function success(responseText) {
      console.debug(responseText);
    }
//   function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {

//     // Check if the XMLHttpRequest object has a "withCredentials" property.
//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
//     xhr.open(method, url, true);

//   } else if (typeof XDomainRequest != "undefined") {

//     // Otherwise, check if XDomainRequest.
//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);

//   } else {

//     // Otherwise, CORS is not supported by the browser.
//     xhr = null;

//   }
//   return xhr;
// }

// var xhr = createCORSRequest('GET', "https://api.emonitor.us/customer/authenticate?login=Whirlpool&password=ReNEWWHouse&json=1");
// if (!xhr) {
//   throw new Error('CORS not supported');
// }
// xhr.onload = function() {
//  var responseText = xhr.responseText;
//  console.log(responseText);
//  // process the response.
// };

// xhr.onerror = function() {
//   console.log('There was an error!');
// };
// xhr.send();
});