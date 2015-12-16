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
            console.log(res); //Print in console browser
        });
    }
    
}