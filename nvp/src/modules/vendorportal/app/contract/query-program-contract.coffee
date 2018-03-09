angular.module('vp-query-program-contract',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.queryprogramcontract.us)
    .translations('zh-cn',resources.vendorportal.queryprogramcontract.cn)
    .translations('zh-tw',resources.vendorportal.queryprogramcontract.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/query-program-contract",
      templateUrl: "/modules/vendorportal/app/contract/query-program-contract.tpl.html"
      controller: 'QueryProgramContractCtrl'
    .when "/query-program-contract/:option",
      templateUrl: "/modules/vendorportal/app/contract/query-program-contract.tpl.html"
      controller: 'QueryProgramContractCtrl'
])

.controller('QueryProgramContractCtrl',
["$scope","$filter","$q","$translate","messager","common","eimsAPI","mail","$http","$routeParams","$window",
($scope,$filter,$q,$translate,messager,common,eimsAPI,mail,$http,$routeParams,$window) ->

   # ***************************  mapping  *********************** #
   $scope.actionTypes = {
      approve:'13'
      decline:'14'
      history:'08'
   }

   #********************** OrderType for attachment  ***********************#
   $scope.OrderType = {
      EIMSContractRequest: 203 #In this task the order is always 203
      RERUN_PERIOD: 400
      COMMON_INVOICE: 202
      COMMON_PROGRAM: 201
      INVOICE: 166
      COMPOSITERULE: 300
      INVOICE_RECONCILIATION: 182
      PENDING_INVOICE: 170
      RULE_PROGRAM: 164
      PENDING_RULE_PROGRAM: 171
   }

   #********************** Attachment type  ***********************#
   $scope.attachmentType = {
      SUPPORT_DOCUMENT: 'S' #In this task the attachment type is always S
      CONTRACT: 'C'
      Aggrement: 'A'
      POP: 'P'
      VendorConfirmation: 'V'
   }

   #********************** EventType  ***********************#
   $scope.eventType = {
      VOID_ATTACHMENT: 168
      ADD_ATTACHMENT: 167
   }
   # ***************************  Search  *********************** #
   $scope.dataGridName = "queryProgramContractGrid"
   $scope.refreshKey = "refresh.query-program-contract"
   currentDate = new Date()
   
   getDate = (addDays) ->
     return $filter('date')(angular.copy(currentDate).setDate(currentDate.getDate() + addDays),'yyyy-MM-dd')
    
   $scope.initCombboxData = ->
      eimsAPI.getRebateType {action:'rebate-type'}
         , (response) ->
             $scope.rebeatTypeList = [ { Description : 'All'} ]
             if response && response.RebateTypeList.length > 0
                $scope.rebeatTypeList = $scope.rebeatTypeList.concat(response.RebateTypeList)
      eimsAPI.getStatus {action:'contract-request-status'}
         , (response) ->
             $scope.statusList = [ { Description : 'All'} ]
             if response && response.ContractStatusList.length > 0
                tempContractStatusList = $filter('filter')(response.ContractStatusList, (item)-> item.Code != '001')
                $scope.statusList = $scope.statusList.concat(tempContractStatusList)

   $scope.initCombboxData()

   $scope.query = {
      StartDateBegin : getDate(-7)
      StartDateEnd : getDate(-1)
      EndDateBegin : getDate(-7)
      EndDateEnd : getDate(-1)
   }

   checkQueryForm = ->
        if $scope.query.ApplyStartDate
            if !$scope.query.StartDateBegin || $scope.query.StartDateBegin==''
                messager.error('[Start Date] is invalid: Date-from and date-to is required if you enabled the Start Date.')
                return false
            if !$scope.query.StartDateEnd || $scope.query.StartDateEnd==''
                messager.error('[Start Date] is invalid: Date-from and date-to is required if you enabled the Start Date.')
                return false
            if $scope.query.StartDateBegin && new Date($scope.query.StartDateBegin).toString() == 'Invalid Date'
                messager.error('Invalid Start Date.')
                return false
            if $scope.query.StartDateEnd && new Date($scope.query.StartDateEnd).toString() == 'Invalid Date'
                messager.error('Invalid Start Date.')
                return false
            if $scope.query.StartDateBegin && $scope.query.StartDateEnd && $scope.query.StartDateBegin > $scope.query.StartDateEnd
                messager.error('[Start Date] is invalid: date-from should be earlier than date-to.')
                return false
        if $scope.query.ApplyEndDate
            if !$scope.query.EndDateBegin || $scope.query.EndDateBegin==''
                messager.error('[End Date] is invalid: Date-from and date-to is required if you enabled the End Date.')
                return false
            if !$scope.query.EndDateEnd || $scope.query.EndDateEnd==''
                messager.error('[End Date] is invalid: Date-from and date-to is required if you enabled the End Date.')
                return false
            if $scope.query.EndDateBegin && new Date($scope.query.EndDateBegin).toString() == 'Invalid Date'
                messager.error('Invalid End Date.')
                return false
            if $scope.query.EndDateEnd && new Date($scope.query.EndDateEnd).toString() == 'Invalid Date'
                messager.error('Invalid End Date.')
                return false
            if $scope.query.EndDateBegin && $scope.query.EndDateEnd && $scope.query.EndDateBegin > $scope.query.EndDateEnd
                messager.error('[End Date] is invalid: date-from should be earlier than date-to.')
                return false
        return true

   $scope.search = ->
        messager.clear()
        if !checkQueryForm()
            return
        $scope.preparePaging()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

   dayDiff = (date)->
        dateNow = moment(new Date()).format("MM/DD/YYYY")
        endDate = moment(date).format("MM/DD/YYYY")
        times = new Date(dateNow) - new Date(endDate)
        return Math.floor(times/(1000*60*60*24))

   $scope.checkDifferentDays = (reponse)->
        for item in reponse.Data
            item.isDifferent180Days = dayDiff(item.EndDate) >= 180

    $scope.queryAPI = ->
        requestItem = $scope.getRequestItem()
        $scope.currentQuery = angular.copy(requestItem)
        delete requestItem.PagingInfo
        eimsAPI.queryProgramContract requestItem
        ,(response) ->
            if(response)
               $scope.checkDifferentDays(response)
               tempResult= { TotalCount:response.TotalCount,ResultList:response.Data}
               $scope.callbackEvent(tempResult) if $scope.callbackEvent  
               delete $scope.query.RequestNumber
            else
               $scope.callbackEvent({ TotalCount:0,ResultList:[]} ) if $scope.callbackEvent
               delete $scope.query.RequestNumber
        ,(error) ->
            $scope.callbackEvent({ TotalCount:0,ResultList:[]} ) if $scope.callbackEvent
            delete $scope.query.RequestNumber

    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)
    
    $scope.preparePaging()
    
    $scope.pageChanged = (p)->
        $scope.query.PagingInfo.pageSize = p.pageSize
        $scope.query.PagingInfo.startpageindex=p.page-1
        $scope.query.PagingInfo.endpageindex=p.page-1
        setPOServerSorting($scope.query, p)
        $scope.queryAPI()

    setPOServerSorting = (query,p) ->
       if(!p.sort || p.sort.length == 0)
         delete query.ColumnName
         delete query.IsOrderDesc
         return
       query.ColumnName = p.sort[0].field
       dir = if p.sort[0].dir == 'asc' then false else true
       query.IsOrderDesc = dir

    $scope.getRequestItem = ()->
        requestItem = angular.copy($scope.query)
        requestItem.action = 'contract'
        requestItem.action1 = 'query'
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging()
        requestItem.BeginIndex=requestItem.PagingInfo.startpageindex*requestItem.PagingInfo.pageSize+1
        requestItem.PageCount=requestItem.PagingInfo.pageSize
        requestItem.vendorNumber = common.currentUser.VendorNumber
        return requestItem

    $scope.gridData = {
        columns: [
                {
                    field: "RequestNumber"
                    width: "80px"
                    title: "RequestNumber"
                    sortfield:"RequestNumber"
                    headerTemplate: "{{ 'qpc_header.requestNumber' | translate  }}"
                    template: kendo.template($("#tpl_programcontract_requestnumber").html())
                }
                {
                    field: "ProgramDescription"
                    title: "Program Description"
                    sortfield:"ProgramDescription"
                    headerTemplate: "<span title='Program Description'>{{ 'qpc_header.programDesc' | translate  }}</span>"
                    template: "<span title='{{dataItem.ProgramDescription}}'>{{ dataItem.ProgramDescription  }}</span>"
                }
                {
                    field: "EIMSType"
                    title: "Rebate Type"
                    sortfield:"EIMSType"
                    headerTemplate: "{{ 'qpc_header.rebateType' | translate  }}"
                }
                {
                    field: "ContractAmount"
                    title: "Contract Amount"
                    sortfield:"ContractAmount"
                    headerTemplate: "{{ 'qpc_header.contractAmount' | translate  }}"
                    template: "<span>{{ dataItem.ContractAmount | vfCurrency:'$'}}</span>"
                }
                {
                    field: "CreditToUserName"
                    title: "Credit To Person"
                    sortfield:"CreditToUserName"
                    headerTemplate: "{{ 'qpc_header.creditToPerson' | translate  }}"
                }
                {
                    field: "ContractDate"
                    title: "Date Submitted"
                    sortfield:"ContractDate"
                    headerTemplate: "{{ 'qpc_header.dateSubmitted' | translate  }}"
                    type: "date",
                    format: "{0:MM/dd/yyyy}",
                }
                {
                    field: "ApproveDate"
                    title: "Date Approved"
                    sortfield:"ApproveDate"
                    headerTemplate: "{{ 'qpc_header.dateApproved' | translate  }}"
                    #type: "date",
                    #format: "{0:MM/dd/yyyy}",
                    template: "<span ng-hide='dataItem.ApproveDate.indexOf(\"-22\") >= 0'>{{dataItem.ApproveDate | moment: 'MM/DD/YYYY'}}</span>"
                }
                {
                    field: "StartDate"
                    title: "Start Date"
                    sortfield:"StartDate"
                    headerTemplate: "{{ 'qpc_header.startDate' | translate  }}"
                    type: "date",
                    format: "{0:MM/dd/yyyy}",
                }
                {
                    field: "EndDate"
                    title: "End Date"
                    sortfield:"EndDate"
                    headerTemplate: "{{ 'qpc_header.endDate' | translate  }}"
                    type: "date",
                    format: "{0:MM/dd/yyyy}",
                }
                {
                    field: "Status"
                    width: "120px"
                    title: "Rebate Type"
                    sortfield:"Status"
                    headerTemplate: "{{ 'qpc_header.status' | translate  }}"
                    template: kendo.template($("#tpl_programcontract_status").html())
               }
            ]
    }

   #$("#gridContainer").resize(() -> Console.log("fffdd"))
   $scope.gridOptions =
       toolbar: ["empty"]
       height:common.getTableHeight(205) + "px"
       checkBoxColumn:false
       columnMenu: false
       dataSource: 
         type: "odata"
         transport:
             read: (options) ->
               $scope.callbackEvent = (result) ->
                   options.success d:
                      results: result.ResultList or []
                      __count: result.TotalCount
               $scope.pageChanged(options.data)
         serverPaging: true
         serverSorting: true
       filterable: false
       columns: $scope.gridData.columns

   $scope.detailEntity = {}
 
   # ***************************  Status Report Modal *********************** #
   $scope.currentStatusReport = {}
   $scope.currenthistoryList = []
   $scope.noHistoryShow = false

   $scope.showStatusModal = (item) ->
     return if item.isDifferent180Days
     $scope.currentStatusReport = {}
     $scope.currenthistoryList = []
     $scope.noHistoryShow = false
     $scope.statusModal = true
     loadStatusReport(item.Status)
     $scope.currentStatusReport.requestNumber = item.RequestNumber

   $scope.closeStatusModal = ->
     $scope.statusModal = false

   loadStatusReport = (status) ->
     switch status
        when 'Creator Pending'
          $scope.currentStatusReport = {
               step_1:true
               step_1_desc:'Pending'
          }
        when 'Creator Released'
          $scope.currentStatusReport = {
               step_1:true
               step_1_desc:'Newegg Pending'
          }
        when 'PM Approval'
          $scope.currentStatusReport = {
               step_1:true
               step_1_desc:'Newegg Released'
               step_2:true
               step_2_desc:'Pending'
          }
        when 'PM Reject'
          $scope.currentStatusReport = {
               step_1:true
               step_1_desc:'Newegg Pending'
          }
        when 'Vendor Approval'
          $scope.currentStatusReport = {
               step_1:true
               step_1_desc:'Newegg Released'
               step_2:true
               step_2_desc:'Vendor Approval'      
               step_3:true
               step_3_desc:'Pending'         
          }
        when 'Vendor Reject'
          $scope.currentStatusReport = {
               step_1:true
               step_1_desc:'Vendor Reject'
          }
        when 'PMD Approval'
          $scope.currentStatusReport = {
               step_1:true
               step_1_desc:'Newegg Released'
               step_2:true
               step_2_desc:'Vendor Approval'      
               step_3:true
               step_3_desc:'Newegg Final Approval' 
               step_4:true
               step_4_desc:'Pending'
          }
        when 'PMD Reject'
          $scope.currentStatusReport = {
               step_1:true
               step_1_desc:'Newegg Final Reject'
          }

   $scope.showStatusHistory = ->
        if $scope.detailEntity && $scope.detailEntity.RequestNumber
           $scope.gettingStatusHistory = true
        eimsAPI.getStatusHistory { 
           action:'contract', 
           action1:'history', 
           RequestNumber: $scope.currentStatusReport.requestNumber,
           Handler: "{ActionType:"+$scope.actionTypes.history+",ActionUserID:"+common.currentUser.LoginName+"}"
          }
        ,(response) ->
            $scope.gettingStatusHistory = false
            if(response && response.Succeeded)
               $scope.currenthistoryList = $filter('filter')(response.ContractHistoryList,(i)-> return i.UserID.trim().toLowerCase() == common.currentUser.LoginName.trim().toLowerCase()) #common.currentUser.LoginName
               if $scope.currenthistoryList.length == 0 then $scope.noHistoryShow = true else $scope.noHistoryShow = false
        ,(error) ->
            messager.error('Get status report history error. ')
            $scope.gettingStatusHistory = false


#**************************************   Attachment View  *************************************#
   $scope.currentAttachment = {}
   $scope.currentAttachment.contractAttachmentList = []

   $scope.getContractAttachmentList = () ->
        eimsAPI.getAttachmentList {
           action:'contract',
           action1:'attachment',
           OrderNumber: $scope.detailEntity.RequestNumber,
           OrderType: $scope.OrderType.EIMSContractRequest
          }
        ,(response) ->
            if(response && response.Succeeded)
               $scope.currentAttachment.contractAttachmentList = $filter('filter')(angular.copy(response.AttachmentList),(i)-> return i.UploadUserCode.trim().toLowerCase() == common.currentUser.LoginName.trim().toLowerCase())
        ,(error) ->
            messager.error('Get attachment failed.')

   # ***************************  Contract Detail Display*********************** #
   scrollToDetail = () ->
     $('html, body').animate({
                scrollTop: window.innerHeight - 85
     }, 'slow');

   $scope.userEmailList = []
   $scope.eimsRequestCreator = ''

   $scope.getUserEmail = (user) ->
      eimsAPI.getUserDetail {action:'user-information',Code:user,TotalCount:1}
      ,(response)->
          if(response && response.UserList[0])
            $scope.userEmailList.push(response.UserList[0])

   $scope.getUserName = (user) ->
      eimsAPI.getUserDetail {action:'user-information',Code:user,TotalCount:1}
      ,(response)->
          if(response && response.UserList[0].DisplayDescription)
            $scope.eimsRequestCreator = response.UserList[0].DisplayDescription

   $scope.disableApprove = false
   $scope.loadingApprove = false
   $scope.loadingReject = false
   $scope.showDetailInfo = (item) ->
        return if item.isDifferent180Days
        $scope.disableApprove = false
        $scope.disableReject = false
        $scope.detailEntity = {}
        eimsAPI.getContractDetail { 
           action:'contract', 
           RequestNumber: item.RequestNumber
          }
        ,(response) ->
            if(response && response.Succeeded)
               AnalyticalDetailData(response)
               scrollToDetail()
               $scope.getContractAttachmentList()
               $scope.getUserEmail($scope.detailEntity.CreateUser)
               $scope.getUserEmail($scope.detailEntity.PMDUserId)
               $scope.getUserEmail($scope.detailEntity.CreditToUser)
               $scope.getUserName($scope.detailEntity.CreateUser)
            else
               messager.error('Get contract detail info error. ')
        ,(error) ->
            messager.error('Get contract detail info error. ')

   # detail api 返回结果解析
   AnalyticalDetailData = (apiData) -> 
     if(!apiData || !apiData.ContractItemList || !apiData.ContractItemList)
       $scope.detailEntity = apiData
       return
     for item in apiData.ContractItemList.ContractItems
         if item.ContractScopeList
            for subItem in item.ContractScopeList.ContractItemScopes
                item.DisplayItemNumbers = GetJoinStr(item.DisplayItemNumbers,subItem.ItemNumber)
                item.DisplaySubcategory = GetJoinStr(item.DisplaySubcategory,subItem.ItemCategoryName)
                item.DisplayCategory = GetJoinStr(item.DisplayCategory,subItem.ItemGroupName)
                item.Manufacturer = GetJoinStr(item.Manufacturer,subItem.ItemManufactoryName)
                if apiData.EIMSType == '007'  #Combo SR
                   subItem.Quantity = subItem.MinQty
     if apiData.ContractCountryList && apiData.ContractCountryList.TotalCount > 0
        apiData.hasUSA = hasBusiness('USA',apiData.ContractCountryList.ContractCountrys)
        apiData.hasCAN = hasBusiness('CAN',apiData.ContractCountryList.ContractCountrys)
        apiData.hasUSB = hasBusiness('USB',apiData.ContractCountryList.ContractCountrys)
     if apiData.Status == '003' #PM Approve 
        apiData.hasApproveRejectAuth = true
     setCompanyDesc(apiData) if apiData.CompanyCode
     $scope.detailEntity = apiData

   # mdf/coop下，拼接每组item里面的字段，分号连接
   checkDuplication = (str, subStr) ->
     if(!str)
       return false
     else
       strArray = str.split(';')
       for item in strArray
         if item.toLowerCase() == subStr.toLowerCase()
           return true
     return false

   GetJoinStr = (str, subStr) ->
     if(!str)
       str = subStr
     else
       return str if checkDuplication(str, subStr)
       str = str + ';' + subStr
     return str

    #判断 region/unit  has USA/CAN/USB
    hasBusiness= (key,list) ->
      result = $filter('filter')(list, (i)-> return i.CountryCode == key)
      return true if(result.length > 0)
      return false

    #set company description
    setCompanyDesc = (apiData) ->
      companyCode = apiData.CompanyCode.toString()
      switch companyCode
        when '1000'
          apiData.companyDesc = 'Magnell (1000)'
          break
        when '1003'
          apiData.companyDesc = 'Newegg (1003)'  
          break
        when '1021'
          apiData.companyDesc = 'Newegg Business (1021)'  
          break
        when '1200'
          apiData.companyDesc = 'Newegg Canada (1200)' 
          break      

#**************************************   Attachment View  *************************************#
   $scope.contractAttachmentModal = false
   $scope.rejectModal = false
   $scope.showContractAttachment = ()->
      $scope.contractAttachmentModal = true

   $scope.showRejectModal = ()->
      $scope.rejectModal = true
      $scope.disableReject = false
      $scope.rejectAttachmentNumber = 0
      $scope.rejectMemo = undefined
      eimsAPI.getDFISProperty {
        action:"dfis-property",
        ContractRequestNumber: $scope.detailEntity.RequestNumber
      }
      ,(response)->
        $scope.currentAttachment.rejectConfig.Type = response.FileType
        $scope.currentAttachment.rejectConfig.Group = response.FileGroup
      ,(error)->
        messager.error('Get DFIS property failed.')

   $scope.contractUploadModal = false
   $scope.currentAttachment.uploadContractFileList = []
   $scope.currentAttachment.uploadRejectFileList = []
   $scope.currentAttachment.contractConfig = {
      MaxSize: '10'
      MaxCount: 10
      Type: 'MDF'
      Group: 'EIMS_1000'
      rejects: ["exe","bat","ini","dll","config"]
   }

   $scope.currentAttachment.rejectConfig = {
      MaxSize: '10'
      MaxCount: 1
      Type: 'MDF'
      Group: 'EIMS_1000'
      rejects: ["exe","bat","ini","dll","config"]
   }

# ***************************  Approve  *********************** #
   $scope.approve = ->
      common.confirmBox "Are you sure approve this contract?","", ->
        $scope.$apply(()-> $scope.disableApprove = true)
        $scope.$apply(() -> $scope.loadingApprove = true)
        eimsAPI.approve { 
           action:'contract', 
           RequestNumber: $scope.detailEntity.RequestNumber,
           Handler: {ActionType:$scope.actionTypes.approve,ActionUserID:common.currentUser.LoginName}
          }
        ,(response) ->
            $scope.loadingApprove = false
            if(!response.ErrorList || response.ErrorList.length == 0)
               messager.success('Approve this contract successfully.')
               $scope.sendApproveMail()
               common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)
            else
               errorMsg = $scope.getApiErrorMsg(response.ErrorList)
               messager.error(errorMsg)
               $scope.disableApprove = false
        ,(error) ->
            messager.error('Approve contract error.')
            $scope.disableApprove = false
            $scope.loadingApprove = false
      return

   $scope.reGetDetailInfo = (requestNumber) ->
        $scope.detailEntity = {}
        eimsAPI.getContractDetail { 
           action:'contract', 
           RequestNumber: requestNumber
          }
        ,(response) ->
            if(response && response.Succeeded)
               AnalyticalDetailData(response)
               $scope.getContractAttachmentList()
               scrollToDetail()
            else
               messager.error('Get contract detail info error. ')
        ,(error) ->
            messager.error('Get contract detail info error. ')
