
appCreateReport.directive('spot', function (layoutservice, $compile, $rootScope,chartService) {
    var baseurl = window.location.protocol + "//" + window.location.host;

    return {
        restrict: "E",
        replace: true,
        scope: {
            rownumber: '@',
            columnnumber: '@'
        },
        templateUrl: baseurl + '/visualizations/public/layout/spot.html',
        link: function (scp, elem, attrs) {
            scp.$watch(
                function () {
                    return layoutservice.getspot(scp.rownumber, scp.columnnumber)
                },
                function (spt) {
                    if(spt){
                    scp.rowspan = spt.rowspan;
                    scp.colspan = spt.colspan;
                    scp.overwritten = spt.overwritten;
                    scp.isHighlighted = spt.isHighlighted;
                    //if overwritten, disable drop events
                    if (scp.overwritten) {
                        scp.jquuidroppable = {}
                    }
                    else {
                        scp.jquuidroppable = { onDrop: "dropquestionselectorhere()" }
                    }}
                    else{
                        console.log ('spt is undefined',spt)
                    }
                },
                true);
            scp.jquuidroppable = { onDrop: "dropquestionselectorhere()" }
            scp.jqyouioptions = {
                accept: '.questionselector, .chartcontainer', revert: true
            };



            scp.mousedownstartselecting = function () {
                if (layoutservice.layoutmode) {
                    layoutservice.selectingmode = true;
                    layoutservice.startselecting(scp.rownumber, scp.columnnumber)
                }
            }

            scp.mouseupstopselecting = function () {
                if (layoutservice.layoutmode) {
                    layoutservice.stopselecting(scp.rownumber, scp.columnnumber)
                    layoutservice.selectingmode = false;
                }
            }

            scp.mouseenterwhileselecting = function () {
                if ((layoutservice.layoutmode == true) && (layoutservice.selectingmode == true)) {
                    layoutservice.buildselection(scp.rownumber, scp.columnnumber)
                }
            }

            scp.clickonspot = function () {
                //provide a way to un-highlight any highlighted chart(s)
                $('.chartcontainer').removeClass('highlighted');
                chartService.chartInEdit = {};
                if (layoutservice.layoutmode) {
                    layoutservice.deleteexpansionset(scp.rownumber, scp.columnnumber)
                }
            }

            scp.dropquestionselectorhere = function (a, b) {
                //A Spot can accept a drag from .questionselector or a .chartcontainer
                console.log('spot dropquestionselectorhere', a, b, scp.rownumber, scp.columnnumber, scp, layoutservice.questionInDrag, layoutservice.sourceChartContainer())

                var originator = "questionselector"
                if (arguments[1].draggable.hasClass("chartcontainer")) {
                    originator = "chartcontainer"
                }
                //if this spot is in an expansionset AND is not the first cell then disregard (this method is called by the expansionsetoriginator's spanned panel area AND the underlying spot that is hidden)
                if (layoutservice.spotIsTheOriginatoryInAnExpansionset(scp.rownumber, scp.columnnumber)) {
                    if (originator == "questionselector") {
                        var newscope = $rootScope.$new(true);
                        newscope.questionsel = angular.copy(layoutservice.questionInDrag);
                        newscope.spot = angular.copy(layoutservice.getspot(scp.rownumber, scp.columnnumber))
                        newscope.rowspan = scp.rowspan;
                        newscope.colspan = scp.colspan;
                        if (newscope.questionsel.qtext == "Text Panel") {
                            el.append($compile("<textlabel questionsel='questionsel'></textlabel>")(newscope));
                        }
                        else {
                            layoutservice.instanciateChartContainer(layoutservice.questionInDrag.defaultChartType, elem, newscope);
                        }
                    }
                    if (originator == "chartcontainer") {
                        var thischartcontainer = elem.find('.chartcontainer');
                        // if thischartcontainer is an empty object, then move the chart to this location
                        if (thischartcontainer.length == 0) {
                            layoutservice.moveChartToLocation(layoutservice.sourceChartContainer(), elem.find('.panelarea1'));

                        }
                        else {
                            //if thischartcontainer is an actual object, swap locations.
                            layoutservice.swapChartContainers(layoutservice.sourceChartContainer(), thischartcontainer)
                        }
                        $(thischartcontainer).css('z-index', '1');
                        //layoutservice.sourceChartContainer().remove();
                    }
                }
                return false;
            };

        }
    }
})
