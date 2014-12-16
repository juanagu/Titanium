var PullToRefresh = {
	TAG : 'ar.com.clarika.ui.pull.to.refresh',
	args : arguments[0] || {},
	swipeRefresh : null,
	table : null,
	position : null,
	footerRefresh : null,
	initialize : function() {
		PullToRefresh.configureListeners();
	},
	setTable : function(table) {
		PullToRefresh.table = table;
		//GC
		table = null;
		PullToRefresh.configure();
		PullToRefresh.configureFooterScroll();
	},
	/**
	 * configure pull to refresh on tableview
	 */
	configure : function() {
		if (PullToRefresh.table) {
			if (OS_ANDROID) {
				var swipeRefreshModule = require('com.rkam.swiperefreshlayout');
				PullToRefresh.swipeRefresh = swipeRefreshModule.createSwipeRefresh({
					view : PullToRefresh.table,
					height : Ti.UI.FILL,
					width : Ti.UI.FILL
				});
				PullToRefresh.swipeRefresh.addEventListener('refreshing', PullToRefresh.onRefreshing);
				$.widget.add(PullToRefresh.swipeRefresh);
			} else {
				//create refresh control
				PullToRefresh.swipeRefresh = Widget.createController('refreshControl');
				//event listener
				PullToRefresh.swipeRefresh.on('refreshing', PullToRefresh.onRefreshing);
				PullToRefresh.table.setRefreshControl(PullToRefresh.swipeRefresh.getView());

				$.widget.add(PullToRefresh.table);
			}
		}
	},
	onRefreshing : function() {
		$.widget.fireEvent('refreshing');
	},

	/**
	 * configure listeners on widget
	 */
	configureListeners : function() {
		$.widget.addEventListener('success', PullToRefresh.onSuccess);
	},
	/**
	 * on success
	 */
	onSuccess : function() {
		PullToRefresh.swipeRefresh.setRefreshing(false);
	},
	/**
	 *insertSectionBeginning
	 * @param Ti.UI.TableViewSection section
	 */
	insertSectionBeginning : function(section) {
		var sections = PullToRefresh.table.sections;
		if (sections.length > 0) {
			PullToRefresh.table.insertSectionBefore(0, section);
		} else {
			PullToRefresh.table.setData([section]);
		}
	},
	/**
	 *insertSectionFinal
	 * @param Ti.UI.TableViewSection section
	 */
	insertSectionFinal : function(section) {
		var sections = PullToRefresh.table.sections;
		if (sections.length > 0) {
			var index = sections.length - 1;
			PullToRefresh.table.insertSectionAfter(index, section);
		} else {
			PullToRefresh.table.setData([section]);
		}
	},
	/**
	 *
	 * @param {Object} e
	 */
	onScroll : function(e) {
		var triggerLoad;

		if (OS_ANDROID) {

			// last item shown
			triggerLoad = (PullToRefresh.position && e.firstVisibleItem >= PullToRefresh.position && e.totalItemCount <= (e.firstVisibleItem + e.visibleItemCount));

			// remember position
			PullToRefresh.position = e.firstVisibleItem;

		} else if (OS_IOS) {

			// last pixel shown
			triggerLoad = (PullToRefresh.position && e.contentOffset.y > PullToRefresh.position) && (e.contentOffset.y + e.size.height > e.contentSize.height);

			// remember position
			PullToRefresh.position = e.contentOffset.y;
		}

		// trigger
		if (triggerLoad) {
			$.trigger('scrolling');
			PullToRefresh.footerRefresh.fireEvent('scrolling'), {
				value : true
			};
		}
	},
	configureFooterScroll : function() {
		//add footer view
		PullToRefresh.footerRefresh = Widget.createController('footerRefresh').getView();
		Ti.UI.createTableView().setFooterView(PullToRefresh.footerRefresh);
		//add event listener to detect scroll
		PullToRefresh.table.addEventListener('scroll', PullToRefresh.onScroll);
	}
};
//public
exports.controller = $;
exports.setTable = PullToRefresh.setTable;
exports.insertSectionFinal = PullToRefresh.insertSectionFinal;
exports.insertSectionBeginning = PullToRefresh.insertSectionBeginning;
//initialize widget
PullToRefresh.initialize();

