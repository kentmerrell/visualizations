/**
 * Created by Kent on 9/25/2014.
 */
appCreateReport.factory('MetricMakerSrvc', function () {
        "use strict";

        return{
            visualizationTypes: ['linechart', 'barchart', 'piechart', 'termcloud', 'map', 'text', 'image'],

            preMadeMetrics: [
                {name: 'ListOfLocations', validVisualizations: ["map", "termcloud"], description: 'Simple list of the locations (address or geolocation) for all instances of a template. Format is {seriesname:"somename",["value"]}' },
                {name: 'ListOfResponses', validVisualizations: ["termcloud"], description: 'Simple list of the values of a single question for all instances of a template. Format is {seriesname:"somename",["value"]}' },
                {name: 'CountOfValues', validVisualizations: ["linechart", "barchart", "piechart", "termcloud", "map", "text", "image"], description: 'The number of times each value occurs within all instances of a template (count aggragate). Format is {seriesname:"somename",[{value:"somevalue",count:"somecount"}]}'}
            ],

            defaultVisualizations: [
                {ctdatatype: "address", defaultmetric: "ListOfLocations", defaultvisualization: "map", enumvalue: "16"},
                {ctdatatype: "alphanumber", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "15"},
                {ctdatatype: "barcode", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "11"},
                {ctdatatype: "boolean", defaultmetric: "CountOfValues", defaultvisualization: "barchart", enumvalue: "8"},
                {ctdatatype: "date", defaultmetric: "CountOfValues", defaultvisualization: "linechart", enumvalue: "6"},
                {ctdatatype: "geolocation", defaultmetric: "ListOfLocations", defaultvisualization: "map", enumvalue: "13"},
                {ctdatatype: "group", defaultmetric: "CountOfValues", defaultvisualization: "", enumvalue: "12"},
                {ctdatatype: "integer", defaultmetric: "CountOfValues", defaultvisualization: "barchart", enumvalue: "4"},
                {ctdatatype: "measurement1d", defaultmetric: "CountOfValues", defaultvisualization: "", enumvalue: "17"},
                {ctdatatype: "measurement2d", defaultmetric: "CountOfValues", defaultvisualization: "", enumvalue: "18"},
                {ctdatatype: "measurement3d", defaultmetric: "CountOfValues", defaultvisualization: "", enumvalue: "19"},
                {ctdatatype: "multichoice", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "10"},
                {ctdatatype: "multilinetext", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "2"},
                {ctdatatype: "number", defaultmetric: "CountOfValues", defaultvisualization: "barchart", enumvalue: "3"},
                {ctdatatype: "percentage", defaultmetric: "CountOfValues", defaultvisualization: "barchart", enumvalue: "14"},
                {ctdatatype: "singlechoice", defaultmetric: "CountOfValues", defaultvisualization: "barchart", enumvalue: "9"},
                {ctdatatype: "singlelinetext", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "1"},
                {ctdatatype: "title", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "7"},
                {ctdatatype: "complex", defaultmetric: "CountOfValues", defaultvisualization: "", enumvalue: "0"},
                {ctdatatype: "currency", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "5"},
                {ctdatatype: "configurable", defaultmetric: "CountOfValues", defaultvisualization: "", enumvalue: "20"},
                {ctdatatype: "email", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "21"},
                {ctdatatype: "phone", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "22"},
                {ctdatatype: "pole", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "24"},
                {ctdatatype: "rating", defaultmetric: "CountOfValues", defaultvisualization: "piechart", enumvalue: "25"},
                {ctdatatype: "fullname", defaultmetric: "CountOfValues", defaultvisualization: "termcloud", enumvalue: "26"}
            ],

            getDefaultVizualization: function (ctdatatype) {
                if (ctdatatype) {
                    return _.where(this.defaultVisualizations, {ctdatatype: ctdatatype})[0].defaultvisualization;
                }
            },

            getbuttonsetFromDataType: function (ctdatatype) {
                if (
                    ctdatatype == "geolocation" ||
                    ctdatatype == "address"
                    ) {
                    return [
                        {name: "map", icon: "placeholder8", command: "changeVisualizationType"},
                        {name: "filter", icon: "filter16", command: "configureFilter"},
                        {name: "excelExport", icon: "excel2", command: "excelExport"}
                    ];
                }

                if (
                    ctdatatype == "text"
                    ) {
                    return [

                    ];
                }

                if (
                    ctdatatype == "currency" ||
                    ctdatatype == "date"
                    ) {
                    return [
                        {name: "linechart", icon: "maths", command: "changeVisualizationType"},
                        {name: "barchart", icon: "growing", command: "changeVisualizationType"},
                        {name: "filter", icon: "filter16", command: "configureFilter"},
                        {name: "excelExport", icon: "excel2", command: "excelExport"}
                    ];
                }

                if (
                    ctdatatype == "boolean" ||
                    ctdatatype == "multichoice" ||
                    ctdatatype == "number" ||
                    ctdatatype == "percentage" ||
                    ctdatatype == "rating"
                    ) {
                    return [
                        {name: "piechart", icon: "graph7", command: "changeVisualizationType"},
                        {name: "barchart", icon: "growing", command: "changeVisualizationType"},
                        {name: "filter", icon: "filter16", command: "configureFilter"},
                        {name: "excelExport", icon: "excel2", command: "excelExport"}
                    ]
                }

                if (
                    ctdatatype == "alphanumber" ||
                    ctdatatype == "barcode" ||
                    ctdatatype == "email" ||
                    ctdatatype == "group" ||
                    ctdatatype == "phone" ||
                    ctdatatype == "multilinetext" ||
                    ctdatatype == "fullname" ||
                    ctdatatype == "pole" ||
                    ctdatatype == "singlelinetext"
                    ) {
                    return [
                        {name: "termcloud", icon: "fog17", command: "changeVisualizationType"},
                        {name: "filter", icon: "filter16", command: "configureFilter"},
                        {name: "excelExport", icon: "excel2", command: "excelExport"}
                    ]
                }
                return [
                    {name: "linechart", icon: "maths", command: "changeVisualizationType"},
                    {name: "barchart", icon: "growing", command: "changeVisualizationType"},
                    {name: "piechart", icon: "graph7", command: "changeVisualizationType"},
                    {name: "termcloud", icon: "fog17", command: "changeVisualizationType"},
                    {name: "filter", icon: "filter16", command: "configureFilter"},
                    {name: "excelExport", icon: "excel2", command: "excelExport"}
                ]

            },

            getbuttonset: function (defaultmetric) {
                if (defaultmetric == "ListOfLocations") {
                    return [
                        {name: "termcloud", icon: "fog17", command: "changeVisualizationType"},
                        {name: "map", icon: "placeholder8", command: "changeVisualizationType"},
                        {name: "filter", icon: "filter16", command: "configureFilter"},
                        {name: "excelExport", icon: "excel2", command: "excelExport"}
                    ]
                }
                ;

                if (defaultmetric == "unknown") {
                    return [
                        {name: "filter", icon: "filter16", command: "configureFilter"},
                        {name: "excelExport", icon: "excel2", command: "excelExport"}
                    ]
                }
                ;

                return [
                    {name: "linechart", icon: "maths", command: "changeVisualizationType"},
                    {name: "barchart", icon: "growing", command: "changeVisualizationType"},
                    {name: "piechart", icon: "graph7", command: "changeVisualizationType"},
                    {name: "termcloud", icon: "fog17", command: "changeVisualizationType"},
                    {name: "filter", icon: "filter16", command: "configureFilter"},
                    {name: "excelExport", icon: "excel2", command: "excelExport"}
                ]
            }
        }
    }
)
;

