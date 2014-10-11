/*---------------------- QUESTION-SELECTOR DIRECTIVE ---------------------
 *   Each question in the survey shows up as a question-selector directive.
 *   question-selector directives are dragged and dropped on spot-container directives.
 *                                                                           */


appCreateReport.directive('questionSelector', function (layoutservice) {

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
        }
    }
})