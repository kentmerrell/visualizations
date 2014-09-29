/**
 * Created by Kent on 9/24/2014.
 */
appCreateReport.directive('superViz',function(){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict:'E',
        templateUrl: baseurl+  '/visualizations/public/superViz/super-viz.html'
    }
})



