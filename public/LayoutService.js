appCreateReport.factory('layoutservice', function ($rootScope, $compile) {
    _allSpots = [];
    _expansionSets = []; //1-cell expansion-sets are not included
    _expansionsetInSelection = new ExpansionSet(0, 0, 0, 0);
    _columncount = 0;
    _layoutmode = true;
    _selectingmode = false;

    _registercolumncount = function (colcount) {
        _columncount = colcount;
    }

    _getIndexOfSpot = function (row, col) {
        for (var i = 0; i < _allSpots.length; i++) {
            if (_allSpots[i].col == col && _allSpots[i].row == row) {
                return i;
            }
        }
        return null;
    }

    _getspot = function (row, col) {
        return _.findWhere(_allSpots, {
            col: parseInt(col),
            row: parseInt(row)
        })
        //return thisspot
    };

    _registerspot = function (row, col) {
        var spt = new Spot(row, col);
        _allSpots.push(spt);
    };

    _startselecting = function (row, col) {
        if (this.selectingmode) {
            this.expansionsetInSelection.originatorRow = row;
            this.expansionsetInSelection.originatorCol = col;
            this.expansionsetInSelection.terminalRow = row;
            this.expansionsetInSelection.terminalCol = col;
        }
    };

    _stopselecting = function (row, col) {
        _selectingmode = false;
        var minrow = Math.min.apply(Math, [_expansionsetInSelection.originatorRow, _expansionsetInSelection.terminalRow])
        var maxrow = Math.max.apply(Math, [_expansionsetInSelection.originatorRow, _expansionsetInSelection.terminalRow]);

        var mincol = Math.min.apply(Math, [_expansionsetInSelection.originatorCol, _expansionsetInSelection.terminalCol])
        var maxcol = Math.max.apply(Math, [_expansionsetInSelection.originatorCol, _expansionsetInSelection.terminalCol]);

        var newexpansionset = new ExpansionSet(minrow, mincol, maxrow, maxcol)
        if (_expansionsetoverlaps(newexpansionset)) {
            _unhighlight(newexpansionset);
            return;
        }
        //don't push 1X1 expansionset.  This confuses the spot.onclick
        if (!(minrow == maxrow && mincol == maxcol)) {
        _addExpansionSet(newexpansionset)

        }
    };

    _addExpansionSet = function (newexpansionset) {
         _expansionSets.push(newexpansionset);
        _setExpansionsetProperties(newexpansionset);
        //if there is already a chart in the orginator cell, trigger redraw.
        //FIND THE SPOT  
        var chartcontainer = _getChartContainer(newexpansionset.originatorRow, newexpansionset.originatorCol);
        //(there may not be a chartcontainer on thespot)
        if (chartcontainer) {
            parent1 = chartcontainer.parent();
            var chart1scope = parent1.find('.payload').find('div').scope();
            chart1scope.chart.redraw = !chart1scope.chart.redraw;
        }


    }

    _unhighlight = function (newexpansionset) {
        for (var rownum = newexpansionset.originatorRow; rownum <= newexpansionset.terminalRow; rownum++) {
            for (var colnum = newexpansionset.originatorCol; colnum <= newexpansionset.terminalCol; colnum++) {
                var subjectspot = _allSpots[_getIndexOfSpot(rownum, colnum)];
                subjectspot.isHighlighted = false;
            }
        }
    }

    //returns true if any spot in subjectexpansionset is already included in any other expansionset
    _expansionsetoverlaps = function (subjectexpansionset) {
        for (var rownum = subjectexpansionset.originatorRow; rownum <= subjectexpansionset.terminalRow; rownum++) {
            for (var colnum = subjectexpansionset.originatorCol; colnum <= subjectexpansionset.terminalCol; colnum++) {
                var subjectspot = _allSpots[_getIndexOfSpot(rownum, colnum)]
                for (var i = 0; i < _expansionSets.length; i++) {
                    if (_spotIsInPathOfExpansionset(_expansionSets[i], subjectspot))
                        return true;
                }
            }
        }
        return false;
    }

    //The originator cell in an expansionset should have it's rowspan and colspan properties set to appropriate integer values.
    //The origingator cell should not be overwritten
    _setExpansionsetProperties = function (expansionset) {
        for (var rownum = expansionset.originatorRow; rownum <= expansionset.terminalRow; rownum++) {
            for (var colnum = expansionset.originatorCol; colnum <= expansionset.terminalCol; colnum++) {
                var thisspot = _allSpots[_getIndexOfSpot(rownum, colnum)];

                //originator cell
                if (rownum == expansionset.originatorRow && colnum == expansionset.originatorCol) {
                    thisspot.rowspan = Math.abs(expansionset.originatorRow - expansionset.terminalRow) + 1;
                    thisspot.colspan = Math.abs(expansionset.originatorCol - expansionset.terminalCol) + 1;
                }
                    //all other cells
                else {

                    thisspot.overwritten = true;
                }
                thisspot.isHighlighted = false;
                //_getspot(rownum,colnum).overwritten = true;
            }
        }
    }

    _unsetExpansionsetProperties = function (expansionset) {
        for (var rownum = expansionset.originatorRow; rownum <= expansionset.terminalRow; rownum++) {
            for (var colnum = expansionset.originatorCol; colnum <= expansionset.terminalCol; colnum++) {
                var thisspot = _allSpots[_getIndexOfSpot(rownum, colnum)];

                //originator cell
                if (rownum == expansionset.originatorRow && colnum == expansionset.originatorCol) {
                    thisspot.rowspan = 1;
                    thisspot.colspan = 1;
                }
                    //all other cells
                else {

                    thisspot.overwritten = false;
                }
                thisspot.isHighlighted = false;
                thisspot.overwritten = false;
                //_getspot(rownum,colnum).overwritten = true;
            }
        }
    }

    _buildselection = function (row, col) {
        // if (this.selectingmode) {
        _expansionsetInSelection.terminalRow = row;
        _expansionsetInSelection.terminalCol = col;
        //clear highlights from all spots.
        for (var i = 0; i < _allSpots.length; i++) {
            //if inside path between originator and here the add highlight
            if (this.spotIsInPathOfExpansionset(_expansionsetInSelection, _allSpots[i])) {
                _allSpots[i].isHighlighted = true;
            }
            else {//otherwise,remove highlight
                _allSpots[i].isHighlighted = false;
            }
        }
        // }
    }

    _spotIsInPathOfExpansionset = function (expansionset, subjectspot) {
        var minrow = Math.min.apply(Math, [expansionset.originatorRow, expansionset.terminalRow])
        var maxrow = Math.max.apply(Math, [expansionset.originatorRow, expansionset.terminalRow]);

        var mincol = Math.min.apply(Math, [expansionset.originatorCol, expansionset.terminalCol])
        var maxcol = Math.max.apply(Math, [expansionset.originatorCol, expansionset.terminalCol]);

        var rowIsIn = false;
        var colIsIn = false;
        if (subjectspot.row >= minrow && subjectspot.row <= maxrow)
            rowIsIn = true;

        if (subjectspot.col >= mincol && subjectspot.col <= maxcol)
            colIsIn = true;

        return rowIsIn && colIsIn;
    }

    _spotIsTheOriginatoryInAnExpansionset = function (row, col) {
        var thisspot = new Spot(row, col);
        for (var i = 0; i < _expansionSets.length; i++) {
            if (_expansionSets[i].originatorRow == row && _expansionSets[i].originatorCol == col) {
                return true;
            }
            if (_spotIsInPathOfExpansionset(_expansionSets[i], thisspot))
                return false;
        }
        //if made it this far, this spot is not in an expansionset so it is, in effect, the OrininatorySpot of it's own expansionset
        return true;
    }

    _deleteexpansionset = function (rownumber, columnnumber) {
        for (var i = 0; i < _expansionSets.length; i++) {
            if (_expansionSets[i].originatorRow == rownumber && _expansionSets[i].originatorCol == columnnumber) {
                _unsetExpansionsetProperties(_expansionSets[i]);
                _expansionSets.splice(i, 1);

                //if there is a chart in the orginator cell, trigger redraw.
                //FIND THE SPOT  
                var chartcontainer = _getChartContainer(rownumber, columnnumber);
                //(there may not be a chartcontainer on thespot)
                if (chartcontainer) {
                    parent1 = chartcontainer.parent();
                    var chart1scope = parent1.find('.payload').find('div').scope();
                    chart1scope.chart.redraw = !chart1scope.chart.redraw;
                }
                return;
            }
        }
    }

    _getChartContainer = function (rownumber, columnumber) {
        var spot = $('.spot[columnnumber="' + columnumber + '"][rownumber="' + rownumber + '"]');

        var chartcontainer = $(spot).find('.chartcontainer');
        if(chartcontainer.length>0)
            return chartcontainer
        return null;
    }

    return {
        expansionSets: _expansionSets,
        expansionsetInSelection: _expansionsetInSelection,
        spotIsTheOriginatoryInAnExpansionset: _spotIsTheOriginatoryInAnExpansionset,
        layoutmode: _layoutmode,
        deleteexpansionset: _deleteexpansionset,
        selectingmode: _selectingmode,
        spotIsInPathOfExpansionset: _spotIsInPathOfExpansionset,
        startselecting: _startselecting,
        stopselecting: _stopselecting,
        buildselection: _buildselection,
        getspot: _getspot,
        registerspot: _registerspot,
        registercolumncount: _registercolumncount,
        questionInDrag: {},
        sourceChartContainer: function () {
            //there should only ever be one html element that has the class 'currentlydragging'
            return $('.currentlydragging');
        },
        moveChartToLocation: function (chartcontainer1, newparent) {
            newparent.append(chartcontainer1.removeClass('currentlydragging').css('left', '').css('top', '').css('z-index', ''));
            var parent1 = $(chartcontainer1).parent();
            var chart1scope = parent1.find('.payload').find('div').scope();
            chart1scope.chart.redraw = !chart1scope.chart.redraw;
        },
        swapChartContainers: function (chartcontainer1, chartcontainer2) {

            //console.log('chartcontainer1.scope().node',chartcontainer1.scope().node)
            var parent1 = $(chartcontainer1).parent();
            var parent2 = $(chartcontainer2).parent();

            parent1.append(chartcontainer2.removeClass('currentlydragging').css('left', '').css('top', '').css('z-index', ''));
            parent2.append(chartcontainer1.removeClass('currentlydragging').css('left', '').css('top', '').css('z-index', ''));
            $(chartcontainer1).css('z-index', '1');
            $(chartcontainer2).css('z-index', '1');
            console.log('swapChartContainers - chartcontainer1, chartcontainer2', chartcontainer1, chartcontainer2)

            var chart1scope = parent1.find('.payload').find('div').scope();
            chart1scope.chart.redraw = !chart1scope.chart.redraw;
            var chart2scope = parent2.find('.payload').find('div').scope();
            chart2scope.chart.redraw = !chart2scope.chart.redraw;
        },
        instanciateChartContainer: function (charttype, parent, newscope) {
            //if there is already a chart there, delete it
            //parent.children with an id of 'panelcontainer'
            //if panelcontainer has any children, delete them

            //first find the parent spot
            var spt = $(parent).closest(".spot");
            //then find the spot's panelcontainer
            var container = $(spt).find(".panelarea1");

            if (container.children().length > 0)
            { container.children().remove(); }

            container.append($compile("<chartcontainer questionsel='questionsel' hostspot='spot'></chartcontainer>")(newscope));

            //if (charttype.toLowerCase() == "bar")

            //    container.append($compile("<panelbardirective questionsel='questionsel'></paneldirective>")(newscope));

            //if (charttype.toLowerCase() == "line")
            //    container.append($compile("<paneldirective questionsel='questionsel'></paneldirective>")(newscope));

            //if (charttype.toLowerCase() == "pie")
            //    container.append($compile("<panelpiedirective questionsel='questionsel'></paneldirective>")(newscope));
        },
        triggerChartRedraw: function (rownumber, columnnumber) {
            var chartcontainer = _getChartContainer(rownumber, columnnumber);
            //(there may not be a chartcontainer on thespot)
            if (chartcontainer) {
                parent1 = chartcontainer.parent();
                var chart1scope = parent1.find('.payload').find('div').scope();
                chart1scope.chart.redraw = !chart1scope.chart.redraw;
            }
        }
    }
})

