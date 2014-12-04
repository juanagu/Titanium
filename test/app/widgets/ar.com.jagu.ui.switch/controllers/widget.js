var Switch = {
	TAG : 'ar.com.jagu.ui.switch',
	args : arguments[0] || {},
	value : false,
	colorOn : 'red',
	colorOff : '#878787',
	positionOff : 0,
	positionOn : '15dp',
	initialize : function() {

		//merge params to switch
		_.extend(Switch, Switch.args);
		//configure background color
		Switch.setBackgroundColor();
		//configure position
		$.sw.left = Switch.value ? Switch.positionOn : Switch.positionOff;

		//GC
		Switch.args = null;

		Switch.configureListener();
	},
	//configure listener to click
	configureListener : function() {
		$.widget.addEventListener('click', Switch.onClick);
	},
	//on click switch
	onClick : function() {
		Ti.API.debug(Switch.TAG, 'onclick()');
		Switch.value = !Switch.value;
		Switch.animation();
	},
	/**
	 * animacion hacia la derecha o izquiera dependiendo del valor del  switch
	 */
	animation : function() {
		Ti.API.debug(Switch.TAG, 'animation()');
		var animation = Ti.UI.createAnimation();
		animation.duration = 100;
		if (Switch.value) {
			animation.left = Switch.positionOn;
		} else {
			animation.left = Switch.positionOff;
		}
		animation.addEventListener('complete', function onComplete() {
			animation.removeEventListener('complete', onComplete);
			Switch.setBackgroundColor();
		});
		$.sw.animate(animation);
	},
	setBackgroundColor : function() {
		$.sw.backgroundColor = Switch.value ? Switch.colorOn : Switch.colorOff;
	}
};

//public method
exports.initialize = Switch.initialize;
