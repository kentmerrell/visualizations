/**
 * Created by Kent on 9/18/2014.
 */
var customizationsApp = angular.module('customizationsApp',[]);

customizationsApp.directive('testhost',function(){
    "use strict";
    return{
        restrict:'E',
        template:'<span></span>'
    }
})