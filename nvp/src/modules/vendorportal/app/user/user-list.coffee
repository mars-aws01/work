angular.module('vp-user',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.userlist.us)
    .translations('zh-cn',resources.vendorportal.userlist.cn)
    .translations('zh-tw',resources.vendorportal.userlist.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/user-list",
      templateUrl: "/modules/vendorportal/app/user/user-list.tpl.html"
      controller: 'UserManagementCtrl'
])

.controller('UserManagementCtrl',
["$scope","$window","messager","common","roleAPI","userAPI","rolePermissionAPI","$filter","vendorAPI","$translate",
($scope,$window,messager,common,roleAPI,userAPI,rolePermissionAPI,$filter,vendorAPI,$translate) ->
    $scope.searchCondition={LoginName:'', Type:'',VendorNumber:'',Status:'',WithRole:true,IsExact:false, RoleList:[{ID:''}]}
    $scope.vendorList=[{text:'All',value:''}]
    $scope.searchRoleList=[{text:'All',value:''}]
    $scope.roleList=[]
    $scope.editUserList=[]
    $scope.userTypeList=[{text:'All',value:''},{text:'Internal',value:'Internal'},{text:'Vendor',value:'Vendor'}]
    $scope.userStatusList=[{text:'All',value:''},{text:'Enabled',value:'Enabled'},{text:'Disabled',value:'Disabled'}]
    $scope.dataGridName = "userListGrid"
    $scope.refreshKey = "refresh.users"
    #page init
    $scope.preparePaging = ->
        $scope.searchCondition.PagingInfo={}
        $scope.page=1
        $scope.searchCondition.PagingInfo.pageSize=20
        $scope.searchCondition.PagingInfo.currentPage = $scope.page
        $scope.searchCondition.PagingInfo.startpageindex=$scope.page-1
        $scope.searchCondition.PagingInfo.endpageindex=$scope.page-1
        $scope.hiddenHeight=$window.document.body.scrollHeight-$window.innerHeight
    $scope.preparePaging()
    #load vendor data
    $scope.loadVendorList=->
        vendorAPI.search { isWebformVendor : true,PrimaryWarehouseOnly: true }
            ,(response)->
                if(response&&response.Succeeded)
                    if response.VendorList and response.VendorList.length>0
                     response.VendorList=response.VendorList.sort($scope.ArrayObjectCompare("VendorName"))
                     for v in response.VendorList
                        $scope.vendorList.push({text:v.VendorName+" - "+v.VendorNumber+" ("+v.CountryCode+")",value:v.VendorNumber})
            ,(error)->

    $scope.loadVendorList()

    $scope.loadRoleList=->
        request={action1:'query'}
        roleAPI.search request
            ,(response)->
                if(response&&response.Succeeded)
                    if response.RoleList and response.RoleList.length>0
                       response.RoleList=response.RoleList.sort($scope.ArrayObjectCompare("RoleName"))
                    for v in response.RoleList
                        $scope.roleList.push({text:v.RoleName,value:v.ID})
                        $scope.searchRoleList.push({text:v.RoleName,value:v.ID})
            ,(error)->

    $scope.loadRoleList()
    #definition a compare
    $scope.ArrayObjectCompare=(propertyName)->
      return (object1,object2)->
         value1 = object1[propertyName].toLowerCase()
         value2 = object2[propertyName].toLowerCase()
         return 1  if value1>value2
         return -1 if value1<value2
         return 0

    $scope.loadAllUserList =() ->
        requestUser = {
            action1: "query"
        }
        $scope.currentUserLoginName=common.currentUser.LoginName
        userAPI.queryUserList requestUser
            ,(response) ->
                if(response&&response.Succeeded==true)
                    $scope.editUserList=angular.copy(response.UserList)
                    if(typeof $scope.userList!='undefined' && $scope.userList.length>0)
                        temp = {
                          UserList : angular.copy($scope.userList)
                          TotalRecordCount : $scope.totalRCount
                        }
                        $scope.userList = []
                        $scope.InitUserEditUser(temp.UserList)
                        $scope.userList  = temp.UserList
                        $scope.callbackEvent(temp) if $scope.callbackEvent
            ,(error)->

    $scope.action='View'
    $scope.isAdminUser=false

    $scope.currentSelectedUser={}
    $scope.currentSelectedUserBeforEdit={}

    $scope.loadAllUserList()
    #init user's edit user
    $scope.InitUserEditUser=(userList)->
      for userQ in userList
        for user in  $scope.editUserList
            if(userQ.LastEditUser==user.ID.toString())
                userQ.LastEditUserName=user.LoginName
        if(userQ.LastEditUserName==undefined)
            if(isNaN(userQ.LastEditUser))
                userQ.LastEditUserName=userQ.LastEditUser
            else
                userQ.LastEditUserName='Newegg'

    $scope.search=(shouldSelectFirst)->
        request=angular.copy($scope.searchCondition)
        request.action1='query'
        delete request.LoginName if request.LoginName==''
        delete request.VendorNumber if request.VendorNumber==''
        delete request.Status if request.Status==''
        delete request.Type if request.Type==''
        delete request.RoleList if request.RoleList[0].ID==''
        userAPI.queryUserList request
            ,(response)->
                if(response&&response.Succeeded==true)
                    $scope.searchCondition.PagingInfo.totalItems = response.TotalRecordCount
                    for user in response.UserList
                        if(typeof user.VendorNumber!='undefined')
                            user.Vendor=user.VendorName+ " - " + user.VendorNumber
                        rolesStr=''
                        roleIDArray=[]
                        if user.RoleList and user.RoleList.length>0
                            for role in user.RoleList
                                rolesStr=rolesStr.concat("|",role.RoleName)
                                roleIDArray.push(role.ID)

                            if(rolesStr.indexOf('|')==0)
                                rolesStr=rolesStr.substr(1,rolesStr.length-1)
                        user.RolesStr = rolesStr
                        user.RoleIDArray = roleIDArray
                        if user.IsAdmin
                          user.AdminStr='Yes'
                        else
                          user.AdminStr='No'
                    $scope.userList=response.UserList
                    $scope.totalRCount = angular.copy(response.TotalRecordCount)
                    $scope.InitUserEditUser($scope.userList)
                    if($scope.userList.length>0)
                        if(shouldSelectFirst)
                            $scope.callbackEvent(response) if $scope.callbackEvent
                            index=$scope.getIndexOfDatagridFirstData($scope.userList)
                            $scope.editPermission($scope.userList[index])
                            $scope.changeGridFirstRowBgColorToSelectedColor()
                            return
                        else
                            $scope.currentSelectedUserBeforEdit=angular.copy($scope.currentSelectedUser)
                    else
                        $scope.currentSelectedUser={}
                        $scope.currentFunctionList=[]
                    $scope.callbackEvent(response) if $scope.callbackEvent
            ,(error)->

    #$scope.search(true)
    $scope.changeGridFirstRowBgColorToSelectedColor=->
        $('tbody > tr:first').addClass('k-state-selected')

    $scope.getIndexOfDatagridFirstData=(apiResponseData)->
      sortedData=$("#"+$scope.dataGridName+"").data("kendoGrid")._data
      if(sortedData)
        firstedLoginName= sortedData[0].LoginName
        for index of apiResponseData when apiResponseData[index].LoginName==firstedLoginName
            return index
      return 0


    $scope.searchWithConfirm=->
        if($scope.isCurrentSelectedUserHasChanged())
            common.confirmBox $translate('confirm_userlist.dntSave'),"", ->
                $scope.preparePaging()
                common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)
        else
            $scope.preparePaging()
            common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)

    $scope.isCurrentSelectedUserHasChanged=->
        if(typeof $scope.currentSelectedUser.LoginName == 'undefined')
            return false
        if($scope.currentSelectedUserBeforEdit.IsAdmin!=$scope.currentSelectedUser.IsAdmin)
            return true
        if($scope.currentSelectedUserBeforEdit.RoleIDArray.length!=$scope.currentSelectedUser.RoleIDArray.length)
            return true
        array1 = angular.copy($scope.currentSelectedUserBeforEdit.RoleIDArray)
        array1.sort()
        array2=angular.copy($scope.currentSelectedUser.RoleIDArray)
        array2.sort()
        for i in [0..array1.length-1]
            return true if array1[i]!=array2[i]
        return false

    $scope.editPermissionWithConfirm=(editUser)->
        if($scope.isCurrentSelectedUserHasChanged())
            common.confirmBox $translate('confirm_userlist.dntSave'),"", ->
                $scope.editPermission(editUser)
                if(!$scope.$$phase)
                   $scope.$apply()
        else
            $scope.editPermission(editUser)


    #edit Permission
    $scope.editPermission=(editUser)->
        $scope.action = "Edit"
        $scope.currentSelectedUser=angular.copy(editUser)
        $scope.currentSelectedUserBeforEdit=angular.copy($scope.currentSelectedUser)
        $scope.GetUserRolesList(editUser)
        if(!$scope.$$phase)
           $scope.$apply()

    $scope.openAddInternalUserModel=->
        #$scope.InvitationList=[{Index:0,LoginName:'',IsRequired:false,IsAdmin:true,Status:'Enabled',Type:'Internal',VendorNumber:'0',UserRoles:[]}]
        $scope.InvitationList=[{'Index':0,'Email':'','IsRequired':false,'IsAdmin':false,'Inviter':'Newegg','Type':'Internal','VendorNumber':'0'}]
        $scope.addInternalUserModel=true
        $scope.saveInternalDisabled=false

    $scope.closeAddInternalUserModel=->
        $scope.addInternalUserModel=false
        $scope.saveInternalDisabled=false
     #GET User Role
    $scope.GetUserRolesList=(editUser)->
         request={}
         request.action1='role'
         request.UserID=editUser.ID
         userAPI.getRoleList request
            ,(response)->
                 if(response&&response.Succeeded==true && response.UserRole)
                    $scope.currentFunctionList=angular.copy(response.UserRole.MenuList)
                    $scope.loadUserFunctionData($scope.currentFunctionList)
                 else
                    $scope.currentFunctionList=[]


    $scope.addMoreClick=->
        for idx in [1..4]
            #$scope.InvitationList.push({'Index':idx,LoginName:'',IsRequired:false,IsAdmin:true,Status:'Enabled',Type:'Internal',VendorNumber:'0',UserRoles:[]})
            $scope.InvitationList.push({'Index':idx,'Email':'','IsRequired':false,'IsAdmin':false,'Inviter':'Newegg','Type':'Internal','VendorNumber':'0'})

    $scope.isInputAtLeastOneInternalUser=->
        for internalUser in $scope.InvitationList
            if(internalUser.Email!='')
                return true
        return false

    $scope.isInputUserSelectAtLeastOntRole=()->
        errorMsg=""
        for internalUser in $scope.InvitationList when internalUser.Email!=''
            #if(internalUser.IsAdmin==false&&(!internalUser.UserRoles||internalUser.UserRoles.length==0))
            if(internalUser.IsAdmin==false&&!internalUser.RoleID)
                valid=false
                if !errorMsg? or errorMsg==""
                   errorMsg=$translate('error_userlist.emailHeader')+internalUser.Email+$translate('error_userlist.noRole')
                else
                   errorMsg =errorMsg+" "+$translate('error_userlist.emailHeader')+internalUser.Email+$translate('error_userlist.noRole')
        return errorMsg

    $scope.isDuplicateEmail=()->
        hasDuplicate=false
        emailList=[]
        for internalUser in $scope.InvitationList when internalUser.Email!=''
            emailList.push(internalUser.Email)
        if(emailList.length<=1)
            return hasDuplicate
        emailList=emailList.sort()
        for index of emailList
            if(emailList[index-1]==emailList[index])
                hasDuplicate=true
                break
        return hasDuplicate

    $scope.inviteClick=->
        if($scope.isInputAtLeastOneInternalUser()==false)
            messager.error($translate('error_userlist.emailInvalid'))
            return
        errorMsg=$scope.isInputUserSelectAtLeastOntRole()
        if(errorMsg!="")
            messager.error(errorMsg)
            return
        if($scope.isDuplicateEmail()==true)
            messager.error($translate('error_userlist.emailDuplicate'))
            return
        users = []
        for user in $scope.InvitationList when user.Email!=''
            #re = angular.copy(user)
            #$scope.addUserAccount(re)
            users.push(angular.copy(user))

        common.CheckUsersExist(users).then(
            (result)->
                if result.IsAllNotExist
                    $scope.inviteUsers(result.OriginalUsers)
                else
                    messager.error($translate('error_userlist.emailExist') + result.ExistUsers.join(','))
        )

    $scope.inviteUsers = (users)->
        inviteRequest = {'RequestUser':common.currentUser.ID,InvitationList:users, action1:'invitation'}
        userAPI.invite inviteRequest,
        (response)->
            if(response&&response.Succeeded)
                messager.success($translate('success_invite.invitation'))
                $scope.closeAddInternalUserModel()
            else
                if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error(errorMsg)
        ,(error)->

    $scope.addUserAccount=(user)->
        $scope.saveInternalDisabled=true
        request={RequestUser:RequestUser:common.currentUser.ID}
        request.User={LoginName:user.LoginName, Status:user.Status, VendorNumber:user.VendorNumber, Type:user.Type, IsAdmin:user.IsAdmin}
        userAPI.addUser request
            ,(response)->
                if(response&&response.Succeeded)
                    messager.success($translate('description_userlist.createUserStart')+user.LoginName + $translate('success_userlist.createUserEnd'))
                    userResponse=response.UserList[0]
                    requestForRole={action1:"role",RequestUser:RequestUser:common.currentUser.ID}
                    requestForRole.UserRole={UserID:userResponse.ID, IsAdmin:user.IsAdmin}
                    requestForRole.UserRole.RoleList=[]
                    for id in user.UserRoles
                        requestForRole.UserRole.RoleList.push({ID:id})
                    userAPI.addUserRole requestForRole
                        ,(response)->
                            if(response&&response.Succeeded)
                                #messager.success($translate('description_userlist.createUserStart')+user.LoginName + $translate('success_userlist.addRoleEnd'))
                                $scope.search(true)
                            else
                                if(response.Errors && response.Errors.length > 0)
                                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                                    messager.error($translate('description_userlist.createUserStart')+user.LoginName + $translate('error_userlist.createUserEnd')+errorMsg)
                        ,(error)->
                    $scope.closeAddInternalUserModel()
                else
                    $scope.saveInternalDisabled=false
                    messager.error($translate('description_userlist.createUserStart')+user.LoginName + $translate('error_userlist.createUserEnd')+common.getLocalizedErrorMsg(response.Errors[0]))
            ,(error)->


    $scope.resetUserPermission=->
        if($scope.currentSelectedUser=={})
            return
        $scope.currentSelectedUser = angular.copy($scope.currentSelectedUserBeforEdit)
        editUser=angular.copy($scope.currentSelectedUser)
        $scope.GetUserRolesList(editUser)

    $scope.saveUserPermission=->
        if($scope.currentSelectedUser=={})
            return
        if( $scope.currentSelectedUser.IsAdmin==false && $scope.currentSelectedUser.RoleIDArray.length==0)
            messager.error($translate('error_userlist.roleInvalid'))
            return
        if common.currentUser.ID is $scope.currentSelectedUser.ID
            msg = $translate('confirm_userlist.modify')
            common.confirmBox msg,"",->
              $scope.savePermission()
        else
           $scope.savePermission()

    $scope.savePermission=->
        request = {action1:"role",RequestUser:common.currentUser.ID}
        request.UserRole={UserID:$scope.currentSelectedUser.ID, IsAdmin:$scope.currentSelectedUser.IsAdmin}
        request.UserRole.RoleList=[]
        for id in $scope.currentSelectedUser.RoleIDArray
            request.UserRole.RoleList.push({ID:id})
        userAPI.updateUserRole request
            ,(response)->
                if(response&&response.Succeeded)
                    messager.success($translate('success_userlist.updateUser'))
                    $scope.currentSelectedUserBeforEdit = angular.copy($scope.currentSelectedUser)
                    #$scope.search(false)
                else
                  if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_userlist.updateUser')+errorMsg)
            ,(error)->

    $scope.getPermissionFunctionList = (menu) ->
      tempList = []
      if(menu.PermissionFunctionList && menu.PermissionFunctionList.length > 0)
        for pf in menu.PermissionFunctionList
          if(menu.activeType == 'None')
            tempList.push({FunctionID:pf.FunctionID,IsAssigned:false})
          else
            tempList.push(
             {
                FunctionID: pf.FunctionID,
               # FunctionType: pf.FunctionType
               # MenuName: pf.MenuName
                IsAssigned: if pf.FunctionType == menu.activeType then true else false
             }
            )
      return tempList

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

    $scope.loadUserFunctionData =(functionList) ->
       if(typeof functionList=='undefined'|| functionList==null || functionList.length==0)
         return
       for menu in functionList
           menu.isExpanding=true
           common.setLocalizedMenu(menu)
           $scope.createFunctionDisplayList(menu,"001")
           if(menu.SubMenuList && menu.SubMenuList.length > 0)
             for sub in menu.SubMenuList
               common.setLocalizedMenu(sub)
               $scope.createFunctionDisplayList(sub,"001")

    $scope.toggerMemuPanel=(menu)->
        menu.isExpanding=!menu.isExpanding

    #$scope.$watch("currentSelectedUser.RoleIDArray", (() ->
    $scope.onRoleChange=()->
        if(typeof $scope.currentSelectedUser.RoleIDArray=='undefined' || $scope.currentSelectedUser.RoleIDArray==null||$scope.currentSelectedUser.RoleIDArray.length==0)
            $scope.currentFunctionList=[]
            return
        request={action1:'query',RoleList:[]}
        request.UserId=$scope.currentSelectedUser.ID
        for id in $scope.currentSelectedUser.RoleIDArray
            request.RoleList.push({ID:id})
        $scope.queryRolePermission(request)

    $scope.queryRolePermission=(request)->
        rolePermissionAPI.search request
            ,(response)->
                if(response&&response.Succeeded&&response.MenuList.length>0)
                    $scope.currentFunctionList=angular.copy(response.MenuList)
                    $scope.loadUserFunctionData($scope.currentFunctionList)
            ,(error)->

    $scope.enableOrDisableUser=(user)->
        if user.Status=='Enabled' then operateName = 'disable' else operateName = 'enable'
        msg=$translate('confirm_userlist.actionStart2').concat($translate('description_userlist.'+operateName)).concat($translate('confirm_userlist.actionEnd2')).concat(user.LoginName).concat("?")
       # msg='"'.concat(user.LoginName+'"').concat($translate('confirm_userlist.actionStart')).concat($translate('description_userlist.'+operateName)).concat($translate('confirm_userlist.actionEnd'))
        common.confirmBox msg,"", ->
            userTemp=angular.copy(user)
            if(userTemp.Type=='Internal')
                userTemp.VendorNumber='0'
            request={RequestUser:common.currentUser.ID,User:userTemp}
            if(user.Status=='Enabled')
                request.User.Status='Disabled'
                userAPI.deactivateVendor request
                    ,(response)->
                        if(response&&response.Succeeded)
                            messager.success($translate('description_userlist.disableUserStart'))
                           # $scope.search(false)
                            #common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)
                        else
                            messager.error($translate('description_userlist.disableUserStart').concat(user.LoginName).concat($translate('error_userlist.disableUserEnd')))
                    ,(error)->
            else
                request.User.Status='Enabled'
                userAPI.activateVendor request
                    ,(response)->
                        if(response&&response.Succeeded)
                            messager.success($translate('description_userlist.enableUserStart'))
                            #common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)
                            #$scope.search(false)
                        else
                            messager.error($translate('description_userlist.enableUserStart').concat(user.LoginName).concat($translate('error_userlist.disableUserEnd')))
                    ,(error)->
        return true
 #*****************************New Data Grid***********************************
    #PagingInfo
    $scope.pageChanged = (p)->
        $scope.searchCondition.PagingInfo.pageSize = p.pageSize
        $scope.searchCondition.PagingInfo.startpageindex=p.page-1
        $scope.searchCondition.PagingInfo.endpageindex=p.page-1
        $scope.search(true)

    $scope.userListOptions =
        height: "300px"
        columnMenu: true
        autoBind: true
        selectable:"row"
        dataSource:
            type: "odata"
            transport:
               read: (options) ->
                  $scope.callbackEvent = (result) ->
                        options.success d:
                              results: result.UserList or []
                              __count: result.TotalRecordCount
                  $scope.pageChanged(options.data)
            serverPaging: true
        change: (e) ->
               dataItem = this.dataItem(this.select()[0])
               $scope.editPermissionWithConfirm(dataItem)
        columns: [
                {
                    title: "{{'header_userlist.action' | translate }}"
                    width: "60px"
                    template: kendo.template($("#tpl_userList_action").html())
                }
                {
                    field: "Type"
                    title: "User Type"
                    headerTemplate:"{{ 'view_userlist.userType' | translate }}"
                    width: "100px"
                }
                {
                    field: "LoginName"
                    title: "Email"
                    headerTemplate: "{{ 'header_userlist.email' | translate }}"
                    width: "120px"
                }
                {
                    field: "IsAdmin"
                    title: "Is Admin"
                    headerTemplate: "{{ 'view_accountsetting.admin' | translate }}"
                    width: "100px"
                }
                {
                    field: "RolesStr"
                    title: "Roles"
                    headerTemplate: "{{ 'header_userlist.roles' | translate }}"
                }
                {
                    field: "LastAccessTime"
                    title: "Latest Sign-In Date"
                    headerTemplate: "{{ 'header_userlist.accessDate' | translate }}",
                    width: "140px"
                    type: "date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
                {
                    field: "Vendor"
                    title: "Vendor"
                    headerTemplate: "{{ 'view_userlist.vendor' | translate }}",
                    width: "100px"
                }
                {
                    field: "LastEditUserName"
                    title: "Edit User"
                    headerTemplate: "{{ 'header_rolelist.editUser' | translate }}",
                    width: "100px"
                }
                {
                    field: "LastEditDate"
                    title: "Edit Date"
                    width: "140px"
                    headerTemplate: "{{ 'header_rolelist.editDate' | translate }}",
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
                {
                    field: "Status"
                    width: "80px"
                    title: "Status"
                    headerTemplate: "{{ 'header_userlist.status' | translate }}"
                }
             ]

])

