angular.module('vf-self-testing-monitor',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/self-testing-monitor",
      templateUrl: "/modules/vendorportal-vf/app/monitor/self-testing-monitor.tpl.html"
      controller: 'SelfTestingMonitorCtrl'
])

.controller('SelfTestingMonitorCtrl',
["$scope","$filter","$location","messager","common","$translate","selfTestingAPI",
($scope,$filter,$location,messager,common,$translate,selfTestingAPI) ->
   
    testData = [
        { VendorName:"D&H", VendorNumber:"20001", Value:11, DateRange:"0-10 Days"}
        { VendorName:"ChanX", VendorNumber:"20002", Value:44, DateRange:"11-20 Days" }
        { VendorName:"Electroline Wholesale Eleacronics", VendorNumber:"20003", Value:100, DateRange:"21-30 Days" }
        { VendorName:"ExistVendor", VendorNumber:"20004", Value:25, DateRange:"31-40 Days" }
        { VendorName:"IMA", VendorNumber:"20005", Value:35, DateRange:"41+ Days" }
        { VendorName:"Ingram Micro (VF)", VendorNumber:"20006", Value:45, DateRange:"41+ Days" }
        { VendorName:"ASI Computer Technology (VF)", VendorNumber:"20007", Value:50, DateRange:"31-40 Days" }
        { VendorName:"Baker & Taylor (VF)", VendorNumber:"20008", Value:65, DateRange:"11-20 Days" }
        { VendorName:"Circus World Display Limited", VendorNumber:"20009", Value:25, DateRange:"0-10 Days" }
        { VendorName:"CYBERPOWERPC", VendorNumber:"20010", Value:85, DateRange:"0-10 Days" }
        { VendorName:"Decline", VendorNumber:"20011", Value:90, DateRange:"11-20 Days" }
        { VendorName:"Green Project", VendorNumber:"20012", Value:100, DateRange:"21-30 Days" }
        { VendorName:"Dream Wireless Inc (WF)", VendorNumber:"20013", Value:45, DateRange:"11-20 Days" }
        { VendorName:"EPOX International, Inc (VF)", VendorNumber:"20014", Value:30, DateRange:"31-40 Days" }
        { VendorName:"Nixeus Technology, Inc", VendorNumber:"20015", Value:90, DateRange:"11-20 Days" }
    ]
    
    formatCategoryField = (data) ->
        return [] if !data
        result = angular.copy(data)
        for item in result
            if item.VendorName && item.VendorName.length > 16
               item.categoryDesc = item.VendorName.substr(0,13) + "..." + "\r\n(" + item.VendorNumber + ")"
            else
               item.categoryDesc = item.VendorName + "\r\n(" + item.VendorNumber + ")"   
        return result
        
    resolvingDataByDateRange = (data) ->
      return [] if !data
      result = angular.copy(data)
      for item in result
        item.name = item.VendorName
        switch item.DateRange
            when "0-10 Days"  then item.data = [item.Value,0,0,0,0]
            when "11-20 Days" then item.data = [0,item.Value,0,0,0]
            when "21-30 Days" then item.data = [0,0,item.Value,0,0]
            when "31-40 Days" then item.data = [0,0,0,item.Value,0]
            when "41+ Days"   then item.data = [0,0,0,0,item.Value]
      return result 
      
    createChart_1 = ->
      data = formatCategoryField(testData)
      $('#chart').kendoChart
        legend: position: 'bottom'
        dataSource: data: data
        series: [{
            type: "column"
            field: "Value"
            categoryField: "categoryDesc" 
        }]
        valueAxis: 
         labels: format: '{0}%'
         line: visible: false
         axisCrossingValue: 0
        categoryAxis:
          majorGridLines: visible: false
        tooltip:
          visible: true
          template: "#=dataItem.VendorNumber# - #=dataItem.VendorName#: ${value}%"
                          
    createChart_2 = ->
      data = resolvingDataByDateRange(testData)
      $('#chart').kendoChart
        legend: position: 'bottom'
        seriesDefaults : type: 'column'
        series: data
        valueAxis: 
         labels: format: '{0}%'
         line: visible: false
         axisCrossingValue: 0
        categoryAxis:
          categories: ["0-10 Days","11-20 Days","21-30 Days","31-40 Days","41+ Days"]
          majorGridLines: visible: false
        tooltip:
          visible: true
          template: "#=series.VendorNumber# - #=series.VendorName#: ${value}%"      
          
    $scope.showChart = (type) ->
      createChart_1() if type == 'vendor'
      createChart_2() if type == 'date'  
      
    $scope.showChart('vendor')   
])
