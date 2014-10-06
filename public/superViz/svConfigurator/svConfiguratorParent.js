appCreateReport.directive('svConfiguratorParent', function (svConfigSrvc) {
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict: 'E',
        templateUrl: baseurl + '/visualizations/public/superViz/svConfigurator/svConfiguratorParent.html',
        link: function (scope, el, attrs) {
            scope.svConfigSrvc = svConfigSrvc;
        }
    }
})