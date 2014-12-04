/**
 * widget for button icon.
 * metrics and grid : http://developer.android.com/design/style/metrics-grids.html
 */

var ButtonIcon = {
	TAG : 'ar.com.jagu.ui.button.icon',
	//params on parent tss
	args : arguments[0] || {},
	//intialize widget
	initialize : function(arguments) {
		if (arguments && arguments.click) {
			$.button.addEventListener('click', ButtonIcon.behaviour);
			$.button.addEventListener('click', arguments.click);
		}
		if (ButtonIcon.args.icon) {
			$.icon.image = ButtonIcon.args.icon;
		}
		//GC
		ButtonIcon.args = null;
	},
	//simulate click
	behaviour : function() {
		$.button.opacity = 0.6;
		setTimeout(function() {
			$.button.opacity = 1;
		}, 150);
	}
};

//public method
exports.initialize = ButtonIcon.initialize;
