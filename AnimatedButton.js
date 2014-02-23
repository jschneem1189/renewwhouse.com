function AnimatedButton (R, label, width, height) {
	var txtAttr = {font: '20px Oswald', fill: "#fff"}
	var rect = R.rect(0,0,width,height,20).attr({fill: '#fff', stroke: 'none', opacity:0})
	var txt = R.text(width/2, height/2, label).attr(txtAttr);
	var touchArea = R.rect(0,0,width,height).attr({fill: '#fff', stroke: 'none', opacity:0})
	rect.transform("s0.1");
	touchArea.mouseover(function() {
		rect.animate({opacity:1, transform:"s1"},200);
		txt.animate({fill: '#36EBFF'},200);
	});
	touchArea.mouseout(function() {
		rect.animate({opacity:0, transform:"s0.1"},200);
		txt.animate({fill: '#fff'},200);
	});
}