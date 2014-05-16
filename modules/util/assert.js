var DEFAULT_MESSAGE = "Assertion failed.";

function assert(condition, message) {
	message = message || DEFAULT_MESSAGE;
	if (!condition) throw message;
}
exports.assert = assert;

function assertEquals(actual, expected, message, equals) {
	message = message ||
			  (DEFAULT_MESSAGE + ' Expected ' + expected + ', but was ' + actual);
	
	equals = equals || function (a, b) {
		return a === b;
	}
	
	return assert(equals(actual, expected), message);
}
exports.assertEquals = assertEquals;