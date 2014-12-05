var Button = {
	TAG : 'ar.com.clarika.ui.menu.bottom.button',
	args : arguments[0] || {
		size : 5// buttons in menu
	},
	selected : false,
	route : true,
	//initalize button
	initialize : function() {

		var width = parseInt(Ti.Platform.displayCaps.platformWidth / (Button.args.size || 5));

		$.button.width = width + ( OS_ANDROID ? 'px' : 'dp');

		_.extend($.button, _.omit(Button.args, 'click', 'icon'));
		_.extend($.icon, Button.args.icon);
		Button.configureButtonPreferences();
		Button.listeners();
	},
	/**
	 * configure si el boton es de tipo ruta para ver si se aplica el comportamiento
	 */
	configureButtonPreferences : function() {
		if (Button.args.route != null) {
			Button.route = Button.args.route;
		}
		if (Button.args.selected) {
			Button.select();
		} else if (Button.route) {
			$.icon.opacity = 0.5;
		}
	},
	//configure listeners
	listeners : function() {
		$.button.addEventListener('click', Button.onClick);
	},
	//click to button
	onClick : function() {

		if (!Button.selected) {
			if (Button.route) {
				Button.behaviour();
				Button.select();

				//busco si hay otro item seleccionado y lo deselecciono
				var parent = $.button.parent;
				var childrens = parent.children;
				for (var i = 0,
				    j = childrens.length; i < j; i++) {
					var children = childrens[i];
					if (children != $.button) {
						children.noSelect();
					}
				};

			}
			if (Button.args.click)
				Button.args.click();
		}

	},
	//simulate click
	behaviour : function() {
		var color = $.button.backgroundColor;
		$.button.backgroundColor = '#999999';
		setTimeout(function() {
			$.button.backgroundColor = color;
		}, 150);
	},
	/**
	 * select button
	 */
	select : function() {
		Button.selected = true;
		$.icon.opacity = 1;
	},
	//remove select button
	noSelect : function() {
		if (Button.selected) {
			Button.selected = false;
			$.icon.opacity = 0.5;
		}

	}
};

//public method
$.initialize = Button.initialize;
$.button.noSelect = Button.noSelect;
