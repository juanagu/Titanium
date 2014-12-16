var CharacterCounterTextField = {
	TAG : 'ar.com.jagu.ui.character.counter.textfield',
	//Colors divider
	COLORS : {
		NORMAL : '#9E9E9E',
		FOCUS : '#2196F3',
		ERROR : '#F44336'
	},
	error : false,
	counter : 40,
	//parent tss
	args : arguments[0] || {},
	//initialize widget
	initialize : function() {

		_.extend($.widget, _.omit(CharacterCounterTextField.args, 'text', 'colors', 'counter'));

		//set properties on text
		if (OS_ANDROID) {
			_.extend($.text, CharacterCounterTextField.args.text);
		} else {
			_.extend($.text, _.omit(CharacterCounterTextField.args.text, 'hintText'));
			_.extend($.hintText, _.omit(CharacterCounterTextField.args.text, 'value', 'color'));

			$.hintText.text = CharacterCounterTextField.args.text.hintText || '';
		}

		//set colors
		if (CharacterCounterTextField.args.COLORS) {
			CharacterCounterTextField.COLORS = CharacterCounterTextField.args.COLORS;
		}

		//set counter
		if (CharacterCounterTextField.args.counter) {
			CharacterCounterTextField.counter = CharacterCounterTextField.args.counter;
		}

		//style
		$.divider.backgroundColor = CharacterCounterTextField.COLORS.NORMAL;
		$.counter.color = CharacterCounterTextField.COLORS.NORMAL;
		$.counter.text = 0 + '/' + CharacterCounterTextField.counter;

		CharacterCounterTextField.configureListeners();
		//gc
		CharacterCounterTextField.args = null;
	},
	configureListeners : function() {
		$.text.addEventListener('focus', CharacterCounterTextField.onFocus);
		$.text.addEventListener('blur', CharacterCounterTextField.onBlur);
		$.text.addEventListener('change', CharacterCounterTextField.onChange);

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
		CharacterCounterTextField.onChange({
			value : value
		});
	},
	/**
	 * set styles to state error
	 */
	onError : function() {
		CharacterCounterTextField.error = true;
		$.divider.backgroundColor = CharacterCounterTextField.COLORS.ERROR;
	},
	/**
	 * set styles to state focus
	 */
	onFocus : function() {
		if (!CharacterCounterTextField.error) {
			$.divider.backgroundColor = CharacterCounterTextField.COLORS.FOCUS;
			$.counter.color = CharacterCounterTextField.COLORS.FOCUS;
		}
	},
	/**
	 * set styles blur
	 */
	onBlur : function() {
		if (!CharacterCounterTextField.error) {
			$.divider.backgroundColor = CharacterCounterTextField.COLORS.NORMAL;
			$.counter.color = CharacterCounterTextField.COLORS.NORMAL;
		}
	},
	/**
	 * on change text
	 * @param {Object} e
	 */
	onChange : function(e) {

		var value = e.value;
		var length = value.length;

		if (value.length > CharacterCounterTextField.counter) {
			$.divider.backgroundColor = CharacterCounterTextField.COLORS.ERROR;
			$.counter.color = CharacterCounterTextField.COLORS.ERROR;
			CharacterCounterTextField.error = true;
		} else {
			CharacterCounterTextField.error = false;
			$.divider.backgroundColor = CharacterCounterTextField.COLORS.FOCUS;
			$.counter.color = CharacterCounterTextField.COLORS.FOCUS;
		}

		$.counter.text = length + '/' + CharacterCounterTextField.counter;

		//simulate hintText on ios
		if (OS_IOS) {
			$.hintText.visible = (value.trim().length == 0);
		}

	},
	/**
	 * set counter number
	 */
	setCounter : function(counter) {
		CharacterCounterTextField.counter = counter;
	}
};

//public
exports.setValue = CharacterCounterTextField.setValue;
exports.getValue = CharacterCounterTextField.getValue;
exports.setCounter = CharacterCounterTextField.setCounter;

//initialize
CharacterCounterTextField.initialize();
