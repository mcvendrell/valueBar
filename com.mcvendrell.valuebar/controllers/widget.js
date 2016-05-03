var args = arguments[0] || {};

// Custom properties that can/should be set in the TSS of the view where you're putting the value bar
var width = args.width || '80%',
	title = args.title || "",
    titleAlign = args.titleAlign || "center",
	valueColor = args.valueColor || "#018FD1",
	backgroundColor = args.backgroundColor || "#BBB",
    barHeight = args.barHeight || '20dp',
    titleFont = args.titleFont || (OS_IOS ? {
		fontFamily: 'Avenir-Light',
		fontSize: 17
	} : {
		fontSize: '17dp'
	}),
    // User wants to show values inside the valueBar?
    showValuesInside = args.showValuesInside || true,
	valueText = args.valueText || "",
	valueTextColor = args.valueTextColor || "#FFF",
    valueTextFont = args.valueTextFont || (OS_IOS ? {
		fontFamily: 'Avenir-Light',
		fontSize: 12
	} : {
		fontSize: '12dp'
	});

// Internal value for holding total
var g_total = 100;

// Transforms values into percentages
function valToPct(value) {
    return String(parseInt(100 * value / g_total)) + "%";
}

// Initializes the widget
exports.init = function(value, total) {
    // Set config
    $.wrapper.width = width;
    $.title.text = title;
    $.title.textAlign = titleAlign;
    $.valueWrapper.backgroundColor = backgroundColor;
    $.valueWrapper.height = barHeight;
    $.value.backgroundColor = valueColor;
    $.value.font = titleFont;
    // Set global total
    g_total = total;
    // Set value
    exports.setVal(value);
};

// Defines a new total
exports.setTotal = function(total) {
    g_total = total;
};

// Defines the % of bar to fill
exports.setVal = function(value) {
    if (showValuesInside) {
        $.valueText.color = valueTextColor;
        $.valueText.font = valueTextFont;

        if (valueText === '') {
            // Set, automatically, value/total and %
            $.valueText.text = value + "/" + g_total + " (" + valToPct(value) + ")";
        } else {
            // Set user text
            $.valueText.text = valueText;
        }
    }
    // Set value
    $.value.width = valToPct(value);
};

// Defines a new valueText (useful to update valueText after the initial value)
exports.setValueText = function(text) {
    valueText = text;
};
