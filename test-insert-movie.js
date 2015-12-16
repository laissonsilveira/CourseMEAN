var Movies = require('./models/movies');

var movies = new Movies({
    title: 'Peaceful Warrior',
    director: 'Victor Salva', 
    year: '2006'
});

movies.save(function(erro, movies) {
	if (erro) console.log('Erro ocurred... ' + erro);

	console.log('Movie successfully saved! : ' + movies);
});