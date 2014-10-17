appCreateReport.factory('ReportDataService', function ($resource, $http,$location) {
    console.log('in ReportDataService');
    var _reportname = 'My Report';
    var _allQuestions = [
        {"qtext": "abc"}
    ];
    var _surveyTemplateId = 10265; //6, 10083
    if(($location.search()).templateId){
        _surveyTemplateId=($location.search()).templateId
    }
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
            console.log('inside getAllQuestions');
            //LIVE
            $http({ method: 'GET', url: 'http://dv-estoredev-01:8081/CTV2API/api/Template/' + _surveyTemplateId }).
            //TEST AGAINST LOCAL JSON FILE
            //$http({ method: 'GET', url: 'public/app/sampleData/template.json'}).
                success(function (data, status, headers, config) {

                    while (_allQuestions.length > 0) {
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
});

