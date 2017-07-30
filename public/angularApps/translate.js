angular.module("translator", [])
.controller("trnsController",function($http, $scope){
    $scope.transTo="es";
    var app = this;

    app.sendToAPI = function(input){
      var key ="trnsl.1.1.20170329T050632Z.750000a4f772eb56.f0e4b9018a16a51edd44edb6107ddc04869cc9c0";
      var baseURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=";

      //GET request to Yandex API
      $http.get(baseURL + key + "&lang=en-"+ $scope.transTo + "&text="+input)
      .then(function(response){
          $scope.output = response.data.text[0];
        });
      }
});
