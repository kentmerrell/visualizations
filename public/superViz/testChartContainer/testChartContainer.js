/**
 * Created by Kent on 9/24/2014.
 */
appCreateReport.directive('testChartContainer', function () {
    "use strict";
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'public/superViz/testChartContainer/test-chart-container.html',
        link: function (scope, el, attrs) {
            scope.propertyBag = {};
            scope.mywidth = attrs.width;
            scope.myheight = attrs.height;
            scope.ctdatatype = attrs.ctdatatype;
            scope.propertyBag.dimensionsSettings="height:"+scope.myheight+"px; width:"+scope.mywidth+"px;"

        }
    }
})



