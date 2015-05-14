'use strict';

var entriesApp = angular.module('myApp.home', ['ngRoute', 'configuration']);

entriesApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home/home.html',
        controller: 'RequestsCtrl'
    });
}]);

entriesApp.controller('RequestsCtrl', function ($scope, $http, REQUEST_URL) {

    $scope.chartObject = {};
    $scope.chartObject.data = {};
    $scope.chartObject.data.rows = [];

    $scope.endpoints = [];

    $http.get(REQUEST_URL).then(function (response) {
        var requests = response.data;
        for (var propertyName in requests) {
            var requestsPerHour = requests[propertyName];

            for (var i = 0; i < requestsPerHour.length; i++) {
                var request = requestsPerHour[i];
                var className = request.className;
                if (!$scope.endpoints.contains(className)) {
                    $scope.endpoints.push(className);
                }
            }

            var entry = {
                c: [
                    {v: new Date(propertyName)},
                    {v: requestsPerHour.length}
                ]
            };
            $scope.chartObject.data.rows.push(entry);
        }
    });


    $scope.chartObject.type = "AnnotationChart";

    $scope.chartObject.data.cols = [
        {id: "date", label: "Date", type: "date"},
        {id: "hits-data", label: "Hits", type: "number"}
    ];

    $scope.chartObject.options = {
        displayAnnotations: false
    };

});