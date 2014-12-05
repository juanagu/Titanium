var Index = {
	//arguments
	args : arguments[0] || {},
	//initialize controller
	initialize : function() {

		$.index.open();
		var section = Ti.UI.createTableViewSection();
		for (var i = 0,
		    j = 50; i < j; i++) {
			section.add(Ti.UI.createTableViewRow({
				title : 'Row ' + i
			}));
		};

		$.table.setData([section]);

		Index.configureBottomBar();
		Index.configureActionBar();
	},
	configureBottomBar : function() {

		var general = {
			click : function() {
				alert('click :)');
			},
			backgroundColor : 'transparent',
			route : true
		};

		var email = {
			icon : {
				image : '/images/ic_action_email.png'
			},
			selected : true,
		};
		var data = {
			icon : {
				image : '/images/ic_action_data_usage.png'
			},
		};

		var camera = {
			icon : {
				image : '/images/ic_action_camera.png',
				height : '42dp',
				width : '42dp'
			},
			click : function() {
				alert('camera');
			},
			backgroundColor : '#F44336',
			route : false
		};

		var accounts = {
			icon : {
				image : '/images/ic_action_accounts.png'
			},
		};

		var picture = {
			icon : {
				image : '/images/ic_action_picture.png'
			},
		};

		_.extend(email, general);
		$.menu.addButton(email);
		_.extend(data, general);
		$.menu.addButton(data);
		$.menu.addButton(camera);
		_.extend(accounts, general);
		$.menu.addButton(accounts);
		_.extend(picture, general);
		$.menu.addButton(picture);

		$.menu.configureMenuDinamic($.table);
	},
	configureActionBar : function() {
		$.actionBar.actionIcon({
			items : [{
				icon : {
					image : '/images/ic_action_refresh.png'
				},
				click : function() {
					alert('click refresh');
				}
			}, {
				icon : {
					image : '/images/ic_action_accept.png'
				},
				click : function() {
					alert('click accept');
				}
			}]
		});
		$.actionBar.navIcon({
			icon : {
				image : '/images/ic_action_back.png'
			},
			click : function() {
				alert('click accept');
			}
		});
	}
};
Index.initialize();

