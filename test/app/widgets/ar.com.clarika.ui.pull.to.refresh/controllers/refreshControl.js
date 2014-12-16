var RefreshControl = {
	TAG : 'ar.com.clarika.ui.pull.to.refresh.ios',
	args : arguments[0] || {},
	initialize : function() {
		_.extend($.refreshControl, RefreshControl.args);
		$.refreshControl.addEventListener('refreshstart', function() {
			$.trigger('refreshing');
		});
	},
	setRefreshing : function() {
		$.refreshControl.endRefreshing();
	},
};
//init controller
RefreshControl.initialize();

//public
exports.setRefreshing = RefreshControl.setRefreshing;
