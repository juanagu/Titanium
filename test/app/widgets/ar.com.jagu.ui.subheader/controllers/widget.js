var Subheader = {
	TAG : 'ar.com.jagu.ui.subheader',
	//parent tss
	args : arguments[0] || {},
	//initialize widget
	initialize : function() {
		_.extend($.widget, _.omit(Subheader.args, 'title'));
		_.extend($.title, Subheader.args.title);
	},
	/**
	 * set title
	 * @param String title
	 */
	setTitle : function(title) {
		$.title.text = title;
	}
};

//public
exports.setTitle = Subheader.setTitle;

//init
Subheader.initialize();
