//configure widgets
$.bgScroll.initialize();
$.sw.initialize();
$.bLabel.initialize({
	click : function() {
		alert('click button label');
	}
});
//ar.com.jagu.ui.button.icon set icon: index.tss
$.bIcon.initialize({
	click : function() {
		Alloy.createWidget('ar.com.jagu.ui.toast');
	}
});

$.image.remoteImage({
	image : 'http://www.codejobs.biz/www/lib/files/images/b312953ac30ff5d.png'
});

var rows = [{
	image : 'http://www.codejobs.biz/www/lib/files/images/b312953ac30ff5d.png'
}, {
	image : 'https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/Flurry_Google_Android_Market.png'
}, {
	image : 'http://pic0.mofang.com/2014/0515/20140515114039317.png'
}, {
	image : 'http://www.elandroidelibre.com/wp-content/uploads/2011/06/android-y-los-ni%C3%B1os.jpg'
}, {
	image : 'http://media.bestofmicro.com/D/L/255801/original/android-s1-sc.jpg'
}];
//test table
var section = Ti.UI.createTableViewSection();
for (var i = 0,
    j = rows.length; i < j; i++) {
	var row = Alloy.createController('tableviewrow', rows[i]).getView();
	section.add(row);
};

$.table.setData([section]);

Alloy.Globals.BottomBar.dinamicBottomBar($.scroll); 