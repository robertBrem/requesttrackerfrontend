'use strict';

var myApp = angular.module('myApp', [
    'ngRoute',
    'configuration',
    'myApp.home'
]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]);
