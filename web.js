var express = require("express");
var logfmt = require("logfmt");
var ejs = require('ejs');

var app = express();

app.use(logfmt.requestLogger());
app.use('/public', express.static(__dirname + '/public'));

var PROJECT_CATEGORIES = require(__dirname + '/modules/json/json-project-categories.js');
var PROJECTS = require(__dirname + '/modules/json/json-projects.js');

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

app.get('/', function(req, res) {
	return res.redirect('/resume');
});

app.get('/index', function(req, res) {
	return res.redirect('/');
});

app.get('/home', function(req, res) {
	return res.redirect('/');
});

app.get('/contact', function(req, res) {
	return res.render('contact.ejs');
});

app.get('/contact/:channel', function(req, res) {
	//TODO should these just be static links?
	//TODO add more
	switch (req.params.channel) {
		case 'facebook': 	return res.redirect('https://www.facebook.com/bigpopakap');
		case 'twitter': 	return res.redirect('https://www.twitter.com/bigpopakap');
		default: 			return res.redirect('/contact');
	}
});

app.get('/resume', function(req, res) {
	//TODO
	return res.render('resume.ejs');
});

app.get('/projects/:categoryKey', function(req, res, next) {
	var category = PROJECT_CATEGORIES[req.params.categoryKey];
	if (!category) {
		return next();
	}
	
	return res.render('project-category.ejs', {
		category: category
	});
});

app.get('/project/:projectKey', function(req, res) {
	var project = PROJECTS[req.params.projectKey];
	if (!project) {
		return next();
	}
	
	return res.render('project-detail.ejs', {
		project: project
	});
});

app.get('/recruitme', function(req, res) {
	//TODO
	return res.render('recruitme.ejs');
});

// //TODO don't route in dev mode
// app.get('/killserver', function(req, res) {
// 	//TODO do this
// });

//TODO use an actual error page instead
app.get('*', function(req, res) {
	return res.send('<a href="/">NOT FOUND! Go back home</a>');
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
  console.log("Listening on " + port);
});