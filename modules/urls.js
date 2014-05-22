function urlHelper(base, arg) {
	if (!arg) {
		arg = '';
	}
	else {
		arg = '/' + arg;
	}
	return base + arg;
}

function base() {
	return urlHelper('/');
}
exports.base = base;

function pub(path) {
	return urlHelper('/public', path);
}
exports.pub = pub;

function resume() {
	return urlHelper('/resume');
}
exports.resume = resume;

var contactChannels = {
	facebook: 'facebook',
	twitter: 'twitter'
}
exports.contactChannels = contactChannels;

function contact(channel) {
	return urlHelper('/contact', channel);
}
exports.contact = contact;

function projectCategory(catkey) {
	return urlHelper('/projects', catkey);
}
exports.projectCategory = projectCategory;

function projectDetail(projkey) {
	return urlHelper('/project', projkey);
}
exports.projectDetail = projectDetail;

function recruitme() {
	return urlHelper('/recruitme');
}
exports.recruitme = recruitme;

function notfound() {
	return urlHelper('/notfound/404');
}
exports.notfound = notfound;