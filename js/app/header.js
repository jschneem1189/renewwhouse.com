require(["../lib/raphael", "AnimatedButton", "../lib/jquery"], function(Raphael, AnimatedButton, jquery) {
	var dataButton = new AnimatedButton("dataButton", "DATA");
	// var tourButton = new AnimatedButton("tourButton", "TOUR");
	var aboutButton = new AnimatedButton("aboutButton", "ABOUT");
	var partnerButton = new AnimatedButton("partnerButton", "PARTNERS");

	$(window).unload(function(evt) {
        // for some reason if this function is not implemented the AnimatedButtons get stuck when using the back button in Safari
        partnerButton.reset();
        aboutButton.reset();
        dataButton.reset();
    });
});

