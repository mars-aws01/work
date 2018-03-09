angular.module('vp-user-account-setting',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.accountsetting.us)
    .translations('zh-cn',resources.vendorportal.accountsetting.cn)
    .translations('zh-tw',resources.vendorportal.accountsetting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/user-account-setting",
      templateUrl: "/modules/vendorportal/app/account/user-account-setting.tpl.html"
      controller: 'UserAccountSettingCtrl'
])

.controller('UserAccountSettingCtrl',
["$scope","$window","$filter","$q","messager","common","userAPI","vendorAPI","$translate", ($scope,$window,$filter,$q,messager,common,userAPI,vendorAPI,$translate) ->

  $scope.agentVendor = common.currentUser

  $scope.key = null
  $scope.isExactMatch = false
  $scope.allUserList = null
  $scope.currentUser = common.currentUser
  $scope.showInviteBtn=common.currentUser.IsAdmin || common.currentUser.Type=='Internal'


  $scope.search = ->
    $scope.isSaveSearch = true
    $scope.loadUserList()

  $scope.filterUser = ->
    if(!$scope.allUserList)
      return
    if(!$scope.key || $scope.key == '')
      $scope.userList = $scope.allUserList
    else
      if($scope.isExactMatch == true)
        $scope.userList = $filter('filter')($scope.allUserList, (user) -> user.LoginName.toLowerCase() == $scope.key.toLowerCase())
      else
        $scope.userList = $filter('filter')($scope.allUserList, (user) -> user.LoginName.toLowerCase().indexOf($scope.key.toLowerCase()) >= 0)

  $scope.loadUserList = ->
    requestUser = {
      vendorNumber: common.currentUser.VendorNumber
    }
    userAPI.getUserList requestUser,
      (response) ->
        if(response&&response.Succeeded==true)
          tempUserListWithoutCurrentUser = []
          for user in response.UserList
            if(user.ID != common.currentUser.ID && user.Status != 'Disabled')
              tempUserListWithoutCurrentUser.push(user)
          if(tempUserListWithoutCurrentUser.length == 0 && common.currentUser.Type != 'Internal')
             $scope.userList = [ angular.copy(common.currentUser)]
             $scope.allUserList = $scope.userList
          $scope.getFunctionList(tempUserListWithoutCurrentUser).then((result) ->
            tempUserList = []
            if(common.currentUser.Type != 'Internal')
              tempUserList.push(angular.copy(common.currentUser))

            tempUserList.push.apply(tempUserList,result)
            $scope.userList = tempUserList
            $scope.allUserList = $scope.userList

            if($scope.isSaveSearch)
              $scope.filterUser()
              $scope.isSaveSearch = false
          )
      ,(error) ->
        messager.error($translate('error_accountsetting.getUsersFailed'))

  $scope.getFunctionList = (userList) ->
    deferred = $q.defer()
    result = []
    requestCount = 0
    for user in userList
      deferred = $q.defer()
      requestItem = {
        action1 : 'permission'
        userID: user.ID
      }
      userAPI.getPermission(requestItem)
        .$promise.then (response) ->
          requestCount++
          if(response&&response.Succeeded==true)
            filterUsers = $filter('filter')(userList,(u) -> u.ID == response.UserID)
            if(filterUsers && filterUsers.length > 0)
              filterUsers[0].functionList = response.MenuList
          if(requestCount == userList.length)
            deferred.resolve(userList)
        ,(error)->
          if(requestCount == userList.length)
            deferred.resolve(result)
    return deferred.promise

  $scope.initData = ->
    $scope.userList = null
    if(!common.currentUser)
      messager.error($translate('error_accountsetting.currentUserInvalid'))
      return
    if(common.currentUser.VendorNumber == '0')
      return
    if(common.currentUser.Type=='Vendor' and common.currentUser.IsAdmin)
       $scope.loadUserList()
       return
    if(common.currentUser.Type !='Internal')
      $scope.userList = [ angular.copy(common.currentUser)]
      $scope.allUserList = $scope.userList
    else
      $scope.loadUserList()

  $scope.initData()

  $scope.saveSearch = ->
    $scope.isSaveSearch = true
    $scope.loadUserList()

  #******************** Invite User ********************#
  $scope.openInviteUserModel=->
    $scope.InvitationList=[{'Index':0,'Email':'','IsRequired':false,'IsAdmin':false,'Inviter':common.currentUser.VendorName,'Type':'Vendor','VendorNumber':common.currentUser.VendorNumber,'VendorName':common.currentUser.VendorName}]
    $scope.inviteUserModel=true

  $scope.closeInviteUserModel=->
    $scope.inviteUserModel=false

  $scope.inviteMoreClick=->
    for idx in [1..4]
        $scope.InvitationList.push({'Index':idx,'Email':'','IsRequired':false,'IsAdmin':false,'Inviter':common.currentUser.VendorName,'Type':'Vendor','VendorNumber':common.currentUser.VendorNumber,'VendorName':common.currentUser.VendorName})

  $scope.inviteClick=->
    hasDuplicate=false
    emailList=[]
    for inviteEntity in $scope.InvitationList when inviteEntity.Email? and inviteEntity.Email isnt ''
        emailList.push(inviteEntity.Email)
    emailList=emailList.sort()
    for index of emailList
        if(emailList[index-1]==emailList[index])
            hasDuplicate=true
            break
    if(hasDuplicate)
        messager.error($translate('error_accountsetting.emailDuplicate'))
        return

    hasAtLeastOneEmail=false
    for inviteEntity in $scope.InvitationList
        if(inviteEntity.Email?&&inviteEntity.Email isnt '')
              hasAtLeastOneEmail=true
              break
    if(hasAtLeastOneEmail==false)
        messager.error($translate('error_accountsetting.emailInvalid'))
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
                messager.error($translate('error_accountsetting.emailExist') + result.ExistUsers.join(','))
    )

  $scope.inviteUsers =(users)->
    inviteRequest = {
      'RequestUser':common.currentUser.ID,
      InvitationList:users,
      action1:'invitation'
    }
    userAPI.invite inviteRequest,
        (response)->
          if(response&&response.Succeeded)
            messager.success($translate('success_accountsetting.invitation'))
            $scope.inviteUserModel=false
          else
            if(response.Errors && response.Errors.length > 0)
                errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                messager.error(errorMsg)
      ,(error)->



])
