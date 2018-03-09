angular.module('vf-batch-processing',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.batch.us)
    .translations('zh-cn',resources.vendorportal.batch.cn)
    .translations('zh-tw',resources.vendorportal.batch.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/batch-processing",
      templateUrl: "/modules/vendorportal-vf/app/batch/batch-processing.tpl.html"
      controller: 'BatchProcessingCtrl'
])

.controller('BatchProcessingCtrl',
["$scope","$window","messager","common","order","batch","batchAPI",'$fileUploader','userAPI',"$translate"
($scope,$window,messager,common,order,batch,batchAPI,$fileUploader,userAPI,$translate) ->

  $scope.dataGridName_download = "batchGrid_download"
  $scope.refreshKey_download = "refresh.batch_download"
  $scope.dataGridName_upload = "batchGrid_upload"
  $scope.refreshKey_upload = "refresh.batch_upload"
  $scope.guidReg = /[A-Fa-f0-9]{8}(-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/
  
  $scope.itemDownloadFilterList = [
    { text:"All"}
    { text:"Listed", value:"Listed" }
    { text:"Unlisted", value:"Unlisted" }
  ]
  $scope.downloadHistoryList=[]
  $scope.uploadHistoryList=[]
  $scope.orderStatusList = order.orderStatusList
  $scope.templateTypeList = batch.templateTypeList
  $scope.templateTypeForSearchList = batch.templateTypeForSearchList  
  $scope.templateTypeForUploadList = batch.templateTypeForUploadList
  $scope.fileFormatList = batch.fileFormatList
  $scope.statusList = batch.statusList
  $scope.uploadStatusList = batch.uploadStatusList
  $scope.download={}
  $scope.upload={}
  $scope.downloadTemplateQuery={TemplateType:'',TemplateFormat:'xls',FillWithData:true,RequestUserDisplayName:common.currentUser.LoginName,RequestUserEmail:common.currentUser.LoginName,NeedNotification:false}
  $scope.uploadFile={}
  $scope.uploadTemplateType=''
  
  $scope.currentQuery = {}
       
  $scope.preparePaging = ->
    $scope.currentQuery.PagingInfo = common.getPagging($scope.currentQuery.PagingInfo) 
                
  #sorting initialized
  $scope.initSortInfo = ->
    $scope.currentQuery.SortInfo = 
            {
               SortField: 'RequestDate'
               SortType: 'DESC'
            }  

  $scope.queryAPI = (requestItem) ->    
    if(requestItem.MyRequestOnly==true)
        requestItem.RequestUser=common.currentUser.ID    
    requestItem.action1='download-history'  
    requestItem.action2='query' 
    requestItem.VendorNumber=common.currentUser.VendorNumber  
    requestItem = common.getRequestQuery(requestItem,$scope) 
    if(requestItem.RequestDateFrom=='')
        delete requestItem.RequestDateFrom
    else if (requestItem.RequestDateFrom && requestItem.RequestDateFrom.indexOf('GMT') < 0)
        requestItem.RequestDateFrom=common.convertToDatetime(requestItem.RequestDateFrom,false)       
    if(requestItem.RequestDateTo=='')
        delete requestItem.RequestDateTo
    else if (requestItem.RequestDateTo && requestItem.RequestDateTo.indexOf('GMT') < 0)
        requestItem.RequestDateTo= common.convertToDatetime(requestItem.RequestDateTo,true)   
    batchAPI.seachDownloadHistory requestItem
        ,(response)->
            if(response&&response.Succeeded)
                $scope.currentQuery.totalItems = response.TotalRecordCount
                $scope.downloadHistoryList=response.DownloadHistoryList
                for entity in $scope.downloadHistoryList
                    entity.TemplateTypeDescription=angular.copy(v.text) for v in batch.templateTypeForSearchList when v.value==entity.TemplateType and v.value isnt ''
                    entity.StatusDescription=angular.copy(v.text) for v in batch.statusList when v.value==entity.Status
                    entity.RequestDateForExport=common.convertToLocalTime(entity.RequestDate,'MM/DD/YYYY h:mm:ss A')
                $scope.callbackEvent($scope.downloadHistoryList) if $scope.callbackEvent
                 #$scope.loadDownloadUserList($scope.downloadHistoryList)
        ,(error)-> 
   
  $scope.searchDownloadHistory=->
     if($scope.download.RequestDateFrom && new Date($scope.download.RequestDateFrom).toString() == 'Invalid Date')
          messager.warning($translate('error_batch.reqDateFromInvalid'))
          return 
     if($scope.download.RequestDateTo && new Date($scope.download.RequestDateTo).toString() == 'Invalid Date')
          messager.warning($translate('error_batch.reqDateToInvalid'))
          return
     requestItem = angular.copy($scope.download)
     requestItem.SortInfo = angular.copy($scope.currentQuery.SortInfo)
     requestItem.PagingInfo=angular.copy($scope.currentQuery.PagingInfo)
     $scope.queryAPI(requestItem)   
  
  $scope.searchDownloadDataGrid = ->
     messager.clear()
     $scope.preparePaging()
     $scope.initSortInfo()
     common.refreshDataGrid($scope,$scope.dataGridName_download,$scope.refreshKey_download,$scope.currentQuery.PagingInfo)
  
  if(common.currentUser.VendorNumber != '0')   
     $scope.searchDownloadDataGrid()      
  
  $scope.downloadTemplate=->
    if($scope.downloadTemplateQuery.TemplateType==null||$scope.downloadTemplateQuery.TemplateType=='')
        messager.error($translate('error_batch.templateTypeInvalid'))
        return
    request={}    
    request.DownloadHistory=angular.copy($scope.downloadTemplateQuery)
    request.action1='download-history'
    request.VendorNumber=common.currentUser.VendorNumber
    request.DownloadHistory.NeedNotification=request.DownloadHistory.FillWithData
    if !request.DownloadHistory.FillWithData || request.DownloadHistory.TemplateType != 'SC'
       delete request.DownloadHistory.DataRange
    batchAPI.addDownloadRequest request
        ,(response)->
            if(response&&response.Succeeded)
                messager.success($translate('success_batch.dowloadReq'))
                #$scope.searchDownloadHistory()
        ,(error)->
        
  $scope.pageChanged = (p)->
    return if common.currentUser.VendorNumber == "0" 
    $scope.currentQuery.PagingInfo = {} if(!$scope.currentQuery.PagingInfo)
    $scope.currentQuery.PagingInfo.isExportAction = p.isExportAction
    $scope.currentQuery.PagingInfo.isExportAction_All = p.isExportAction_All
    $scope.currentQuery.PagingInfo.pageSize = p.pageSize
    $scope.currentQuery.PagingInfo.startpageindex=p.page-1
    $scope.currentQuery.PagingInfo.endpageindex=p.page-1
    common.setServerSorting($scope.currentQuery, p)
    $scope.searchDownloadHistory()  
                                                                                                                                                                                                                                                                                                
  $scope.batchOptions_download =
    height:common.getTableHeight(290) + "px"
    columnMenu: false
    toolbar: ["excel","excelAll"]
    filterable: true
    dataSource: 
        type: "odata"
        transport:
            read: (options) ->
                 $scope.callbackEvent = (result) ->
                        options.success d:
                              results: result or []
                              __count: $scope.currentQuery.totalItems or 0  
                 $scope.pageChanged(options.data)   
        serverPaging: true
        serverSorting: true
    columns: [
                {
                    field: "ClientFileName"
                    title: "File Name"
                    sortfield: "OriginalFileName"
                    headerTemplate:"{{ 'header_batch.fileName' | translate }}"
                }
                {
                    field: "TemplateTypeDescription"
                    title: "Template Type"
                    sortfield: "TemplateType"
                    headerTemplate:"{{ 'view_batch.templateType' | translate }}"
                    width: "140px"
                }
                {
                    field: "StatusDescription"
                    title: "Status"
                    sortfield: "Status"
                    headerTemplate: "{{ 'view_batch.status' | translate }}"
                    width: "80px"
                }
                {
                    field: "RequestDateForExport"
                    title: "Request Date"
                    sortfield: "RequestDate"
                    headerTemplate: "{{ 'header_batch.reqDate' | translate }}"
                    width: "160px"
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
                {
                    field: "RequestUserDisplayName"
                    title: "Request User"
                    #sortfield: "RequestUser"
                    width: "180px"
                    headerTemplate: "{{ 'header_batch.reqUser' | translate }}",
                }
                {
                    title: "Template Link"
                    width: "140px"
                    headerTemplate: "{{ 'header_batch.templateLink' | translate }}",
                    template: kendo.template($("#tpl_batch_download_TemplateLink").html())
                }
             ]
             
             
  ####################################upload####################################
  $scope.currentQueryUpload = {}
  
  $scope.preparePagingUpload = ->
    $scope.currentQueryUpload.PagingInfo = common.getPagging($scope.currentQueryUpload.PagingInfo) 
      
  #sorting initialized
  $scope.initSortInfoUpload = ->
      $scope.currentQueryUpload.SortInfo =
             {
               SortField: 'uploaddate'
               SortType: 'DESC'
             }  

  $scope.queryAPIUpload = (requestItem) ->
    if(!requestItem.PagingInfo)
       requestItem.PagingInfo = $scope.preparePagingUpload()
    if(requestItem.MyUploadOnly==true)
        requestItem.RequestUser=common.currentUser.ID 
           
    requestItem.action1='upload-history'  
    requestItem.action2='query' 
    requestItem.VendorNumber=common.currentUser.VendorNumber
    requestItem = common.getRequestQuery(requestItem,$scope,'currentQueryUpload') 
    if(requestItem.UploadDateFrom=='')
        delete requestItem.UploadDateFrom
    else if(requestItem.UploadDateFrom && requestItem.UploadDateFrom.indexOf('GMT') < 0)
        requestItem.UploadDateFrom=common.convertToDatetime(requestItem.UploadDateFrom,false)   
             
    if(requestItem.UploadDateTo=='')
        delete requestItem.UploadDateTo
    else if(requestItem.UploadDateTo && requestItem.UploadDateTo.indexOf('GMT') < 0)
        requestItem.UploadDateTo=common.convertToDatetime(requestItem.UploadDateTo,true)  
           
    if(requestItem.ProcessDateFrom=='')
        delete requestItem.ProcessDateFrom
    else if(requestItem.ProcessDateFrom && requestItem.ProcessDateFrom.indexOf('GMT') < 0)
        requestItem.ProcessDateFrom=common.convertToDatetime(requestItem.ProcessDateFrom,false)
              
    if(requestItem.ProcessDateTo=='')
        delete requestItem.ProcessDateTo
    else if(requestItem.ProcessDateTo && requestItem.ProcessDateTo.indexOf('GMT') < 0)
        requestItem.ProcessDateTo=common.convertToDatetime(requestItem.ProcessDateTo,true)  
        
    batchAPI.seachUploadHistory requestItem
        ,(response)->
            if(response&&response.Succeeded)
                $scope.currentQueryUpload.totalItems=response.TotalRecordCount
                $scope.uploadHistoryList=response.UploadHistoryList
                for entity in $scope.uploadHistoryList
                    entity.TemplateTypeDescription=angular.copy(v.text) for v in batch.templateTypeForSearchList when v.value==entity.TemplateType and v.value isnt ''
                    entity.StatusDescription=angular.copy(v.text) for v in batch.uploadStatusList when v.value==entity.Status
                    entity.UploadDateForExport=common.convertToLocalTime(entity.UploadDate,'MM/DD/YYYY h:mm:ss A')
                    entity.ProcessDateForExport=common.convertToLocalTime(entity.ProcessDate,'MM/DD/YYYY h:mm:ss A')
                $scope.callbackEvent_upload($scope.uploadHistoryList) if $scope.callbackEvent_upload   
                # $scope.loadUploadUserList($scope.uploadHistoryList)
        ,(error)-> 
        
              
  $scope.searchUploadHistory=->
     if($scope.upload.UploadDateFrom && new Date($scope.upload.UploadDateFrom).toString() == 'Invalid Date')
          messager.warning($translate('error_batch.uploadDateFromInvalid'))
          return 
     if($scope.upload.UploadDateTo && new Date($scope.upload.UploadDateTo).toString() == 'Invalid Date')
          messager.warning($translate('error_batch.uploadDateToInvalid'))
          return
     if($scope.upload.ProcessDateFrom && new Date($scope.upload.ProcessDateFrom).toString() == 'Invalid Date')
          messager.warning($translate('error_batch.processDateFromInvalid'))
          return 
     if($scope.upload.ProcessDateTo && new Date($scope.upload.ProcessDateTo).toString() == 'Invalid Date')
          messager.warning($translate('error_batch.processDateToInvalid'))
          return
     requestItem = angular.copy($scope.upload)
     requestItem.SortInfo = angular.copy($scope.currentQueryUpload.SortInfo)
     requestItem.PagingInfo=angular.copy($scope.currentQueryUpload.PagingInfo)
     $scope.queryAPIUpload(requestItem)   
  
  $scope.searchUploadDataGrid = ->
     messager.clear()
     $scope.preparePagingUpload()
     $scope.initSortInfoUpload()
     common.refreshDataGrid($scope,$scope.dataGridName_upload,$scope.refreshKey_upload,$scope.currentQueryUpload.PagingInfo)
  
  if(common.currentUser.VendorNumber != '0')   
     $scope.searchUploadDataGrid()   
  
  $scope.pageChangedUpload = (p)->
    return if common.currentUser.VendorNumber == "0" 
    $scope.currentQueryUpload.PagingInfo = {} if(!$scope.currentQueryUpload.PagingInfo)
    $scope.currentQueryUpload.PagingInfo.isExportAction = p.isExportAction
    $scope.currentQueryUpload.PagingInfo.isExportAction_All = p.isExportAction_All
    $scope.currentQueryUpload.PagingInfo.pageSize = p.pageSize
    $scope.currentQueryUpload.PagingInfo.startpageindex=p.page-1
    $scope.currentQueryUpload.PagingInfo.endpageindex=p.page-1
    common.setServerSorting($scope.currentQueryUpload, p)
    $scope.searchUploadHistory()  
                                                                                                                                                                                                                                                                                                
  $scope.batchOptions_upload =
    height:common.getTableHeight(265) + "px"
    columnMenu: false
    toolbar: ["excel","excelAll"]
    filterable: true
    dataSource: 
        type: "odata"
        transport:
            read: (options) ->
                 $scope.callbackEvent_upload = (result) ->
                        options.success d:
                              results: result or []
                              __count: $scope.currentQueryUpload.totalItems or 0  
                 $scope.pageChangedUpload(options.data)   
        serverPaging: true
        serverSorting: true
    columns: [
                {
                    field: "OriginalFileName"
                    title: "File Name"
                    sortfield: "OriginalFileName"
                    headerTemplate:"{{ 'header_batch.fileName' | translate }}"
                }
                {
                    field: "TemplateTypeDescription"
                    title: "Template Type"
                    sortfield: "TemplateType"
                    headerTemplate:"{{ 'view_batch.templateType' | translate }}"
                    width: "140px"
                }
                {
                    field: "StatusDescription"
                    title: "Status"
                    sortfield: "Status"
                    headerTemplate: "{{ 'view_batch.status' | translate }}"
                    template: kendo.template($("#tpl_batch_upload_status").html())
                    width: "140px"
                }
                {
                    field: "UploadDateForExport"
                    title: "Uploaded Date"
                    sortfield: "UploadDate"
                    headerTemplate: "{{ 'header_batch.uploadedDate' | translate }}"
                    width: "160px"
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
                {
                    field: "UploadUserDisplayName"
                    title: "Uploaded User"
                   # sortfield: "UploadUser"
                    width: "180px"
                    headerTemplate: "{{ 'header_batch.uploadedUser' | translate }}",
                }
                {
                    field: "ProcessDateForExport"
                    title: "Completed Date"
                    sortfield: "ProcessDate"
                    headerTemplate: "{{ 'header_batch.completedDate' | translate }}"
                    width: "160px"
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
                {
                    title: "View End Result"
                    width: "140px"
                    headerTemplate: "{{ 'header_batch.viewEndResult' | translate }}",
                    template: kendo.template($("#tpl_batch_upload_viewEndResult").html())
                }
             ]
             
  $scope.uploadurl =common.apiURL.bacthUpload+ "?filename=1.txt&filetype=batch&format=json"

  $scope.uploadHeader=common.initHeader(common.currentUser)
   
  uploader=$scope.uploader=$fileUploader.create({
        scope: $scope
        url: $scope.uploadurl
        headers:$scope.uploadHeader
        removeAfterUpload:true
        filters: [
                  (item)->                
                        valid=false
                        extensionName = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase()                       
                        if(extensionName in ['xls','xlsx','csv'])
                            valid=true
                        if(valid==false)
                            messager.error($translate('error_batch.fileTypeInvalid'))
                        
                        $scope.uploadFile.TemplateFormat=extensionName     
                        $scope.uploadFile.OriginalName=item.name;
                        $scope.uploadValid=valid;             
                        return valid;
                 ]    
  })
  
  uploader.bind('success', (event, xhr, item, msg) ->    
        if(msg.Succeeded)       
            $scope.promise=$scope.uploadSuccessProcess(msg.File.BatchFileID)
        else
            uploader.queue[0].isUploaded=false;
            uploader.reset()
            messager.error($translate('error_batch.uploadFailed'))        
  )

  uploader.bind('error', (event, xhr, item, msg) ->
        $scope.uploadFile={};
        uploader.reset()
        if(msg&&msg.data)
            messager.error($translate('error_batch.uploadFailed'),msg.data)   
        else
            messager.error($translate('error_batch.uploadFailed'),msg)   
  )

  clearUploadfileInput = () ->
        findElement = $("#fileInput_upload")
        return if !findElement || findElement.length == 0
        btnFileInputRemove = findElement.find(".remove")[0]
        btnFileInputRemove.click()
          
  $scope.uploadClick=->
    if($scope.uploadTemplateType=='')
        messager.error($translate('error_batch.uploadTemplateTypeInvalid'))
        return
    if($scope.uploader.queue.length==0)
        messager.error($translate('error_batch.queueInvalid'))
        return
    otherParams = '&VendorNumber=' + common.currentUser.VendorNumber + '&TemplateType=' + $scope.uploadTemplateType + '&TemplateFormat=' + $scope.uploadFile.TemplateFormat + '&RequestUser=' + common.currentUser.ID 
    uploader.queue[0].url=common.apiURL.bacthUpload+ "?filename="+encodeURIComponent($scope.uploadFile.OriginalName)+"&filetype=batch&format=json" + otherParams;
    uploader.uploadAll()
      
  $scope.uploadSuccessProcess=(batchID)->
    messager.success($translate('success_batch.uploadFile'))
    clearUploadfileInput()
    $scope.searchUploadHistory()
#    requestItem={
#                UploadHistory:{
#                              OriginalFileName:$scope.uploadFile.OriginalName,
#                              TemplateType:$scope.uploadTemplateType,
#                              TemplateFormat:$scope.uploadFile.TemplateFormat,
#                              BatchFileID:batchID,
#                              UploadUserDisplayName: common.currentUser.LoginName,
#                              UploadUserEmail: common.currentUser.LoginName
#                              }
#                action1:'upload-history'
#                VendorNumber:common.currentUser.VendorNumber              
#                } 
#                
#    batchAPI.addUploadRequest requestItem
#        ,(response)->
#            if(response&&response.Succeeded)
#                messager.success($translate('success_batch.uploadFile'))
#                clearUploadfileInput()
#                #$scope.searchUploadHistory()
#            else
#                messager.error($translate('error_batch.uploadFailed'))        
#        ,(error)->

  $scope.loadDownloadUserList =(downloadHistoryList) ->
    requestUser = {
      action1: "query"
    }
    userAPI.queryUserList requestUser,
      (response) ->
        if(response&&response.Succeeded==true)
            for downloadHistory in downloadHistoryList
                for user in response.UserList
                    if(downloadHistory.RequestUser==user.ID.toString())
                        downloadHistory.RequestUserName=user.LoginName
                if(downloadHistory.RequestUserName==undefined)
                    if(isNaN(downloadHistory.RequestUser)==false)
                        downloadHistory.RequestUserName='Newegg'    
                    else if ($scope.guidReg.test(downloadHistory.RequestUser))
                        downloadHistory.RequestUserName='System Admin User'
                    else
                        downloadHistory.RequestUserName=downloadHistory.RequestUser
            $scope.callbackEvent(downloadHistoryList) if $scope.callbackEvent                
          
  $scope.loadUploadUserList =(uploadHistoryList) ->
    requestUser = {
      action1: "query"
    }
    userAPI.queryUserList requestUser,
      (response) ->
        if(response&&response.Succeeded==true)
            for uploadHistory in uploadHistoryList
                for user in response.UserList
                    if(uploadHistory.UploadUser==user.ID.toString())
                        uploadHistory.UploadUserName=user.LoginName
                if(uploadHistory.UploadUserName==undefined)        
                    if(isNaN(uploadHistory.UploadUser)==false)
                        uploadHistory.UploadUserName='Newegg'
                    else if ($scope.guidReg.test(uploadHistory.UploadUser))
                        uploadHistory.UploadUserName='System Admin User'
                    else
                        uploadHistory.UploadUserName=uploadHistory.UploadUser          
            $scope.callbackEvent_upload(uploadHistoryList) if $scope.callbackEvent_upload     
     ,(error)->
                     
  $scope.search = ->
     messager.clear()
     $scope.searchDownloadDataGrid()  
     $scope.searchUploadDataGrid()
  
  $scope.downloadPanelStatus=false  
      
  $scope.toggleDownloadPanel=->
    $scope.downloadPanelStatus=!$scope.downloadPanelStatus  
    
  $scope.uploadPanelStatus=false  
      
  $scope.toggleUploadPanel=->
    $scope.uploadPanelStatus=!$scope.uploadPanelStatus                                                    
])
.controller('UploadCtrl',
["$scope", ($scope) ->

  $scope.url = "www.test.com"
])