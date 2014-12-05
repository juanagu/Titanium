var MenuBottom = {
	TAG : 'ar.com.jagu.ui.bottom.bar',
	isVisible : true,
	/**
	 * add button menu
	 * @param {Object} arguments:{icon:{image:'icon.png'}, click:function(){}, backgroundColor:'white'}
	 *
	 */
	addButton : function(arguments) {

		var button = new (require('alloy/widgets/ar.com.jagu.ui.bottom.bar/controllers/button'))(arguments);
		button.initialize();
		$.buttons.add(button.getView());
	},
	//cuando se hace scroll hacia arriba muestro el menu si es que esta escondido
	onScrollUp : function() {
		if (!MenuBottom.isVisible) {
			Ti.API.debug(MenuBottom.TAG, 'onScrollUp(), true');
			MenuBottom.isVisible = true;
			// Create an object to animate.
			var animation = Ti.UI.createAnimation({
				duration : 150,
				height : '56dp',
				opacity : 1
			});
			// Start the Animation.
			$.menu.animate(animation);
		}
	},
	//cuando se hace scroll hacia abajo escondo el menu si es que esta visible
	onScrollDown : function() {

		if (MenuBottom.isVisible) {
			Ti.API.debug(MenuBottom.TAG, 'onScrollDown(), true');
			MenuBottom.isVisible = false;
			// Create an object to animate.
			var animation = Ti.UI.createAnimation({
				duration : 150,
				height : 0,
				opacity : 0
			});
			// Start the Animation.
			$.menu.animate(animation);
		}
	},
	/**
	 * configureMenuDinamic: configure para que el menu se vuelva invisible cuando se realiza scroll
	 *  hacia abajo y se vuelva visible al realizar scroll para arriba - Only Android
	 * @param {TableView} table
	 */
	configureMenuDinamic : function(table) {
		if (OS_ANDROID) {
			var start = 0;

			table.addEventListener('touchstart', function(e) {
				start = e.y;
				Ti.API.debug('touchstart ->' + JSON.stringify(e));
			});

			table.addEventListener('touchend', function(e) {
				Ti.API.debug('touchend ->' + JSON.stringify(e));
				var end = e.y;
				if (start < end) {
					MenuBottom.onScrollUp();

				} else {
					MenuBottom.onScrollDown();
				}
			});

		}
	}
};
//public methods
exports.configureMenuDinamic = MenuBottom.configureMenuDinamic;
exports.addButton = MenuBottom.addButton;
