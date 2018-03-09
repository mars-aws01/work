# CoffeeScript
angular.module('vf-batch-item-creation',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.batchItem.us)
    .translations('zh-cn',resources.vendorportal.batchItem.cn)
    .translations('zh-tw',resources.vendorportal.batchItem.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/batch-item-creation",
      templateUrl: "/modules/vendorportal-vf/app/batch/batch-item-creation.tpl.html"
      controller: 'BatchItemCreationCtrl'
])

.controller('BatchItemCreationCtrl',
["$scope","$window","messager","common","order","batch","batchItemCreationAPI",'FileUploader','userAPI',"$translate"
($scope,$window,messager,common,order,batch,batchItemCreationAPI,FileUploader,userAPI,$translate) ->     
    $scope.hide = false;    
    
    #upload template
    $scope.uploadFile = {}
    $scope.formUploaderValidtip = true
    $scope.isUploading = false

    $scope.uploadurl =common.apiURL.commonUpload+ "?filename=1.txt&SuppressSuffix=false&format=json&type=VendorPortal&group=EDI"
    
    $scope.uploadHeader=common.initHeader(common.currentUser)

    clearUploadfileInput = () ->
        findElement = $("#fileInput_upload")
        return if !findElement || findElement.length == 0
        btnFileInputRemove = findElement.find(".remove")[0]
        btnFileInputRemove.click()
    
    formUploader=$scope.formUploader=new FileUploader({
        scope:$scope
        url:$scope.uploadurl
        headers:$scope.uploadHeader
        removeAfterUpload:true
        filters:[{
             name:'customerFilter'
             fn:(item, options)->
                messager.clear()
                valid=false
                extensionName = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase()
                if(extensionName in ['xlsx'])
                    valid=true
                if(valid==false)
                    messager.error($translate('fileTypeInvalid.error_item_batch'))
                return valid
                
        },{
            name:'fileSizeFilter'
            fn:(item, options)->
                valid=false
                if item.size <= 10*1024*1024
                    valid=true
                if (valid==false)
                    messager.clear()
                    messager.error($translate('fileTypeInvalid.filesize_larger'))
                if item.size == 0
                    messager.clear()
                    valid=false
                    messager.error($translate('fileTypeInvalid.filesize_zero'))
                    clearUploadfileInput()
                return valid
        }]
    })

    formUploader.onAfterAddingFile = (fileItem)->
        $scope.formUploaderValidtip = $scope.formUploader.queue.length==0 ? true : false
        $scope.isUploading = false

    formUploader.onWhenAddingFileFailed = (fileItem, filter, options)->
        #formUploader.removeFromQueue(fileItem)
        formUploader.clearQueue()
        $scope.isUploading = false

    $scope.BatchItemCreationFile = {}

    formUploader.onSuccessItem = (fileItem, response, status, headers) ->
        if response and response.Succeeded
          $scope.BatchItemCreationFile = {
            VendorNumber:common.currentUser.VendorNumber,
            OriginalFileName : fileItem.file.name,
            FileName : response.File.DFISFileName,
            FileSize: fileItem.file.size,
            Url: response.File.DownloadUrl
          }
          requestItem = {
            action:"submit",
            RequestUser:common.currentUser.ID
          }
          requestItem.BatchItemCreationFile = angular.copy($scope.BatchItemCreationFile)
          batchItemCreationAPI.submit requestItem, (response)->
                if response and response.Succeeded
                    messager.success($translate('success_item_batch.uploadFile'))
                else
                    messager.error($translate('error_item_batch.upload_failed'))
            ,(error)->
                messager.error("Unknow exception!")
        else
          messager.error($translate('error_item_batch.upload_failed'))
        clearUploadfileInput()
        $scope.isUploading = false

    formUploader.onErrorItem = (fileItem, response, status, headers) ->
        messager.error($translate('error_item_batch.upload_failed'))

    $scope.getFileName =(name)->
      strs = name.split('.')
      strs.splice(strs.length-2,1,strs[strs.length-2]+'_'+(new Date()).getTime())
      return strs.join('.')

    $scope.uploadClick = ()->
        messager.clear()
        if formUploader.queue.length == 0
            messager.error($translate('fileTypeInvalid.no_file_selected'))
            return
        $scope.isUploading = true
        formFileItem = formUploader.queue[formUploader.queue.length-1]
        formFileItem.url = common.apiURL.commonUpload+ "?filename="+encodeURIComponent(formFileItem.file.name)+"&AddFileNameSuffix=true&format=json&type=VendorPortal&group=EDI";
        formFileItem.upload()

    $scope.dataGridName_batchItemUpload = "itemBatchGrid_upload"
    $scope.refreshKey_batchItemUpload = "refresh.item_batch_upload"     
    
    #query batch item creation upload history
    $scope.StatusList = [
        { text:'All', },
        { text:'Waiting', value:'Waiting' },
        { text:'Processing', value:'Processing' },
        { text:'Failed', value:'Failed' },
        { text:'Completed', value:'Completed' },
        { text:'Completed With Error', value:'CompletedWithError' },
    ]
    $scope.uploadHistoryList=[]
    $scope.guidReg = /[A-Fa-f0-9]{8}(-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/

    $scope.ItemBatchOptions_upload =
        height:common.getTableHeight(190) + "px"
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
                                  __count: $scope.currentQuery.totalItems or 0  
                     $scope.pageChangedUpload(options.data)   
            serverPaging: true
            serverSorting: true
        columns: [
                    {
                        field: "OriginalFileName"
                        title: "File Name"
                        sortfield: "OriginalFileName"
                        headerTemplate:"{{ 'view_item_batch.FileName' | translate }}"
                        width: "300px"
                        template: '<span title="{{dataItem.OriginalFileName}}">{{dataItem.OriginalFileName}}</span>'
                    }
                    {
                        field: "Status"
                        title: "Status"
                        sortfield: "Status"
                        headerTemplate: "{{ 'view_item_batch.Status' | translate }}"
                        template: kendo.template($("#tpl_item_batch_upload_status").html())
                        width: "140px"
                    }
                    {
                        field: "UploadedDate"
                        title: "Uploaded Date"
                        sortfield: "UploadedDate"
                        headerTemplate: "{{ 'view_item_batch.UploadDate' | translate }}"
                        width: "200px"
                        format2: 'MM/DD/YYYY hh:mm:ss A'
                        template: '<span>{{dataItem.UploadedDate | moment:"MM/DD/YYYY hh:mm:ss A"}}</span>'
                    }
                    {
                        field: "UploadUserName"
                        title: "Uploaded User"
                        width: "180px"
                        headerTemplate: "{{ 'view_item_batch.UploadUser' | translate }}",
                    }
                    {
                        field: "CompletedDate"
                        title: "Completed Date"
                        sortfield: "CompletedDate"
                        headerTemplate: "{{ 'view_item_batch.CompleteDate' | translate }}"
                        width: "200px"
                        format2: 'MM/DD/YYYY hh:mm:ss A'
                        template: '<span>{{dataItem.CompletedDate | moment:"MM/DD/YYYY hh:mm:ss A"}}</span>'
                    }
                    {
                        title: "View End Result"
                        headerTemplate: "{{ 'view_item_batch.ViewEndResult' | translate }}"
                        template: kendo.template($("#tpl_item_batch_upload_viewEndResult").html())
                        width: "300px"
                    }
                 ]                                      

    $scope.query = {
        action:"query",
    }

    $scope.currentQuery = {}

    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)

    $scope.initSortInfo = ->
        $scope.query.SortInfo = {
            SortField: 'CompletedDate'
            SortType: 'DESC'
        }

    $scope.searchUploadDataGrid = ->
        messager.clear()
        if($scope.query.UploadedDateFrom && new Date($scope.query.UploadedDateFrom).toString() == 'Invalid Date')
            messager.warning($translate('error_item_batch.uploadDateFromInvalid'))
            return
        if($scope.query.UploadedDateTo && new Date($scope.query.UploadedDateTo).toString() == 'Invalid Date')
            messager.warning($translate('error_item_batch.uploadDateToInvalid'))
            return
        if($scope.query.CompletedDateFrom && new Date($scope.query.CompletedDateFrom).toString() == 'Invalid Date')
            messager.warning($translate('error_item_batch.completeDateFromInvalid'))
            return
        if($scope.query.CompletedDateTo && new Date($scope.query.CompletedDateTo).toString() == 'Invalid Date')
            messager.warning($translate('error_item_batch.completeDateToInvalid'))
            return
        if($scope.query.UploadedDateTo && $scope.query.UploadedDateFrom && $scope.query.UploadedDateFrom > $scope.query.UploadedDateTo)
            messager.warning($translate('error_item_batch.uploadDateFromLargerError'))
            return
        if($scope.query.CompletedDateTo && $scope.query.CompletedDateFrom && $scope.query.CompletedDateFrom > $scope.query.CompletedDateTo)
            messager.warning($translate('error_item_batch.completeDateFromLargerError'))
            return
        $scope.preparePaging()
        $scope.initSortInfo()
        common.refreshDataGrid($scope,$scope.dataGridName_batchItemUpload,$scope.refreshKey_batchItemUpload,$scope.query.PagingInfo)

    #if(common.currentUser.VendorNumber != '0')   
        #$scope.searchUploadDataGrid()

    $scope.search = ->
        $scope.searchUploadDataGrid()

    $scope.pageChangedUpload = (p)->
        return if common.currentUser.VendorNumber == "0"
        $scope.query.PagingInfo = {} if(!$scope.query.PagingInfo)
        $scope.query.PagingInfo.isExportAction = p.isExportAction
        $scope.query.PagingInfo.isExportAction_All = p.isExportAction_All
        $scope.query.PagingInfo.pageSize = p.pageSize
        $scope.query.PagingInfo.startpageindex = p.page-1
        $scope.query.PagingInfo.endpageindex = p.page-1
        common.setServerSorting($scope.query, p)
        $scope.searchUploadHistory()

    $scope.searchUploadHistory = ->
        if($scope.query.UploadedDateFrom && new Date($scope.query.UploadedDateFrom).toString() == 'Invalid Date')
            messager.warning($translate('error_item_batch.uploadDateFromInvalid'))
            return
        if($scope.query.UploadedDateTo && new Date($scope.query.UploadedDateTo).toString() == 'Invalid Date')
            messager.warning($translate('error_item_batch.uploadDateToInvalid'))
            return
        if($scope.query.CompletedDateFrom && new Date($scope.query.CompletedDateFrom).toString() == 'Invalid Date')
            messager.warning($translate('error_item_batch.completeDateFromInvalid'))
            return
        if($scope.query.CompletedDateTo && new Date($scope.query.CompletedDateTo).toString() == 'Invalid Date')
            messager.warning($translate('error_item_batch.completeDateToInvalid'))
            return
        if($scope.query.UploadedDateTo && $scope.query.UploadedDateFrom && $scope.query.UploadedDateFrom > $scope.query.UploadedDateTo)
            messager.warning($translate('error_item_batch.uploadDateFromLargerError'))
            return
        if($scope.query.CompletedDateTo && $scope.query.CompletedDateFrom && $scope.query.CompletedDateFrom > $scope.query.CompletedDateTo)
            messager.warning($translate('error_item_batch.completeDateFromLargerError'))
            return
        requestItem = angular.copy($scope.query)
        $scope.queryAPIUpload(requestItem)

    $scope.queryAPIUpload = (requestItem)->
        if(!requestItem.PagingInfo)
            requestItem.PagingInfo = $scope.preparePaging()
        if(requestItem.MyUploadOnly==true)
            requestItem.RequestUser=common.currentUser.ID
        requestItem.VendorNumber = common.currentUser.VendorNumber
        if(requestItem.UploadedDateFrom=='')
            delete requestItem.UploadedDateFrom
        else if(requestItem.UploadedDateFrom && requestItem.UploadedDateFrom.indexOf('GMT') < 0)
            requestItem.UploadedDateFrom=common.convertToDatetime(requestItem.UploadedDateFrom,false)   
             
        if(requestItem.UploadedDateTo=='')
            delete requestItem.UploadedDateTo
        else if(requestItem.UploadedDateTo && requestItem.UploadedDateTo.indexOf('GMT') < 0)
            requestItem.UploadedDateTo=common.convertToDatetime(requestItem.UploadedDateTo,true)  
           
        if(requestItem.CompletedDateFrom=='')
            delete requestItem.CompletedDateFrom
        else if(requestItem.CompletedDateFrom && requestItem.CompletedDateFrom.indexOf('GMT') < 0)
            requestItem.CompletedDateFrom=common.convertToDatetime(requestItem.CompletedDateFrom,false)
              
        if(requestItem.CompletedDateTo=='')
            delete requestItem.CompletedDateTo
        else if(requestItem.CompletedDateTo && requestItem.CompletedDateTo.indexOf('GMT') < 0)
            requestItem.CompletedDateTo=common.convertToDatetime(requestItem.CompletedDateTo,true)

        batchItemCreationAPI.query requestItem
            ,(response)->
                if(response&&response.Succeeded)
                    $scope.currentQuery.totalItems = response.TotalRecordCount
                    $scope.uploadHistoryList=response.BatchItemCreationFileList
                    $scope.loaduploadUserList($scope.uploadHistoryList)
            ,(error)->

    $scope.loaduploadUserList = (batchItemlist)->
        requestUser = {
            action1: "query"
        }
        userAPI.queryUserList requestUser,
            (response) ->
                if(response&&response.Succeeded==true)
                    for batchItem in batchItemlist
                        for user in response.UserList
                            if(batchItem.UploadUserID==user.ID.toString())
                                batchItem.UploadUserName=user.LoginName
                        if(batchItem.UploadUserName==undefined)        
                            if(isNaN(batchItem.UploadUserID)==false)
                                batchItem.UploadUserName='Newegg'
                            else if ($scope.guidReg.test(batchItem.UploadUserID))
                                batchItem.UploadUserName='System Admin User'
                            else
                                batchItem.UploadUserName=batchItem.UploadUser
                        if(batchItem.Status == 'CompletedWithError')
                            batchItem.Status = 'Completed With Error'        
                    $scope.callbackEvent_upload(batchItemlist) if $scope.callbackEvent_upload     
         ,(error)->
        
])
.controller('ItemUploadCtrl',
["$scope", ($scope) ->

  $scope.url = "www.test.com"
])