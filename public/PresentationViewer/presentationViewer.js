appCreateReport.directive('presentationViwer', function (MetricMakerSrvc, layoutservice, $parse) {
    "use strict";
    return{
        restrict: 'E',
        templateUrl: 'public/presentationViewer/presentationViewer.html',
        scope: {},
        link: function (scope, el, attrs) {
            //scope.chartsInReport = layoutservice.allVisualizations();
            scope.chartsInReport = [
                {displayText: 'What is the max velocity of...', visualizationType: 'barchart'},
                {displayText: 'Another question.  Display as piechart...', visualizationType: 'piechart'},
                {displayText: 'Another question.  Display as linechart...', visualizationType: 'linechart'},
                {displayText: 'Another question.  Display as linechart...', visualizationType: 'termcloud'}
            ];
            scope.propertyBag = {};
            scope.propertyBag.userCanEdit = false;
            scope.SelectedChartIndex = 0;

            scope.$watch(
                function (scope) {
                    //console.log('Function watched',scope);
                    return scope.SelectedChartIndex;
                },
                function (selectedindex) {
                    if(selectedindex >= 0){
                    if(scope.chartsInReport[selectedindex]) {
                        scope.propertyBag.visualizationType = scope.chartsInReport[selectedindex].visualizationType;
                        scope.propertyBag.displayText = scope.chartsInReport[selectedindex].displayText;
                    }}
                }
            );

            scope.layoutservice = layoutservice;
            //scope.propertyBag = {}; //this should already be defined in parent scope


        }
    }
});