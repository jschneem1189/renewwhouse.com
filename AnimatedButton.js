function AnimatedButton (R, label, width, height) {
	var txtAttr = {font: '18px Oswald', fill: "#5f5f5f"}
	var rect = R.rect(0,0,width,height,15).attr({fill: '#41c1f0', stroke: 'none', opacity:0})
	var txt = R.text(width/2, height/2 +2, label).attr(txtAttr);
	var touchArea = R.rect(0,0,width,height).attr({fill: '#fff', stroke: 'none', opacity:0})
	rect.transform("s0.1");
	touchArea.mouseover(function() {
		rect.animate({opacity:1, transform:"s1"},200);
		txt.animate({fill: '#fff'},200);
	});
	touchArea.mouseout(function() {
		rect.animate({opacity:0, transform:"s0.1"},200);
		txt.animate({fill: '#5f5f5f'},200);
	});
}