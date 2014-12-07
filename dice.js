var randomHelper = require('./randomHelper');

var rolls = [];

var roll = function(count) {
	if(!count) {
		count = 6;
	}
	var thisRoll = Math.floor(randomHelper() * count + 1);
	rolls.push(thisRoll);
	return thisRoll;
};

var rollHistory = function() {
	return rolls;
}

var clearHistory = function() {
	rolls = [];
}

module.exports = {
	roll: roll,
	rollHistory: rollHistory,
	clearHistory: clearHistory
};