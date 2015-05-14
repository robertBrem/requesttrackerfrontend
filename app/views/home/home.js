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

    function logArrayElements(element, index, array) {
        var entry = {
            c: [
                {v: new Date(element.callTime)},
                {v: 2}
            ]
        };
        $scope.chartObject.data.rows.push(entry);
    }

    $http.get(REQUEST_URL).then(function (response) {
        var requests = response.data;
        requests.forEach(logArrayElements);
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