require(["../lib/raphael", "AnimatedButton", "../lib/jquery-2.1.4"], function(Raphael, AnimatedButton, jquery) {
  var tourButton = new AnimatedButton("tourButton", "360° TOUR");
  var dataButton = new AnimatedButton("dataButton", "DATA");
  var aboutButton = new AnimatedButton("aboutButton", "ABOUT");
  var partnerButton = new AnimatedButton("partnerButton", "PARTNERS");
  var galleryButton = new AnimatedButton("galleryButton", "GALLERY");

  function openMenu() {
    $('#horizontalMenu').animate({left:'-=100px'}, {duration:250});
    $('#screen').fadeTo(250, 1);
    $('#screen').css('pointer-events','auto');
  }
  function closeMenu() {
    $('#horizontalMenu').animate({left:'100%'}, {duration:250});
    $('#screen').fadeTo(250, 0, function() {$('#screen').css('pointer-events','none');});
  }

  var menuOpen = false;
  $('#hamburgerIcon').mouseup(function() {
    if (!menuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
    menuOpen = !menuOpen;
  });

  $('#screen').mouseup(function() {
    closeMenu();
    menuOpen = !menuOpen;
  })
});
