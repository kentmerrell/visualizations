
appCreateReport.directive('presentationViwer', function (MetricMakerSrvc, layoutservice) {
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict: 'E',
        templateUrl: baseurl + '/visualizations/public/presentationViewer/presentationViewer.html',
        link: function (scope, el, attrs) {
            //scope.propertyBag = {}; //this should already be defined in parent scope
            scope.chartsInReport=['chart1','chart2'];

            scope.MoveToNext = function () {

            }

            scope.MoveToPrev = function () {

            }
        }
    }
})