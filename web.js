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
	return res.send('contact me!');
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
	return res.send('here\'s my resume!');
});

app.get('/projects/tech', function(req, res) {
	//TODO
	return res.send('here are my tech projects!');
});

app.get('/projects/art', function(req, res) {
	//TODO
	return res.send('here are my artsy projects!');
});

app.get('/project/:projectId', function(req, res) {
	//TODO
	return res.send('here is the detail page for project ' + req.params.projectId);
});

app.get('/recruitme', function(req, res) {
	//TODO
	return res.send('congrats, you found the special URL!');
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