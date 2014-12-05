var MenuBottom = {
	TAG : 'ar.com.jagu.ui.menu.bottom',
	isVisible : true,
	/**
	 * add button menu
	 * @param {Object} arguments:{icon:{image:'icon.png'}, click:function(){}, backgroundColor:'white'}
	 *
	 */
	addButton : function(arguments) {

		var button = new (require('alloy/widgets/ar.com.jagu.ui.menu.bottom/controllers/button'))(arguments);
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
			var lastPosition = 0;

			table.addEventListener('scroll', function onScroll(e) {

				var index = OS_ANDROID ? e.firstVisibleItem : e.contentOffset.y;
				Ti.API.debug('scroll, index -> ' + index + ' lastPosition -> ' + lastPosition);
				if (index > 0 && lastPosition <= index) {
					MenuBottom.onScrollDown();
				} else {
					MenuBottom.onScrollUp();
				}
				lastPosition = index;
			});
		}
	}
};
//public methods
exports.configureMenuDinamic = MenuBottom.configureMenuDinamic;
exports.addButton = MenuBottom.addButton;
