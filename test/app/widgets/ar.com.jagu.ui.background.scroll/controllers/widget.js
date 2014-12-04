var BackgroundScroll = {
	TAG : 'ar.com.jagu.ui.background.scroll',
	args : arguments[0] || {},
	positionView : null,
	y : 0,
	interval : 50,
	height : Titanium.Platform.displayCaps.platformHeight * 3,
	initialize : function() {

		//configure background image
		if (BackgroundScroll.args.backgroundImage) {
			$.img.image = BackgroundScroll.args.backgroundImage;
			$.reply.image = BackgroundScroll.args.backgroundImage;
		}

		_.extend(BackgroundScroll, _.omit(BackgroundScroll.args, 'backgroundImage'));
		BackgroundScroll.args = null;

		$.background.height = BackgroundScroll.height;

		BackgroundScroll.autoScroll();
	},
	autoScroll : function() {
		var autoScroll = setInterval(function() {
			if ($.img.rect && $.img.rect.height > 0) {
				BackgroundScroll.positionView = $.background.getTop() + $.img.rect.height;
			}

			if (BackgroundScroll.positionView != null && (BackgroundScroll.positionView == 0 || BackgroundScroll.positionView == -1 || BackgroundScroll.positionView == 1)) {
				BackgroundScroll.y = 0;
			}

			BackgroundScroll.y = BackgroundScroll.y - 1;
			$.background.top = BackgroundScroll.y;
		}, BackgroundScroll.interval);
	}
};

//public initialize widget
exports.initialize = BackgroundScroll.initialize;

