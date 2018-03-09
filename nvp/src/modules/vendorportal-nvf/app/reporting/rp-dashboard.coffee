angular.module('vp-reporting-dashboard',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.dashboard.us)
    .translations('zh-cn',resources.vendorportal.dashboard.cn)
    .translations('zh-tw',resources.vendorportal.dashboard.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/dashboard",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/rp-dashboard.tpl.html"
      controller: 'ReportingDashboardCtrl'
])

.controller('ReportingDashboardCtrl',
["$scope","$filter","$q","messager","common","$translate","dashboardAPI","vendorSurveyAPI","customerReviewsAPI",
($scope,$filter,$q,messager,common,$translate,dashboardAPI,vendorSurveyAPI,customerReviewsAPI) ->
   
    $scope.initVendorType = ->
        $scope.vendorType = 'admin'
        $scope.isShowCustomerReviews = common.checkPageAuth('/customer-reviews')
        if(common.currentUser.VendorNumber == '0' || common.currentUser.VendorNumber == 0)
            $scope.vendorType = 'admin'
            return
        if(common.currentUser.VendorType == 'StockingPO')
            $scope.vendorType = 'nvf'
            return
        $scope.vendorType = 'vf'
        
    $scope.initVendorType()
    
    if(common.pageInfo.isBackPage == true)
       if common.pageInfo.dashboard && common.agentVendorList.all && common.agentVendorList.all.length > 0
          common.currentUser.VendorNumber = common.pageInfo.dashboard.lastVendorNumber
       common.pageInfo.isBackPage = false
       
    $scope.defaultOpenOrders=[{SummaryType:'Open Order',SummaryCount: 0},
                              {SummaryType:'Past Due Order',SummaryCount: 0},
                              {SummaryType:'Exceptional Order',SummaryCount: 0}]

    $scope.defaultMissingDocuments=[{SummaryType:'Missing Acknowledgment',SummaryCount: 0},
                                    {SummaryType:'Missing Tracking #',SummaryCount: 0},
                                    {SummaryType:'Missing Invoice',SummaryCount: 0},
                                    {SummaryType:'All',SummaryCount: 0}]
                                    
    $scope.defaultCOGS=[{DurationDescription:'Yesterday',Sales:0.00,SoldQuantity: 0},
                            {DurationDescription:'Last 7 Days',Sales:0.00,SoldQuantity:0},
                            {DurationDescription:'Last 30 Days',Sales:0.00,SoldQuantity:0},
                            {DurationDescription:'Year to date',Sales:0.00,SoldQuantity:0}]
 
    $scope.getBeforeDays=(beforeDay)->
        today = new Date()
        preday = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0)
        preday.setDate(preday.getDate()-beforeDay)
        return preday.toUTCString().replace("UTC","GMT") 
                                       
    $scope.getFirstDayOfYear=->
        today = new Date()
        preday = new Date(today.getFullYear(),0,1,0,0,0)
        return preday.toUTCString().replace("UTC","GMT")
                                           
    #Open Order
    $scope.openOrdersList=null
    
    $scope.loadOpenOrders=->
        request={action1:'open-order',VendorList:[{VendorNumber:common.currentUser.VendorNumber}]}
        dashboardAPI.searchOpenOrders request
            ,(response)->
                $('#openOrdersBox').trigger('reloaded.ace.widget')
                if(response && response.VendorSummaryList && response.VendorSummaryList.length>0 &&response.VendorSummaryList[0].SummaryList &&response.VendorSummaryList[0].SummaryList.length>0)
                    response.VendorSummaryList[0].SummaryList.sort (a,b)->
                        $scope.sortBy('SortID', a, b, false)
                    $scope.openOrdersList=angular.copy(response.VendorSummaryList[0].SummaryList)
                else
                    $scope.openOrdersList=angular.copy($scope.defaultOpenOrders)                            
            ,(error)-> 
                $('#openOrdersBox').trigger('reloaded.ace.widget') 

    $('#openOrdersBox').on 'reload.ace.widget',$scope.loadOpenOrders
        
    #Missing Doc
    $scope.missingDocList=null
    
    $scope.loadMissingDocs=->
        request={action1:'missing-document',VendorList:[{VendorNumber:common.currentUser.VendorNumber}]}
        dashboardAPI.searchMissingDoc request
            ,(response)->
                $('#missingDocBox').trigger('reloaded.ace.widget')
                if(response && response.VendorSummaryList && response.VendorSummaryList.length>0 &&response.VendorSummaryList[0].SummaryList &&response.VendorSummaryList[0].SummaryList.length>0)
                    response.VendorSummaryList[0].SummaryList.sort (a,b)->
                        $scope.sortBy('SortID', a, b, false)
                    $scope.missingDocList=angular.copy(response.VendorSummaryList[0].SummaryList)
                else
                    $scope.missingDocList=angular.copy($scope.defaultMissingDocuments)                            
            ,(error)-> 
                $('#missingDocBox').trigger('reloaded.ace.widget') 

    $('#missingDocBox').on 'reload.ace.widget',$scope.loadMissingDocs
    
    #Shipping Delay   
    $scope.getDelayDateFrom=->
        today = new Date()
        preday = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0)
        preday.setDate(preday.getDate()-13)
        return preday.toUTCString().replace("UTC","GMT")
         
    $scope.getDelayDateTo=->
        today = new Date()
        preday = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0)
        preday.setDate(preday.getDate()-6)
        return preday.toUTCString().replace("UTC","GMT")   
          
    $scope.shippingDelayList=null                      
    $scope.loadShippingDelay=->
        request={action1:'shipping-monitor',action2:'delay-summary',VendorNumberList:[{Value:common.currentUser.VendorNumber}],DateSummarizedType:'Single',DelayType:'VendorProcessDelay',IncludeChangedShipMethod:false,SummarizedType:'VendorLevel',DateFrom:$scope.getDelayDateFrom(),DateTo:$scope.getDelayDateTo()}
        dashboardAPI.searchShippingDelayInfo request
            ,(response)->
                $('#shippingDelayBox').trigger('reloaded.ace.widget')
                if(response && response.ShippingDelaySummaryList && response.ShippingDelaySummaryList.length>0)
                    $scope.shippingDelayList=angular.copy(response.ShippingDelaySummaryList)
                else
                    $scope.shippingDelayList=[]                          
            ,(error)-> 
                $('#shippingDelayBox').trigger('reloaded.ace.widget')
    
    $('#shippingDelayBox').on 'reload.ace.widget',$scope.loadShippingDelay

            
    #SKU Info    
    $scope.skuInfoList=null 
                                   
    $scope.loadSKUInfo=->
        request={action1:'sku-information',VendorList:[{VendorNumber:common.currentUser.VendorNumber}]}
        dashboardAPI.searchSKUInfo request
            ,(response)->
                $('#skuInfoBox').trigger('reloaded.ace.widget')
                if(response && response.VendorSKUSummaryList && response.VendorSKUSummaryList.length>0)
                    $scope.skuInfoList=angular.copy(response.VendorSKUSummaryList[0].SummaryList)
                else
                    $scope.skuInfoList=[]                          
            ,(error)-> 
                $('#skuInfoBox').trigger('reloaded.ace.widget')  

    $('#skuInfoBox').on 'reload.ace.widget',$scope.loadSKUInfo
    
    #vendor info 
    $scope.vendorInfoList=null 
    $scope.loadVendorInfo=->
        request={action1:'vendor-information',VendorList:[{VendorNumber:common.currentUser.VendorNumber}]}
        dashboardAPI.searchVendorInfo request
            ,(response)->
                $('#vendorInfoBox').trigger('reloaded.ace.widget')
                if(response && response.SummaryList && response.SummaryList.length>0)
                    $scope.vendorInfoList=angular.copy(response.SummaryList)
                else
                    $scope.vendorInfoList=[]                          
            ,(error)-> 
                $('#vendorInfoBox').trigger('reloaded.ace.widget')  

    $('#vendorInfoBox').on 'reload.ace.widget',$scope.loadVendorInfo

    #COGS info
    $scope.cogsInfoList=null 
    $scope.loadCOGSInfo=->
        request={action1:'sales-summary',VendorList:[{VendorNumber:common.currentUser.VendorNumber}],DateRangeStartYesterdayUtc:$scope.getBeforeDays(1),DateRangeStartLast7DaysUtc:$scope.getBeforeDays(7),DateRangeStartLast30DaysUtc:$scope.getBeforeDays(30),DateRangeStartThisYearUtc:$scope.getFirstDayOfYear()}
        dashboardAPI.searchCOGSInfo request
            ,(response)->
                $('#cogsInfoBox').trigger('reloaded.ace.widget')
                if(response && response.Groups && response.Groups.length>0)
                    response.Groups[0].SummaryList.sort (a,b)->
                        $scope.sortBy('SortCode', a, b, false)
                    $scope.cogsInfoList=angular.copy(response.Groups[0].SummaryList)
                else
                    $scope.cogsInfoList=angular.copy($scope.defaultCOGS)                             
            ,(error)-> 
                $('#cogsInfoBox').trigger('reloaded.ace.widget')  

    $('#cogsInfoBox').on 'reload.ace.widget',$scope.loadCOGSInfo
    
    #top 5 sku  
    $scope.top5SKUList=null      
    $scope.loadSalesTopSKU=->
        request={action1:'top-sold-sku',VendorList:[{VendorNumber:common.currentUser.VendorNumber}],DateRangeStartUtc:$scope.getBeforeDays(30)}
        dashboardAPI.searchTopSKUInfo request
            ,(response)->
                $('#top5Box').trigger('reloaded.ace.widget')
                if(response && response.Groups && response.Groups.length>0)
                    response.Groups[0].SummaryList.sort (a,b)->
                        $scope.sortBy('SoldQuantity', a, b, true)
                    $scope.top5SKUList=angular.copy(response.Groups[0].SummaryList)   
                else
                    $scope.top5SKUList=[]                             
            ,(error)-> 
                $('#top5Box').trigger('reloaded.ace.widget')  

    $('#top5Box').on 'reload.ace.widget',$scope.loadSalesTopSKU
    
    #top 5 rejected sku 
    $scope.top5RejectedSKUList=null  
    $scope.loadRejectedTopSKU=->
        request={action1:'top-rejected-sku',VendorList:[{VendorNumber:common.currentUser.VendorNumber}],DateRangeStartUtc:$scope.getBeforeDays(30)}
        dashboardAPI.searchRejectedTopSKUInfo request
            ,(response)->
                $('#top5RejectedSKUBox').trigger('reloaded.ace.widget')
                if(response && response.Groups && response.Groups.length>0)
                    response.Groups[0].SummaryList.sort (a,b)->
                        $scope.sortBy('RejectedQuantity', a, b, true)
                    $scope.top5RejectedSKUList=angular.copy(response.Groups[0].SummaryList)
                else
                    $scope.top5RejectedSKUList=[]                                
            ,(error)-> 
                $('#top5RejectedSKUBox').trigger('reloaded.ace.widget')  

    $('#top5RejectedSKUBox').on 'reload.ace.widget',$scope.loadRejectedTopSKU
    
    #action items 
    $scope.actionItemList=null 
    $scope.loadActionItems=->
        $scope.actionItemList = []
        request={action1:'query',VendorNumber:common.currentUser.VendorNumber,Status:'Release'}
        request.PagingInfo = {"PageSize": 10,"StartPageIndex": 0,"EndPageIndex": 0}
        request.VendorNumber = '0' if common.currentUser.VendorNumber == 0 || common.currentUser.VendorNumber == '0'
        vendorSurveyAPI.search request
            ,(response)->
               if(response && response.Succeeded)
                    $scope.actionItemList.push({text:'Vendor Survey',value:response.TotalRecordCount,type:'survey'})
               $('#actionItemsBox').trigger('reloaded.ace.widget')
            ,(error)-> 
                $('#actionItemsBox').trigger('reloaded.ace.widget') 
        if  $scope.isShowCustomerReviews == true  
            request2 = angular.copy(request)
            delete request2.Status
            request2.FromDate = $filter('date')(new Date().setDate(new Date().getDate() - 365),'yyyy-MM-dd')
            request2.ToDate = $filter('date')(new Date(),'yyyy-MM-dd') 
            request2.ReplyStatus="NoReply"      
            customerReviewsAPI.search request2
                ,(response)->
                   if(response && response.Succeeded)
                        $scope.actionItemList.push({text:'Customer Reviews',value:response.TotalRecordCount,type:'customer'})
                   $('#actionItemsBox').trigger('reloaded.ace.widget')
                ,(error)-> 
                    $('#actionItemsBox').trigger('reloaded.ace.widget')  
    $('#actionItemsBox').on 'reload.ace.widget',$scope.loadActionItems
    
    $scope.initData = ->
        if(common.currentUser.VendorNumber == '0')
            $scope.openOrdersList=angular.copy($scope.defaultOpenOrders)
            $scope.missingDocList=angular.copy($scope.defaultMissingDocuments)
            $scope.cogsInfoList=angular.copy($scope.defaultCOGS)
            return
        if $scope.vendorType != 'nvf'
            $scope.loadOpenOrders()
            $scope.loadMissingDocs()
            $scope.loadShippingDelay()
            $scope.loadSKUInfo()
            $scope.loadVendorInfo()
            $scope.loadCOGSInfo()
            $scope.loadSalesTopSKU()
            $scope.loadRejectedTopSKU() 
        $scope.loadActionItems()   
        
    $scope.initData()
    
    $scope.jumpToOrderList=(vendorNumber,summaryType)->
        url=''
        if(summaryType=='All')
            summaryType='missingall'    
        type=summaryType.replace(/\ /g,'').replace('#','number').toLowerCase()
        url="orderlist/#{vendorNumber}/#{type}"
        if(url=='')
            return    
        common.navigate(url)        
                
    $scope.jumpToPage = (type) ->
        url="customer-reviews"
        if type == 'survey'
           url="vendor-survey/"+common.currentUser.VendorNumber
        else
           common.pageInfo.dashboard = {
              jumpToCR:true,
              lastVendorNumber : common.currentUser.VendorNumber
           }
        common.navigate(url)          
                                                                                                                                                                                                           
    $scope.sortBy = (key, a, b, r) ->
        r = if r then 1 else -1
        return -1*r if a[key] > b[key]
        return +1*r if a[key] < b[key]
        return 0                                                                                                                                                                                                                                                                                
])