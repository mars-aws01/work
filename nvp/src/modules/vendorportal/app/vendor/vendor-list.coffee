angular.module('vp-vendor',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.vendorlist.us)
    .translations('zh-cn',resources.vendorportal.vendorlist.cn)
    .translations('zh-tw',resources.vendorportal.vendorlist.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/vendor-list",
      templateUrl: "/modules/vendorportal/app/vendor/vendor-list.tpl.html"
      controller: 'VendorManagementCtrl'
])
.controller('VendorManagementCtrl',
["$scope","$window","messager","common","roleAPI","userAPI","authorize","$filter","vendorMgrAPI","rolePermissionAPI","$translate","vendorAPI"
($scope,$window,messager,common,roleAPI,userAPI,authorize,$filter,vendorMgrAPI,rolePermissionAPI,$translate,vendorAPI
) ->
    #initial Dictionary
    $scope.VendorTypeList=[{Code:"All",Name:"All"}]
    $scope.VendorStatusList=[{text:"All",value:"All"},{text:"Active",value:"Active"}
                              ,{text:"Endanger",value:"Endanger"}
                              ,{text:"Inactive",value:"Inactive"}]

    $scope.VendorList=[]
    $scope.RoleList=[{ID:"All",RoleName:"All"}]
    $scope.VendorSearchConditionList=[{ text:'Vendor Name', value:'vendorName'},{ text:'Vendor Number', value:'vendorNumber'}]
    $scope.searchCondition={VendorSearchCondition:'vendorName',VendorType:'All',VendorStatus:'All',RoleName:"All",IsExact:false}
    $scope.searchCondition.ALL="All"
    $scope.action='View'
    $scope.currentSelectedUser=null
    $scope.dataGridName = "vendorListGrid"
    $scope.refreshKey = "refresh.vendors"
    #advance Query show and hidden
    $scope.preparePaging = ->
        $scope.searchCondition.PagingInfo={}
        $scope.page=1
        $scope.searchCondition.PagingInfo.pageSize=20
        $scope.searchCondition.PagingInfo.currentPage = $scope.page
        $scope.searchCondition.PagingInfo.startpageindex=$scope.page-1
        $scope.searchCondition.PagingInfo.endpageindex=$scope.page-1

    $scope.preparePaging()
    $scope.showAdvancedPanel=false

    $scope.vendorList = []

    $scope.getVendorPortalVendors = ->
     vendorAPI.search { isWebformVendor : true,PrimaryWarehouseOnly: true },
       (response) ->
         if(response.Succeeded == true && response.VendorList)
            for v in response.VendorList
              tempVendor = {
                  vendorNumber : v.VendorNumber
                  vendorName : v.VendorName
                  vendorNameDisplay : v.VendorName + " - " + v.VendorNumber + " (" + v.CountryCode + ")"
              }
              if(tempVendor.vendorNumber == common.currentUser.VendorNumber)
                $scope.selectedVendorName = tempVendor.vendorNameDisplay
                $scope.selectVendor = tempVendor
              $scope.vendorList.push(tempVendor)

    $scope.getVendorPortalVendors()

    $scope.setVendor = ->
      if(!$scope.vendorList || !$scope.searchCondition.Key || $scope.searchCondition.Key == '')
         messager.warning('Please select a valid vendor.')
         return

      filterVendorList = $filter('filter')($scope.vendorList, (v) -> v.vendorNameDisplay == $scope.searchCondition.Key.trim())
      if(filterVendorList && filterVendorList.length > 0)
        $scope.selectVendor = filterVendorList[0]
        $scope.searchWithConfirm()
      else
        messager.warning('Please select a valid vendor.')
        return

    $scope.toggerAdvancedPanel=->
       $scope.showAdvancedPanel=!$scope.showAdvancedPanel
    #search
    $scope.search=(isConfirm)->
      requestInfo={WithRole:true,action:"query"}
      if $scope.searchCondition.Key and $scope.searchCondition.Key!=""
            filterVendorList = $filter('filter')($scope.vendorList, (v) -> v.vendorNameDisplay == $scope.searchCondition.Key.trim())
            if(filterVendorList && filterVendorList.length > 0)
                $scope.selectVendor = filterVendorList[0]
                requestInfo.VendorNumber= $scope.selectVendor.vendorNumber
            else
                requestInfo.VendorNumber= $scope.searchCondition.Key
      if $scope.searchCondition.VendorStatus!=$scope.searchCondition.ALL
         requestInfo.Status=$scope.searchCondition.VendorStatus
      if $scope.searchCondition.RoleName!=$scope.searchCondition.ALL and $scope.searchCondition.RoleName
         requestInfo.RoleList=[{"ID":$scope.searchCondition.RoleName}]
      if $scope.searchCondition.VendorType!=$scope.searchCondition.ALL and $scope.searchCondition.VendorType
         requestInfo.VendorTypeCode=$scope.searchCondition.VendorType
      requestInfo.IsExact=$scope.searchCondition.IsExact
      requestInfo.PagingInfo={
          PageSize:$scope.searchCondition.PagingInfo.pageSize,
          StartPageIndex:$scope.searchCondition.PagingInfo.startpageindex,
          EndPageIndex:$scope.searchCondition.PagingInfo.endpageindex
      }
      vendorAPI.query requestInfo
         ,(response) ->
                if(response && response.Succeeded)
                    $scope.searchCondition.PagingInfo.totalItems = response.TotalRecordCount
                    $scope.VendorList=angular.copy(response.VendorList)
                    if $scope.VendorList.length>0
                       for i in [0..$scope.VendorList.length-1]
                          if $scope.VendorList[i].RoleList and $scope.VendorList[i].RoleList.length>0
                            $scope.tempRole=(item.RoleName for item in $scope.VendorList[i].RoleList)
                            $scope.VendorList[i].Roles=if $scope.tempRole.length>0 then $scope.tempRole.sort().join("|") else ""
                       response.VendorList=angular.copy($scope.VendorList)
                       $scope.callbackEvent(response) if $scope.callbackEvent
                       index=$scope.getIndexOfDatagridFirstData($scope.VendorList)
                       $scope.editPermission($scope.VendorList[index],isConfirm)
                       $scope.changeGridFirstRowBgColorToSelectedColor()
                       return
                    else
                      $scope.editPermission(null,isConfirm)
                    response.VendorList=angular.copy($scope.VendorList)
                    $scope.callbackEvent(response) if $scope.callbackEvent
         ,(error,status) ->
                if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_vendorlist.loadVendorList')+errorMsg)


    $scope.changeGridFirstRowBgColorToSelectedColor=->
        $('tbody > tr:first').addClass('k-state-selected')

    $scope.getIndexOfDatagridFirstData=(apiResponseData)->
      sortedData=$("#"+$scope.dataGridName+"").data("kendoGrid")._data
      if(sortedData)
        firstedVendorNumber= sortedData[0].VendorNumber
        for index of apiResponseData when apiResponseData[index].VendorNumber==firstedVendorNumber
            return index
      return 0


    $scope.filterVendor=(vendorList)->
       return null if !vendorList
       return vendorList[0] if !$scope.editedVendorNumber
       for item in vendorList
         if item.VendorNumber==$scope.editedVendorNumber
           return item
    $scope.searchWithConfirm=->
        if $scope.currentSelectedUser && $scope.arrayCompare($scope.copyUserRoles,$scope.userRoles)==false
              common.confirmBox $translate('confirm_vendorlist.dntSave'),"", ->
                  $scope.preparePaging()
                  common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)
        else
            $scope.preparePaging()
            common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)
    #load all roles
    $scope.loadAllRoles=()->
       request = {action1:"query","SortInfo": {"SortField": "RoleName","SortType": "ASC"}}
       roleAPI.search request
            ,(response) ->
                if(response.Succeeded)
                    if response.RoleList
                     $scope.RoleList.push.apply($scope.RoleList,response.RoleList)
                     #filter all selection
                     $scope.RoleSelectList=angular.copy(response.RoleList)
                else
                   if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_vendorlist.loadRoleList')+errorMsg)
            ,(error) ->
                 if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_vendorlist.loadRoleList')+errorMsg)

    #load all vender type
    $scope.loadVendorType=()->
       requestInfo={action:"type"}
       vendorAPI.getType requestInfo
            ,(response) ->
                if(response && response.VendorTypeList)
                    $scope.VendorTypeList.push.apply($scope.VendorTypeList,response.VendorTypeList)
            ,(error) ->
                 if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_vendorlist.loadVendorList')+errorMsg)
    #launch immediately
    $scope.loadAllRoles()
    $scope.loadVendorType()
    $scope.search()
    #view Permission
    $scope.viewPermission=(selectedUser)->
        $scope.currentSelectedUser=selectedUser

    #edit Permission
    $scope.editPermission=(editUser,isConfirm)->
        if $scope.currentSelectedUser && $scope.arrayCompare($scope.copyUserRoles,$scope.userRoles)==false && isConfirm==true
               common.confirmBox $translate('confirm_vendorlist.dntSave'),"", ->
                  $scope.lanuchPermission(editUser)
        else
           $scope.lanuchPermission(editUser)

    #array compare
    $scope.arrayCompare=(arr1,arr2)->
        arr1.sort()
        arr2.sort()
        return false if arr1.length isnt arr2.length
        for i in [0..arr1.length]
            return false if arr1[i] isnt arr2[i]
        return true


    $scope.lanuchPermission=(editUser)->
       $scope.currentSelectedUser=editUser
       $scope.getVenderRoles(editUser)
    # query vendor's roles
    $scope.getVenderRoles=(editUser)->
           $scope.copyUserRoles=[]
           $scope.userRoles=[]
           if editUser
               requestInfo={action1:"role",VendorNumber:editUser.VendorNumber}
               vendorMgrAPI.getVenderRoles requestInfo
                ,(response) ->
                    if(response.Succeeded && response.VendorRole)
                       $scope.currentSelectedUser.functionList=response.VendorRole.MenuList
                       $scope.loadUserFunctionData()
                       if editUser.RoleList and editUser.RoleList.length>0
                          $scope.userRoles=(item.RoleName for item in editUser.RoleList)
                          if $scope.userRoles.length>0
                            $scope.userRoles=$scope.userRoles.sort()
                            $scope.copyUserRoles=angular.copy($scope.userRoles)
                ,(error) ->
                     if(response.Errors && response.Errors.length > 0)
                        errorMsg = common.getLocalizedErrorMsg(response.Errors[0])
                        messager.error($translate('error_vendorlist.loadVendorList')+errorMsg)

    #onchange event when vendor select role
    #$scope.$watch("userRoles",(()->
    $scope.onRoleChange=()->
      if !$scope.userRoles || $scope.userRoles=="" ||  $scope.userRoles.length<=0
        if $scope.currentSelectedUser &&  $scope.currentSelectedUser.functionList
           $scope.currentSelectedUser.functionList=null
        return
      if !$scope.currentSelectedUser
           messager.error($translate('error_vendorlist.vendorInvalid'))
           return
      requestInfo={"RoleList":[]}
      requestInfo.action1="query"
      requestInfo.VendorNumber=$scope.currentSelectedUser.VendorNumber
      for roleName in $scope.userRoles
             for item in $scope.RoleSelectList
                if item.RoleName==roleName
                  requestInfo.RoleList.push({"ID":item.ID})
      if requestInfo.RoleList.length<=0
        return
      rolePermissionAPI.search requestInfo
            ,(response) ->
                if(response.Succeeded && response.MenuList)
                   $scope.currentSelectedUser.functionList=response.MenuList
                   $scope.loadUserFunctionData()
            ,(error) ->
                 if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_vendorlist.operation')+errorMsg)

    $scope.createFunctionDisplayList = (menu,userID) ->
      if(menu.PermissionFunctionList && menu.PermissionFunctionList.length > 0)
          filterActiveTypes = $filter('filter')(menu.PermissionFunctionList, (p) -> return  p.IsAssigned == true)
          menu.activeType = if !filterActiveTypes || filterActiveTypes.length == 0 then 'None' else filterActiveTypes[0].FunctionType
          menu.functionDisplayList =
          [
            {
              menuID: menu.PermissionFunctionList[0].MenuID
              userID:userID
              name: "None"
              isDisabled: false
              priority: 99
            }
          ]
          menu.functionDisplayListSort = []
          for pf in menu.PermissionFunctionList
            filterItems = $filter('filter')(menu.functionDisplayListSort, (p) -> return  p.name == pf.FunctionType)
            if(!filterItems || filterItems.length == 0)
              menu.functionDisplayListSort.push({
                menuID : pf.MenuID
                userID:userID
                name : pf.FunctionType
                isDisabled: !pf.Assignable
                priority:pf.Priority
              })
          tempSortList = $filter('orderBy')(menu.functionDisplayListSort,'priority',true)
          menu.functionDisplayList.push.apply(menu.functionDisplayList,tempSortList)

    $scope.loadUserFunctionData = ->
       if($scope.currentSelectedUser=={})
         return
       if $scope.currentSelectedUser.functionList
        for menu in $scope.currentSelectedUser.functionList
           common.setLocalizedMenu(menu)
           menu.isExpanding=true
           $scope.createFunctionDisplayList(menu,$scope.currentSelectedUser.VendorNumber)
           if(menu.SubMenuList && menu.SubMenuList.length > 0)
             for sub in menu.SubMenuList
               common.setLocalizedMenu(sub)
               $scope.createFunctionDisplayList(sub,$scope.currentSelectedUser.VendorNumber)

    $scope.resetRole=()->
        if $scope.currentSelectedUser!=null
            if $scope.VendorList.length>0
                for vendorOrigin in $scope.VendorList
                    if($scope.currentSelectedUser.VendorNumber==vendorOrigin.VendorNumber)
                        $scope.editPermission(vendorOrigin, false)
    #save vendor roles
    $scope.saveRole=()->
           if !$scope.currentSelectedUser
             messager.error($translate('error_vendorlist.vendorInvalid'))
             return
           if !$scope.userRoles || $scope.userRoles.length<=0
             messager.error($translate('error_vendorlist.userRolesInvalid'))
             return
           if !$scope.RoleSelectList || $scope.RoleSelectList.length<=0
             messager.error($translate('error_vendorlist.rolesEmpty'))
             return
           if $scope.currentSelectedUser.ID is common.currentUser.ID
             msg=$translate('confirm_vendorlist.modify')
             common.confirmBox msg,"",->
                $scope.savePermission()
           else
              $scope.savePermission()

     $scope.savePermission=->
         requestInfo={RequestUser:common.currentUser.ID,action1:"role",VendorRole:{"VendorNumber":$scope.currentSelectedUser.VendorNumber,"RoleList":[]}}
         for roleName in $scope.userRoles #item is RoleName matches
             for item in $scope.RoleSelectList
                if item.RoleName==roleName
                  requestInfo.VendorRole.RoleList.push({"ID":item.ID})
         vendorMgrAPI.saveRoles requestInfo
            ,(response) ->
                if(response.Succeeded)
                   #$scope.currentSelectedUser=null
                   messager.success($translate('success_vendorlist.operation'))
                   $scope.editedVendorNumber=$scope.currentSelectedUser.VendorNumber
                   $scope.copyUserRoles = angular.copy($scope.userRoles)
                   #$scope.search(false)
            ,(error) ->
                 if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_vendorlist.operation')+errorMsg)
     $scope.toggerMemuPanel=(menu)->
        menu.isExpanding=!menu.isExpanding
