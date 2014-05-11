var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

//remove trailing slashes
app.use(function(req, res, next) {
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

app.get('/home', function(req, res) {
	return res.redirect('/resume');
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

app.get('/projects/tech', function(req, res) {
	//TODO
	return res.render('tech.ejs');
});

app.get('/projects/art', function(req, res) {
	//TODO
	return res.render('art.ejs');
});

app.get('/project/:projectId', function(req, res) {
	//TODO
	return res.render('project-detail.ejs', {
		project: {
			id: req.params.projectId
		}
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

//CATCH ALL: all other paths redirect to the base path
app.get('*', function(req, res) {
	return res.redirect('/');
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
  console.log("Listening on " + port);
});