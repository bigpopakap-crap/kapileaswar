var projects = require('./json-projects.js');

module.exports = {
	tech: {
		key: 'tech',
		name: 'Tech projects',
		projects: [
		    projects['some-proj-1'],
		    projects['some-proj-2']
		]
	}
};