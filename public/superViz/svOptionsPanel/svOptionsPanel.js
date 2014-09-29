/**
 * Created by kmerrell on 9/24/2014.
 */
appCreateReport.directive('svOptionsPanel',function(){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict:'E',
        templateUrl:baseurl + '/visualizations/public/superViz/svOptionsPanel/sv-options-panel.html'
    }
})