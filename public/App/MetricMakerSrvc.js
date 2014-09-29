/**
 * Created by Kent on 9/25/2014.
 */
appCreateReport.factory('MetricMakerSrvc',function(){
    "use strict";
    return{
        visualizationTypes:['linechart','verticalbarchart','horizontalbarchart','piechart','termcloud','map','text','image','donut'],

        preMadeMetrics:[
            {name:'ListOfLocations',validVisualizations:["map","termcloud"],  description:'Simple list of the locations (address or geolocation) for all instances of a template. Format is {seriesname:"somename",["value"]}' },
            {name:'ListOfResponses',validVisualizations:["termcloud"],  description:'Simple list of the values of a single question for all instances of a template. Format is {seriesname:"somename",["value"]}' },
            {name:'CountOfValues',validVisualizations:["linechart","verticalbarchart","horizontalbarchart","piechart","termcloud","map","text","image","donut"],description:'The number of times each value occurs within all instances of a template (count aggragate). Format is {seriesname:"somename",[{value:"somevalue",count:"somecount"}]}'}
        ],

        defaultVisualizations:[
            {ctdatatype:"address", defaultmetric:"ListOfLocations", defaultvisualization:"map"},
            {ctdatatype:"alphanumber", defaultmetric:"CountOfValues", defaultvisualization:"termcloud"},
            {ctdatatype:"barcode", defaultmetric:"CountOfValues", defaultvisualization:"termcloud"},
            {ctdatatype:"boolean", defaultmetric:"CountOfValues", defaultvisualization:"horizontalbarchart"},
            {ctdatatype:"date", defaultmetric:"CountOfValues", defaultvisualization:"linechart"},
            {ctdatatype:"geolocation", defaultmetric:"ListOfLocations", defaultvisualization:"map"},
            {ctdatatype:"group", defaultmetric:"CountOfValues", defaultvisualization:""},
            {ctdatatype:"integer", defaultmetric:"CountOfValues", defaultvisualization:"horizontalbarchart"},
            {ctdatatype:"measurement1d", defaultmetric:"CountOfValues", defaultvisualization:""},
            {ctdatatype:"measurement2d", defaultmetric:"CountOfValues", defaultvisualization:""},
            {ctdatatype:"measurement3d", defaultmetric:"CountOfValues", defaultvisualization:""},
            {ctdatatype:"multichoice", defaultmetric:"CountOfValues", defaultvisualization:"termcloud"},
            {ctdatatype:"multilinetext", defaultmetric:"CountOfValues", defaultvisualization:"termcloud"},
            {ctdatatype:"number", defaultmetric:"CountOfValues", defaultvisualization:"horizontalbarchart"},
            {ctdatatype:"percentage", defaultmetric:"CountOfValues", defaultvisualization:"horizontalbarchart"},
            {ctdatatype:"singlechoice", defaultmetric:"CountOfValues", defaultvisualization:"horizontalbarchart"},
            {ctdatatype:"singlelinetext", defaultmetric:"CountOfValues", defaultvisualization:"termcloud"},
            {ctdatatype:"title", defaultmetric:"CountOfValues", defaultvisualization:"termcloud"}
        ]
    }
});