var args = arguments[0] || {};
Ti.API.debug('tableviewrow', 'args -> ' + JSON.stringify(args));
$.image.remoteImage({
	image : args.image
});
