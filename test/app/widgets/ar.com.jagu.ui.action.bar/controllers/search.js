var Search = {
	TAG : 'ar.com.jagu.ui.action.bar.search',
	args : arguments[0] || {},
	initialize : function() {
		
		Search.configureListeners();
	},
	/**
	 * configure listeners
	 */
	configureListeners : function() {
		$.text.addEventListener('change', Search.onChangeHintText);
	},
	/**
	 * show loader and hide icon
	 */
	showLoader : function() {
		$.icon.visible = false;
		$.loader.show();
	},
	/**
	 * hide loader and show icon
	 */
	hideLoader : function() {
		$.icon.visible = true;
		$.loader.hide();
	},
	/**
	 * on change simulate hint text
	 * @param {Object} e
	 */
	onChangeHintText : function(e) {
		var value = e.value;
		var length = value.trim().length;
		$.hintText.visible = (length == 0);
	}
};
