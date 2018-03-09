angular.module("vdFunctionList", ['ngSanitize'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.common.us)
    .translations('zh-cn',resources.vendorportal.common.cn)
    .translations('zh-tw',resources.vendorportal.common.tw)
  ])
  
.directive('vdFunctionList',["$rootScope","$compile","$filter","userAPI","common","messager","$translate"
 ($rootScope,$compile,$filter,userAPI,common,messager,$translate) ->
  restrict: 'E'
  scope:{
    data : '='
    click: '&'
  }

  template:' 
  <div class="row no-margin vp-list">
        <div class="col-lg-12 " ng-repeat="user in data | filter:statusFilter" ng-class="{\'vp-list-green\': user.isCurrentUser}">
            <div class="col-xs-12">
                <div class="vp-list-icon " ng-class="{\'vp-list-icon-blue\': !user.isCurrentUser, \'vp-list-icon-green\': user.isCurrentUser}">
                    <i class="ace-icon  icon-user"></i>
                    <span class="title text-left">{{ user.LoginName }}</span>
                    <span class="title2 pull-right">
                        <label title="{{ &apos;view_accountsetting.adminTip&apos; | translate }}">
                            <input name="form-field-checkbox" ng-model="user.IsAdmin" class="ace" type="checkbox" ng-disabled="user.isCurrentUser">
                            <span class="lbl" style="font-size: 12px;">&nbsp;{{ &apos;view_accountsetting.admin&apos; | translate }}</span>
                        </label>
                    </span>
                </div>
                <div class="vp-list-info" ng-repeat="fun in user.functionList"  style="width:90%;margin-bottom:20px;">
                    <div class="col-xs-12 no-padding" style="padding-left:18px;margin: -6px 0;" ng-hide="fun.MenuURL==\'/home\'">
                        <label style="float:left; width:220px !important;margin-top: -2px;font-size:15px;font-weight:700;color:#626464">
                          <a href="#" ng-click="fun.isShowDetail=false" ng-hide="fun.isShowDetail==false"><i class="icon-angle-down bigger-130" style="font-weight:bold;"></i></a>
                          <a href="#" ng-click="fun.isShowDetail=true" ng-hide="fun.isShowDetail!=false"><i class="icon-angle-up bigger-130" style="font-weight:bold;"></i></a>
                          {{ fun | menuLocalize}}
                        </label>
                        <label style="float:left;margin-left: 6px;margin-right: 49px;margin-bottom:0px;" ng-repeat="item in fun.functionDisplayList" ng-hide="item.isDisabled">
                            <input name="{{item.menuID}}{{item.userID}}" type="radio" ng-model="fun.activeType" ng-disabled="user.isCurrentUser || item.isDisabled || user.IsAdmin" value="{{item.name}}" class="ace">
                            <span class="lbl">&nbsp;{{ item.name}}</span>
                        </label>
                     </div>
                    <div class="vp-list-row" ng-repeat="menu in fun.SubMenuList" ng-hide="fun.MenuURL==\'/home\'||menu.MenuURL==\'/product-reviews\'||fun.isShowDetail==false">
                        <div class="name" style="text-align:left; width:220px;padding-left:15px;">{{ menu | menuLocalize}}</div>
                        <div class="value">
                            <span>  
                                <label style="margin-right: 55px;margin-bottom:0px;" ng-repeat="item in menu.functionDisplayList"  ng-hide="item.isDisabled">
                                    <input name="{{item.menuID}}{{item.userID}}" type="radio" ng-model="menu.activeType" ng-disabled="user.isCurrentUser || item.isDisabled || user.IsAdmin" value="{{item.name}}" class="ace">
                                    <span class="lbl" style="font-size: 13px;">&nbsp;{{ item.name }}</span>
                                </label>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 text-right no-padding" style="margin-top:15px;" ng-hide="user.isCurrentUser==true" >
                     <button type="button" class="btn btn-primary btn-sm" ng-click="save(user)"  vd-auth="Save">
                        &nbsp;<i class="icon-save"></i>&nbsp;&nbsp;{{ \'common_button.save\' | translate }}&nbsp;
                     </button>
                     <button type="button" class="btn btn-warning btn-sm" ng-click="reset(user)"  vd-auth="Save">
                        &nbsp;<i class="icon-undo"></i>&nbsp;&nbsp;{{ \'common_button.cancel\' | translate }}&nbsp;
                     </button>
                     <button type="button" class="btn btn-danger btn-sm" ng-click="delete(user)" ng-hide="user.isCurrentUser"  vd-auth="Save">
                        &nbsp;<i class="icon-remove"></i>&nbsp;&nbsp;{{ \'common_button.deleted\' | translate }}&nbsp;
                     </button>
                </div>
            </div>
        </div>
    </div>
  
  '
  controller:($scope)->
    $scope.cloneData = null 
    
    $scope.statusFilter = (item) ->
        return item.Status == "Enabled"
            
    $scope.delete=(user)->
        msg=$translate('confirm_userlist.actionStart2').concat($translate('description_userlist.deleted')).concat($translate('confirm_userlist.actionEnd2')).concat(user.LoginName).concat("?")
        common.confirmBox msg,"", ->
            userTemp=angular.copy(user)
            if(userTemp.Type=='Internal')
                userTemp.VendorNumber='0'
            userTemp.Status = "Disabled"
            request={RequestUser:common.currentUser.ID,User:userTemp}
            userAPI.deactivateVendor request
                ,(response)->
                    if(response&&response.Succeeded)
                        messager.success($translate('success_userlist.deleteUser'))
                        $scope.data.splice($scope.data.indexOf(user), 1)
                        $scope.click()
                    else
                        messager.error($translate('description_userlist.deleteUserStart').concat(user.LoginName).concat($translate('error_userlist.disableUserEnd')))    
                  
    $scope.reset = (currentUser) ->
        messager.clear()
        for user in $scope.cloneData
            if(user.ID==currentUser.ID)
                currentUser.functionList = angular.copy(user.functionList)   
                currentUser.IsAdmin=  angular.copy(user.IsAdmin)     
    
    $scope.save = (currentUser) ->
      messager.clear()
      requestUser = {
        action1: 'permission'
        UserID : currentUser.ID
        IsAdmin : currentUser.IsAdmin
        RequestUser : common.currentUser.ID
      }
      requestUser.PermissionFunctionList = []
      for menu in currentUser.functionList
        requestUser.PermissionFunctionList.push.apply(requestUser.PermissionFunctionList,$scope.getPermissionFunctionList(menu))
        if(menu.SubMenuList && menu.SubMenuList.length > 0)
          for sub in menu.SubMenuList
            requestUser.PermissionFunctionList.push.apply(requestUser.PermissionFunctionList,$scope.getPermissionFunctionList(sub))
      userAPI.updatePermission requestUser,
        (response) ->
          if(response&&response.Succeeded==true)
            messager.success($translate('success_userlist.saveFunctionlist'))
            $scope.click()
          else
            messager.error($translate('control_functionlist.saveFailed'))
        ,(error) -> 
          messager.error($translate('control_functionlist.saveFailed'))

    $scope.getPermissionFunctionList = (menu) ->
      tempList = []
      if(menu.PermissionFunctionList && menu.PermissionFunctionList.length > 0)
        for pf in menu.PermissionFunctionList
          if menu.MenuURL=='/home'
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
          
      
    $scope.loadUserFunctionData = ->    
       if(!$scope.data || $scope.data.length == 0)
         return
       for user in $scope.data
         for menu in user.functionList
           common.setLocalizedMenu(menu)           
           $scope.createFunctionDisplayList(menu,user.ID)
           if(menu.SubMenuList && menu.SubMenuList.length > 0)
             for sub in menu.SubMenuList
               common.setLocalizedMenu(sub)
               $scope.createFunctionDisplayList(sub,user.ID)
       $scope.cloneData=angular.copy($scope.data)
       
                                            
    $scope.$watch 'data',
      (newVal,oldVal)->
          if(newVal==undefined||newVal==null)       
             return              
          else
             $scope.loadUserFunctionData()
       

  link: ($scope, element) ->
     return null

])