require(["../lib/jquery", "header"], function(jquery, header) {
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
});