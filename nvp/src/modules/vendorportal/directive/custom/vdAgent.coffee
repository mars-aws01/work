angular.module("vdAgent", ['ngSanitize'])

.directive('vdAgent',["$rootScope","$compile","$filter","userAPI","common","messager","vendorAPI",
 ($rootScope,$compile,$filter,userAPI,common,messager,vendorAPI) ->
  restrict: 'E'
  scope:{
    click: '&'
  }

  template:'<div class="col-xs-12 form-group no-padding-left no-padding-right vp-agent" ng-show="isShow">
              <div class="col-lg-10 col-md-11">
                  <div class="col-md-12 input-group">
                      <span style="float:left;margin-top:5px" class="align-middle visible-lg">{{ &apos;view_orderlist.vendorName&apos; | translate }}:&nbsp;</span>
                      <vd-pop-tip class="align-middle ng-isolate-scope visible-lg"   style="float:left;margin-top:5px; margin-right:20px; "
                          ng-title="{{ &apos;view_orderlist.vendorSearchHelpTitle&apos; | translate }}" 
                          ng-content="{{ &apos;view_orderlist.vendorSearchHelpContent&apos; | translate }}">
                      </vd-pop-tip>
                      <span class="input-group-addon visible-lg vp-agent-icon" 
                            style="display:inherit;float:left;height:30px;width:33px;padding:7px !important;">
                        <i class="icon-search"></i>
                      </span>
                      <span class="input-icon input-icon-right" style="float:left;margin-right:10px;">
                          <input
                              class="vp-input vp-agent-input agent-input"
                              type="text" onClick="this.select();"
                              style="padding-left: 5px !important;"
                              placeholder="{{ &apos;view_orderlist.vendorSearchPlaceHolder&apos; | translate }}"
                              ng-model="selectedVendorName"
                              typeahead-on-select="setVendor()"
                              typeahead="v.vendorNameDisplay for v in vendorList | filter:$viewValue | limitTo:20"
                              typeahead-append-to-body="true"
                              typeahead-min-length="1" />
                          <i class="ace-icon icon icon-lock green" ng-show="agentVendor.hasFocus == true"></i>
                      </span>
                     <label style="margin-top: 5px" >
                          <input name="form-field-checkbox" ng-disabled="agentVendor.hasSelected == false" ng-model="agentVendor.hasFocus" ng-click="setOnFocus()" class="ace ace-checkbox" type="checkbox">
                          <span class="lbl">&nbsp;{{ &apos;view_orderlist.focusOnCurrentVendor&apos; | translate }}</span>
                    </label>
                  </div>
              </div>
          </div>'

  controller:($scope)->
    
    $scope.isShow = if common.currentUser.Type=='Internal' then true else false
    if($scope.isShow==false)
       return
    $scope.agentVendor = common.currentUser.agentVendor
    $scope.vendorList = []

    $scope.getVendorPortalVendors = (requestItem)->
      requestItem = {} if !requestItem 
      requestItem.isWebformVendor = true
      requestItem.PrimaryWarehouseOnly = true
      vendorAPI.search requestItem,
        (response) ->
          if(response.Succeeded == true && response.VendorList)
            for v in response.VendorList
              tempVendor = {
                  vendorNumber : v.VendorNumber
                  vendorName : v.VendorName 
                  vendorNameDisplay : v.VendorName + " - " + v.VendorNumber + " ("+ v.WarehouseCountryCode+")"
                  CountryCode : v.CountryCode 
                  WarehouseCountryCode : v.WarehouseCountryCode 
              }
              $scope.vendorList.push(tempVendor)
            common.vendorList = angular.copy($scope.vendorList)
            common.agentVendorList[query.agentVendorType] = angular.copy($scope.vendorList)
            $scope.setCurrentVendor()
            
    $scope.getVendorPortalVendors_vf = (requestItem)->
      requestItem = { IncludeStockingPOVendor : false, IncludeVFVendor : true , IncludeESDVendor : false, agentVendorType : 'vf'}
      requestItem.isWebformVendor = true
      requestItem.PrimaryWarehouseOnly = true
      vendorAPI.search requestItem,
        (response) ->
          if(response.Succeeded == true && response.VendorList)
            tempList = []
            for v in response.VendorList
              tempVendor = {
                  vendorNumber : v.VendorNumber
                  vendorName : v.VendorName 
                  vendorNameDisplay : v.VendorName + " - " + v.VendorNumber + " ("+ v.WarehouseCountryCode+")"
                  CountryCode : v.CountryCode
                  WarehouseCountryCode : v.WarehouseCountryCode  
              }
              tempList.push(tempVendor)
            common.agentVendorList['vf'] = angular.copy(tempList)
            
    $scope.getVendorPortalVendors_esd = (requestItem)->
      requestItem = { IncludeStockingPOVendor : false, IncludeVFVendor : false , IncludeESDVendor : true, agentVendorType : 'esd'}
      requestItem.isWebformVendor = true
      requestItem.PrimaryWarehouseOnly = true
      vendorAPI.search requestItem,
        (response) ->
          if(response.Succeeded == true && response.VendorList)
            tempList = []
            for v in response.VendorList
              tempVendor = {
                  vendorNumber : v.VendorNumber
                  vendorName : v.VendorName 
                  vendorNameDisplay : v.VendorName + " - " + v.VendorNumber + " ("+ v.WarehouseCountryCode+")"
                  CountryCode : v.CountryCode
                  WarehouseCountryCode : v.WarehouseCountryCode  
              }
              tempList.push(tempVendor)
            common.agentVendorList['esd'] = angular.copy(tempList)
            
    $scope.getVendorPortalVendors_nvf = ()->
      requestItem = { IncludeStockingPOVendor : true, IncludeVFVendor : false , IncludeESDVendor : false, agentVendorType : 'nvf'}
      requestItem.isWebformVendor = true
      requestItem.PrimaryWarehouseOnly = true
      vendorAPI.search requestItem,
        (response) ->
          if(response.Succeeded == true && response.VendorList)
            tempList = []
            for v in response.VendorList
              tempVendor = {
                  vendorNumber : v.VendorNumber
                  vendorName : v.VendorName 
                  vendorNameDisplay : v.VendorName + " - " + v.VendorNumber + " ("+ v.WarehouseCountryCode+")"
                  CountryCode : v.CountryCode 
                  WarehouseCountryCode : v.WarehouseCountryCode 
              }
              tempList.push(tempVendor)
            common.agentVendorList['nvf'] = angular.copy(tempList)
            
    $scope.getVendorPortalVendors_vfnvf = ()->
      requestItem = { IncludeStockingPOVendor : true, IncludeVFVendor : true , IncludeESDVendor : false, agentVendorType : 'vfnvf'}
      requestItem.isWebformVendor = true
      requestItem.PrimaryWarehouseOnly = true
      vendorAPI.search requestItem,
        (response) ->
          if(response.Succeeded == true && response.VendorList)
            tempList = []
            for v in response.VendorList
              tempVendor = {
                  vendorNumber : v.VendorNumber
                  vendorName : v.VendorName 
                  vendorNameDisplay : v.VendorName + " - " + v.VendorNumber + " ("+ v.WarehouseCountryCode+")"
                  CountryCode : v.CountryCode 
                  WarehouseCountryCode : v.WarehouseCountryCode 
              }
              tempList.push(tempVendor)
            common.agentVendorList['vfnvf'] = angular.copy(tempList)
                          
    $scope.setCurrentVendor = ->
      hasCurrentVendor = false
      for v in $scope.vendorList
        if(v.vendorNumber == common.currentUser.VendorNumber)
            $scope.selectedVendorName = v.vendorNameDisplay
            $scope.selectVendor = v
            common.currentUser.VendorName = v.vendorNameDisplay
            common.currentUser.CountryCode = v.CountryCode
            common.currentUser.WarehouseCountryCode = v.WarehouseCountryCode
            common.currentUser.agentVendor.hasSelected=true
            hasCurrentVendor = true
      if common.currentUser.agentVendor.lastVendorNumber && hasCurrentVendor == false
         for v in $scope.vendorList
            if(v.vendorNumber == common.currentUser.agentVendor.lastVendorNumber)
                $scope.selectedVendorName = v.vendorNameDisplay
                $scope.selectVendor = v
                common.currentUser.VendorNumber = angular.copy(common.currentUser.agentVendor.lastVendorNumber)
                common.currentUser.VendorName = v.vendorNameDisplay
                common.currentUser.CountryCode = v.CountryCode
                common.currentUser.WarehouseCountryCode = v.WarehouseCountryCode
                common.currentUser.agentVendor.hasFocus = true
                common.currentUser.agentVendor.hasSelected= true
                hasCurrentVendor = true
                $scope.click()
      if common.currentUser.agentVendor.hasFocus && hasCurrentVendor == false
         common.currentUser.agentVendor.hasFocus = false
         common.currentUser.agentVendor.hasSelected= false
        # common.currentUser.agentVendor.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)
         common.currentUser.VendorNumber = 0
      common.updateProfile(common.currentUser.VendorNumber)
      $rootScope.$broadcast 'VendorChanged' ,''
           
    $scope.clearSelectedVendor = ->
        $scope.selectedVendorName = ''
        $scope.selectVendor = {}
        common.currentUser.VendorName = 'Vendor Portal Admin'
        common.currentUser.VendorNumber = 0
        common.currentUser.CountryCode = ''
        common.currentUser.WarehouseCountryCode = ''
        $scope.agentVendor.hasSelected=false   
        $scope.agentVendor.hasFocus=false 
        
    $scope.setOnFocus = ->
      common.currentUser.agentVendor.hasFocus = !$scope.agentVendor.hasFocus
      if(common.currentUser.agentVendor.hasFocus == false)
         common.currentUser.agentVendor.lastVendorNumber = null
      else
         common.currentUser.agentVendor.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)
         
      
    $scope.setVendor = ->
      if(!$scope.vendorList || !$scope.selectedVendorName || $scope.selectedVendorName == '')
         messager.warning('Please select a valid vendor.')
         return
      filterVendorList = $filter('filter')($scope.vendorList, (v) -> v.vendorNameDisplay == $scope.selectedVendorName.trim())
      if(filterVendorList && filterVendorList.length > 0)
        $scope.selectVendor = filterVendorList[0]
        common.currentUser.VendorNumber = $scope.selectVendor.vendorNumber
        common.currentUser.VendorName = $scope.selectVendor.vendorName
        common.currentUser.CountryCode = $scope.selectVendor.CountryCode
        common.currentUser.WarehouseCountryCode = $scope.selectVendor.WarehouseCountryCode 
        common.updateProfile(common.currentUser.VendorNumber)
        $rootScope.$broadcast 'VendorChanged' ,''
        common.currentUser.agentVendor.hasSelected = true
        #if(common.currentUser.agentVendor.lastVendorNumber)
          #debugger
          #common.currentUser.agentVendor.hasFocus = false
          #common.currentUser.agentVendor.lastVendorNumber = null
        $scope.click()
      else
        messager.warning('Please select a valid vendor.')
        return
    query = common.getAgentVendorListQuery()
    if query.agentVendorType != common.agentVendorType
       common.agentVendorType = query.agentVendorType
    if(common.agentVendorList[query.agentVendorType] && common.agentVendorList[query.agentVendorType].length > 0)
       $scope.vendorList = angular.copy(common.agentVendorList[query.agentVendorType])
       common.vendorList = angular.copy($scope.vendorList)
       $scope.setCurrentVendor()
    else
       common.currentUser.VendorNumber = 0
       $scope.getVendorPortalVendors(query)
       if query.agentVendorType == "all"
          $scope.getVendorPortalVendors_vf()
          $scope.getVendorPortalVendors_nvf()
          $scope.getVendorPortalVendors_vfnvf()
          $scope.getVendorPortalVendors_esd()
       if query.agentVendorType == "vf"
          $scope.getVendorPortalVendors_nvf()
       if query.agentVendorType == "esd"
          $scope.getVendorPortalVendors_esd()
       if query.agentVendorType == "nvf"
          $scope.getVendorPortalVendors_vf()
       if query.agentVendorType == "vfnvf"
          $scope.getVendorPortalVendors_vfnvf()
          
  link: ($scope, element) ->
     return null

])