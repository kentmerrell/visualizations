var appCreateReport = angular.module('AppCreateReport', ['ngDragDrop', 'textAngular', 'googlechart', 'ui.bootstrap', 'ngResource','ngAnimate', 'kdmDevTools']);

//configurations to enable cors
//appCreateReport.config(['$httpProvider', function ($httpProvider) {
//    $.support.cors = true;
//    $httpProvider.defaults.useXDomain = true;
//    delete $httpProvider.defaults.headers.common['X-Requested-With'];
//}]);
//

appCreateReport.config(['$provide', function($provide){
    // this demonstrates how to register a new tool and add it to the default toolbar
    $provide.decorator('taOptions', ['$delegate', function(taOptions){
        // $delegate is the taOptions we are decorating
        // here we override the default toolbars and classes specified in taOptions.
        taOptions.toolbar = [

            ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft','justifyCenter','justifyRight'],
            ['html', 'insertImage', 'insertLink', 'unlink']
        ];
        taOptions.classes = {
            focussed: 'focussed',
            toolbar: 'btn-toolbar',
            toolbarGroup: 'btn-group',
            toolbarButton: 'btn btn-default',
            toolbarButtonActive: 'active',
            disabled: 'disabled',
            textEditor: 'form-control',
            htmlEditor: 'form-control'
        };
        return taOptions; // whatever you return will be the taOptions
    }]);

}]);

appCreateReport.controller('CreateReportCtrl', function ($scope, layoutservice, ReportDataService,chartService) {

    $scope.spots = layoutservice.allSpots;
    $scope.reportdataservice = ReportDataService;
    $scope.allQuestions = ReportDataService.getAllQuestions;// questionservice.allquestions;
    $scope.$watch(
        function () {
            return ReportDataService.surveyTemplateId;
        }, function (dta) {
            console.log(arguments);
            $scope.allQuestions = ReportDataService.getAllQuestions(ReportDataService.surveyTemplateId);
            //console.log($scope.allQuestions);
        });
    $scope.chartsvc = chartService;
    $scope.questionfiltertest = function (item) {
        if (item.qtext.toLowerCase().indexOf($scope.questionFilter.toLowerCase()) > -1)
            return true;
    };
});






appCreateReport.directive("textlabel", function () {
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





appCreateReport.directive("paneloptions", function (layoutservice, $rootScope) {
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
});



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

var ExpansionSet = function (originatorRow, originatorCol, terminalRow, terminalCol) {
    _originatorRow = originatorRow;
    _originatorCol = originatorCol;
    _terminalRow = terminalRow;
    _terminalCol = terminalCol;

    return {
        originatorRow: _originatorRow,
        originatorCol: _originatorCol,
        terminalRow: _terminalRow,
        terminalCol: _terminalCol
    }
};

var Spot = function (row, col) {
    _col = col;
    _row = row;
    _rowspan = 1; //should always be 1 unless this is exapansionsetoriginator
    _colspan = 1; //should always be 1 unless this is exapansionsetoriginator

    return {
        col: _col,
        row: _row,
        rowspan: _rowspan,
        colspan: _colspan
    }
};