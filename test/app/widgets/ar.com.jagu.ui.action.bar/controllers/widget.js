var ActionBar = {
	TAG : 'ar.com.jagu.ui.action.bar',
	args : arguments[0] || {},
	initialize : function() {
		_.extend($.actionBar, ActionBar.args);
	},
	/**
	 * add nav icon to action bar
	 * @param {Object} arguments: {icon:{image:'/images/icon.png'}, click:function(){}}
	 */
	navIcon : function(arguments) {

		var tss = {
			left : '4dp'
		};
		var button = new (require('alloy/widgets/ar.com.jagu.ui.action.bar/controllers/button'))(_.extend(tss, arguments));
		button.initialize();

		$.vNavIcon.removeAllChildren();
		$.vNavIcon.add(button.getView());
	},
	/**
	 * set title to action bar
	 * @param String title
	 * @param {Object} tss
	 */
	title : function(title, tss) {
		$.title.text = title;
		if (tss) {
			_.extend($.title, tss);
		}
	},
	/**
	 * add action items
	 * @param {Object} arguments: items:[{icon:{image:'icon.png'}, click:function(){}}]
	 */
	actionIcon : function(arguments) {

		if (arguments && arguments.items) {
			var items = arguments.items;
			for (var i = 0,
			    j = items.length; i < j; i++) {
				var item = items[i];
				var button = new (require('alloy/widgets/ar.com.jagu.ui.action.bar/controllers/button'))(item);
				button.initialize();
				$.actionIcons.add(button.getView());
			};
		}
	},
	/**
	 * remove all action icons to bar
	 */
	removeActionIcons : function() {
		$.actionIcons.removeAllChildren();
	}
};
//init
ActionBar.initialize();
//public methods
exports.navIcon = ActionBar.navIcon;
exports.title = ActionBar.title;
exports.actionIcon = ActionBar.actionIcon;
exports.removeActionIcons = ActionBar.removeActionIcons;
