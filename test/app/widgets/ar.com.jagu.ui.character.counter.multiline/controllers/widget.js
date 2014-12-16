var CharacterCounterMultiLine = {
	TAG : 'ar.com.jagu.ui.character.counter.multiline',
	//Colors divider
	COLORS : {
		NORMAL : '#9E9E9E',
		FOCUS : '#2196F3',
		ERROR : '#F44336'
	},
	error : false,
	counter : 120,
	//parent tss
	args : arguments[0] || {},
	//initialize widget
	initialize : function() {

		_.extend($.widget, _.omit(CharacterCounterMultiLine.args, 'text', 'colors', 'counter'));

		//set properties on text
		if (OS_ANDROID) {
			_.extend($.text, CharacterCounterMultiLine.args.text);
		} else {
			_.extend($.text, _.omit(CharacterCounterMultiLine.args.text, 'hintText'));
			_.extend($.hintText, _.omit(CharacterCounterMultiLine.args.text, 'value', 'color'));

			$.hintText.text = CharacterCounterMultiLine.args.text.hintText || '';
		}
		//set colors
		if (CharacterCounterMultiLine.args.COLORS) {
			CharacterCounterMultiLine.COLORS = CharacterCounterMultiLine.args.COLORS;
		}
		//set counter
		if (CharacterCounterMultiLine.args.counter) {
			CharacterCounterMultiLine.counter = CharacterCounterMultiLine.args.counter;
		}

		//style
		$.divider.backgroundColor = CharacterCounterMultiLine.COLORS.NORMAL;
		$.counter.color = CharacterCounterMultiLine.COLORS.NORMAL;
		$.counter.text = 0 + '/' + CharacterCounterMultiLine.counter;

		CharacterCounterMultiLine.configureListeners();
		//gc
		CharacterCounterMultiLine.args = null;
	},
	configureListeners : function() {
		$.text.addEventListener('focus', CharacterCounterMultiLine.onFocus);
		$.text.addEventListener('blur', CharacterCounterMultiLine.onBlur);
		$.text.addEventListener('change', CharacterCounterMultiLine.onChange);
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
		CharacterCounterMultiLine.onChange({
			value : value
		});
	},
	/**
	 * set styles to state error
	 */
	onError : function() {
		CharacterCounterMultiLine.error = true;
		$.divider.backgroundColor = CharacterCounterMultiLine.COLORS.ERROR;
	},
	/**
	 * set styles to state focus
	 */
	onFocus : function() {
		if (!CharacterCounterMultiLine.error) {
			$.divider.backgroundColor = CharacterCounterMultiLine.COLORS.FOCUS;
			$.counter.color = CharacterCounterMultiLine.COLORS.FOCUS;
		}
	},
	/**
	 * set styles blur
	 */
	onBlur : function() {
		if (!CharacterCounterMultiLine.error) {
			$.divider.backgroundColor = CharacterCounterMultiLine.COLORS.NORMAL;
			$.counter.color = CharacterCounterMultiLine.COLORS.NORMAL;
		}
	},
	/**
	 * on change text
	 * @param {Object} e
	 */
	onChange : function(e) {
		var value = e.value;
		var length = value.length;
		if (value.length > CharacterCounterMultiLine.counter) {
			$.divider.backgroundColor = CharacterCounterMultiLine.COLORS.ERROR;
			$.counter.color = CharacterCounterMultiLine.COLORS.ERROR;
			CharacterCounterMultiLine.error = true;
		} else if (length > 0) {
			CharacterCounterMultiLine.error = false;
			$.divider.backgroundColor = CharacterCounterMultiLine.COLORS.FOCUS;
			$.counter.color = CharacterCounterMultiLine.COLORS.FOCUS;
		}

		$.counter.text = length + '/' + CharacterCounterMultiLine.counter;

		//simulate hintText on ios
		if (OS_IOS) {
			$.hintText.visible = (value.trim().length == 0);
		}
	},
	/**
	 * set counter number
	 */
	setCounter : function(counter) {
		CharacterCounterMultiLine.counter = counter;
	}
};

//public
exports.setValue = CharacterCounterMultiLine.setValue;
exports.getValue = CharacterCounterMultiLine.getValue;
exports.setCounter = CharacterCounterMultiLine.setCounter;

//initialize
CharacterCounterMultiLine.initialize();
