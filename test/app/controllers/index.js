$.index.open();
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
		alert('click button icon');
	}
});
