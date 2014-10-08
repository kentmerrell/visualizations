/**
 * Created by kmerrell on 10/3/2014.
 */

appCreateReport.directive('svText',function(){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict:'E',
        templateUrl: baseurl+  '/visualizations/public/superViz/Visualizers/sv-text.html'
    }
})

