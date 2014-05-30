var assert = require('assert');
var urlUtil = require('../url-util.js');
var projects = require('./projects.js');

var categories = {
	tech: {
		name: 'Tech projects',
		projects: [
		    'clay-animals'
		]
	}
};

/*
 * add all key attributes, assert that they
 * agree, and make sure all project references exist
 */
for (var ckey in categories) {
	var category = categories[ckey];
	
	assert(!category.key);
	urlUtil.assertValidUrlPath(ckey);
	category.key = ckey;
	
	for (var pi in category.projects) {
		var pkey = category.projects[pi];
		
		var project = projects[pkey];
		assert(project, "category " + ckey + "'s project key " + pkey + " doesn't reference any projects");
	}
}
	
module.exports = categories;