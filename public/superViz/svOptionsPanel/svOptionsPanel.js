/**
 * Created by kmerrell on 9/24/2014.
 */


/*--------------SV-OPTIONS-PANEL-------------------*/
appCreateReport.directive('svOptionsPanel',function(){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        restrict:'E',
        templateUrl:baseurl + '/visualizations/public/superViz/svOptionsPanel/sv-options-panel.html'
    }
})


/*--------------SV-OPTIONS-PANEL-TRIGGER-------------------*/
appCreateReport.directive('svOptionsPanelTrigger',function(){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;
    return{
        replace:true,
        //todo: It would be nice to allow multiple triggers, styled locally (ie, a custom span with a custom svOptionsPanel attribute attached) that just attached used the directive for the trigger behavior
        restrict:'A,E',
        templateUrl:baseurl + '/visualizations/public/superViz/svOptionsPanel/sv-options-panel-trigger.html'
    }
})