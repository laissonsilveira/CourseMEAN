var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean');

var movieSchema = new mongoose.Schema({
	title: {
		type: String, 
		required: true
	}, 
	director: {
		type: String, 
		required: true
	}, 
	year: {
		type: String
	}
});

var movie = mongoose.model('movies', movieSchema);
module.exports = movie;