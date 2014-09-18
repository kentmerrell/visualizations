var app = angular.module('createReport', ['ngDragDrop', 'textAngular', 'googlechart', 'ui.bootstrap', 'ngResource']);

app.config(['$httpProvider', function ($httpProvider) {
    $.support.cors = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.controller('MainCtrl', function ($scope, layoutservice, ReportDataService, chartservice) {

    $scope.spots = layoutservice.allSpots;
    $scope.reportdataservice = ReportDataService;
    //$scope.allQuestions = ReportDataService.getAllQuestions;// questionservice.allquestions;
    $scope.$watch(
        function(){
            return ReportDataService.surveyTemplateId;
        }, function (dta) {
            console.log(arguments);
            $scope.allQuestions = ReportDataService.getAllQuestions(ReportDataService.surveyTemplateId);
            console.log($scope.allQuestions);
        });
    $scope.chartsvc = chartservice;
    $scope.questionfiltertest = function (item) {
        if (item.qtext.toLowerCase().indexOf($scope.questionFilter.toLowerCase()) > -1)
            return true;
    };
});




app.directive('questionSelector', function (layoutservice) {
    return {
        restrict: "E",
        replace: true,
        scope: { question: "=" },
        templateUrl: "questionSelector.html",
        link: function (scp, el, attrs) {
            console.log("questionSelector.question", scp.question, scp);
            scp.jqoptions = { revert: 'invalid' };

            scp.startdragging = function () {
                console.log('scp.startdragging', arguments, scp.question)
                angular.copy(scp.question, layoutservice.questionInDrag)
            }
        }
    }
})




var ExpansionSet = function (originatorRow, originatorCol, terminalRow, terminalCol) {
    _originatorRow = originatorRow;
    _originatorCol = originatorCol;
    _terminalRow = terminalRow;
    _terminalCol = terminalCol;;
    return {
        originatorRow: _originatorRow,
        originatorCol: _originatorCol,
        terminalRow: _terminalRow,
        terminalCol: _terminalCol
    }
}


var Spot = function (row, col) {
    _col = col;
    _row = row;
    _rowspan = 1; //should always be 1 unless this is exapansionsetoriginator
    _colspan = 1; //should always be 1 unless this is exapansionsetoriginator

    return {
        col: _col,
        row: _row,
        rowspan: _rowspan,
        colspan: _colspan,
    }
}


app.directive('spotContainer', function ($compile, $rootScope, layoutservice) {
    return {
        restrict: "E",
        scope: {
            y: '=y'
        },
        templateUrl: "SpotContainer.html",
        link: function (scp, el, attrs) {
            console.log("rows", parseInt(attrs.rows), 'columns', parseInt(attrs.columns))
            scp.rows = 0;
            scp.columns = parseInt(attrs.columns);

            scp.$watch(function () {
                return layoutservice.layoutmode
            }, function (val) {
                scp.layoutmode = val;
            })
            //let layoutservice know how many columns to expect (for layoutindicator logic)
            layoutservice.registercolumncount(scp.columns);
            scp.addRow = function () {
                scp.rows++;
                //add a spot for each column 
                var row = $("<span/>").addClass("row");
                for (var colnum = 1; colnum <= parseInt(attrs.columns) ; colnum++) {
                    var newscope = $rootScope.$new(true);
                    //newscope.rownumber=scp.rows;
                    var newspot = $compile("<spot rownumber='" + scp.rows + "' columnnumber='" + colnum + "'></spot>")(scp);
                    layoutservice.registerspot(scp.rows, colnum);
                    row.append(newspot);
                }
                el.find('.ChildrenArea').append(row);
                //console.log(layoutservice.getallspots());
            }

            for (var j = 1; j <= parseInt(attrs.rows) ; j++) {
                scp.addRow();

            }


            scp.togglelayoutmode = function () {

                layoutservice.layoutmode = !layoutservice.layoutmode; // !layoutservice.layoutmode;
            }
        }
    }
})


app.directive('spot', function (layoutservice, $compile, $rootScope,chartservice) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            rownumber: '@',
            columnnumber: '@'
        },
        templateUrl: 'spot.html',
        link: function (scp, elem, attrs) {
            scp.$watch(
                function () {
                    return layoutservice.getspot(scp.rownumber, scp.columnnumber)
                },
                function (spt) {
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
                chartservice.chartInEdit = {};
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



app.directive("textlabel", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            spot: "=",
            questionsel: "="
        },
        templateUrl: "textlabel.html",
        link: function (scp, el, attr) {
            //
            console.log('textlabel scope', scp)
            scp.deleteme = function () {
                el.remove();
            }
        }
    }
})

app.directive("chartcontainer", function (layoutservice, chartservice) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            spot: "=hostspot",
            questionsel: "="
        },
        templateUrl: "chartcontainer.html",
        link: function (scp, el, attr) {
            el.attr("Id", guid());
            var defaultCharttype = scp.questionsel.defaultChartType;
            var chartData = scp.questionsel.data;
            var payloadparent = $(el).find('.payload');

            //append a chart to the payloadparent element
            chartservice.buildChart(payloadparent, scp.questionsel);

            console.log('chartcontainer scope', scp, scp.questionsel.qtext, 'spot', scp.spot)

            scp.startdragging = function () {

                el.addClass('currentlydragging')

                console.log('chartcontainer scp.startdragging', arguments, scp, el)
                angular.copy(scp.questionsel, layoutservice.questionInDrag)

            }

            scp.stopdragging = function () {
                console.log('scp.stopdragging called in chartcontainer', 'arguments', arguments, 'scope', scp)
                el.removeClass('currentlydragging')
            }
            scp.deleteme = function () {
                el.remove();
                angular.copy({}, chartservice.chartInEdit)
            }
            scp.editchart = function () {
                //remove highlighted from any ChartContainers that have it.
                $('.chartcontainer').removeClass('highlighted');
                el.addClass("highlighted")
                chartservice.chartInEdit = $(el).find('.payload').find('.ng-scope').scope().chart;// angular.copy($(el).find('.payload').find('.ng-scope').scope().chart)
                console.log('chartservice.chartInEdit', chartservice.chartInEdit);//.children[0].scope().node

            }
        }
    }
})


