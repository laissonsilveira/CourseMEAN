exports.index = function(req, res) {
	res.render('index');
};

exports.list = function(req, res) {
	res.json({
		title: 'Gangues de Nova Iorque',
		director: 'Martin Scorsese',
		year: 2002
	});
};

exports.insert = function(req, res) {
	var movie = req.body;
	console.log(movie); //Print in server
	res.send('Movie ' + movie.title + 'received in server.'); // Send to print in console browser
};
