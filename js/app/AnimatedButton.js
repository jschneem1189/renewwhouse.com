function AnimatedButton (R, label, width, height) {
	var txtAttr = {font: '18px Oswald', fill: "#5f5f5f"}
	this.rect = R.rect(0,0,width,height,15).attr({fill: '#41c1f0', stroke: 'none', opacity:0})
	this.txt = R.text(width/2, height/2 +2, label).attr(txtAttr);
	var touchArea = R.rect(0,0,width,height).attr({fill: '#fff', stroke: 'none', opacity:0})
	this.rect.transform("s0.1");
	touchArea.mouseover(function() {
		this.rect.animate({opacity:1, transform:"s1"},200);
		this.txt.animate({fill: '#fff'},200);
	}.bind(this));
	touchArea.mouseout(function() {
		this.rect.animate({opacity:0, transform:"s0.1"},200);
		this.txt.animate({fill: '#5f5f5f'},200);
	}.bind(this));
}

AnimatedButton.prototype.reset = function() {
	this.rect.attr({opacity:0});
	this.txt.attr({fill:'#5f5f5f'});
}