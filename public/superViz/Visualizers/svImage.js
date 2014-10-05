/**
 * Created by kmerrell on 10/3/2014.
 */

appCreateReport.directive('svImage', function () {
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict: 'E',
        scope: true,
        templateUrl: baseurl + '/visualizations/public/superViz/Visualizers/sv-image.html',
        link:function(scope,el,attrs){

        }
    }
})