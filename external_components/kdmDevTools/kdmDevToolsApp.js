/**
 * Created by Kent on 9/28/2014.
 */
var kdmDevToolsApp = angular.module('kdmDevTools', []);

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

kdmDevToolsApp.directive('kdmNavItem', function () {
    "use strict";

    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict: 'E',
        scope:{},
        replace:true,
        template: '<span style="color:red; position: relative; display: inline-block;margin-left:20px"><a href="{{pathandname}}">{{title}}</a></span>',
        link: function (scope, el, attrs) {
            scope.pathandname = baseurl +"/" +  attrs.pathandname;
            scope.description = attrs.description;
            scope.title=attrs.title;
        }
    }

})