#*****************************New Data Grid***********************************
    #PagingInfo
     $scope.pageChanged = (p)->
        $scope.searchCondition.PagingInfo.pageSize = p.pageSize
        $scope.searchCondition.PagingInfo.startpageindex=p.page-1
        $scope.searchCondition.PagingInfo.endpageindex=p.page-1
        $scope.search(true)

     $scope.vendorListOptions =
        height: "328px"
        columnMenu: true
        autoBind: true
        selectable:"row"
        dataSource:
            type: "odata"
            transport:
               read: (options) ->
                  $scope.callbackEvent = (result) ->
                        options.success d:
                              results: result.VendorList or []
                              __count: result.TotalRecordCount
                  $scope.pageChanged(options.data)
            serverPaging: true
        change: (e) ->
               dataItem = this.dataItem(this.select()[0])
               $scope.editPermission(dataItem,true)
        columns: [
                {
                    field: "VendorNumber"
                    title: "Vendor Number"
                    headerTemplate:"{{ 'header_vendorlist.vendorNumber' | translate }}"
                    width: "90px"
                }
                {
                    field: "VendorName"
                    title: "Vendor Name"
                    width: "150px"
                    headerTemplate: "{{ 'header_vendorlist.name' | translate }}"
                }
                {
                    field: "Contact"
                    title: "Contact"
                    headerTemplate: "{{ 'header_vendorlist.contactUser' | translate }}"
                    width: "100px"
                }
                {
                    field: "Phone"
                    width: "150px"
                    title: "Phone"
                    headerTemplate: "{{ 'header_vendorlist.contactPhone' | translate }}"
                }
                {
                    field: "EmailAddress"
                    width: "150px"
                    title: "Email Address"
                    headerTemplate: "{{ 'header_vendorlist.contactEmail' | translate }}"
                }
                {
                    field: "City"
                    width: "150px"
                    title: "City"
                    headerTemplate: "{{ 'header_vendorlist.city' | translate }}"
                }
                {
                    field: "Roles"
                    title: "Roles"
                    width: "150px"
                    headerTemplate: "{{ 'header_vendorlist.roles' | translate }}"
                }
                {
                    field: "Status"
                    width: "80px"
                    title: "Status"
                    headerTemplate: "{{ 'header_vendorlist.status' | translate }}"
                }
             ]
])
