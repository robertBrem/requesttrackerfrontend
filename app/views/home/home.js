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
    $scope.chartObject.type = "AnnotationChart";
    $scope.chartObject.data = {};
    $scope.chartObject.data.rows = [];
    $scope.chartObject.data.cols = [];

    $scope.chartObject.options = {
        displayAnnotations: true
    };

    $http.get(REQUEST_URL).then(function (response) {
            var requests = response.data;

            var classNames = [];
            for (var propertyName in requests) {
                var requestsPerHour = requests[propertyName];

                for (var i = 0; i < requestsPerHour.length; i++) {
                    var request = requestsPerHour[i];
                    var className = request.className;


                    var notFound = true;
                    for (var j = 0; j < classNames.length; j++) {
                        if (classNames[j].name == className) {
                            classNames[j].count = classNames[j].count + 1;
                            notFound = false;
                        }
                    }
                    if (notFound) {
                        var classNameObj = {};
                        classNameObj.name = className;
                        classNameObj.count = 1;
                        classNames.push(classNameObj);
                    }
                }
            }

            var dateCol = {id: "date", label: "Datum", type: "date"};
            $scope.chartObject.data.cols.push(dateCol);
            for (var i = 0; i < classNames.length; i++) {
                var classNameCol = {id: classNames[i].name + "-data", label: classNames[i].name, type: "number"};
                $scope.chartObject.data.cols.push(classNameCol);
            }

            for (var callTime in requests) {
                var arrayObj = [];
                var dateObj = {v: new Date(callTime)};
                arrayObj.push(dateObj);

                var requestsPerHour = requests[callTime];

                var correspondingHits = [];
                for (var i = 0; i < requestsPerHour.length; i++) {
                    var request = requestsPerHour[i];

                    var correspondingHit = correspondingHits[request.className];
                    if (correspondingHit) {
                        correspondingHit.v = correspondingHit.v + 1;
                    } else {
                        correspondingHits[request.className] = {v: 1};
                    }
                }

                for (var i = 0; i < $scope.chartObject.data.cols.length; i++) {
                    var currentCol = $scope.chartObject.data.cols[i];
                    var colClassName = currentCol.label;

                    if (colClassName != "Datum") {
                        var hitsPerClassName = correspondingHits[colClassName];
                        if (hitsPerClassName) {
                            arrayObj.push(hitsPerClassName);
                        } else {
                            arrayObj.push({v: 0});
                        }
                    }
                }

                var entry = {
                    c: arrayObj
                };

                $scope.chartObject.data.rows.push(entry);
            }
        }
    );

});