negServices.factory('common',
["$location","$http","$filter","$q","$window","$rootScope","$translate","storage","profileApi","userAPI","authorize",($location,$http,$filter,$q,$window,$rootScope,$translate,storage,profileApi,userAPI,authorize) ->

 $rootScope.isSumbitSuccess = false
 agentVendorType = ''
 formArray = ['shipNoticeForm','InvoiceForm','customerReviewForm']
 agentPageList = ['home','dashboard','orderlist','account-information','user-account-setting','itemlist','batch-processing','inventory-report','purchasing-report','sell-through-report','rma-report','whs-receiving-violation-report','vendor-queue-report','iron-egg-price-match-report','customer-reviews','self-testing-dashboard','query-contract','create-item-request','query-item-request','out-of-stock-report','product-roadmap', 'batch-item-creation','query-program-contract','create-item-update','query-item-profile']
 nvfAgentPageList = ['query-contract','inventory-report','purchasing-report','sell-through-report','rma-report','whs-receiving-violation-report','vendor-queue-report','iron-egg-price-match-report','customer-reviews','create-item-request','query-item-request','out-of-stock-report','product-roadmap', 'batch-item-creation','create-item-update','query-item-profile']
 vfAgentPageList = ['orderlist','account-information','user-account-setting','itemlist','batch-processing','self-testing-dashboard']
 esdAgentPageList = []
 specialAgentPageList = ['home','user-account-setting','query-contract']
 specialVfNvfAgentPageList = ['dashboard','query-program-contract']
 cacheObjectList = []


 pageInfo = {
   isBackPage : false
   #Modify by Doris.X.Tang 02/24/2016
   isAutoBackPage : false
   link:[]
 }

 if !Array::find
   Array::find = (predicate) ->
     if this == null
       throw new TypeError('Array.prototype.find called on null or undefined')
     if typeof predicate != 'function'
       throw new TypeError('predicate must be a function')
     list = Object(this)
     length = list.length >>> 0
     thisArg = arguments[1]
     value = undefined
     i = 0
     while i < length
       value = list[i]
       if predicate.call(thisArg, value, i, list)
         return value
       i++
     undefined

 getAgentVendorListQuery = ->
     pagePathArray = $location.$$path.toLowerCase().split('/')
     if specialAgentPageList.indexOf(pagePathArray[1]) >= 0
       return { agentVendorType : 'all' }
     if nvfAgentPageList.indexOf(pagePathArray[1]) >= 0
       return { IncludeStockingPOVendor : true, IncludeVFVendor : false , IncludeESDVendor: false, agentVendorType : 'nvf'}
     if esdAgentPageList.indexOf(pagePathArray[1]) >= 0
       return { IncludeStockingPOVendor : false, IncludeVFVendor : false , IncludeESDVendor : true, agentVendorType : 'esd'}
     if vfAgentPageList.indexOf(pagePathArray[1]) >= 0
       return { IncludeStockingPOVendor : false, IncludeVFVendor : true , IncludeESDVendor : false, agentVendorType : 'vf'}
     if specialVfNvfAgentPageList.indexOf(pagePathArray[1]) >= 0
       return { IncludeStockingPOVendor : true, IncludeVFVendor : true , IncludeESDVendor : false, agentVendorType : 'vfnvf'}

 currentScope = {}
 currentUser = {}
 vendorList = []
 agentVendorList = {
    vf : []
    nvf : []
    all : []
 }
 currentProfile = {}
 $window.vendorPortal = {}

 getPagging = (curretPagging) ->
   if(curretPagging)
     return {
       startpageindex : 0
       endpageindex : 0
       currentPage : 1
       pageSize : curretPagging.pageSize
     }
   else
     return {
       startpageindex : 0
       endpageindex : 0
       currentPage : 1
       pageSize : 20
     }

 getPagging_list = (curretPagging) ->
   if(curretPagging)
     return {
       startpageindex : 0
       endpageindex : 0
       currentPage : 1
       pageSize : curretPagging.pageSize
     }
   else
     return {
       startpageindex : 0
       endpageindex : 0
       currentPage : 1
       pageSize : 5
     }

 getRequestQuery = (requestItem, scope, currentQueryName) ->
   if(requestItem.PagingInfo.isExportAction == true || requestItem.PagingInfo.isExportAction_All == true)
       tempPagingInfo = angular.copy(requestItem.PagingInfo)
       if currentQueryName
         requestItem = angular.copy(scope[currentQueryName])
       else
         requestItem = angular.copy(scope.currentQuery)
#       if requestItem.PagingInfo.isExportAction_All == true
#         delete requestItem.PagingInfo
#       else
       requestItem.PagingInfo = tempPagingInfo
   else
      if currentQueryName
        scope[currentQueryName] = requestItem
      else
        scope.currentQuery = requestItem
   return requestItem

 refreshDataGrid = ($scope,gridName,key,currentPagging) ->
    grid = $("#"+gridName+"").data("kendoGrid")
    pagging = {
      page: currentPagging.startpageindex + 1
      pageSize: currentPagging.pageSize
    }
    if(grid && grid.dataSource && grid.dataSource._pageSize != currentPagging.pageSize)
      pagging.pageSize = grid.dataSource._pageSize
    if grid
      $scope.$broadcast(key,pagging)
    else
      interval = setInterval(->
           if $("#"+gridName+"").data("kendoGrid")
            clearInterval interval
            $scope.$broadcast(key,pagging)
        , 50)

 queryCallbackEventError = (scope,options) ->
    return if !scope
    scope.callbackEventError = (error) ->
            options.success d:
                    results: []
                    __count: -99
            options.error(error)

 savePageCache = (objQuery,objAdvancedSearchTextOutput) ->
    if !pageInfo.link[$location.$$path]
      pageInfo.link[$location.$$path] = {}
    pageInfo.link[$location.$$path].query = angular.copy(objQuery)
    pageInfo.link[$location.$$path].key = angular.copy(objAdvancedSearchTextOutput)
    if(this.currentUser.Type=='Internal')
       pageInfo.link[$location.$$path].vendorNumber = this.currentUser.VendorNumber
       pageInfo.link[$location.$$path].vendorName = this.currentUser.VendorName

 getPageCache =  ->
   #pageInfo.isBackPage = false
   path = $location.$$path
   if($rootScope.orderList_backDoSearch == true)
     path = $rootScope.orderList_backUrl
   if(pageInfo.link[path] && pageInfo.link[path].query)
      if(this.currentUser.Type=='Internal')
         this.currentUser.VendorNumber = pageInfo.link[path].vendorNumber
         this.currentUser.VendorName = pageInfo.link[path].vendorName
      return angular.copy(pageInfo.link[path])
   else
     return null

 clearBackPage = ->
   if(pageInfo.link[$location.$$path] && this.currentUser.Type=='Internal')
      if(!this.currentUser.agentVendor)
        this.currentUser.agentVendor = {}
      this.currentUser.agentVendor.VendorNumber = pageInfo.link[$location.$$path].vendorNumber
      this.currentUser.agentVendor.VendorName = pageInfo.link[$location.$$path].vendorName
      this.currentUser.agentVendor.hasSelected = true
   pageInfo.isBackPage = false
   #Modify by Doris.X.Tang 02/24/2016
   pageInfo.isAutoBackPage = false

 resetAgentVendor = (currentPath,loginUser) ->
   if(loginUser.Type!='Internal')
     return
   if(checkAgentPage(currentPath) == false)
     return
   if(!loginUser.agentVendor)
     return
   if(loginUser.agentVendor.hasFocus == false)
      loginUser.agentVendor.hasSelected = false
      loginUser.VendorNumber = '0'

 checkAgentPage = (currentPath) ->
   for page in agentPageList
     if(currentPath.indexOf(page) > -1)
       return true
   return false

 closeModal = ->
   $(".modal").css( "display", "none" )
   $(".modal-backdrop").css( "display", "none" )


 initUnSavedConfirm = (scope) ->
   this.currentScope = scope
   scope.$on "$locationChangeStart", (event,next,current) ->
     if(current.indexOf("/view") > 0 || next.indexOf("login") > 0)
       return
     isItemChange = false
     if(current.indexOf("/itemlist") > 0 && hasChangedItems("itemListGrid") == true)
          isItemChange = true
     if((checkFormChanged(event.currentScope) == true || isItemChange == true) && $rootScope.isSumbitSuccess == false)
       if(!confirm("You have unsaved changes, continue to jump will be lost the data?"))
         event.preventDefault()
       if($rootScope.isSumbitSuccess == true)
         $rootScope.isSumbitSuccess = false

 hasChangedItems= (dataGridName)->
    dataList = $("#"+dataGridName+"").data("kendoGrid").dataSource.data()
    if(dataList?)
        for item in dataList
            if(item.IsChanged)
                return true
    return false

 checkFormChanged = (scope) ->
   for index of formArray
     if(scope[formArray[index]] && scope[formArray[index]].$pristine == false)
       return true
   return false

 confirmBox=(confirmMessage,description,delegate,delegateCancel)->
    showMessage='';
    if(confirmMessage)
        showMessage+= '<div class="row"><label class="col-sm-12 vp-confirm-title" >'+confirmMessage+'</label></div>';
    if(description)
        showMessage+='<div class="row"><label class="col-sm-12 vp-confirm-description ">'+description+'</label></div>'
    title=''
    successLabel = ''
    cancelLabel = ''
    lang = $translate.uses()
    switch lang
      when 'en-us'
        title = 'Confirm'
        successLabel = 'Yes'
        cancelLabel = 'No'
      when 'zh-cn'
        title = '确认'
        successLabel = '是'
        cancelLabel = '否'
      when 'zh-tw'
        title = '確認'
        successLabel = '是'
        cancelLabel = '否'
    bootbox.dialog {
      message: showMessage,
      title: title,
      buttons:
            success:
              label: successLabel,
              className: "btn-grey btn-sm confirm-button",
              callback: ->
                if(delegate)
                    delegate();
            cancel:
              label: cancelLabel,
              className: "btn-default btn-sm confirm-button",
              callback: ->
                bootbox.hideAll()
                if(delegateCancel)
                  delegateCancel()
    }

 currentRoutePath=->
    return $location.$$path

 navigate = (url) ->
   nextPage = url
   if(url.indexOf('/') != 0)
     nextPage='/'+url;
   $location.path(nextPage)

 setQueryFieldFromVdSearchControl=(query,output)->
    if(output.currentKeywords)
        query[output.currentSelectKey] = output.currentKeywords
    else
        delete query[output.currentSelectKey]

 pad=(number,length)->
    str = "" + number
    while (str.length < length)
        str = '0'+str
    return str

 getTimeZoneJson=()->
    offset = new Date().getTimezoneOffset()
    prefix = if offset<0 then '+' else '-'
    offset = prefix + pad(parseInt(Math.abs(offset/60)), 2)+pad(Math.abs(offset%60), 2)

 convertToDatetime=(dateString,needAddOneDay)->
    if(dateString==null||dateString==''||dateString==undefined)
        return dateString
    ymd=dateString.split('-')
    tempDate = new Date(ymd[0],ymd[1]-1,ymd[2],0,0,0,0)
    if(needAddOneDay)
        tempDate=new Date(tempDate.setDate(tempDate.getDate()+1))
    return tempDate.toUTCString().replace("UTC","GMT")
    #offset = tempDate.getTimezoneOffset()
    #second = tempDate.getTime()
    #return '\/Date(' + second + ')\/';

 #http://scmisbiztalk01:8100 GDV
 #http://10.1.24.159:8100/vendor-portal/v1 GQC
 #https://apis.newegg.com/vendor-portal/v1  PRD
 #http://sandboxapis.newegg.org/vendor-portal/v1  PRD-Testing

 apiURL={
    upload: NEG.VendorPortal_API.concat("/batch/v2/file/upload")
    bacthUpload: NEG.VendorPortal_API.concat("/batch/v2/file-upload-async") 
    commonUpload:NEG.VendorPortal_API.concat("/misc/v2/public-file-upload")
    customerReviewsUpload: NEG.VendorPortal_API.concat("/misc/v2/file/upload")#http://scmisbiztalk01:8100/vendor-portal/misc/v2/file/upload
    selfTestingUpload: NEG.VendorPortal_API.concat("/edi-self-service/v2/certificate")
    selfTestingX12Upload: NEG.VendorPortal_API.concat("/edi-self-service/v2/edi-file-setup/testing")
 }

 initHeader=(currentUser)->
    userHeader={}
    if($.cookie('x-vp-token'))
        userHeader.AuthorizationToken= $.cookie('x-vp-token')
    if !userHeader.AuthorizationToken
        userHeader.AuthorizationToken = storage.session.get('x-vp-token') || storage.local.get('x-vp-token')
    return userHeader;

 clearList = (data) ->
    if(!data)
      return
    dataLength = data.length
    deleteAll = [(dataLength-1)..0]
    for index of deleteAll
      data.splice(deleteAll[index], 1)

 getPageSize=(subheight)->
    if($window.innerHeight <= 100)
        return 3;
    subHeigth2 = 0
    if(this.currentUser.Type=='Internal')
      subHeigth2 = 60;
    contentHeight = $window.innerHeight - 120 - subheight - subHeigth2
    pageSize = Math.floor(contentHeight / 32)
    if(pageSize <= 0)
      return 2
    else
      return pageSize


 getTableHeight=(subheight)->
    subHeigth2 = 0
    if(this.currentUser.Type=='Internal')
      subHeigth2 = 60;
    if($window.innerHeight <= 100)
        return 20;
    return $window.innerHeight - 100 - subheight - subHeigth2 - 25

 gotoOrderListView=(current)->
    window.location.href="/orderlist" if current.VendorNumber==0 || current.VendorNumber=="0"
    window.location.href="/orderlist" if typeof current.VendorNumber=="undefined"

 setLocalizedMenu = (menu) ->
    for menuLocalized in menu.MenuLocalizedResList
      switch menuLocalized.LanguageCode
        when 'en-US'
          menu['en-us'] = menuLocalized.MenuName
        when 'zh-TW'
          menu['zh-tw'] = menuLocalized.MenuName
        when 'zh-CN'
          menu['zh-cn'] = menuLocalized.MenuName

  getLocalizedErrorMsg = (err) ->
    if err.hasOwnProperty('MessageLocalizedResourceList')
      msg = $filter('filter')(err.MessageLocalizedResourceList,(errorMessage)->
        return errorMessage.LanguageCode.toUpperCase() == $translate.uses().toUpperCase()
      )[0]
      return msg.ResourceText if msg
    if err.hasOwnProperty('Message')
      return err.Message
    else
      return err

  convertToLocalTime = (input,format) ->
      if(typeof input=='undefined')
        return null
      return moment(input).format('MM/DD/YYYY h:mm:ss A')

  setServerSorting = (query,p)->
    if(p.sort && p.sort.length>0)
        query.SortInfo={SortField:p.sort[0].field,SortType:p.sort[0].dir}
    else
        delete query.SortInfo

  autoDropUpDown = (element,minHeight) ->
    dropdownMenu = element[0].getElementsByClassName("dropdown-menu")[0]
    if element[0].parentElement.nodeName != "TD"
      $(dropdownMenu).addClass("dropdown-caret")
      return
    dropdownList = element[0].getElementsByClassName("btn-group")[0]
    dropdownOffsetTop = dropdownList.offsetTop
    gridContentPanel = element[0].parentElement.parentElement.parentElement.parentElement.parentElement
    gridScrollTop = gridContentPanel.scrollTop
    gridHeight = gridContentPanel.clientHeight
    realOffsetTop =  dropdownOffsetTop - gridScrollTop
    if gridHeight - realOffsetTop > minHeight
        $(dropdownList).removeClass("dropup")
        $(dropdownMenu).addClass("dropdown-caret")
        $(dropdownMenu).removeClass("dropdown-caret-up")
    else
        $(dropdownList).addClass("dropup")
        $(dropdownMenu).addClass("dropdown-caret-up")
        $(dropdownMenu).removeClass("dropdown-caret")

  initTabFormsUnsavedConfirm = (scope,forms)->
    this.currentScope = scope
    clearTabForms(forms)
    formArray.push(form) for form in forms
    scope.$on "$locationChangeStart", (event,next,current) ->
      if(next.indexOf("login") > 0)
        clearTabForms(forms)
        return
      if(current.indexOf("/self-testing-prerequisite") > 0 || current.indexOf("/self-testing-connection") > 0 || current.indexOf("/self-testing-x12") > 0 || current.indexOf("/self-testing-x12-test")>0)
        if(isFormsChanged(scope,forms))
          if(!confirm("You have unsaved changes, continue to jump will be lost the data?"))
            event.preventDefault()
          else
            clearTabForms(forms)
        else
          clearTabForms(forms)

  clearTabForms =(forms)->
    for form in forms
      index = formArray.indexOf(form)
      formArray.splice(index,1) if index != -1

  isFormsChanged =(scope,forms)->
    isChanged = false;
    for form in forms
      if(scope[form] && scope[form].$pristine == false)
        isChanged = true
        break
    return isChanged

  getValidationErrorMsg = (data)->
    return if typeof data is undefined
    msg=''
    if(data.Message)
      msg = data.Message
      if(data.ValidationErrors && data.ValidationErrors.length > 0)
        msg += ': ' + data.ValidationErrors[0].ErrorMessage
    return msg

  hideLoadingBar = ->
    timer = setInterval(->
    loadingMask = $("#target")
      if loadingMask
        $('#target').hide()
        clearInterval timer
    )

  saveFile = (data, fileName)->
    #create blob
    blob = new Blob([data],{type: "application/x12;charset=utf-8;"})
    if($window.navigator.msSaveBlob)
      #IE10
      $window.navigator.msSaveBlob(blob, fileName);
    else
      # Try using other saveBlob implementations, if available
      saveBlob = $window.navigator.webkitSaveBlob || $window.navigator.mozSaveBlob || $window.navigator.saveBlob
      if(saveBlob is undefined)
        #Chrome & FireFox
        saveFileByClick(blob,fileName)
      else
        saveBlob(blob, FileName)

  saveFileByClick = (blob, fileName)->
    url = $window.URL || $window.webkitURL
    fileUrl = url.createObjectURL(blob)
    downloadElement = angular.element('<a/>').attr('href',fileUrl)
    downloadElement.attr('download',fileName)
    body = angular.element(document).find('body')
    body.append(downloadElement)
    downloadElement[0].click()
    downloadElement.remove()

  addCacheObject = (key, value)->
    result = $filter('filter')(cacheObjectList,{key:key})
    if (result && result.length > 0)
      obj = result[0]
      obj.value = value
    else
      cacheObjectList.push({'key':angular.copy(key),'value':angular.copy(value)})

  getCacheObject = (key)->
    result = $filter('filter')(cacheObjectList,{key:key})
    if (result && result.length > 0)
      obj = result[0]
      return obj.value
    else
      return undefined

  removeCacheObject = (key)->
    result = $filter('filter')(cacheObjectList,{key:key})
    if (result && result.length > 0)
      value = result[0]
      index = cacheObjectList.indexOf(value)
      cacheObjectList.splice(index,1)

  formatString = (formatter, args)->
    if (formatter && args)
      for value, index in args
          re = new RegExp('\\{' + index + '\\}', 'gm')
          formatter = formatter.replace(re, args[index])

      return formatter

    else
      return formatter

  ProfileCallback = (vendorNumber,delegate)->
     requestItem = {"VendorNumber": vendorNumber}
     update:->
         profileApi.search requestItem
         ,(response)->
             if(response && response.Succeeded)
                currentProfile.VendorNumber = response.Profile.VendorNumber
                currentProfile.CurrencyCode = if response.Profile.CurrencyCode then response.Profile.CurrencyCode else 'USD'
                currentProfile.LengthMeasurementCode = response.Profile.LengthMeasurementCode
                currentProfile.WeightMeasurementCode = response.Profile.WeightMeasurementCode
             else
                currentProfile.VendorNumber = vendorNumber
                currentProfile.CurrencyCode = 'USD'
             if(delegate)
                delegate(currentProfile)
             $window.vendorPortal.currentProfile = currentProfile
             $rootScope.$broadcast 'ProfileChanged' ,currentProfile

  updateProfile = (vendorNumber, delegate)->
      return if this.currentUser.VendorNumber == 0 || this.currentUser.VendorNumber == '0'
     # return if currentProfile.VendorNumber && currentProfile.VendorNumber == vendorNumber.toString()
      ProfileCallback(vendorNumber,delegate).update()
      return true

  clearIECache = ->
    $http.defaults.cache = false
    if(!$http.defaults.headers.get)
        $http.defaults.headers.get = {}
        $http.defaults.headers.get['If-Modified-Since'] = 'Sat, 28 Nov 2009 01:00:00 GMT'

  UserExist = (user)->
    deferred = $q.defer()
    request = {
      action1: "validation",
      LoginName : user.Email
    }
    userAPI.validateUser request
    ,(response)->
      if(response && response.Succeeded)
        deferred.resolve {User:user, IsExisting: response.IsExisting}
      else
        deferred.reject response.Errors
     ,(err)->
      deferred.reject err
    deferred.promise

  CheckUsersExist=(users)->
    return $q.all(users.map(UserExist)).then(
        (datas)->
            existUsers = []
            existUsers.push(data.User.Email) for data in datas when data.IsExisting
            return {
                OriginalUsers: users
                ExistUsers: existUsers
                IsAllNotExist: existUsers.length == 0
            }
    )
    
  checkPageAuth=(url)->
    return false if !authorize.functionList or authorize.functionList.length==0
    return false if !url
    urlLower="/"+url.toLowerCase().split("/")[1]   
    urlLower = "/customer-reviews" if urlLower == "/product-reviews"
    #urlLower = "/dashboard" if urlLower == "/vendor-survey"
    urlLower = "/self-testing-dashboard" if urlLower.indexOf("/self-testing-") >= 0
    urlLower = "/home" if urlLower == "/pay" || urlLower == "/change-password" || urlLower == "/vendor-survey"
    for index of authorize.functionList
      item=authorize.functionList[index]
      return true if item.Type=='Page' and item.MenuURL and item.MenuURL.toLowerCase()==urlLower and JudgePagePermission(item.PermissionFunctionList)
      if item.SubMenuList and item.SubMenuList.length>0
        for num of item.SubMenuList
          subitem=item.SubMenuList[num]
          return true if subitem.Type=='Page' and subitem.MenuURL and subitem.MenuURL.toLowerCase()==urlLower and JudgePagePermission(subitem.PermissionFunctionList)
    return false 
    
  JudgePagePermission=(permissionList)->
    return false if !permissionList
    for index of permissionList
      item=permissionList[index]
      return true if item.FunctionType!='None' and item.IsAssigned
    return false 
  
  setCtrlReadOnly = (ele, type, isReadOnly, excludeIdList)->
    inputCtrls = angular.element(ele).find(type)
    for inputCtrl in inputCtrls
        isDisabled = inputCtrl.getAttribute('disabled')
        id = inputCtrl.getAttribute('id')
        if id && id in excludeIdList
            continue
        if typeof(isDisabled)==undefined || isDisabled==false || isDisabled==null
            inputCtrl.setAttribute('disabled',true)

  getDataByApi = (api, request)->
    deferred = $q.defer()
    api request
    ,(response)->
        deffered.resolve response
    ,(err)->
        deffered.reject err
    deferred.promise

  #Start Modify by Doris.X.Tang 02/24/2016                                                         
  autoBack = ->
    this.pageInfo.isAutoBackPage = true
    this.pageInfo.isBackPage = true
    if($rootScope.orderList_backDoSearch != true)
        $window.history.go(-1)
    else
        $location.path("/orderlist")
    #End Modify

  return {
       pageInfo,
       currentScope,
       currentUser,
       currentProfile,
       vendorList,
       getPagging,
       getPagging_list,
       refreshDataGrid,
       navigate,
       confirmBox,
       currentRoutePath,
       setQueryFieldFromVdSearchControl,
       convertToDatetime,
       apiURL,
       initHeader,
       initUnSavedConfirm,
       clearList
       resetAgentVendor
       getPageSize
       getTableHeight
       gotoOrderListView
       setLocalizedMenu
       getLocalizedErrorMsg
       savePageCache
       getPageCache
       clearBackPage
       convertToLocalTime
       setServerSorting
       closeModal
       autoDropUpDown
       agentVendorType
       getAgentVendorListQuery
       agentVendorList
       getRequestQuery
       checkFormChanged
       initTabFormsUnsavedConfirm
       getValidationErrorMsg
       hideLoadingBar
       saveFile
       addCacheObject
       removeCacheObject
       getCacheObject
       formatString
       updateProfile
       clearIECache
       queryCallbackEventError
       UserExist
       CheckUsersExist
       checkPageAuth
       setCtrlReadOnly
       getDataByApi
       autoBack
     }

])

