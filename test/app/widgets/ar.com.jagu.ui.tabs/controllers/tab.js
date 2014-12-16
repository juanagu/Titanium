var Tab = {
	TAG : 'ar.com.jagu.ui.tab.tab',
	//params
	args : arguments[0] || {},
	//initialize controller
	initialize : function() {
		_.extend($.tag, _.omit(Tab.args, 'title'));
		_.extend($.title, Tab.args.title);
	},
};

//init
Tab.initialize();
