angular.module("vdCategory",[])
.directive("vdCategory",["categoryAPI","common",(categoryAPI,common) ->
    restrict : "E"
#    scope: {
#      value:"="  
#      pagging:"="
#    }
    template:"<div class=\"col-xs-12 no-padding\">
               <span class=\"input-icon input-icon-right col-xs-12 no-padding\">
                 <input id=\"nvfCategory\" 
                    kendo-auto-complete ng-model=\"value\"
                    k-options=\"categoryOptions\" 
                    style=\"width: 100%;border-radius:0px !important;\" ng-click=\"showAll_Category()\"/>
                    <div class=\"arrows-select arrows-down\" ng-click=\"showAll_Category()\"></div>               
             </div>"
    link: ($scope, element, attrs) ->
        if $scope.pagging != true
           $scope.TempCategoryList = []
           $scope.currentUser_category = common.currentUser
           $scope.showAll_Category = ->
               autocomplete = $('#nvfCategory').data('kendoAutoComplete')
               autocomplete.popup.open()
             
                
           $scope.categoryOptions = {
                dataTextField:'Description'
                filter: "contains"
                placeholder: "Enter Keywords..."
                minLength: 1
                select: (e) ->
                  dataItem = this.dataItem(e.item.index())
                  $scope.query.CategoryCode = dataItem.Code
                  $scope.query.CategoryName = dataItem.Description
                change: (e) ->
                  if(!e.sender._old)
                    delete $scope.query.CategoryCode
                    delete $scope.query.CategoryName
                    return
                  hasSameItem = false
                  for item in $scope.TempCategoryList
                    if item.Description.toLowerCase() == e.sender._old.toLowerCase()
                       $scope.query.CategoryCode = item.Code
                       $scope.query.CategoryName = item.Description
                       hasSameItem = true
                       break
                  if hasSameItem == false
                     delete $scope.query.CategoryCode
                     delete $scope.query.CategoryName
            }
           $scope.loadData_category = ->
               requestItem = {
                 VendorNumber: common.currentUser.VendorNumber
               }
               response = categoryAPI.search requestItem,
               ->
                  if(response) 
                    autoComplete = $("#nvfCategory").data("kendoAutoComplete") 
                    $scope.TempCategoryList = response.CategoryList
                    autoComplete.dataSource.data($scope.TempCategoryList)
                    
           if $scope.currentUser_category.VendorNumber != 0 && $scope.currentUser_category.VendorNumber != "0"  
              $scope.loadData_category() 
         
           $scope.$watch 'currentUser_category.VendorNumber', (newValue,oldValue) ->
               return if !newValue || newValue == 0 || newValue == '0'
               return if oldValue == newValue
               if($("#nvfCategory").data("kendoAutoComplete"))
                  $("#nvfCategory").data("kendoAutoComplete").value('')
                  ds = $("#nvfCategory").data("kendoAutoComplete").dataSource
                  ds.filter({})
               delete $scope.query.CategoryCode
               delete $scope.query.CategoryName
               $scope.loadData_category()
#               
#           $('#nvfCategory').on 'focus', ->
#              autocomplete = $('#nvfCategory').data('kendoAutoComplete')
#              autocomplete.popup.open()
#################分页         
#        $scope.pageSize = 15
#        $scope.totalCount = 0
#        $scope.isLoaded = false
#        $scope.childComplateHTML = "
#        <style type='text/css'>
#            .k-autocomplete .k-loading, .k-multiselect .k-loading {
#              bottom: 6px;
#            }
#        </style>
#        <div class='k-header k-shadow vp-tpl-cg-header' style='height: 30px; margin-left: -1px;'>
#                <a href='javascript:void(0)' id='cgHeader_FirstPage'>
#                    <span class='k-icon k-i-seek-w'>First Page</span>
#                </a>
#
#                <a href='javascript:void(0)' id='cgHeader_PreviousPage'>
#                    <span class='k-icon k-i-arrow-w'>Previous Page</span>
#                </a>
#                &nbsp;
#            <input id='cgHeader_PaggingNumber'/>
#            <label id='cgHeader_TotalPage' 
#                    style='vertical-align: bottom; padding-left: 3px; font-size: 12px; padding-bottom: 1px; color: grey;'> / 0</label>
#            &nbsp;
#            <a href='javascript:void(0)' id='cgHeader_NextPage'>
#                <span class='k-icon k-i-arrow-e'>Next Page</span>
#            </a>
#            <a href='javascript:void(0)' id='cgHeader_LastPage'>
#                <span class='k-icon k-i-seek-e'>Last Page</span>
#            </a>
#        </div>"
#        $scope.categoryOptions = {
#            dataTextField:'VendorPartNumber'
#            filter: "contains"
#            placeholder: "Select Category"
#            headerTemplate: kendo.template($scope.childComplateHTML)
#            minLength: 1
#            dataSource: 
#                type: "odata"
#                serverFiltering: true
#                transport:
#                    read: (options) ->
#                         $scope.callbackEvent = (result) ->
#                                options.success d:
#                                  results: result or []
#                         $scope.requestObj = { pageIndex:0 }
#                         $scope.requestObj.key = options.data.filter.filters[0].value
#                         $scope.query()
#            open: -> 
#               $scope.registerPaggingEvent()
#        }
#
#        $scope.query =  ->
#          requestItem = {
#             VendorNumber: '20405'
#          }
#          response = categoryAPI.search requestItem,
#           ->
#              if(response)   
#                $scope.callbackEvent(response.CategoryList) 
#                $scope.totalCount = response.TotalRecordCount
#                $scope.loadPaggingSetting()
#          $scope.toggleLoading()            
#          
#         
#        $scope.loadPaggingSetting = ->
#           autocompleteControl = $("#myautocomplete-list")[0]
#           btnPaggingNumber= $(autocompleteControl).find("#cgHeader_PaggingNumber")[0] 
#           paggingNumberTextBox = $(btnPaggingNumber).data("kendoNumericTextBox")
#           paggingNumberTextBox.value($scope.requestObj.pageIndex + 1)
#           paggingNumberTextBox.max($scope.getMaxPageSize())
#           paggingNumberTextBox.wrapper.width("70px")
#           totalPageLabel = $(autocompleteControl).find("#cgHeader_TotalPage")[0] 
#           $(totalPageLabel).text("/ "+$scope.getMaxPageSize())
#       
#        $scope.registerPaggingEvent = -> 
#           autocompleteControl = $("#myautocomplete-list")[0]
#           btnPaggingNumber= $(autocompleteControl).find("#cgHeader_PaggingNumber")[0] 
#           $(btnPaggingNumber).kendoNumericTextBox
#               format: "#"
#               min: 1
#               max: 1000
#               step: 1
#               value: 1
#               decimals: 0
#               change: -> $scope.paggingChange(this)
#               spin: ->  $scope.paggingSpin(this)
#            if $scope.isLoaded == false 
#                btnFirstPage= $(autocompleteControl).find("#cgHeader_FirstPage")[0]  
#                $(btnFirstPage).click (e) -> $scope.firstPage() 
#                btnPreviousPage= $(autocompleteControl).find("#cgHeader_PreviousPage")[0]  
#                $(btnPreviousPage).click (e) -> $scope.previousPage()
#                btnNextPage= $(autocompleteControl).find("#cgHeader_NextPage")[0]  
#                $(btnNextPage).click (e) -> $scope.nextPage()
#                btnLastPage= $(autocompleteControl).find("#cgHeader_LastPage")[0]   
#                $(btnLastPage).click (e) -> $scope.lastPage()
#                $scope.isLoaded = true   
#               
#        $scope.firstPage = ()->
#           if($scope.requestObj.pageIndex == 0) 
#             return
#           $scope.requestObj.pageIndex = 0
#           $scope.query()
#       
#        $scope.previousPage = () ->
#           if($scope.requestObj.pageIndex == 0) 
#             return
#           $scope.requestObj.pageIndex--
#           $scope.query()  
#           
#        $scope.nextPage = ()->
#           if($scope.requestObj.pageIndex >= ($scope.getMaxPageSize()-1)) 
#             return
#           $scope.requestObj.pageIndex++
#           $scope.query()
#       
#        $scope.lastPage = () ->
#           if($scope.requestObj.pageIndex == ($scope.getMaxPageSize()-1)) 
#             return
#           $scope.requestObj.pageIndex = $scope.getMaxPageSize()-1
#           $scope.query()     
#          
#        $scope.paggingChange = (ele)->
#           $scope.requestObj.pageIndex = ele.value()-1
#           $scope.query() 
#       
#        $scope.paggingSpin = (ele) ->
#           $scope.requestObj.pageIndex = ele.value()-1
#           $scope.query() 
#       
#        $scope.getMaxPageSize = ->
#           size = Math.ceil( $scope.totalCount / $scope.pageSize )
#           return size
#       
#        $scope.toggleLoading = ->
#              timer = setInterval(->
#                $('#target').hide()
#                autocompleteControl = $(".k-autocomplete")[0]
#                loadingMask= autocompleteControl.children[1]
#                if loadingMask.outerHTML.indexOf("display: none") > 0
#                  clearInterval timer
#              )  
#
    
])