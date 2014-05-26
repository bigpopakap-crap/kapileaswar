var assert = require('assert');
var urlUtil = require('../url-util.js');

var channels = {
	facebook: {
		url: 'https://www.facebook.com/bigpopakap',
		icon: undefined //TODO
	},
	
	twitter: {
		url: 'https://www.twitter.com/bigpopakap',
		icon: undefined //TODO
	},
	
	linkedin: {
		url: 'https://www.linkedin.com/in/kapileaswar',
		icon: undefined //TODO
	}
}

/*
 * add all key attributes
 */
for (var key in channels) {
	assert(!channels[key].key);
	urlUtil.assertValidUrlPath(key);
	channels[key].key = key;
}

module.exports = channels;