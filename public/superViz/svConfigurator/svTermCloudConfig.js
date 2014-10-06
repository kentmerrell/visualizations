
appCreateReport.directive('svTermCloudConfig',function(){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict:'E',
        templateUrl: baseurl+  '/visualizations/public/superViz/svConfigurator/svTermCloudConfig.html',
        link: function (scope, el, attrs) {

        }
    }
})