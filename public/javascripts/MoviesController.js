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

    var insertMovie = function() {
        $http.post('/insert', $scope.movie).success(function(res) {
            $scope.movies.push(res);
            $scope.movie = new Movie();
        });
    };

    var updateMovie = function() {
        $http.put('/movie', $scope.movie)
            .success(function() {
                $scope.movie = new Movie();
            });
    };

    $scope.sendMovie = function() {
        if($scope.movie._id) {
            updateMovie();
        } else {
            insertMovie();
        }
    };

    $scope.showMovieDetail = function(movie) {
        $scope.selectedMovie = movie;
    };

    $scope.hideMovieDetail = function(movie) {
        $scope.selectedMovie = null;
        $scope.movie = new Movie();
    };

    $scope.deleteMovie = function(movie) {
        $http.delete('/movie/' + movie._id).success(function(error, res) {
            $scope.selectedMovie = null;
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        });
    };

    $scope.editMovie = function(movie) {
        $scope.movie = movie;
    };
    
}