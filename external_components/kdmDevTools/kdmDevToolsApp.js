/**
 * Created by Kent on 9/28/2014.
 */
var kdmDevToolsApp = angular.module('kdmDevTools', ['ngAnimate']);

kdmDevToolsApp.controller('kdmDevToolsController',function($scope,ClearThreadReportProjectSrvc){
    "use strict";
    $scope.ClearThreadReportProjectSrvc=ClearThreadReportProjectSrvc;
})
kdmDevToolsApp.directive('kdmNavigation', function () {
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict: "E",
        replace: false,
        templateUrl: baseurl + "/visualizations/external_components/kdmDevTools/kdm-navigation.html",
        link: function (scp, el, attrs) {
            scp.tocDocument = baseurl + "/visualizations/toc.html";
            scp.show = false;
            scp.linkeddoc = baseurl + "/visualizations/public/superViz/superVizTestDocumentation.html"
        }
    }
})

kdmDevToolsApp.factory('ClearThreadReportProjectSrvc',function(){
    "use strict";
    var _estimatedCompletionDate='11/15/2014';
    return{
        estimatedCompletionDate:_estimatedCompletionDate
    }
})

kdmDevToolsApp.directive('kdmDevToolProjectSrvc', function (ClearThreadReportProjectSrvc) {
    "use strict";

    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict: 'E',
        scope:{},
        replace:true,
        template: '<span>{{output}}</span>',
        link: function (scope, el, attrs) {
            scope.output= ClearThreadReportProjectSrvc.estimatedCompletionDate;
        }
    }
})

kdmDevToolsApp.directive('kdmNavItem', function () {
    "use strict";

    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict: 'E',
        scope:{},
        replace:true,
        templateUrl: baseurl + "/visualizations/external_components/kdmDevTools/kdm-nav-item.html",

        template: '',
        link: function (scope, el, attrs) {
            scope.pathandname = baseurl +"/" +  attrs.pathandname;
            scope.description = attrs.description;
            scope.title=attrs.title;
        }
    }
})