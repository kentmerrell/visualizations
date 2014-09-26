/**
 * Created by Kent on 9/25/2014.
 */
appCreateReport.factor('MetricMakerSrvc',function(){
    "use strict";
    return{
        visualizationTypes:['linechart','verticalbarchart','horizontalbarchart','piechart','termcloud','map','text','image','donut'],
        legalVisualizations:[
            {ctdatatype:"address",legalvisualiations:["termcloud"]},
            {ctdatatype:"alphanumber",legalvisualiations:["termcloud"]},
            {ctdatatype:"barcode",legalvisualiations:["termcloud"]},
            {ctdatatype:"boolean",legalvisualiations:["horizontalbarchart","verticalbarchart","piechart","donut"]},
            {ctdatatype:"date",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"geolocation",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"group",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"integer",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"measurement1d",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"measurement2d",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"measurement3d",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"multichoice",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"multilinetext",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"number",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"percentage",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"singlechoice",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"singlelinetext",legalvisualiations:["linechart","piechart"]},
            {ctdatatype:"title",legalvisualiations:["linechart","piechart"]}
        ]
    }
})

