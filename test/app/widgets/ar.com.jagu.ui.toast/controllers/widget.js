var Toast = {
	TAG : 'ar.com.jagu.ui.toast',
	args : arguments[0] || {},
	initialize : function() {
		var message = Toast.args.message || 'Toast! :D';

		if (OS_ANDROID) {
			var toast = Ti.UI.createNotification({
				message : message,
				duration : Toast.args.duration || Ti.UI.NOTIFICATION_DURATION_LONG
			});
			toast.show();
		} else {

			$.text.text = message;
			$.toast.open();
			setTimeout(function() {
				$.toast.close();
			}, Toast.args.duration || 1500);

		}
	},
};
Toast.initialize();
