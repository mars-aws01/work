angular.module("nvf-catch-report-exporter", []).factory('reportExporter',
["$window","$filter","messager",($window,$filter,messager) ->


  exportReport = (api, request, options)->
     for key,value of options
        request[key] = value
     api request,(response)->
        if(response and response.Succeeded)
            $window.open(response.FilePath)
        else
            messager.error('Export report failed')
     ,(error)->
        messager.error(err.Data.Message)
                  
  return {
    exportReport
  }

])

