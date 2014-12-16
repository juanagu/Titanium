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

		//set properties to text
		_.extend($.widget, _.omit(SingleLineTextField.args, 'text', 'colors'));

		if (OS_ANDROID) {
			_.extend($.text, SingleLineTextField.args.text);
		} else {

			_.extend($.text, _.omit(SingleLineTextField.args.text, 'hintText'));
			_.extend($.hintText, _.omit(SingleLineTextField.args.text, 'value', 'color'));

			$.hintText.text = SingleLineTextField.args.text.hintText || '';
		}

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
		if (OS_IOS) {
			$.text.addEventListener('change', SingleLineTextField.onChangeIos);
		}
		
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
		if (OS_IOS) {
			SingleLineTextField.onChangeIos({
				value : value
			});
		}
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
	},
	/**
	 * simulate hintText
	 * @param {Object} e
	 */
	onChangeIos : function(e) {
		var value = e.value;
		$.hintText.visible = (value.trim().length == 0);
	}
};

//public
exports.setValue = SingleLineTextField.setValue;
exports.getValue = SingleLineTextField.getValue;

//initialize
SingleLineTextField.initialize();
