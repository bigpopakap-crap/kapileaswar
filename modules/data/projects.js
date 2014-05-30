var assert = require('assert');
var urlUtil = require('../url-util.js');

var projects = {
	'clay-animals' : {
		name: 'Clay animals',
		description: {
			short: 'Clay models I made a few months ago',
			long: 'These are some clay models I made. It was really ' +
				  'really really really really really really really ' +
				  'really really really really really really really ' +
				  'really really really really really really really ' +
				  'really really really really really really really ' +
				  'really really really really really really really ' +
				  'really really really really really really really ' +
				  'really really really really really really really ' +
				  'really really really really really really really ' +
				  'really really really really really really really ' +
				  'fun to make them'
		},
		images: [
		    new Image('https://lh3.googleusercontent.com/-24xeN2HClEQ/U4eEhmlal3I/AAAAAAAA2UE/7BtMDJX1gKs/s553-no/91d0e086-a10f-4548-b4f4-b1f71423f01f', {
		    	alt: 'This is an unrelated pic of me on a bench!'
		    }),
		    new Image('https://lh6.googleusercontent.com/-EHAyIGCxFoM/T5uLxh2XSHI/AAAAAAAAsUg/KNSvI4ayEsk/s256-no/12', {
		    	alt: 'This is mah faaaaaacccee!'
		    })
		]
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