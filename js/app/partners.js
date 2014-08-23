require(["../lib/jquery", "header"], function(jquery, header) {
	window.onresize = function(evt) {
    $('#wrapper').css('min-height',$(window).height());
  }

  $(window).load(function(evt) {
    $('#wrapper').css('min-height',$(window).height());
    $('#wrapper').show();
  });
});