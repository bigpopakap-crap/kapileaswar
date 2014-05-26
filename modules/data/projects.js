var assert = require('assert');
var urlUtil = require('../url-util.js');

var projects = {
	'some-proj-1' : {
		name: 'First project'
	},
	'some-proj-2' : {
		name: 'Second project'
	}
};

/*
 * add all key attributes
 */
for (var key in projects) {
	assert(!projects[key].key);
	urlUtil.assertValidUrlPath(key);
	projects[key].key = key;
}

module.exports = projects;