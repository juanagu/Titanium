var args = arguments[0] || {};

var view1 = Ti.UI.createView({
	backgroundColor : '#123'
});
var view2 = Ti.UI.createView({
	backgroundColor : '#246'
});
var view3 = Ti.UI.createView({
	backgroundColor : '#48b'
});

var view4 = Ti.UI.createView({
	backgroundColor : 'orange'
});

var view5 = Ti.UI.createView({
	backgroundColor : 'yellow'
});

var views = [view1, view2, view3, view4, view5];

var random = Math.floor(Math.random() * (5 - 0 + 1)) + 0;

for (var i = 0,
    j =
    random; i < j; i++) {
	$.scrollableView.addView(views[i]);
};