# ***************************  Reject  *********************** #
   $scope.rejectEntity = {}

# ***************************  Send mail  *********************** #
   $scope.NeweggCentralUrl = ''
   $scope.getNeweggCentralUrl = () ->
     eimsAPI.getNeweggCentralUrl {action:'newegg-central-url'}
     ,(response)->
       if response && response.Succeeded
         $scope.NeweggCentralUrl = response.NeweggCentralContractUrl

   $scope.getNeweggCentralUrl()

   $scope.buildEmailToUserList = (needPMDUser) ->
      userEmailListTemp = []
      createUser = $filter('filter')($scope.userEmailList, (i)->i.Code.toLowerCase() == $scope.detailEntity.CreateUser.toLowerCase())
      PMDUser = $filter('filter')($scope.userEmailList, (i)->i.Code.toLowerCase() == $scope.detailEntity.PMDUserId.toLowerCase())
      creditToUser = $filter('filter')($scope.userEmailList, (i)->i.Code.toLowerCase() == $scope.detailEntity.CreditToUser.toLowerCase())
      userEmailListTemp.push(createUser[0].EmailAddress) if createUser && createUser.length > 0
      userEmailListTemp.push(PMDUser[0].EmailAddress) if PMDUser && needPMDUser && PMDUser.length > 0
      userEmailListTemp.push(creditToUser[0].EmailAddress) if creditToUser && creditToUser.length > 0
      return userEmailListTemp

   $scope.sendApproveMail = ->
      $http.get('/modules/vendorportal/template/tpl_approveEimsContract.html')
      $http.get('/modules/vendorportal/template/tpl_approveEimsContract.html')
      .success((templateHtml)->
        from = common.currentUser.LoginName
        to = $scope.buildEmailToUserList(true).join(';')
        cc = common.currentUser.LoginName
        bcc = 'doris.x.tang@newegg.com;Seven.H.Huang@newegg.com;Ruby.J.Wang@newegg.com'
        RequestType = $scope.detailEntity.EIMSTypeDescription
        PMDName = common.currentUser.LoginName
        VendorName = $scope.detailEntity.VendorName
        RequestNumber = $scope.detailEntity.RequestNumber
        RequestName = $scope.detailEntity.ContractDescription
        EIMSRequestCreator = $scope.eimsRequestCreator
        LinkToNeweggCentral = $scope.NeweggCentralUrl.replace('{0}', RequestNumber)
        tempContent = templateHtml.replace('[VendorName]', VendorName)
        tempContent = tempContent.replace('[LinkToNeweggCentral]', LinkToNeweggCentral)
        tempContent = tempContent.replace('[RequestNumber]', RequestNumber)
        tempContent = tempContent.replace('[RequestName]', RequestName)
        tempContent = tempContent.replace('[RequestType]', RequestType)
        tempContent = tempContent.replace('[VendorName]', VendorName)
        body = tempContent
        subject = '(Action Req) Vendor has accepted request agreement for '+RequestNumber+' '+RequestType+'. Waiting for PMD approval to activate'
        $scope.sendEmail(to,cc,bcc,subject,body,from)
      )

   $scope.htmlEncode = (str)->
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

   $scope.getContractAttachmentListAsync = () ->
        deferred = $q.defer()
        eimsAPI.getAttachmentList {
           action:'contract',
           action1:'attachment',
           OrderNumber: $scope.detailEntity.RequestNumber,
           OrderType: $scope.OrderType.EIMSContractRequest
          }
        ,(response) ->
            if(response && response.Succeeded)
               $scope.currentAttachment.contractAttachmentList = $filter('filter')(angular.copy(response.AttachmentList),(i)-> return i.UploadUserCode.trim().toLowerCase() == common.currentUser.LoginName.trim().toLowerCase())
               deferred.resolve('OK')
            else
               deferred.reject('ERROR')
        ,(error) ->
            messager.error('Get attachment failed.')
            deferred.reject('ERROR')
        return deferred.promise

   $scope.sendRejectMail = ->
      $http.get('/modules/vendorportal/template/tpl_rejectEimsContract.html')
      .success((templateHtml)->
        from = common.currentUser.LoginName
        to = $scope.buildEmailToUserList(false).join(';')
        cc = common.currentUser.LoginName
        bcc = 'doris.x.tang@newegg.com;Seven.H.Huang@newegg.com;Ruby.J.Wang@newegg.com'
        RequestType = $scope.detailEntity.EIMSTypeDescription
        MemoInfo = ''
        AttachmentInfo = ''
        if $scope.currentAttachment.contractAttachmentList && $scope.currentAttachment.contractAttachmentList.length > 0
          attachment = $filter('filter')($scope.currentAttachment.contractAttachmentList, (object)-> object.AttachmentNumber == $scope.rejectAttachmentNumber)
          if attachment && attachment.length > 0
              tempMemo = if attachment[0].Description then attachment[0].Description else ''
              MemoInfo = 'Memo : '+$scope.htmlEncode(tempMemo)+'<br />'
              AttachmentInfo = 'Attachment : <a href="'+attachment[0].DownloadUrl+'">'+attachment[0].OriginalFileName+'</a> <br />'
          else
              MemoInfo = 'Memo : '+$scope.htmlEncode($scope.rejectMemo)+'<br />'
        else
          MemoInfo = 'Memo : '+$scope.htmlEncode($scope.rejectMemo)+'<br />'
        VendorName = common.currentUser.VendorName
        RequestNumber = $scope.detailEntity.RequestNumber
        EIMSType = $scope.detailEntity.EIMSTypeDescription
        EIMSRequestCreator = $scope.eimsRequestCreator
        LinkToNeweggCentral = $scope.NeweggCentralUrl.replace('{0}', RequestNumber)
		#replace template
        tempContent = templateHtml.replace('[EIMSRequestCreator]', EIMSRequestCreator)
        tempContent = tempContent.replace('[LinkToNeweggCentral]', LinkToNeweggCentral)
        tempContent = tempContent.replace('[VendorName]', VendorName)
        tempContent = tempContent.replace('[RequestNumber]', RequestNumber)
        tempContent = tempContent.replace('[EIMSType]', EIMSType)
        tempContent = tempContent.replace('[VendorName]', VendorName)
        $scope.getContractAttachmentListAsync().then(
            (info)->
                if $scope.currentAttachment.contractAttachmentList && $scope.currentAttachment.contractAttachmentList.length > 0
                    attachment = $filter('filter')($scope.currentAttachment.contractAttachmentList, (object)-> object.AttachmentNumber == $scope.rejectAttachmentNumber)
                    if attachment && attachment.length > 0
                        tempMemo = if attachment[0].Description then attachment[0].Description else ''
                        MemoInfo = 'Memo : '+$scope.htmlEncode(tempMemo)+'<br />'
                        AttachmentInfo = 'Attachment : <a href="'+attachment[0].DownloadUrl+'">'+attachment[0].OriginalFileName+'</a> <br />'
                    else
                        MemoInfo = 'Memo : '+$scope.htmlEncode($scope.rejectMemo)+'<br />'
                else
                    MemoInfo = 'Memo : '+$scope.htmlEncode($scope.rejectMemo)+'<br />'
                tempContent = tempContent.replace('[MemoInfo]', MemoInfo)
                tempContent = tempContent.replace('[AttachmentInfo]', AttachmentInfo)
                body = tempContent
                subject = '(Action Req) Vendor has denied the agreement. Please review'
                $scope.sendEmail(to,cc,bcc,subject,body,from)
            ,(error)->
                body = tempContent
                subject = '(Action Req) Vendor has denied the agreement. Please review'
                $scope.sendEmail(to,cc,bcc,subject,body,from)
        )
      )

   $scope.sendEmail = (to,cc,bcc,subject,body,from) ->
      $scope.reGetDetailInfo($scope.detailEntity.RequestNumber)
      mail.sendMail(to,cc,bcc,subject,body,from, (isSucceed) ->
         if isSucceed
           console.log("Sent Mail Success")
         else
           console.log("Sent Mail Failed"))

   $scope.getApiErrorMsg = (errorList) ->
      temp =  []
      for err in errorList
         temp.push(err.ErrorDescription)
      return temp.join('<br>')

   # *************************** Forward ************************ #
   $scope.forward.option =$routeParams.option
   if $scope.forward.option
       if $scope.forward.option.toString() == 'pm-approve'
           common.currentUser.VendorNumber = if common.pageInfo.home then common.pageInfo.home.lastVendorNumber else undefined
           $scope.query.Status = '003'
           $scope.search()
       else
           return if common.currentUser.Type=="Internal"
           $scope.query.VendorNumber = common.currentUser.VendorNumber
           $scope.query.RequestNumber = $scope.forward.option
           $scope.search()

])