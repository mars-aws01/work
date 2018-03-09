angular.module('vf-item-creation', [
  'ngRoute'
  'pascalprecht.translate'
]).config([
  '$translateProvider'
  ($translateProvider) ->
    $translateProvider.translations('en-us', resources.vendorportal.itemcreation.us).translations('zh-cn', resources.vendorportal.itemcreation.cn).translations 'zh-tw', resources.vendorportal.itemcreation.tw
]).config([
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider.when '/create-item-request',
      templateUrl: '/modules/vendorportal-vf/app/item/item-creation.tpl.html'
      controller: 'ItemCreationCtrl'
]).controller 'ItemCreationCtrl', [
  '$scope'
  '$filter'
  '$q'
  'messager'
  'common'
  '$translate'
  'itemCreation'
  'itemCreationAPI'
  'manufacturerAPI'
  'publisher'
  ($scope, $filter, $q, messager, common, $translate, itemCreation, itemCreationAPI, manufacturerAPI, publisher) ->
    publisher.clearAll()
    $scope.shouldInit = true
    $scope.uploadFilesDisabled = false
    $scope.config = itemCreation.config

    $scope.setDefaultEntity = ->
      $scope.entity = {}
      $scope.entity.NeweggPMUserID = ''
      $scope.entity.UnitMeasurement = 0
      $scope.entity.OriginCountries = []
      $scope.entity.WarningList = []
      $scope.entity.AttachmentList = []
      $scope.entity.OriginCountryList = []

    $scope.setDefaultEntity()
    $scope.tmpEntity = angular.copy($scope.entity)

    $scope.getManufacturerList = ->
      requestItem = undefined
      requestItem = VendorNumber: common.currentUser.VendorNumber
      manufacturerAPI.search requestItem, (response) ->
        if response
          return $scope.ManufacturerInfoList = response.ManufacturerInfoList
        return

    $scope.changeVendor = ->
      $scope.getManufacturerList()

    if common.currentUser.VendorNumber != '' and common.currentUser.VendorNumber != '0'
      $scope.getManufacturerList()

    $scope.closeItemReqModal = ->
      $scope.copyItemReqModal = false

    $scope.getSpecInfo = ->
      i = undefined
      item = undefined
      len = undefined
      properties = undefined
      ref = undefined
      properties = []
      ref = $scope.ItemProperties
      i = 0
      len = ref.length
      while i < len
        item = ref[i]
        if item.UserInput
          properties.push
            PropertyCode: item.PropertyCode
            UserInput: item.UserInput
        i++
      $scope.entity.ItemProperties = properties

    $scope.isSpecInfoValid = ->
      if $scope.entity.ItemProperties.length == 0
        false
      else
        true

    $scope.isSubmiting = false

    imAPIErrorMappings = {
      keys:['IsBATT ','IsBATTT']
      IsBATT: '[IsBATT: Does this item contain any batteries?]'
      IsBATTT:'[IsBATTT: Is this item a standalone battery?]'
    }

    reloveIMErrorMsg = (msg) ->
      tempArr = []
      for key in imAPIErrorMappings.keys
          if msg.indexOf(key) >= 0
             tempArr.push(imAPIErrorMappings[key.trim()])
      tempArr.join("\r\n")
      msg = msg + "\r\n"+ tempArr

    $scope.submit = ->
      messager.clear()
      if $scope['imForm'].$valid == false
        return false
      pattern = /^[\d]{0,8}$/
      if $scope.entity.BatteryNumber && pattern.test($scope.entity.BatteryNumber) == false
        messager.error 'Battery lithium should be integer.'
        return
      if !$scope.entity.ManufacturerPartNumber and !$scope.entity.UPCCode
        messager.error $translate('error.upcAndMfr')
        return
      if $scope.entity.SellToNeweggPrice == '0'
        messager.error 'Sell To Newegg Price must be greater than 0.'
        return
      if $scope.entity.SuggestedSellingPrice == '0'
        messager.error 'Suggested Selling Price must be greater than 0.'
        return
      if $scope.entity.OriginCountryList.length == 0
        messager.error $translate('error.originCountry')
        return
      if $scope.entity.ProductLength == '0' or $scope.entity.ProductWidth == '0' or $scope.entity.ProductHeight == '0' or $scope.entity.ProductWeight == '0'
        messager.error 'Product L/W/H/Weight must be greater than 0.'
        return
      if $scope.entity.PackageLength == '0' or $scope.entity.PackageWidth == '0' or $scope.entity.PackageHeight == '0' or $scope.entity.PackageWeight == '0'
        messager.error 'Package L/W/H/Weight must be greater than 0.'
        return
      if $scope.entity.CategoryID == undefined or $scope.entity.CategoryID == null
        messager.error 'Category Name is error or unrecognized, please select another one in the drop-down list.'
        return
      if $scope.entity.IsContainingBattery == true and $scope.entity.IsBattery == true
        messager.error 'The option "Does this item contain any batteries?" and "Is this item a standalone battery?" cannot be both Yes at the same time.'
        return
      if  ($scope.entity.IsContainingBattery == true or $scope.entity.IsBattery == true) && 
          ($scope.entity.BatteryWatt and $scope.entity.BatteryVolt and $scope.entity.BatteryCapacity) &&
          ($scope.entity.BatteryWatt != Math.ceil(($scope.entity.BatteryVolt*$scope.entity.BatteryCapacity) / 1000))
        messager.error 'Watt hours value is wrong. Get the smallest integer which is greater than, or equal to, the specified numeric expression. [Watt Hours = Milliamp Hours * Voltage / 1000]'
        return
      if  ($scope.entity.IsContainingBattery == true or $scope.entity.IsBattery == true) && 
          ($scope.entity.BatteryWatt and $scope.entity.BatteryVolt) &&
          (($scope.entity.BatteryWatt * 1000 / $scope.entity.BatteryVolt) > 99999.99)
        messager.error 'Milliamp Hours is invalid. [Watt Hours * 1000 / Voltage > 99999.99 ]'
        return
      if  ($scope.entity.IsContainingBattery == true or $scope.entity.IsBattery == true) && 
          ($scope.entity.BatteryWatt and $scope.entity.BatteryCapacity) &&
          (($scope.entity.BatteryWatt * 1000 / $scope.entity.BatteryCapacity) > 99999.99)
        messager.error 'Voltage is invalid. [Watt Hours * 1000 / Milliamp Hours > 99999.99 ]'
        return
      common.confirmBox 'Please confirm whether to create the item?', '', ->
        requestItem = undefined
        $scope.isSubmiting = true
        requestItem = ItemCreationApplication: angular.copy($scope.entity)
        if !$scope.entity.IsContainingBattery and !$scope.entity.IsBattery
           delete requestItem.ItemCreationApplication.BatteryWatt
           delete requestItem.ItemCreationApplication.BatteryVolt
           delete requestItem.ItemCreationApplication.BatteryCapacity
           delete requestItem.ItemCreationApplication.BatteryType
           delete requestItem.ItemCreationApplication.BatteryNumber
           delete requestItem.ItemCreationApplication.BatteryUnit
           delete requestItem.ItemCreationApplication.BatteryMass
        if !requestItem.ItemCreationApplication.BatteryNumber
           delete requestItem.ItemCreationApplication.BatteryUnit
        requestItem.VendorNumber = common.currentUser.VendorNumber
        if requestItem.ItemCreationApplication.UPCCode and !requestItem.ItemCreationApplication.ManufacturerPartNumber
          requestItem.ItemCreationApplication.ManufacturerPartNumber = requestItem.ItemCreationApplication.UPCCode
        if requestItem.ItemCreationApplication.Hyperlink.slice(0, 4) != 'http'
          requestItem.ItemCreationApplication.Hyperlink = 'http://' + requestItem.ItemCreationApplication.Hyperlink
        requestItem.action1 = 'request'
        itemCreationAPI.create requestItem, ((response) ->
          err = undefined
          errors = undefined
          i = undefined
          len = undefined
          msg = undefined
          ref = undefined
          $scope.isSubmiting = false
          if response and response.Succeeded
            $scope.resetForm()
            messager.success $translate('success.create')
          else
            msg = $translate('error.create')
            errors = []
            if response.Errors and response.Errors.length > 0
              ref = response.Errors
              i = 0
              len = ref.length
              while i < len
                err = ref[i]
                errors.push err.Message
                i++
            msg2 = reloveIMErrorMsg errors.join('.')
            messager.error msg + msg2
        ), (err) ->
          $scope.isSubmiting = false
          if err and err.data
            return messager.error(common.getValidationErrorMsg(err.data))
          return

    $scope.resetForm = ->
      publisher.publish 'vfCategory' + 'detail',
        Callback: 'clear'
        Param: undefined
      $scope.entity = angular.copy($scope.tmpEntity)
      publisher.publish 'vdImAttachments',
        Callback: 'update'
        Param: $scope.entity.AttachmentList
      publisher.publish 'vdImBasicInfoCountry', undefined
      $scope.imForm.$setPristine()
      $scope.entity.BatteryUnit = '2'

    $scope.reset = ->
      if $scope['imForm'].$pristine == false or $scope.entity.OriginCountryList.length > 0 or $scope.entity.WarningList.length > 0 or $scope.entity.AttachmentList.length > 0
        common.confirmBox $translate('confirm.reset'), '', ->
          $scope.resetForm()
          $scope.$apply()
      true

    common.initTabFormsUnsavedConfirm $scope, [ 'imForm' ]
]
