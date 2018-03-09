angular.module('vp-query-contract',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.querycontract.us)
    .translations('zh-cn',resources.vendorportal.querycontract.cn)
    .translations('zh-tw',resources.vendorportal.querycontract.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/query-contract",
      templateUrl: "/modules/vendorportal/app/contract/query-contract.tpl.html"
      controller: 'QueryContractCtrl'
])

.controller('QueryContractCtrl',
["$scope","$filter","$q","$translate","messager","common","registrationAPI","applicationFormAPI","$window","$compile",
($scope,$filter,$q,$translate,messager,common,registrationAPI,applicationFormAPI,$window,$compile) ->
    
    $scope.query = {
        dateIsSelected : false
        contractType : 'Standard Vendor Agreement (Signed)'
    }                  
    
    $scope.contractTypeList = []
    $scope.contractList_po = []
    $scope.contractList_all = []
    $scope.contractList = []
    $scope.isLoaded = false
    $scope.isEdge = false
    
    if(/Edge./i.test($window.navigator.userAgent))
      $scope.isEdge = true
      angular.element(document.getElementById('contractDispaly')).append($compile('')($scope))
    else
      angular.element(document.getElementById('contractDispaly')).append($compile('<embed vd-embed-src="{{ contractUrl }}" width="100%" height="500px" ></embed>')($scope))
    
    get_vendortype = ->
        deferred = $q.defer()
        registrationAPI.getContract { resource : 'vendor-contract-type',vendorNumber:common.currentUser.VendorNumber }
            ,(response)->
                if(response&&response.Succeeded)
                  $scope.contractTypeList = response.ContractTypeList
                deferred.resolve "OK"
        deferred.promise 
         
    get_po_contract = (callBack) ->
        registrationAPI.getContract { resource : 'vendor-contract',vendorNumber:common.currentUser.VendorNumber }
            ,(response)->
                if(response&&response.ContractList)
                  $scope.contractList_po = response.ContractList
                $scope.merage()
                $scope.isLoaded = true
                callBack() if callBack
        
    initData = (callBack)->
        $q.all([
           get_vendortype()
        ])
        .then ->
            get_po_contract(callBack)
        
    
    $scope.merage =  ->
        $scope.contractList_all= []
        for item in $scope.contractList_po
            if item.ContractType == 'Standard Vendor Agreement (Signed)'
               item.ContractStatus = 'Signed'
            $scope.contractList_all.push(item)
        return true       
        
    $scope.filterData = ->
        filter_items = []
        for item in $scope.contractList_all
            if item.ContractType == $scope.query.contractType
               filter_items.push(item)
        if $scope.query.contractID
           filter_items = $filter('filter')(filter_items, (i) -> i.ContractID.toString() == $scope.query.contractID)
        return filter_items   
           
    $scope.search = ->
        $scope.contractUrl = ''
        $scope.showAlert = false 
        messager.clear()
        if common.currentUser.VendorNumber == 0 || common.currentUser.VendorNumber == '0'
           return
        if $scope.contractList_po && $scope.contractList_po.length > 0 && $scope.contractList_po[0].VendorNumber == common.currentUser.VendorNumber
           $scope.contractList = $scope.filterData()
        else   
           initData(-> $scope.contractList = $scope.filterData())
       
    $scope.showAlert = false    
    
    $scope.setSelectedItem = (item) ->
        $scope.contractUrl = ''
        $scope.showAlert = false 
        $scope.selectItem = angular.copy(item)
        if item.DestFileName
           $scope.extensionName = item.DestFileName.slice(item.DestFileName.lastIndexOf('.') + 1).toLowerCase()
           $scope.contractUrl = NEG.PO_DFIS_URL + item.DestFileName
           $scope.showAlert = true if $scope.extensionName != 'pdf'
           
    $scope.search()          
])