var DrowitEffectBottomBar = {
	TAG : 'ar.com.clarika.ui.drowit.effect.bottom.bar',
	args : arguments[0] || {},
	initialize : function() {
		DrowitEffectBottomBar.onDefault();
	},
	/**
	 * remove current view with animation
	 * @param {Object} success
	 */
	removeCurrentView : function(success) {
		var children = $.widget.children;
		if (children.length > 0) {

			var currentView = children[0];

			// Create some Animation.
			var animation = Ti.UI.createAnimation({
				duration : 500,
				left : Ti.Platform.displayCaps.platformWidth + ( OS_ANDROID ? 'px' : 'dp'),
				opacity : 0.2
			});
			animation.addEventListener('complete', function() {
				$.widget.remove(currentView);
				//GC
				currentView = null;
				if (success) {
					success();
				}
			});
			// Start the Animation.
			currentView.animate(animation);

		} else if (success) {
			success();
		}
	},
	/**
	 * add menu view
	 * @param {Object} name
	 * @param {Object} params
	 */
	addMenu : function(name, params) {
		var controller = Widget.createController(name, params || {});
		$.widget.add(controller.getView());
	},
	/**
	 *configureMenuStickers
	 * @param {Function} menu
	 */
	configureMenu : function(menu) {
		DrowitEffectBottomBar.removeCurrentView(menu);
	},
	onStickers : function() {
		DrowitEffectBottomBar.addMenu('stickers', {
			widget : DrowitEffectBottomBar
		});
	},
	onFrames : function() {
		DrowitEffectBottomBar.addMenu('frames', {
			widget : DrowitEffectBottomBar
		});
	},
	onDefault : function() {
		DrowitEffectBottomBar.addMenu('main', {
			widget : DrowitEffectBottomBar
		});
	}
};

