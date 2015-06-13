require(["../lib/jquery-2.1.4", "mainNav"], function(jquery, mainNav) {
	window.onresize = function(evt) {
    $('#wrapper').css('min-height',$(window).height());
  }

  function loadComplete(evt) {
    $('#wrapper').css('min-height',$(window).height());
    // $('#wrapper').css('visibility','visible');
  };

  // register loadComplete with ready and load because requirejs fails at calling load
  $(document).ready(loadComplete);
  $(window).load(loadComplete);
});