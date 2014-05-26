var assert = require('assert');

/**
 * Asserts that the URL path has no whitespace,
 * and is all lowercase
 * 
 * (tries to enforce that URL paths look like:
 * 	/some-example-url-path)
 */
function assertValidUrlPath(path) {
	assert.strictEqual(path, path.toLowerCase(), 'path "' + path + '" should be all lowercase');
	assert(!(/\s/g.test(path)), 'path "' + path + '" should not contain whitespace');
}
exports.assertValidUrlPath = assertValidUrlPath;