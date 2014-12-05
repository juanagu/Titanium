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

		_.extend($.button, _.omit(ButtonIcon.args, 'icon'));
		if (ButtonIcon.args.icon) {
			$.icon.image = ButtonIcon.args.icon;
		}
		//GC
		ButtonIcon.args = null;
	},
	//simulate click
	behaviour : function() {
		
		var color = $.button.backgroundColor || 'transparent';
		var behaviourColor = color == 'transparent' ? '#CC999999' : color.replace('#', '#CC');
		$.button.backgroundColor = behaviourColor;
		
		setTimeout(function() {
			$.button.backgroundColor = color;
		}, 100);
	}
};

//public method
exports.initialize = ButtonIcon.initialize;
