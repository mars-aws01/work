angular.module('vp-role',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.rolelist.us)
    .translations('zh-cn',resources.vendorportal.rolelist.cn)
    .translations('zh-tw',resources.vendorportal.rolelist.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/role-list",
      templateUrl: "/modules/vendorportal/app/user/role-list.tpl.html"
      controller: 'RoleManagementCtrl'
])

.controller('RoleManagementCtrl',
["$scope","$window","messager","common","roleAPI","userAPI","authorize","$filter","$translate","$q",
($scope,$window,messager,common,roleAPI,userAPI,authorize,$filter,$translate,$q) ->

    $scope.UserList=[]
    $scope.dataGridName = "roleListGrid"
    $scope.refreshKey = "refresh.roles"
    $scope.loadUserList =(roleList) ->
        requestUser = {
            action1: "query"
        }
        userAPI.queryUserList requestUser,
            (response) ->
                if(response&&response.Succeeded==true)
                    $scope.UserList=angular.copy( response.UserList)
                    if(typeof $scope.roleList!='undefined' && $scope.roleList.length>0)
                        temp = {
                          RoleList : angular.copy($scope.roleList)
                          TotalRecordCount : $scope.totalRCount
                        }
                        $scope.roleList = []
                        $scope.InitRoleEditUser(temp.RoleList)
                        $scope.roleList = temp.RoleList
                        $scope.callbackEvent(temp) if $scope.callbackEvent
            ,(error)->
    $scope.loadUserList()
    #search
    $scope.roleList=[]
    $scope.searchCondition={IsExact:false}
    #page init
    $scope.preparePaging = ->
        $scope.searchCondition.PagingInfo={}
        $scope.page=1
        $scope.searchCondition.PagingInfo.pageSize=20
        $scope.searchCondition.PagingInfo.currentPage = $scope.page
        $scope.searchCondition.PagingInfo.startpageindex=$scope.page-1
        $scope.searchCondition.PagingInfo.endpageindex=$scope.page-1
    $scope.preparePaging()

    $scope.search=(shouldSelectFirst)->
        request = angular.copy($scope.searchCondition)
        if(request.RoleName=='')
            delete request.RoleName
        request.action1 = 'query'
        roleAPI.search request
            ,(response) ->
                if(response && response.RoleList)
                    $scope.searchCondition.PagingInfo.totalItems = response.TotalRecordCount
                    $scope.roleList=angular.copy(response.RoleList)
                    $scope.totalRCount = angular.copy(response.TotalRecordCount)
                    $scope.InitRoleEditUser($scope.roleList)
                    if(response.RoleList.length>0)
                        if(shouldSelectFirst)
                            response.RoleList=$scope.roleList
                            $scope.callbackEvent(response) if $scope.callbackEvent
                            index=$scope.getIndexOfDatagridFirstData($scope.roleList)
                            $scope.editRole($scope.roleList[index])
                            $scope.changeGridFirstRowBgColorToSelectedColor()
                            return
                    else
                        $scope.currentSelectedRole={}
                    response.RoleList=$scope.roleList
                    $scope.callbackEvent(response) if $scope.callbackEvent
            ,(error) ->

    #$scope.search(true)
    $scope.changeGridFirstRowBgColorToSelectedColor=->
        $('tbody > tr:first').addClass('k-state-selected')

    $scope.getIndexOfDatagridFirstData=(apiResponseData)->
      sortedData=$("#"+$scope.dataGridName+"").data("kendoGrid")._data
      if(sortedData)
        firstedRoleName= sortedData[0].RoleName
        for index of apiResponseData when apiResponseData[index].RoleName==firstedRoleName
            return index
      return 0

    #init roles editUser
    $scope.InitRoleEditUser=(roleList)->
       for role in roleList
         for user in $scope.UserList
            if(role.InUser==user.ID.toString())
                role.InUserName=user.LoginName
            if(role.LastEditUser==user.ID.toString())
                role.LastEditUserName=user.LoginName
         if(!role.InUserName)
            if(isNaN(role.InUser))
                role.InUserName=role.InUser
            else
                role.InUserName='Newegg'
         if(!role.LastEditUserName)
            if(isNaN(role.LastEditUser))
                role.LastEditUserName=role.LastEditUser
            else
                role.LastEditUserName='Newegg'


    $scope.searchWithConfirm=->

        if($scope.isCurrentSelectedRoleHasChanged())
            msg = $translate('confirm_rolelist.dntSave')
            common.confirmBox msg,"", ->
                $scope.currentSelectedRole={}
                $scope.preparePaging()
                common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)
                #$scope.search(true)
        else
            $scope.preparePaging()
            common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)
            #$scope.search(true)


    $scope.action='View'
    $scope.currentSelectedRole={}

    #add
    $scope.addNewRoleClick=->
        if($scope.isCurrentSelectedRoleHasChanged())
            msg = $translate('confirm_rolelist.dntSave')
            common.confirmBox msg,"", ->
                $scope.action = "Create"
                newRoleTemplate={ID:'00000000-0000-0000-0000-000000000000'}
                $scope.getSingleRoleDetail(newRoleTemplate)
        else
            $scope.action = "Create"
            newRoleTemplate={ID:'00000000-0000-0000-0000-000000000000'}
            $scope.getSingleRoleDetail(newRoleTemplate)
    #edit
    $scope.editRole=(editRole)->
       if($scope.isCurrentSelectedRoleHasChanged())
          msg = $translate('confirm_rolelist.dntSave')
          common.confirmBox msg,"", ->
                $scope.action = "Edit"
                $scope.getSingleRoleDetail(editRole)
       else
           $scope.action = "Edit"
           $scope.getSingleRoleDetail(editRole)

    #delete
    $scope.deleteRole=(selectedRole)->
        msg=""
        if($scope.isCurrentSelectedRoleHasChanged())
          msg = $translate('confirm_rolelist.dntSave')
        else
          msg = $translate('confirm_rolelist.deleteRole')
        common.confirmBox msg,"", ->
          $scope.action = "Delete"
          request = {roleID: selectedRole.ID}
          response = roleAPI.deleteRole request,
             ->
                if(response&&response.Succeeded)
                  messager.success($translate('success_rolelist.deleteRole'))
                  #$scope.search(true)
                  #common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.searchCondition.PagingInfo)
                else
                  if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_rolelist.deleteRole')+errorMsg)
          ,(error)->


    $scope.getSingleRoleDetail=(selectedRole)->
        request={roleID:selectedRole.ID}
        roleAPI.getRoleDetail request
            ,(response)->
                if(response && response.Succeeded)
                    $scope.bindSingleRole(response.Role)
                else
                   $scope.currentSelectedRole={}
            ,(error)->

    $scope.currentSelectedRoleBeforEdit={}
    $scope.bindSingleRole=(role)->
        $scope.currentSelectedRole=angular.copy(role)
        $scope.currentSelectedRole.functionList= role.MenuList
        $scope.loadUserFunctionData($scope.currentSelectedRole.functionList)
        $scope.currentSelectedRoleBeforEdit=angular.copy($scope.currentSelectedRole)

    $scope.isCurrentSelectedRoleHasChanged=->
        if($scope.currentSelectedRole=={})
            return false
        if(typeof $scope.currentSelectedRole.functionList=='undefined')
            return false
        if($scope.currentSelectedRoleBeforEdit.RoleName!=$scope.currentSelectedRole.RoleName||$scope.currentSelectedRoleBeforEdit.RoleDescription!=$scope.currentSelectedRole.RoleDescription)
            return true
        permissionBeforSelected = $scope.getFunctionList($scope.currentSelectedRoleBeforEdit)
        permission= $scope.getFunctionList($scope.currentSelectedRole)
        for permissionBefor in permissionBeforSelected
            for currentPermission in permission
                if(permissionBefor.FunctionID==currentPermission.FunctionID&&permissionBefor.IsAssigned!=currentPermission.IsAssigned)
                    return true
        return false

    $scope.resetRole=->
        $scope.currentSelectedRole.functionList=angular.copy($scope.currentSelectedRoleBeforEdit.functionList)
        $scope.currentSelectedRole.RoleName=angular.copy($scope.currentSelectedRoleBeforEdit.RoleName)
        $scope.currentSelectedRole.RoleDescription=angular.copy($scope.currentSelectedRoleBeforEdit.RoleDescription)

    $scope.isRoleExist = (roleName)->
        deferred = $q.defer()
        request ={
            action1 : 'query'
            IsExact: true
            RoleName:roleName
        }
        roleAPI.search request
        ,(response) ->
            if(response&&response.Succeeded)
              deferred.resolve(response)
            else
              deferred.reject(response)
        return deferred.promise

    $scope.saveRole=->
        if($scope.action=='Edit')
            $scope.updateRole()
        if($scope.action=='Create')
            $scope.createRole()
        #$scope.action='View'

    $scope.createRole=->
        if($scope.currentSelectedRole=={})
            return
        if(typeof $scope.currentSelectedRole.RoleName == 'undefined' || $scope.currentSelectedRole.RoleName==null || $scope.currentSelectedRole.RoleName=='')
            messager.error($translate('error_rolelist.roleNameInvalid'))
            return

        $scope.isRoleExist($scope.currentSelectedRole.RoleName).then((data)->
            if(data && data.RoleList && data.RoleList.length > 0)
                messager.error($translate('error_rolelist.roleNameExist'))
            else
                $scope.addRole()
        )

    $scope.addRole = () ->
        request={RequestUser:common.currentUser.ID}
        request.Role={RoleName:$scope.currentSelectedRole.RoleName
                     ,RoleDescription:$scope.currentSelectedRole.RoleDescription}
        request.Role.PermissionFunctionList=$scope.getFunctionList($scope.currentSelectedRole)
        tempRole = angular.copy(request.Role)
        tempRole.MenuList = $scope.currentSelectedRole.MenuList
        roleAPI.addRole request
            ,(response)->
                if(response&&response.Succeeded)
                    messager.success($translate('success_rolelist.createRole'))
                    #$scope.search(false)
                    $scope.bindSingleRole(tempRole)
                else
                  if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_rolelist.createRole')+errorMsg)
            ,(error)->


    $scope.updateRole=->
        if($scope.currentSelectedRole=={})
            return
        request={RequestUser:common.currentUser.ID}
        request.Role={ID:$scope.currentSelectedRole.ID
                     ,RoleName:$scope.currentSelectedRole.RoleName
                     ,RoleDescription:$scope.currentSelectedRole.RoleDescription}
        request.Role.PermissionFunctionList=$scope.getFunctionList($scope.currentSelectedRole)
        tempRole = angular.copy(request.Role)
        tempRole.MenuList = $scope.currentSelectedRole.MenuList
        roleAPI.updateRole request
            ,(response)->
                if(response&&response.Succeeded)
                    messager.success($translate('success_rolelist.updateRole'))
                    #$scope.search(false)
                    $scope.bindSingleRole(tempRole)
                else
                  if(response.Errors && response.Errors.length > 0)
                    errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                    messager.error($translate('error_rolelist.updateRole')+errorMsg)
            ,(error)->


    $scope.getFunctionList = (selectRole) ->
      messager.clear()
      PermissionFunctionList = []
      for menu in selectRole.functionList
        PermissionFunctionList.push.apply(PermissionFunctionList,$scope.getPermissionFunctionList(menu))
        if(menu.SubMenuList && menu.SubMenuList.length > 0)
          for sub in menu.SubMenuList
            PermissionFunctionList.push.apply(PermissionFunctionList,$scope.getPermissionFunctionList(sub))
      return PermissionFunctionList


    $scope.getPermissionFunctionList = (menu) ->
      tempList = []
      if(menu.PermissionFunctionList && menu.PermissionFunctionList.length > 0)
        for pf in menu.PermissionFunctionList
          if(menu.MenuURL=='/home') #default permission
            tempList.push({FunctionID:pf.FunctionID,IsAssigned:true})
          else
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
           $scope.createFunctionDisplayList(menu,$scope.currentSelectedRole.ID)
           if(menu.SubMenuList && menu.SubMenuList.length > 0)
             for sub in menu.SubMenuList
               common.setLocalizedMenu(sub)
               $scope.createFunctionDisplayList(sub,$scope.currentSelectedRole.ID)

    $scope.toggerMemuPanel=(menu)->
        menu.isExpanding=!menu.isExpanding

    $scope.hasOwnProperty=(obj)->
        return false if !obj?
        return false if typeof obj==undefined
        items=[]
        for index,value of obj
           return true
        return false
