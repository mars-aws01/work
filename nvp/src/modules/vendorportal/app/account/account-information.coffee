angular.module('vp-account-information',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.accountinfo.us)
    .translations('zh-cn',resources.vendorportal.accountinfo.cn)
    .translations('zh-tw',resources.vendorportal.accountinfo.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/account-information",
      templateUrl: "/modules/vendorportal/app/account/account-information.tpl.html"
      controller: 'AccountInformationCtrl'
])

.controller('AccountInformationCtrl',
["$scope","$window","$filter","messager","common","vendorAPI","warehouseAPI","vendorContactAPI","managementAPI","shipNoticeAPI","$translate",'profileApi',
($scope,$window,$filter,messager,common,vendorAPI,warehouseAPI,vendorContactAPI,managementAPI,shipNoticeAPI,$translate) ->

  $scope.currentUser = common.currentUser
  $scope.BusinessInfo={}
  $scope.NewContactInfo = {}
  $scope.DepartmentList = []
  $scope.currentContactInfo = {}

  $scope.displayTable_WH = false
  $scope.hasUnsavedData=false

  $scope.GetDepartment=->
    $scope.ContactInfoList=[]
    requestDepartment = {
      action: "department"
    }
    response = managementAPI.search requestDepartment,
       ->
          if(response && response.VendorDepartmentList )
             $scope.DepartmentList = angular.copy(response.VendorDepartmentList)
    ,(error)->


  $scope.GetTitle=->
    $scope.ContactInfoList=[]
    requestTitle = {
      action: "title"
    }
    response = managementAPI.search requestTitle,
       ->
          if(response && response.TitleList )
             $scope.TitleList = angular.copy(response.TitleList)
    ,(error)->


  $scope.GetBusinessInfo=->
    requestBusinessInfo = {
      VendorNumber: common.currentUser.VendorNumber
      PrimaryWarehouseOnly:true
    }
    response = vendorAPI.search requestBusinessInfo,
       ->
          if(response && response.VendorList && response.VendorList.length>0)
             $scope.BusinessInfo = angular.copy(response.VendorList[0])
    ,(error)->

  $scope.isnvfVendor = false
  if common.agentVendorList && common.agentVendorList.nvf && common.agentVendorList.nvf.length > 0
     nvfVendors = $filter('filter')(common.agentVendorList.nvf, (v) -> v.vendorNumber == common.currentUser.VendorNumber)
     if nvfVendors && nvfVendors.length > 0
       $scope.isnvfVendor = true

  if $scope.isnvfVendor == false
     $scope.GetDepartment()
     $scope.GetTitle()
     $scope.GetBusinessInfo()

  $scope.GetContactInfo=->
    $scope.ContactInfoList=[]
    requestBusinessInfo = {
      VendorNumber: common.currentUser.VendorNumber
    }
    response = vendorContactAPI.GetVendorContact requestBusinessInfo,
       ->
          $scope.hasUnsavedData=false
          if(response && response.VendorContactList )
             $scope.ContactInfoList = angular.copy(response.VendorContactList)
             for item in $scope.ContactInfoList
                item.displayStatus='View'
    ,(error)->

  $scope.addNewContact_UI = ->
    messager.clear()
    if($scope.hasUnsavedData)
        messager.error($translate('error_accountinfo.displayStatusInvalid'))
        return
    item = { displayStatus:'Create',TitleCode:null }
    if(!$scope.ContactInfoList)
      $scope.ContactInfoList = [item]
    else
      $scope.ContactInfoList.push(item)
    $scope.NewContactInfo = item
    $scope.currentContactInfo = $scope.NewContactInfo
    $scope.hasUnsavedData=true
    
  $scope.updateContact_UI =(item) ->
      messager.clear()
      if($scope.hasUnsavedData)
        messager.error($translate('error_accountinfo.displayStatusInvalid'))
        return
      if(!item.ContactNumber)
        messager.error($translate('error_accountinfo.contactIsNotCreated'))
        return
      item.displayStatus='Edit'
      $scope.currentContactInfo = item
      $scope.NewContactInfo=angular.copy(item)
      $scope.hasUnsavedData=true

  $scope.undoContact_UI =(item) ->
      item.displayStatus='View'
      $scope.currentContactInfo = item
      $scope.NewContactInfo={}
      $scope.hasUnsavedData=false

  $scope.CreateContact=->
    messager.clear()
    $scope.NewContactInfo.VendorNumber = common.currentUser.VendorNumber
    requestNewContactInfo = angular.copy($scope.NewContactInfo)
    if(requestNewContactInfo.DefaultMark==undefined)
        requestNewContactInfo.DefaultMark=false
    requestBusinessInfo = {
      RequestUser: common.currentUser.ID
      VendorContact: requestNewContactInfo
    }
    messager.clear()
    response = vendorContactAPI.Create requestBusinessInfo,
     (response)->
          if(response&&response.Succeeded)
            messager.success($translate('success_accountinfo.createContact'))
            $scope.contactModal=false
            $scope.currentContactInfo.displayStatus='View'
            $scope.hasUnsavedData=false
            #$scope.GetContactInfo()
          else
            if(response.Errors && response.Errors.length > 0)
              errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
              messager.error($translate('error_accountinfo.createContactFailed')+errorMsg)
    ,(error)->

  $scope.UpdateContact=->
    requestBusinessInfo = {
      RequestUser: common.currentUser.ID
      VendorContact: $scope.NewContactInfo
    }
    messager.clear()
    response = vendorContactAPI.Update requestBusinessInfo,
       ->
          if(response&&response.Succeeded)
            messager.success($translate('success_accountinfo.updateContact'))
            $scope.contactModal=false
            $scope.currentContactInfo.displayStatus='View'
            $scope.hasUnsavedData=false
            #$scope.GetContactInfo()
          else
            if(response.Errors && response.Errors.length > 0)
              errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
              messager.error($translate('error_accountinfo.updateContactFailed')+errorMsg)
    ,(error)->

  $scope.isLastInDepartment = (departmentName)->
    if (departmentName in ["Accounting - AR","RMA","Sales","Vendor Rebate Program"])
        return $filter('filter')($scope.ContactInfoList,{DepartmentName: departmentName}).length == 1
    else
        return false

  $scope.DeleteContact=(currentContact,index)->
    messager.clear()
    if(currentContact.displayStatus!='Create' and $scope.hasUnsavedData)
        messager.error($translate('error_accountinfo.displayStatusInvalid'))
        return
        
    if(!currentContact.ContactNumber && currentContact.displayStatus!='Create')
        messager.error($translate('error_accountinfo.contactIsNotCreated'))
        return
    
    if(currentContact.displayStatus!='Create' && $scope.isLastInDepartment(currentContact.DepartmentName))
        messager.error($translate('error_accountinfo.keepOneContact'))
        return
    
    msg = $translate('confirm_accountinfo.deleteContact')
    common.confirmBox msg,"", ->
      if(currentContact.displayStatus=='Create')
        $scope.ContactInfoList.splice(index,1)
        $scope.NewContactInfo={}
        messager.success($translate('success_accountinfo.deleteContact'))
        $scope.$apply()
        $scope.hasUnsavedData = false
        return
      requestBusinessInfo = {
        ContactNumber: currentContact.ContactNumber
      }
      response = vendorContactAPI.Delete requestBusinessInfo,
         ->
            if(response&&response.Succeeded)
              messager.success($translate('success_accountinfo.deleteContact'))
              #$scope.GetContactInfo()
              $scope.ContactInfoList.splice(index,1)
            else
              if(response.Errors && response.Errors.length > 0)
                errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                messager.error($translate('error_accountinfo.deleteContactFailed')+errorMsg)
      ,(error)->
    return true

  $scope.saveContract=()->
    if (!$scope.NewContactInfo.DepartmentCode || $scope.NewContactInfo.DepartmentCode.length<=0)
        messager.clear()
        messager.error($translate('error_accountinfo.departmentInvalid'))
        return
    if (!$scope.NewContactInfo.ContactName || $scope.NewContactInfo.ContactName.length<=0)
        messager.clear()
        messager.error($translate('error_accountinfo.contactNameInvalid'))
        return
    if (!$scope.NewContactInfo.PhoneNumber || $scope.NewContactInfo.PhoneNumber.length<=0)
        messager.clear()
        messager.error($translate('error_accountinfo.phoneNumberInvalid'))
        return
    if (!$scope.NewContactInfo.Email || $scope.NewContactInfo.Email.length<=0)
        messager.clear()
        messager.error($translate('error_accountinfo.emailInvalid'))
        return
    if ($scope.NewContactInfo.displayStatus == "Create" )
        $scope.CreateContact()
        return
    if ($scope.NewContactInfo.displayStatus == "Edit" )
        $scope.UpdateContact()
        return

#  $scope.EditContact =(currentContact)->
#    $scope.status = "Edit"
#    $scope.NewContactInfo = angular.copy(currentContact)
#    $scope.contactModal=true

  $scope.GetWarehouseInfo=->
    requestWarehouseInfo = {
      vendorNumber: common.currentUser.VendorNumber
      WithShared : false
    }
    response = warehouseAPI.search requestWarehouseInfo,
       ->
          warehouseArray=[]
          addressArray=[]
          if(response && response.Warehouses && response.Warehouses.length>0)
              warehouseArray = angular.copy(response.Warehouses)
          shipNoticeAPI.getShipAddress {action:'address',vendorNumber:common.currentUser.VendorNumber}
            ,(response)->
                if(response && response.ShipAddressList && response.ShipAddressList.length>0)
                    addressArray=angular.copy(response.ShipAddressList)
                $scope.WarehouseList=warehouseArray.concat addressArray
            ,(error)->
    ,(error)->

#  $scope.addcontact=->
#    $scope.ContactInfoList.push($scope.NewContactInfo)
#    $scope.contactModal=false
#
#  $scope.openAddContact =->
#    $scope.status = "Create"
#    $scope.NewContactInfo ={}
#    $scope.contactModal=true
#
#  $scope.closecontact =->
#    $scope.contactModal=false

  $scope.GetProfileInfo = ->
    common.updateProfile(common.currentUser.VendorNumber,$scope.updateProfile)

  $scope.updateProfile = (d)->
    $scope.Profile = d

  $scope.changeVendor=->
    $scope.GetBusinessInfo()
    $scope.GetContactInfo()
    $scope.GetWarehouseInfo()
    $scope.GetProfileInfo()

])
.filter('ReplaceNull',()->
   return (item)->
       if !item
          'N/A'
       else
          item
 )
 .filter('ConvertToDepartmentName',()->
    return (item)->
        for i in item.List
            if(i.DepartmentCode==item.Code)
                return i.DepartmentName
        return 'Department'
 )
 .filter('ConvertToTitleName',()->
    return (item)->
        for i in item.List
            if(i.TitleCode==item.Code)
                return i.TitleName
        return 'Title'
 )
