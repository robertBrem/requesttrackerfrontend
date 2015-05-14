'use strict';

var entriesApp = angular.module('myApp.home', ['ngRoute', 'configuration']);

entriesApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home/home.html',
        controller: 'RequestsCtrl'
    });
}]);

entriesApp.controller('RequestsCtrl', function ($scope, $http, REQUEST_URL) {

    $http.get(REQUEST_URL).then(function (response) {
        $scope.requests = response.data;
    });

    $scope.chartObject = {};

    $scope.secondRow = [
        {v: new Date(2314, 2, 16)},
        {v: 13},
        {v: 'Lalibertines'},
        {v: 'They are very tall'},
        {v: 25},
        {v: 'Gallantors'},
        {v: 'First Encounter'}
    ];


    $scope.chartObject.type = "AnnotationChart";

    $scope.chartObject.data = {};

    $scope.chartObject.data.cols = [
        {id: "month", label: "Month", type: "date"},
        {id: "kepler-data", label: "Kepler-22b mission", type: "number"},
        {id: "kepler-annot", label: "Kepler-22b Annotation Title", type: "string"},
        {id: "kepler-annot-body", label: "Kepler-22b Annotation Text", type: "string"},
        {id: "desktop-data", label: "Gliese mission", type: "number"},
        {id: "desktop-annot", label: "Gliese Annotation Title", type: "string"},
        {id: "desktop-annot-body", label: "Gliese Annotaioon Text", type: "string"}
    ];

    $scope.chartObject.data.rows = [
        {
            c: [
                {v: new Date(2314, 2, 15)},
                {v: 19},
                {v: 'Lalibertines'},
                {v: 'First encounter'},
                {v: 7},
                {v: undefined},
                {v: undefined}
            ]
        },
        {c: $scope.secondRow},
        {
            c: [
                {v: new Date(2314, 2, 17)},
                {v: 0},
                {v: 'Lalibertines'},
                {v: 'All crew lost'},
                {v: 28},
                {v: 'Gallantors'},
                {v: 'Omniscience achieved'}

            ]
        }
    ];

    $scope.chartObject.options = {
        displayAnnotations: true
    };

});