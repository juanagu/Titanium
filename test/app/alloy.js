// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.globalAbort = function() {
	if (Alloy.Globals.GeneralHttp) {
		for (var i = 0,
		    j = Alloy.Globals.GeneralHttp.length; i < j; i++) {
			var xhr = Alloy.Globals.GeneralHttp[i];
			if (xhr.active) {
				xhr.active = false;
				xhr.abort();
			}
		};
		Alloy.Globals.GeneralHttp = [];
	}
};
