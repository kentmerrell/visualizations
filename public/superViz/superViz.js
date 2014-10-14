/**
 * Created by Kent on 9/24/2014.
 */
appCreateReport.directive('superViz', function (MetricMakerSrvc, svConfigSrvc) {

    return{
        restrict: 'E',
        templateUrl: 'public/superViz/super-viz.html',
        link: function (scope, el, attrs) {
            //scope.propertyBag = {}; //this should already be defined in parent scope
            scope.propertyBag.clearthreaddatatype = attrs.ctdatatype;

            //scope.displayText=scope.questionsel.Name;

            //text labels are not actually ctdatatypes.
            if (scope.propertyBag.clearthreaddatatype == 'text') {
                scope.propertyBag.visualizationType = 'text'
            }
            else {
                if(scope.propertyBag.userCanEdit) {
                    scope.propertyBag.visualizationType = MetricMakerSrvc.getDefaultVizualization(scope.propertyBag.clearthreaddatatype);
                }
            }
            scope.clickheader = function () {
                svConfigSrvc.VizInConfigType = scope.propertyBag.visualizationType;
            }
        }
    }
})


