var FooterRefresh = {
	TAG : 'ar.com.clarika.ui.pull.to.refresh.bottom',
	args : arguments[0] || {},
	initialize : function() {
		FooterRefresh.configureListeners();
	},
	/**
	 * configure listener
	 */
	configureListeners : function() {
		$.footerRefresh.addEventListener('scrolling', function(e) {
			alert(JSON.stringify(e));
			var value = e.value;
			if (value) {
				$.loader.show();
			} else {
				$.loader.hide();
			}
		});

	},
};
//initialize
FooterRefresh.initialize();
