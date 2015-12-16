function MoviesController($http, $scope) {
    $http.get('/list').success(function (res) {
        console.log("Success!");
        $scope.movie = res;
    }).error(function(r) {
        console.log("Error!")
    });

    $http.post('/insert', {
		title: 'Gangues de Nova Iorque',
		director: 'Martin Scorsese',
		year: 2002
	}).success(function(res) {
    	console.log(res); //Print in console browser
    });
}