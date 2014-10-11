
appCreateReport.directive('presentationViwer', function (MetricMakerSrvc, layoutservice) {
    "use strict";
    return{
        restrict: 'E',
        templateUrl: '/public/presentationViewer/presentationViewer.html',
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