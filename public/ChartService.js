
appCreateReport.factory('chartservice', function ($compile, $rootScope) {
    var _chartInEdit={};
    var _clearthreaddatatypes=[
    "Address",
    "AlphaNumber",
    "Barcode",
    "Boolean",
    "Integer",
    "Date",
    "Geolocation",
    "Group",
    "Integer",
    "Measurement1D",
    "Measurement2D",
    "Measurement3D",
    "MultiChoice",
    "MultiLineText",
    "Number",
    "Percentage",
    "SingleChoice",
    "SingleLineText",
    "Title"
    ];
    var _clearthreadcharttypes=["PieChart","LineChart","BarChart"]
    var _getDefaultChartType = function (question) {
        return "LineChart";
    }
    

    return {
        buildChart: function (parentelement, question) {
            //$(parentelement).append(charttype);
            var newscope = $rootScope.$new(true);

            var chart1 = {};
            chart1.type = _getDefaultChartType(question);//"ColumnChart";
            chart1.cssStyle = "height:100%; background-color:white ";
            chart1.data = {
                "cols": [
                    { id: "month", label: "Month", type: "string" },
                    { id: "laptop-id", label: "Laptop", type: "number" },
                    { id: "desktop-id", label: "Desktop", type: "number" },
                    { id: "server-id", label: "Server", type: "number" },
                    { id: "cost-id", label: "Shipping", type: "number" }
                ], "rows": [
                    {
                        c: [
                           { v: "January" },
                           { v: 19, f: "42 items" },
                           { v: 12, f: "Ony 12 items" },
                           { v: 7, f: "7 servers" },
                           { v: 4 }
                        ]
                    },
                    {
                        c: [
                           { v: "February" },
                           { v: 13 },
                           { v: 1, f: "1 unit (Out of stock this month)" },
                           { v: 12 },
                           { v: 2 }
                        ]
                    },
                    {
                        c: [
                           { v: "March" },
                           { v: 24 },
                           { v: 0 },
                           { v: 11 },
                           { v: 6 }

                        ]
                    }
                ]
            };

            chart1.options = {
                //"title": "Sales per month",
                "isStacked": "false",
                legend: { position: "none" },
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit", "gridlines": { "count": 6 }
                },
                //"hAxis": {
                //    "title": false
                //}
            };

            chart1.formatters = {};
            chart1.redraw = true;
            newscope.chart = chart1;


            $(parentelement).append($compile("<div google-chart chart='chart' style='{{chart.cssStyle}}'></div>")(newscope));

            
        },
        chartInEdit:_chartInEdit
    }
})
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
