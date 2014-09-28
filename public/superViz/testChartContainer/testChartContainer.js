/**
 * Created by Kent on 9/24/2014.
 */
appCreateReport.directive('testChartContainer', function () {
    "use strict";
    return{
        restrict: 'E',
        scope: true,
        templateUrl:'http://localhost:63342/visualizations/public/superViz/testChartContainer/test-chart-container.html',
        link: function (scope, el, attrs) {
            scope.propertyBag={};
            scope.mywidth = attrs.width;
            scope.myheight = attrs.height;
            scope.propertyBag.clearthreaddatatype=attrs.ctdatatype;

        }
    }
})



