/**
 * Created by kmerrell on 10/6/2014.
 */
appCreateReport.directive("chartcontainer", function (layoutservice, chartService) {
    var baseurl = window.location.protocol + "//" + window.location.host;

    return {
        restrict: "E",
        replace: true,
        scope: {
            spot: "=hostspot",
            questionsel: "="
        },
        templateUrl:  baseurl + '/visualizations/public/layout/chartcontainer.html',
        link: function (scp, el, attr) {
            el.attr("Id", guid());
            var defaultCharttype = scp.questionsel.defaultChartType;
            var chartData = scp.questionsel.data;
            var payloadparent = $(el).find('.payload');

            //append a chart to the payloadparent element
            chartService.buildChart(payloadparent, scp.questionsel);

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
                angular.copy({}, chartService.chartInEdit)
            }
            scp.editchart = function () {
                //remove highlighted from any ChartContainers that have it.
                $('.chartcontainer').removeClass('highlighted');
                el.addClass("highlighted")
                chartService.chartInEdit = $(el).find('.payload').find('.ng-scope').scope().chart;// angular.copy($(el).find('.payload').find('.ng-scope').scope().chart)
                console.log('chartservice.chartInEdit', chartService.chartInEdit);//.children[0].scope().node

            }
        }
    }
})