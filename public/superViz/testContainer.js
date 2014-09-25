/**
 * Created by Kent on 9/24/2014.
 */
appCreateReport.directive('testContainer', function () {
    "use strict";
    return{
        restrict: 'E',
        scope: true,
        templateUrl:'testContainer.html',
        link: function (scope, el, attrs) {
            scope.mywidth = attrs.width;
            scope.myheight = attrs.height;
            scope.clearthreaddatatype=attrs.ctdatatype;
        }
    }
})



