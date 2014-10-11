appCreateReport.directive('svConfiguratorParent', function (svConfigSrvc) {
    "use strict";
    return{
        restrict: 'E',
        templateUrl: 'public/superViz/svConfigurator/svConfiguratorParent.html',
        link: function (scope, el, attrs) {
            scope.svConfigSrvc = svConfigSrvc;
        }
    }
})