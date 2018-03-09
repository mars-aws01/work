angular.module("vdCategoryV2",[])
.directive("vdCategoryV2",["categoryV2API","common",(categoryV2API,common) ->
    restrict : "E"
    scope: {
      categoryEntity:"=ngModel"
    }
    template:"<div class=\"col-xs-12 no-padding\">
               <span class=\"input-icon input-icon-right col-xs-12 no-padding\">
                 <input ng-attr-id=\"{{guid}}\" 
                    kendo-auto-complete
                    k-options=\"categoryOptions\" 
                    style=\"width: 100%;border-radius:0px !important;\" ng-click=\"showAll_Category()\"/>
                    <div class=\"arrows-select arrows-down\" ng-click=\"showAll_Category()\"></div>               
             </div>"
    link: (scope, element, attrs) ->
        scope.guid = UUID.generate()
        scope.required = false
        if attrs.required != undefined
           scope.required = true
        if true
           scope.TempCategoryList = []
           scope.currentUser_category = common.currentUser
           scope.showAll_Category = ->
               autocomplete = $('#'+scope.guid).data('kendoAutoComplete')
               autocomplete.popup.open()

           scope.categoryOptions = {
                dataTextField:'Description'
                filter: "contains"
                placeholder: "Enter Keywords..."
                minLength: 1
                select: (e) ->
                  dataItem = this.dataItem(e.item.index())
                  scope.categoryEntity = angular.copy(dataItem)
                change: (e) ->
                  if(!e.sender._old)
                    scope.$apply ()-> scope.categoryEntity = null
                  hasSameItem = false
                  for item in scope.TempCategoryList
                    if item.Description.toLowerCase() == e.sender._old.toLowerCase()
                       scope.$apply ()-> scope.categoryEntity = angular.copy(item) 
                       hasSameItem = true
                       break
                  if hasSameItem == false
                     scope.$apply ()-> scope.categoryEntity = null
            }
           scope.loadData_category = ->
               requestItem = {
                 VendorNumber: common.currentUser.VendorNumber
                 IsActive:true
               }
               categoryV2API.search requestItem, (response)->
                    if(response) 
                        autoComplete = $('#'+scope.guid).data("kendoAutoComplete") 
                        if response.CategoryList
                            scope.TempCategoryList = response.CategoryList
                        else
                            scope.TempCategoryList = []
                        autoComplete.dataSource.data(scope.TempCategoryList)

                    
           if scope.currentUser_category.VendorNumber != 0 && scope.currentUser_category.VendorNumber != "0"  
              scope.loadData_category() 
         
           scope.$watch 'categoryEntity', (newValue,oldValue) ->
               if newValue
                   if ($('#'+scope.guid).data("kendoAutoComplete") != undefined)
                       $('#'+scope.guid).data("kendoAutoComplete").value(newValue.Description)

           scope.$watch 'currentUser_category.VendorNumber', (newValue,oldValue) ->
               return if !newValue || newValue == 0 || newValue == '0'
               return if oldValue == newValue
               if($('#'+scope.guid).data("kendoAutoComplete"))
                  $('#'+scope.guid).data("kendoAutoComplete").value('')
                  ds = $('#'+scope.guid).data("kendoAutoComplete").dataSource
                  ds.filter({})
               scope.categoryEntity = null
               scope.loadData_category()

])