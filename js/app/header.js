require(["../lib/raphael", "AnimatedButton", "../lib/jquery"], function(util) {
	var R1 = Raphael("dataButton", 80, 30);
	// var R2 = Raphael("tourButton", 80, 30);
	var R3 = Raphael("aboutButton", 80, 30);
	var R4 = Raphael("partnerButton", 90, 30);
	var dataButton = new AnimatedButton(R1, "DATA", 80, 30);
	// var tourButton = new AnimatedButton(R2, "TOUR", 80, 30);
	var aboutButton = new AnimatedButton(R3, "ABOUT", 80, 30);
	var partnerButton = new AnimatedButton(R4, "PARTNERS", 90, 30);

	$(window).unload(function(evt) {
        // for some reason if this function is not implemented the AnimatedButtons get stuck when using the back button in Safari
        partnerButton.reset();
        aboutButton.reset();
        dataButton.reset();
    });
});

