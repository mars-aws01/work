angular.module("vdSubCategory",[])
.directive("vdSubCategory",["subCategoryAPI","common",(subCategoryAPI,common) ->
    restrict : "E"
#    scope: {
#      value:"="  
#      pagging:"="
#    }
    template:"<div class=\"col-xs-12 no-padding\">
    <span class=\"input-icon input-icon-right col-xs-12 no-padding\">
               <input id=\"nvfSubCategory\" 
               kendo-auto-complete 
               ng-model=\"value\" 
               k-options=\"subCategoryOptions\" 
               style=\"width: 100%;border-radius:0px !important;\" ng-click=\"showAll_subCategory()\"/>
                <div class=\"arrows-select arrows-down\" ng-click=\"showAll_subCategory()\"></div>
             </div>"
    link: ($scope, element, attrs) ->
        if $scope.pagging != true
           $scope.TempCategoryList = []
           $scope.currentUser_subCategory = common.currentUser
           $scope.showAll_subCategory = ->
               autocomplete = $('#nvfSubCategory').data('kendoAutoComplete')
               autocomplete.popup.open()
               
           $scope.subCategoryOptions = {
                dataTextField:'Description'
                filter: "contains"
               # placeholder: "Enter Category..."
                minLength: 1
                select: (e) ->
                  dataItem = this.dataItem(e.item.index())
                  $scope.query.SubCategory = dataItem.Code
                change: (e) ->
                  if(!e.sender._old)
                    delete $scope.query.SubCategory
                    return
                  hasSameItem = false
                  for item in $scope.TempCategoryList
                    if item.Description.toLowerCase() == e.sender._old.toLowerCase()
                       $scope.query.SubCategory = item.Code
                       hasSameItem = true
                       break
                  if hasSameItem == false
                     delete $scope.query.SubCategory
                  
            }
           $scope.loadData_subCategory = ->
               requestItem = {
                 VendorNumber: common.currentUser.VendorNumber
               }
               response = subCategoryAPI.search requestItem,
               ->
                  if(response) 
                    autoComplete = $("#nvfSubCategory").data("kendoAutoComplete") 
                    $scope.TempCategoryList = response.SubCategoryList
                    autoComplete.dataSource.data($scope.TempCategoryList)
                    if $scope.query.SubCategory
                      for item in $scope.TempCategoryList 
                        if item.Code == $scope.query.SubCategory
                           autoComplete.value(item.Description)
                           
           if $scope.currentUser_subCategory.VendorNumber != 0 && $scope.currentUser_subCategory.VendorNumber != "0"  
              $scope.loadData_subCategory() 
         
           $scope.$watch 'currentUser_subCategory.VendorNumber', (newValue,oldValue) ->
               return if !newValue || newValue == 0 || newValue == '0'
               return if oldValue == newValue
               if($("#nvfSubCategory").data("kendoAutoComplete"))
                  $("#nvfSubCategory").data("kendoAutoComplete").value('')
               delete $scope.query.SubCategory
               $scope.loadData_subCategory()
      
    
])