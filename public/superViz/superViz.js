/**
 * Created by Kent on 9/24/2014.
 */
appCreateReport.directive('superViz',function(MetricMakerSrvc){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict:'E',
        templateUrl: baseurl+  '/visualizations/public/superViz/super-viz.html',
        link:function(scope,el,attrs){
            scope.propertyBag = {};
            scope.propertyBag.clearthreaddatatype=attrs.ctdatatype;
            scope.propertyBag.visualizationType=MetricMakerSrvc.getDefaultVizualization( scope.propertyBag.clearthreaddatatype);

        }
    }
})



appCreateReport.directive('svLineChart',function(){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict:'E',
        templateUrl: baseurl+  '/visualizations/public/superViz/visualizers/svLineChart.html'
    }
})