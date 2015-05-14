'use strict';

var myApp = angular.module('myApp', [
    'ngRoute',
    'configuration',
    'googlechart',
    'myApp.home'
]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/home'});
}]);

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};