angular.module('vp-vendor-survey',['ngRoute'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/vendor-survey/:vendorNumber",
      templateUrl: "/modules/vendorportal/app/vendor/vendor-survey.tpl.html"
      controller: 'VendorSurveyCtrl'
])
.controller('VendorSurveyCtrl',
["$scope","$rootScope","common","messager","$routeParams","$route","$location","$translate","vendorSurveyAPI",
($scope,$rootScope,common,messager,$routeParams,$route,$location,$translate,vendorSurveyAPI) ->
   
    if(!$routeParams.vendorNumber)
      message.error('Vendor Number not be empty.')
      return

    $scope.cbx_pageSizeList = [
        {text:'5', value: 5},
        {text:'10', value: 10},
        {text:'15', value: 15},
        {text:'20', value: 20},
        {text:'25', value: 25},
    ]

    $scope.isShowGotoHome = false
    
    #页面参数
    $scope.query = {
       action : 'query'
       VendorNumber: $routeParams.vendorNumber
    }
    
    $scope.isShowGotoDashboard = common.checkPageAuth('/dashboard')

    if($rootScope.vendorPortalPrePage && $rootScope.vendorPortalPrePage == "/home")
        $scope.isShowGotoHome = true
        delete $rootScope.vendorPortalPrePage
   
    #查询
    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging_list($scope.query.PagingInfo)
        $scope.query.PagingInfo.totalCount = 0
        
    $scope.getRequestItem = ->
        requestItem = angular.copy($scope.query)
        requestItem.action1 = 'query'
        requestItem.VendorNumber = $routeParams.vendorNumber
        return requestItem
    
    $scope.queryAPI = (currentQuery) ->
        requestItem = if currentQuery then currentQuery else $scope.getRequestItem()
        $scope.currentQuery = angular.copy(requestItem)
        vendorSurveyAPI.search requestItem
        ,(response) ->
            if(response&&response.Succeeded) 
               $scope.surveyList = response.VendorSurveyList 
               $scope.query.PagingInfo.totalCount = response.TotalRecordCount
            else
                $scope.surveyList = [] 
                $scope.query.PagingInfo.totalCount = 0
                $scope.currentQuery.PagingInfo.totalCount = 0
        ,(error) ->
            $scope.surveyList = [] 
            $scope.query.PagingInfo.totalCount = 0
            $scope.currentQuery.PagingInfo.totalCount = 0
            
             
    $scope.search = ->
        messager.clear()
        $scope.preparePaging()
        $scope.queryAPI()
    
 
    #分页
    $scope.showPagination=->
        return false if !$scope.query || !$scope.query.PagingInfo || !$scope.query.PagingInfo.totalCount
        return $scope.query.PagingInfo.totalCount > $scope.query.PagingInfo.pageSize; 
   
    $scope.pageChanged = (page)->
       $scope.pageChangedAction(page)
    
    $scope.pageChangedAction =(page) ->
        $scope.currentQuery.PagingInfo.currentPage = page
        $scope.currentQuery.PagingInfo.startpageindex=page-1
        $scope.currentQuery.PagingInfo.endpageindex=page-1
        $scope.queryAPI($scope.currentQuery)
   
                 
         
    #pagesize changed
    $scope.pageSizeChanged = ->
        $scope.pageSizeChangedAction()
   
    $scope.pageSizeChangedAction = ->
        $scope.query.PagingInfo.startpageindex = 0
        $scope.query.PagingInfo.endpageindex = 0
        $scope.query.PagingInfo.pageSize = $scope.query.PagingInfo.pageSize
        $scope.query.PagingInfo.currentPage = 0 
        $scope.queryAPI(null)
   
                    
    #私有函数
    showMsg = (oMsg,rep) ->
      return if !rep  
      if rep.Succeeded  
         messager.success(oMsg)   
      else
         if !rep.Errors || rep.Errors.length == 0
           messager.error(oMsg) 
           return
         messager.error(oMsg + " " +rep.Errors[0].Message)
         
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    #页面初始化    
    $scope.init = ->
       $scope.preparePaging()      
       $scope.search()
       
    $scope.init()  
    
    #back  
    $scope.backToDashboard = ->
       common.pageInfo.isBackPage = true
       common.pageInfo.dashboard = {lastVendorNumber : $routeParams.vendorNumber}
       $location.path("/dashboard") 
       
    $scope.backToHome = ->
       common.pageInfo.isBackPage = true
       common.pageInfo.home = {lastVendorNumber : $routeParams.vendorNumber}
       $location.path("/home") 
])