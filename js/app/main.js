require(["../lib/jquery-2.1.4", "../lib/modernizr.custom.29015", "header"], function(jquery, modernizr, header) {
  // grab the viewport width/height
  var viewportHeight = $(window).height();
  var viewportWidth = $(window).width();
  var goldenRatio = 1.6;
  var actualRatio = viewportWidth/viewportHeight;
  var offset = 0;
  // determine if we need to offset the image based on aspect ratio of the viewport
  if (actualRatio > goldenRatio) {
    offset = (viewportWidth/goldenRatio - viewportHeight)* 1/2;
  }

  // this function will get called on scroll events to handle banner Parallax
  function scrollBanner() {
    //Get the scoll position of the page
    var scrollPos = $(this).scrollTop();

    //Scroll and fade out the banner text
    $('#bannerText').css({
      'margin-top' : -(scrollPos/3)+"px",
      'opacity' : 1-(scrollPos/300)
    });
  
    //Scroll the background of the banner
    var val = -offset + (-scrollPos/8)
    $('#homeBanner').css({
      'background-position' : 'center ' + val +'px'
    });  
  };

  // reposition the "content" below the banner
  function resetPosition() {
    var ratio = viewportWidth/viewportHeight;
    offset = 0;
    // determine if we need to offset the image
    if (ratio > goldenRatio) {
      offset = (viewportWidth/goldenRatio - viewportHeight)* 1/2;
    }

    // offset the content such that just the tab peeks at the bottom
    var missionOffset = parseInt($('#mission').css("top").split("px")[0],10) + $('#tab').height();
    $('#content').css("margin-top", parseInt(viewportHeight-missionOffset,10));
    // ensure that the bkg image is the proper height
    $('#homeBanner').css("bottom", missionOffset + "px");
  };

  window.onresize = function(evt) {
    viewportHeight = $(window).height();
    viewportWidth = $(window).width();
    
    resetPosition();

    scrollBanner();
  };

  function loadComplete() {
    viewportHeight = $(window).height();
    viewportWidth = $(window).width();
    
    $('#content').css('visibility','visible');

    if (Modernizr.touch) {
      $('#homeBanner').css('position','absolute');
    } else {
      $('#homeBanner').css('position','fixed');
    }

    // important to call this after showing the wrapper of the tab image won't have a height
    resetPosition();
    // get the bg image in the correct position
    scrollBanner();
  };

  // register loadComplete with ready and load because requirejs fails at calling load
  $(document).ready(loadComplete);
  $(window).load(loadComplete);

  // Add parallax if this is NOT a touchscreen device
  if (!Modernizr.touch) {
    $(window).scroll(function() {
        scrollBanner();
    });
  }

  function spinArrow() {
    // caching the object for performance reasons
    var $elem = $('#tab-arrow');
    var angle = 360;

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: 0}).animate({deg: angle}, {
        duration: 1000,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
  }
  setInterval(spinArrow,5000);
});