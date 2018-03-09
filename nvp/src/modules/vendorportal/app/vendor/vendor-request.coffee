angular.module('vp-vendor-request',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/vendor-request",
      templateUrl: "/modules/vendorportal/app/vendor/vendor-request.tpl.html"
      controller: 'VendorRequestCtrl'
])
.config(["$locationProvider", ($locationProvider) ->
    $locationProvider.html5Mode(true)
])

.controller('VendorRequestCtrl',
["$scope","messager","common","$http","vendorDraftAPI",
($scope,messager,common,$http,vendorDraftAPI) ->

    $scope.currentYear = new Date().getFullYear().toString()

    $scope.AttachmentData = []

    $scope.entity = {
        Attachment: []
        CompanyType:null
        Country:null
    }
    $scope.config = {
      UploadFile:{
          maxCount:5
          maxSize:2
          rejects:["exe","bat","com"]
          filenamePattern:/^[^\u4e00-\u9fa5]{1,75}$/
          filenamePatternTip:"File name cannot contain Chinese and length less than 75."
      }
    }

    $scope.companyTypes = [
      { code: 1, desc:'Manufacturer (Stocking)'}
      { code: 2, desc:'Distributor (Stocking)'}
      { code: 8, desc:'Virtual Fulfillment (Dropshipping)'}
      { code: 7, desc:'Digital (Electronic Download)'}
    ]

    $scope.initData = ->
       response = vendorDraftAPI.getRes { action:'product-domain' },
        ->
           $scope.productDomains = response.ProductDomainList

       responseCountry = vendorDraftAPI.getRes { action:'country' },
        ->
           $scope.countryList = responseCountry.CountryList

    $scope.initData() 

    getProductDomainList = ->
      result = []
      if $scope.productDomains and $scope.productDomains.length > 0
        for item in $scope.productDomains
          if item.isChecked == true
             result.push(parseInt(item.ProductDomainCode))
      return result

    getAttachmentList = ->
      result = []
      if $scope.AttachmentData and $scope.AttachmentData.length > 0
        for item in $scope.AttachmentData
            result.push(item.DestFileName)
      return result

    $scope.submit = ->
      messager.clear()
      productDomainList = getProductDomainList()  
      if $scope.entity.CompanyRevenue < 0.01 or $scope.entity.CompanyRevenue > 9999999999.99
         messager.warning('Company Revenue of the range is 0.01 to 9999999999.99.')
         return
      if $scope.entity.FirstYearSales < 0.01 or $scope.entity.FirstYearSales > 9999999999.99
         messager.warning('1st Year Sales Revenue With Newegg of the range is 0.01 to 9999999999.99.')
         return
      if productDomainList.length == 0
         messager.warning('Please select at least one product information.')
         return
      $scope.isSending = true
      $scope.entity.ProductDomain = productDomainList
      $scope.entity.Attachment = getAttachmentList() 
      requestItem = angular.copy($scope.entity)
      requestItem.action = 'vendor-draft'
      response = vendorDraftAPI.save requestItem,
       ->
          $scope.isSending = false
          if(response && response.IsSuccess)
             $scope.isSubmit = true
             messager.success("Sent request successfully.")
          else
             messager.success("Sent request failed.")
      ,(error)->
        $scope.isSending = false
        messager.clear()
        errorData = JSON.parse(error.data.Message)
        if(errorData)
          messager.error(errorData[0].ErrorMessage)
        else
          messager.error(error.data.Message)
])