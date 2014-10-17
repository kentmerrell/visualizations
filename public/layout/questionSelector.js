/*---------------------- QUESTION-SELECTOR DIRECTIVE ---------------------
 *   Each question in the survey shows up as a question-selector directive.
 *   question-selector directives are dragged and dropped on spot-container directives.
 *                                                                           */


appCreateReport.directive('questionSelector', function (layoutservice,$rootScope) {

    return {
        restrict: "E",
        replace: true,
        scope: { question: "=" },
        templateUrl: 'public/layout/questionSelector.html',
        link: function (scp, el, attrs) {
            // console.log("questionSelector.question", scp.question, scp);
            scp.jqoptions = { revert: 'invalid' };

            scp.startdragging = function () {
                console.log('scp.startdragging', arguments, scp.question)
                angular.copy(scp.question, layoutservice.questionInDrag)
            }

            scp.addVisualization=function(){
                var newscope = $rootScope.$new(true);
                newscope.questionsel = scp.question;
                var spot = layoutservice.openSpots()[0];
//                newscope.rowspan = scp.rowspan;
//                newscope.colspan = scp.colspan;
                if (newscope.questionsel.qtext == "Text Panel") {
                   // el.append($compile("<textlabel questionsel='questionsel'></textlabel>")(newscope));
                }
                else {
                    layoutservice.instanciateChartContainerInNextAvailableSpot( spot, newscope);
                }

                //layoutservice.instanciateChartContainerInNextAvailableSpot(scp.question);

            }


        }
    }
})