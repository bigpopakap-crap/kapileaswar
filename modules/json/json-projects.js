var assert = require('../util/assert.js');

var projects = {
	'some-proj-1' : {
		name: 'First project'
	},
	'some-proj-2' : {
		name: 'Second project'
	}
};

/*
 * add all key attributes and
 * convert all project id's to objects
 */
for (var key in projects) {
	assert.assert(!projects[key].key);
	projects[key].key = key;
}

module.exports = projects;