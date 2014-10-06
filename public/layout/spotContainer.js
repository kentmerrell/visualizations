
/* -----------------SPOT-CONTAINER DIRECTIVE-----------------
 *The spotContainer directive sets up the initial grid.
 *                                                             */


appCreateReport.directive('spotContainer', function ($compile, $rootScope, layoutservice) {
    var baseurl = window.location.protocol + "//" + window.location.host;

    return {
        restrict: "E",
        scope: {
            y: '=y'
        },
        templateUrl: baseurl + '/visualizations/public/layout/SpotContainer.html',
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