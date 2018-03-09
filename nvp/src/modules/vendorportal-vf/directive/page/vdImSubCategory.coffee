angular.module("vdImSubCategory",[])
.directive("vdImSubCategory",["subCategoryAPI","common","$filter",(subCategoryAPI,common,$filter) ->
    restrict : "E"
    require:"ngModel"
    template:"<div class=\"col-xs-12 no-padding\">
               <span class=\"input-icon input-icon-right col-xs-12 no-padding\">
                 <input id=\"nvfCategory\" 
                    kendo-auto-complete ng-model=\"subCategoryDescription\"
                    k-options=\"categoryOptions\" 
                    style=\"width: 100%;border-radius:0px !important;\" ng-click=\"showAll_Category()\" required/>
                    <div class=\"arrows-select arrows-down\" ng-click=\"showAll_Category()\" ></div>               
             </div>"
    link: ($scope, element, attrs,ngModel) ->        
        $scope.tmpSubCategory = ngModel.$modelValue if ngModel
        $scope.SubCategoryList=[]
        $scope.requestObj = { pageIndex:0 ,key:""}
        $scope.showAll_Category = ->
               return if $scope.isReadOnly
               autocomplete = $('#nvfCategory').data('kendoAutoComplete')
               autocomplete.popup.open()
               $scope.loadPaggingSetting()
               autocomplete.dataSource.data($scope.getFilterDataSource($scope.SubCategoryList))        
        
        $scope.$watch(()-> 
            return ngModel.$modelValue
        ,(newValue)-> 
            $scope.subCategoryDescription=null if !newValue)
        
        ################     分页    ################     
        $scope.pageSize = 15
        $scope.totalCount = 0
        $scope.isLoaded = false
        $scope.childComplateHTML = "
        <style type='text/css'>
            .k-autocomplete .k-loading, .k-multiselect .k-loading {
              bottom: 6px;
            }
        </style>
        <div class='k-header k-shadow vp-tpl-cg-header' style='height: 30px; margin-left: -1px;'>
                <a href='javascript:void(0)' id='cgHeader_FirstPage'>
                    <span class='k-icon k-i-seek-w'>First Page</span>
                </a>

                <a href='javascript:void(0)' id='cgHeader_PreviousPage'>
                    <span class='k-icon k-i-arrow-w'>Previous Page</span>
                </a>
                &nbsp;
            <input id='cgHeader_PaggingNumber'/>
            <label id='cgHeader_TotalPage' 
                    style='vertical-align: bottom; padding-left: 3px; font-size: 12px; padding-bottom: 1px; color: grey;'> / 0</label>
            &nbsp;
            <a href='javascript:void(0)' id='cgHeader_NextPage'>
                <span class='k-icon k-i-arrow-e'>Next Page</span>
            </a>
            <a href='javascript:void(0)' id='cgHeader_LastPage'>
                <span class='k-icon k-i-seek-e'>Last Page</span>
            </a>
        </div>"
        $scope.categoryOptions = {
            dataTextField:'Description'
            dataValueField:'Code'
            filter: "contains"
            placeholder: "Select Category"
            headerTemplate: kendo.template($scope.childComplateHTML)
            minLength: 1
            select: (e) ->
               dataItem = this.dataItem(e.item.index())
               ngModel.$setViewValue(dataItem.Code)
            dataSource: 
                type: "odata"
                serverFiltering: true,
                transport:
                    read: (options) ->
                         $scope.callbackEvent = (result) ->
                                options.success d:
                                  results: result or []
                         $scope.requestObj = { pageIndex:0 }
                         $scope.requestObj.key = options.data.filter.filters[0].value
                         $scope.getPaggingDataSource()
            open: -> 
               $scope.registerPaggingEvent()
        }

        $scope.query =  ->
          requestItem = {
             IsRetrivedAll: true
          }
          response = subCategoryAPI.search requestItem,
           ->
              if(response)   
                $scope.SubCategoryList = response.SubCategoryList
                $scope.totalCount = $scope.SubCategoryList.length
                #$scope.loadPaggingSetting()
                $scope.setKeyByCode()
        
        $scope.loadPaggingSetting = ->
           autocompleteControl = $("#nvfCategory-list")[0]
           btnPaggingNumber= $(autocompleteControl).find("#cgHeader_PaggingNumber")[0] 
           paggingNumberTextBox = $(btnPaggingNumber).data("kendoNumericTextBox")
           paggingNumberTextBox.value($scope.requestObj.pageIndex + 1)
           paggingNumberTextBox.max($scope.getMaxPageSize())
           paggingNumberTextBox.wrapper.width("70px")
           totalPageLabel = $(autocompleteControl).find("#cgHeader_TotalPage")[0] 
           $(totalPageLabel).text("/ "+$scope.getMaxPageSize())
       
        $scope.registerPaggingEvent = -> 
           autocompleteControl = $("#nvfCategory-list")[0]
           btnPaggingNumber= $(autocompleteControl).find("#cgHeader_PaggingNumber")[0] 
           $(btnPaggingNumber).kendoNumericTextBox
               format: "#"
               min: 1
               max: 1000
               step: 1
               value: 1
               decimals: 0
               change: -> $scope.paggingChange(this)
               spin: ->  $scope.paggingSpin(this)
            if $scope.isLoaded == false 
                btnFirstPage= $(autocompleteControl).find("#cgHeader_FirstPage")[0]  
                $(btnFirstPage).click (e) -> $scope.firstPage() 
                btnPreviousPage= $(autocompleteControl).find("#cgHeader_PreviousPage")[0]  
                $(btnPreviousPage).click (e) -> $scope.previousPage()
                btnNextPage= $(autocompleteControl).find("#cgHeader_NextPage")[0]  
                $(btnNextPage).click (e) -> $scope.nextPage()
                btnLastPage= $(autocompleteControl).find("#cgHeader_LastPage")[0]   
                $(btnLastPage).click (e) -> $scope.lastPage()
                $scope.isLoaded = true   
               
        $scope.firstPage = ()->
           if($scope.requestObj.pageIndex == 0) 
             return
           $scope.requestObj.pageIndex = 0
           $scope.getPaggingDataSource()
       
        $scope.previousPage = () ->
           if($scope.requestObj.pageIndex == 0) 
             return
           $scope.requestObj.pageIndex--
           $scope.getPaggingDataSource()  
           
        $scope.nextPage = ()->
           if($scope.requestObj.pageIndex >= ($scope.getMaxPageSize()-1)) 
             return
           $scope.requestObj.pageIndex++
           $scope.getPaggingDataSource()
       
        $scope.lastPage = () ->
           if($scope.requestObj.pageIndex == ($scope.getMaxPageSize()-1)) 
             return
           $scope.requestObj.pageIndex = $scope.getMaxPageSize()-1
           $scope.getPaggingDataSource()     
          
        $scope.paggingChange = (ele)->
           $scope.requestObj.pageIndex = ele.value()-1
           $scope.getPaggingDataSource() 
       
        $scope.paggingSpin = (ele) ->
           $scope.requestObj.pageIndex = ele.value()-1
           $scope.getPaggingDataSource() 
       
        $scope.getMaxPageSize = ->
           size = Math.ceil( $scope.totalCount / $scope.pageSize )
           return size
               
        $scope.getPaggingDataSource = ->
            if $scope.callbackEvent
              $scope.callbackEvent($scope.getFilterDataSource()) 
            else
               autocomplete = $('#nvfCategory').data('kendoAutoComplete')
               autocomplete.dataSource.data($scope.getFilterDataSource($scope.SubCategoryList))  if autocomplete
            $scope.loadPaggingSetting()
        
        $scope.getFilterDataSource =->
            if $scope.SubCategoryList
                filteredDataSource = $filter("filter")($scope.SubCategoryList,(item)-> return angular.lowercase(item.Description).indexOf(angular.lowercase($scope.requestObj.key)) != -1)
                $scope.totalCount = filteredDataSource.length
                if filteredDataSource && filteredDataSource.length > $scope.pageSize
                    startIndex = $scope.requestObj.pageIndex*$scope.pageSize
                    startIndex = startIndex-1 if startIndex > 0
                    endIndex = ($scope.requestObj.pageIndex+1)*$scope.pageSize - 1
                    return filteredDataSource.slice(startIndex, endIndex)
                else
                    return filteredDataSource
            return $scope.SubCategoryList            
        
        $scope.setKeyByCode =->
            if $scope.SubCategoryList && $scope.SubCategory
                filteredDataSource = $filter("filter")($scope.SubCategoryList,{Code:$scope.tmpSubCategory})
                if filteredDataSource && filteredDataSource.length > 0
                    return $scope.subCategoryDescription = filteredDataSource[0].Description
                          
        $scope.query()
])