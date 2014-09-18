
app.factory('ReportDataService', function ($resource, $http) {
    var _reportname = 'My Report';
    var _allQuestions = [];
    var _surveyTemplateId = 10041;
    var _survey = {
        getAllQuestions: {
            method: 'Get',
            isArray: false,
            transformRequest: function (data, headersGetter) {
            },
            transformResponse: function (data, headers) {
                var returnobj = $(data).find('simpleNode');
                console.log('transformResponse', arguments, 'returnobj', returnobj)
            }
        }
    };
    return {
        reportname: _reportname,
        getAllQuestions: function (surveytemplateid) {
            $http({ method: 'GET', url: 'http://dv-estoredev-01:8081/CTV2API/api/Template/' + _surveyTemplateId }).
    success(function (data, status, headers, config) {
        
        //Template data is hierarchical, but it's root node is an object.
               
        while (_allQuestions.length > 0)
        {
            _allQuestions.pop();
        }

        getSimpleNodeRecursive(data);

        function getSimpleNodeRecursive(data) {
            _.each(data.Children, function (childobj) {
                //console.log('childobj', _.omit(childobj, 'Children'))
                _allQuestions.push(_.omit(childobj, 'Children'))
                getSimpleNodeRecursive(childobj)
            })
        }


        //_allQuestions.push(data);//_allQuestions = data
        console.log("_allQuestions", _allQuestions);
    }).
    error(function (data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error', arguments);
    });
        },
        surveyTemplateId: _surveyTemplateId,
        allQuestions: _allQuestions
    }

    //survey.getAllQuestions({ templateId: '5' });


});