#*****************************New Data Grid***********************************
    #PagingInfo
    $scope.pageChanged = (p)->
        $scope.searchCondition.PagingInfo.pageSize = p.pageSize
        $scope.searchCondition.PagingInfo.startpageindex=p.page-1
        $scope.searchCondition.PagingInfo.endpageindex=p.page-1
        $scope.search(true)

    $scope.roleListOptions =
        height: "328px"
        columnMenu: true
        autoBind: true
        selectable:"row"
        dataSource:
            type: "odata"
            transport:
               read: (options) ->
                  $scope.callbackEvent = (result) ->
                        #console.log(result)
                        options.success d:
                              results: result.RoleList or []
                              __count: result.TotalRecordCount

                  $scope.pageChanged(options.data)
            serverPaging: true
        change: (e) ->
               dataItem = this.dataItem(this.select()[0])
               $scope.editRole(dataItem)
        columns: [
                {
                    title: "{{'header_rolelist.action' | translate }}"
                    width: "60px"
                    template: kendo.template($("#tpl_roleList_action").html())
                }
                {
                    field: "RoleName"
                    title: "Role Name"
                    headerTemplate:"{{ 'header_rolelist.roleName' | translate }}"
                    width: "200px"
                }
                {
                    field: "RoleDescription"
                    title: "Role Description"
                    headerTemplate: "{{ 'header_rolelist.roleDescription' | translate }}"
                    width: "150px"
                }
                {
                    field: "RoleType"
                    title: "Role Type"
                    headerTemplate: "{{ 'header_rolelist.roleType' | translate }}"
                    width: "100px"
                }
                {
                    field: "InUserName"
                    width: "160px"
                    title: "Create User"
                    headerTemplate: "{{ 'header_rolelist.createUser' | translate }}"
                }
                {
                    field: "InDate"
                    title: "Create Date"
                    headerTemplate: "{{ 'header_rolelist.createDate' | translate }}",
                    width: "150px"
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
                {
                    field: "LastEditUserName"
                    title: "Edit User"
                    headerTemplate: "{{ 'header_rolelist.editUser' | translate }}",
                    width: "120px"
                }
                {
                    field: "LastEditDate"
                    title: "Edit Date"
                    width: "150px"
                    headerTemplate: "{{ 'header_rolelist.editDate' | translate }}",
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
             ]

])

