var express = require("express");
var logfmt = require("logfmt");

var urls = require(__dirname + '/modules/urls.js');

var app = express();

app.use(logfmt.requestLogger());
app.use(urls.pub(), express.static(__dirname + '/public'));

var PROJECT_CATEGORIES = require(__dirname + '/modules/data/project-categories.js');
var PROJECTS = require(__dirname + '/modules/data/projects.js');

/*
 * TODO use variables to replace all string constants used in this file
 */

//remove trailing slashes
app.get('*/', function(req, res, next) {
	var path = req.url;
	if (path.substring(path.length - 1) == '/' && path.length > 1) {
		return res.redirect(path.slice(0, -1));
	}
	else {
		return next();
	}
});

app.get(urls.base(), function(req, res) {
	return res.render('pages/home.jade');
});

app.get(urls.resume(), function(req, res) {
	//TODO
	return res.render('pages/resume.jade');
});

app.get(urls.contact(), function(req, res) {
	return res.render('pages/contact.jade');
});

app.get(urls.contact(':channel'), function(req, res) {
	//TODO should these just be static links?
	//TODO add more
	switch (req.params.channel) {
		case urls.contactChannels.facebook: 
			return res.redirect('https://www.facebook.com/bigpopakap');
		case urls.contactChannels.twitter:
			return res.redirect('https://www.twitter.com/bigpopakap');
		default:
			return res.redirect(urls.contact());
	}
});

app.get(urls.projectCategory(':categoryKey'), function(req, res, next) {
	var category = PROJECT_CATEGORIES[req.params.categoryKey];
	if (!category) {
		return next();
	}
	
	return res.render('pages/project-category.jade', {
		category: category
	});
});

app.get(urls.projectDetail(':projectKey'), function(req, res) {
	var project = PROJECTS[req.params.projectKey];
	if (!project) {
		return next();
	}
	
	return res.render('pages/project-detail.jade', {
		project: project
	});
});

app.get(urls.recruitme(), function(req, res) {
	//TODO
	return res.render('pages/recruitme.jade');
});

//TODO use an actual error page instead
app.get('*', function(req, res) {
	return res.send('<a href="/">NOT FOUND! Go back home</a>');
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
  console.log("Listening on " + port);
});