var guid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }
    return 'q' + s4() + s4() + s4();
};

var getrandom = function () {
    var min = 10;
    var max = 100;
    // and the formula is:
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}

app.directive("paneloptions", function (layoutservice, $rootScope) {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "paneloptions.html",
        link: function (scp, el, attr) {
            //
            scp.ClickChartType = function (type) {
                console.log('clicked ', type, scp)
                var newscope = $rootScope.$new(true);
                newscope.questionsel = angular.copy(scp.questionsel);
                layoutservice.instanciateChartContainer(type, el, newscope)//layoutservice.questionInDrag.defaultChartType, el, newscope

            }
        }
    }
})



app.directive('chartjs', ['$filter',
  function ($filter) {
      return {
          restrict: "E",
          replace: true,
          transclude: true,
          scope: {
              data: '=data',
              options: '=options',
              width: "=width",
              height: "=height",
              responsive: "@"
          },
          template: '<canvas></canvas>',
          link: function ($scope, element, attr /*, ctrl */) {
              var ctx = element[0].getContext('2d');
              $scope.references = {
                  parent: {
                      obj: $(element[0]).parent()[0],
                      width: $(element[0]).parent()[0].clientWidth,
                      height: $(element[0]).parent()[0].clientHeight
                  },
                  self: {
                      width: $scope.width,
                      height: $scope.height
                  }
              };

              //black magic :)
              if ($scope.width === "100%") {
                  $scope.width = $scope.references.parent.width;
                  $scope.references.self.width = $scope.width;
                  $scope.$watch("references.parent.obj.clientWidth", function (newValue, old) {
                      if (newValue != old)
                          $scope.width = (newValue * $scope.references.self.width) / $scope.references.parent.width;
                  })
              }


              $scope.generate = function () {
                  $scope.instance = eval('new Chart(ctx).' + attr.isType + '($scope.data,$scope.options)');
              }

              $scope.$watch('width', function (newValue, oldValue) {
                  element[0].width = newValue;
                  $scope.generate()
              });

              $scope.$watch('height', function (newValue, oldValue) {
                  element[0].height = newValue;
                  $scope.generate();
              });

              $scope.$watch('data', function (newValue, oldValue) {
                  $scope.generate();
              }, true);
          }
      }
  }
]);

