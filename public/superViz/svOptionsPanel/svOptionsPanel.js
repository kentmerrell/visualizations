/**
 * Created by kmerrell on 9/24/2014.
 */


/*--------------SV-OPTIONS-PANEL-------------------*/
appCreateReport.directive('svOptionsPanel',function(MetricMakerSrvc,svConfigSrvc){
    "use strict";
    var baseurl = window.location.protocol + "//" + window.location.host;

    return{
        restrict:'E',
        templateUrl:baseurl + '/visualizations/public/superViz/svOptionsPanel/sv-options-panel.html',
        link:function(scope,el,attrs){
            //todo: getdefaultmetric dynamically based on clearthreaddatatype
            var defaultmetric = "CountOfValues";
            if(scope.propertyBag.clearthreaddatatype=="address"||scope.propertyBag.clearthreaddatatype=="geolocation")
            {
                defaultmetric = "ListOfLocations";
            }
            if(scope.propertyBag.clearthreaddatatype=="complex"
                ||scope.propertyBag.clearthreaddatatype=="configurable"
                ||scope.propertyBag.clearthreaddatatype=="group"
                ||scope.propertyBag.clearthreaddatatype=="measurement1d"
                ||scope.propertyBag.clearthreaddatatype=="measurement2d"
                ||scope.propertyBag.clearthreaddatatype=="measurement3d"
                ||scope.propertyBag.clearthreaddatatype=="pole"
                )
            {
                defaultmetric = "unknown";
            }

            scope.propertyBag.buttonSet=MetricMakerSrvc.getbuttonset(defaultmetric);

            scope.clickme=function(buttonname,cmd){
                if(cmd=="changeVisualizationType"){
                    scope.propertyBag.visualizationType=buttonname;
                    svConfigSrvc.VizInConfigType=scope.propertyBag.visualizationType;
                }
                if(cmd=="configureFilter") {
                    alert('Filter');
                }
                if(cmd=="excelExport"){
                    alert('export to excel');
                }
                scope.propertyBag.panelExpanded=false;
            };

        }
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