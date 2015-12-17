function MoviesController($http, $scope) {
    $http.get('/list').success(function (res) {
        $scope.movies = res.movies;
    }).error(function(r) {
        console.log("Error! : " + r)
    });

    function Movie() {
        this.title = '';
        this.director = '';
        this.year = '';
    }

    $scope.movie = new Movie();

    $scope.insertMovie = function() {
        $http.post('/insert', $scope.movie).success(function(res) {
            $scope.movies.push(res);
            $scope.movie = new Movie();
        });
    }

    $scope.showMovieDetail = function(movie) {
        $scope.selectedMovie = movie;
    }

    $scope.hideMovieDetail = function(movie) {
        $scope.selectedMovie = null;
    }

    $scope.deleteMovie = function(movie) {
        $http.delete('/movie/' + movie._id).success(function(error, res) {
            $scope.selectedMovie = null;
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        });
    }
    
}