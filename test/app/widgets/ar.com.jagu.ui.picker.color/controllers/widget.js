var ColorPicker = {
	TAG : 'ar.com.jagu.ui.picker.color',
	args : arguments[0] || {},
	color : '#ffffff',
	initialize : function() {
		$.widget.backgroundColor = ColorPicker.color;
		_.extend($.widget, ColorPicker.args);
		ColorPicker.configureListener();
	},
	configureListener : function() {
		$.widget.addEventListener('click', ColorPicker.onClick);
	},
	onClick : function() {
		var win = Widget.createController('color_picker').createColorPicker({
			hexColor : ColorPicker.color
		});
		win.addEventListener("colorselect", function(e) {
			ColorPicker.color = e.hexColorWithHash;
			$.widget.backgroundColor = ColorPicker.color;
		});
		win.open();
	}
};

//init
ColorPicker.initialize();
