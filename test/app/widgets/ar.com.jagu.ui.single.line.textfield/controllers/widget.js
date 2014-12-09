var SingleLineTextField = {
	TAG : 'ar.com.jagu.ui.single.line.textfield',
	//Colors divider
	COLORS : {
		NORMAL : '#9E9E9E',
		FOCUS : '#2196F3',
		ERROR : '#F44336'
	},
	error : false,
	//parent tss
	args : arguments[0] || {},
	//initialize widget
	initialize : function() {

		_.extend($.widget, _.omit(SingleLineTextField.args, 'text', 'colors'));
		_.extend($.text, SingleLineTextField.args.text);

		if (SingleLineTextField.args.COLORS) {
			SingleLineTextField.COLORS = SingleLineTextField.args.COLORS;
		}

		SingleLineTextField.onBlur();
		SingleLineTextField.configureListeners();
		//gc
		SingleLineTextField.args = null;
	},
	configureListeners : function() {
		$.text.addEventListener('focus', SingleLineTextField.onFocus);
		$.text.addEventListener('blur', SingleLineTextField.onBlur);
	},
	/**
	 * get value textfield
	 * @return String
	 */
	getValue : function() {
		return $.text.value;
	},
	/**
	 * set value textfield
	 * @param String value
	 */
	setValue : function(value) {
		$.text.value = value;
	},
	/**
	 * set styles to state error
	 */
	onError : function() {
		SingleLineTextField.error = true;
		$.divider.backgroundColor = SingleLineTextField.COLORS.ERROR;
	},
	/**
	 * set styles to state focus
	 */
	onFocus : function() {
		if (!SingleLineTextField.error) {
			$.divider.backgroundColor = SingleLineTextField.COLORS.FOCUS;
		}
	},
	/**
	 * set styles blur
	 */
	onBlur : function() {
		if (!SingleLineTextField.error) {
			$.divider.backgroundColor = SingleLineTextField.COLORS.NORMAL;
		}
	}
};

//public
exports.setValue = SingleLineTextField.setValue;
exports.getValue = SingleLineTextField.getValue;

//initialize
SingleLineTextField.initialize();
