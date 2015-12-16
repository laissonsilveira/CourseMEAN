var Movie = require('../models/movies');

exports.index = function(req, res) {
	res.render('index');
};

exports.list = function(req, res) {
	Movie.find({}, function(err, movies) {
		if (err) return console.log(err);

		res.json({movies: movies});
	});
};

exports.insert = function(req, res) {
	var movie = new Movie(req.body);
	movie.save(function(err, movie) {
		if (err) return console.log(err); //Print in server
		res.send('Movie ' + movie.title + ' received in server. Saved successfully!'); // Send to print in console browser
	});
};
