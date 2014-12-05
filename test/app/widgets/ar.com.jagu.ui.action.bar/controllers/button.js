var Button = {
	TAG : 'ar.com.jagu.ui.action.bar.button',
	args : arguments[0] || {},
	//initialize button
	initialize : function() {

		_.extend($.button, _.omit(Button.args, 'click', 'icon'));
		_.extend($.icon, Button.args.icon);

		$.button.addEventListener('click', Button.behaviour);

		if (Button.args.click) {
			$.button.addEventListener('click', Button.args.click);
		}

		//GC
		Button.args = null;

	},
	//simulate click
	behaviour : function() {
		var color = $.button.backgroundColor || 'transparent';
		var behaviourColor = color == 'transparent' ? '#40999999' : color.replace('#', '#40');
		$.button.backgroundColor = behaviourColor;

		setTimeout(function() {
			$.button.backgroundColor = color;
		}, 100);
	}
};

//public methods
$.initialize = Button.initialize;
