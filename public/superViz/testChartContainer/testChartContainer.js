/**
 * Created by Kent on 9/24/2014.
 */
appCreateReport.directive('testChartContainer', function () {
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict: 'E',
        scope: true,
        templateUrl: baseurl + '/visualizations/public/superViz/testChartContainer/test-chart-container.html',
        link: function (scope, el, attrs) {

            scope.mywidth = attrs.width;
            scope.myheight = attrs.height;
            scope.ctdatatype = attrs.ctdatatype;

        }
    }
})



