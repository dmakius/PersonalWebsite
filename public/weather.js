var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

//ROUTES
weatherApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'angularTemplates/main.html',
		controller: 'mainController'
	})
	.when('/forcast_f', {
		templateUrl: 'angularTemplates/forcast_f.html',
		controller: 'forcastController'
	})
	.when('/forcast_c', {
		templateUrl: 'angularTemplates/forcast_c.html',
		controller: 'forcastController'
	})
	.otherwise({
        redirectTo: '/'
     });
});

//SERVICES
weatherApp.service('mainService', function(){
	this.city = "";
});

//CONTROLLERS
weatherApp.controller("mainController",['$scope','$log','mainService', function($scope, $log, mainService){
	$scope.title = "Main";
	$scope.city = mainService.city;
	$scope.$watch('city', function(){
		mainService.city = $scope.city;
	});
}]);

weatherApp.controller("forcastController",['$scope', '$resource','mainService',function($scope ,$resource, mainService){
	$scope.title = "forcast";
	$scope.city = mainService.city;
	$scope.cnt = 7;
	$scope.forecast = [];

	$scope.addMap =function(){
		 var map = document.getElementById("google_map");
		 console.log(map);
		 map.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCVyMA5TUXJAmmklhlvK8kYv7n8FhNRPjE&q=" + mainService.city;
	}();
	
	$scope.weatherAppId = 'e1f50df08bce0b26b34b813be1c63de3';
	$scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily');
	$scope.weather = $scope.weatherAPI.get({appid:$scope.weatherAppId, q:$scope.city, mode:'json', cnt:7});


	$scope.$watch('weather', function(){
		$scope.forecast = $scope.weather
	});

	$scope.convertToFahrenheit = function(degK){
		return Math.round((1.8* (degK -273)) + 32);
	}
	
	$scope.convertToCelcius = function(degK){
		return Math.round((degK -273));
	}

	$scope.convertDate = function(ts){
		return new Date(ts *1000)
	}
}]);