var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// angular.module('weatherApp').run(['$compile', '$rootScope', '$document', function($compile, $rootScope, $document) {
//    return $document.on('page:load', function() {
//       var body, compiled;
//       body = angular.element('body');
//       compiled = $compile(body.html())($rootScope);
//       return body.html(compiled);
//    });
// }]);
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
	$scope.forecast = [];
	
	$scope.weatherAppId = 'e1f50df08bce0b26b34b813be1c63de3';
	$scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast');
	$scope.weather = $scope.weatherAPI.get({appid:$scope.weatherAppId, q:$scope.city});

	$scope.$watch('weather', function(){
		$scope.forecast = $scope.weather
	});
	//console.log($scope.weather);

	$scope.convetToFahrenheit = function(degK){
		return Math.round((1.8* (degK -273)) + 32);
	}
	
	$scope.convetToCelcius = function(degK){
		return Math.round((degK -273));
	}

	$scope.convertDate = function(ts){
		return new Date(ts *1000)
	}
}]);