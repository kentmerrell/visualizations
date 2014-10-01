/**
 * Created by Kent on 9/30/2014.
 */
console.clear();

angular.module('demo', ['ngAnimate'])

    .controller('MainCtrl', function($scope) {

        $scope.items = [];

        $scope.push = function() {
            $scope.items.push(+new Date());
        };

        $scope.pop = function() {
            $scope.items.pop();
        };
    });