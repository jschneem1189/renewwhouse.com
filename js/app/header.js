require(["../lib/raphael", "AnimatedButton", "../lib/jquery-2.1.4"], function(Raphael, AnimatedButton, jquery) {
  var dataButton = new AnimatedButton("dataButton", "DATA");
  // var tourButton = new AnimatedButton("tourButton", "TOUR");
  var aboutButton = new AnimatedButton("aboutButton", "ABOUT");
  var partnerButton = new AnimatedButton("partnerButton", "PARTNERS");
  var galleryButton = new AnimatedButton("galleryButton", "GALLERY");

  function openMenu() {
    $('#horizontalMenu').animate({left:'-=100px'}, {duration:250});
    $('#screen').fadeTo(250, 1);
  }
  function closeMenu() {
    $('#horizontalMenu').animate({left:'100%'}, {duration:250});
    $('#screen').fadeTo(250, 0);
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

