var Navigation = (function() {

	var TAG = 'Navigation library';

	var KEY_MENU = {
		FIRST : 'first',
		SECOND : 'second',
		FOURTH : 'fourth',
		FIVETH : 'fiveth'
	};

	var routes = defaultNavigation();
	var currentKey,
	    currentRoute,
	    currentView;
	var contentView;

	var fnBack = null;
	var firstTap,
	    secondTap;
	var DIFF_TAP_SECOND = 2;

	/*
	 * limpia las rutas almacenadas
	 */
	function clean(keyRoute) {

		var route = getRouteByKey(keyRoute);
		route = defaultNavigation().valueOf(keyRoute);

	}

	/**
	 *cleanAll
	 */
	function cleanAll() {
		routes = defaultNavigation();
	}

	function openController(e) {

		Ti.API.debug('openController, e ->' + JSON.stringify(e));
		var route = getRouteByKey(currentKey);

		currentRoute = route;
		var oController = newController(e._controller, e._params);
		var length = route.push(oController);
		showController(oController);

	}

	/**
	 *back
	 */
	function back(e) {

		var length = currentRoute.length;
		Ti.API.debug(TAG, 'back, length -> ' + JSON.stringify(length));

		if (length > 1) {

			currentRoute.pop();
			length = currentRoute.length;

			Ti.API.debug('routes', JSON.stringify(currentRoute));
			var controller = currentRoute[length - 1];

			Ti.API.debug('controller', JSON.stringify(controller));
			//merge params
			if (e && e.params) {
				_.extend(controller.params, e.params);
			}
			showController(controller);
		} else {
			dobleClickCloseApplication();
		}
	}

	/**
	 * create object controller
	 * @param {Object} _controller
	 * @param {Object} _params
	 */
	function newController(_controller, _params) {
		return {
			name : _controller,
			params : _params || {}
		};
	}

	/*
	 * show controller on centerView
	 */
	function showController(_controller) {

		Alloy.Globals.globalAbort();

		if (currentView) {
			contentView.remove(currentView);
			currentView = null;
		}
		addCurrentView(_controller);
	}

	function addCurrentView(_controller) {

		var currentController = Alloy.createController(_controller.name, _controller.params);
		currentView = currentController.getView();

		contentView.add(currentView);
	}

	/**
	 *dobleClickCloseApplication
	 */
	function dobleClickCloseApplication() {
		var alerts = require('utils/alerts');

		if (firstTap == null) {
			firstTap = new Date();

			var INTERVAL = (DIFF_TAP_SECOND / 2) * 1000;
			alerts.toastAlert(L('application_exit_message'), INTERVAL);

			setTimeout(function() {
				firstTap = null;
				secondTap = null;
			}, DIFF_TAP_SECOND * 1000);

		} else {

			secondTap = new Date();
			var diff = (secondTap - firstTap) / 1000;
			firstTap = new Date();
			Ti.API.info('diff is ' + diff);

			if (diff < DIFF_TAP_SECOND) {
				//Alloy.Globals.Window.close();
			}
		}
	}

	/**
	 *getKeyMenu
	 */
	function getKeyMenu() {
		return KEY_MENU;
	}

	/**
	 *getRouteByKey
	 * @param {Object} key
	 */
	function getRouteByKey(key) {

		switch(key) {
		case KEY_MENU.FIRST:
			return routes.first;
			break;
		case KEY_MENU.SECOND:
			return routes.second;
			break;
		case KEY_MENU.FOURTH:
			return routes.fourth;
			break;
		case KEY_MENU.FIVETH:
			return routes.fiveth;
			break;
		}
	}

	/**
	 *defaultNavigation
	 */
	function defaultNavigation() {

		var first = newController('form');
		var second = newController('form');
		var fourth = newController('form');
		var fiveth = newController('form');

		return {
			first : [first],
			second : [second],
			fourth : [fourth],
			fiveth : [fiveth]
		};
	}

	/**
	 *keyRoute
	 * @param {Object} keyRoute
	 */
	function openRoute(keyRoute) {

		var route = getRouteByKey(keyRoute);
		currentKey = keyRoute;
		if (currentRoute != route) {

			currentRoute = route;
			var index = route.length - 1;
			var controller = route[index];

			showController(controller);
		}
	}

	/**
	 *getCurrentKey
	 */
	function getCurrentKey() {
		return currentKey;
	}

	/**
	 *setContent
	 * @param {Ti.UI.VIEW} content
	 */
	function setContent(content) {
		contentView = content;
	}

	return {
		openController : openController,
		back : back,
		clean : clean,
		cleanAll : cleanAll,
		getKeyMenu : getKeyMenu,
		openRoute : openRoute,
		getCurrentKey : getCurrentKey,
		setContent : setContent
	};

})();

module.exports = Navigation;
