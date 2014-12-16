var args = arguments[0] || {};

var rows = [Ti.UI.createTableViewRow({
	title : 'Simple',
	className : 'simple',
	objName : 'simple'
}), Alloy.createController('tableviewrow_gallery').getView(), Ti.UI.createTableViewRow({
	title : 'Simple 2',
	className : 'simple',
	objName : 'simple'
}), Alloy.createController('tableviewrow', {
	image : 'http://www.codejobs.biz/www/lib/files/images/b312953ac30ff5d.png'
}).getView(), Alloy.createController('tableviewrow_gallery').getView(), Alloy.createController('tableviewrow_gallery').getView(), Alloy.createController('tableviewrow', {
	image : 'https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/Flurry_Google_Android_Market.png'
}).getView(), Ti.UI.createTableViewRow({
	title : 'Simple3',
	className : 'simple',
	objName : 'simple'
}), Ti.UI.createTableViewRow({
	title : 'Simple4',
	className : 'simple',
	objName : 'simple'
}), Alloy.createController('tableviewrow_gallery').getView()];

var section = Ti.UI.createTableViewSection();

for (var i = 0,
    j = rows.length; i < j; i++) {
	var row = rows[i];
	section.add(row);
};

$.table.setData([section]);

Alloy.Globals.BottomBar.dinamicBottomBar($.table);
