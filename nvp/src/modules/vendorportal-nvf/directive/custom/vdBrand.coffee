angular.module("vdBrand",[])
.directive("vdBrand",["brandAPI","common",(brandAPI,common) ->
    restrict : "E"
    template:"<div class=\"col-xs-12 no-padding\">
                        <span class=\"input-icon input-icon-right col-xs-12 no-padding\">
                        <input id=\"nvfBrand\"
                             kendo-auto-complete 
                             k-options=\"brandOptions\" 
                             style=\"width: 100%;border-radius:0px !important;\" ng-click=\"showAll_Brand()\"/>
                         <div class=\"arrows-select arrows-down\" ng-click=\"showAll_Brand()\"></div>               
                     </div>"
    link: ($scope, element, attrs) ->
        $scope.TempBrandList = []
        $scope.currentUser_brand = common.currentUser
        $scope.showAll_Brand = ->
             #  $('#nvfBrand').focus()
              autocomplete = $('#nvfBrand').data('kendoAutoComplete')
              autocomplete.popup.open()
              
        $scope.brandOptions = {
            dataTextField:'Description'
            filter: "contains"
            placeholder: "Enter Keywords..."
            minLength: 1
            select: (e) ->
              dataItem = this.dataItem(e.item.index())
              $scope.query.BrandCode = dataItem.Code
              $scope.query.BrandName = dataItem.Description
            change: (e) ->
              if(!e.sender._old)
                    delete $scope.query.BrandCode
                    delete $scope.query.BrandName
                    return
              hasSameItem = false
              for item in $scope.TempBrandList
                if item.Description.toLowerCase() == e.sender._old.toLowerCase()
                    $scope.query.BrandCode = item.Code
                    $scope.query.BrandName = item.Description
                    hasSameItem = true
                    break
              if hasSameItem == false
                  delete $scope.query.BrandCode
                  delete $scope.query.BrandName
        }
        $scope.loadData_brand = ->
            requestItem = {
                VendorNumber: common.currentUser.VendorNumber
            }
            response = brandAPI.search requestItem,
            ->
              if(response) 
                autoComplete = $("#nvfBrand").data("kendoAutoComplete")  
                $scope.TempBrandList = response.BrandList
                if autoComplete && autoComplete.dataSource
                   autoComplete.dataSource.data($scope.TempBrandList)
                
        if $scope.currentUser_brand.VendorNumber != 0 && $scope.currentUser_brand.VendorNumber != "0"          
           $scope.loadData_brand() 
         
        $scope.$watch 'currentUser_brand.VendorNumber', (newValue,oldValue) ->
               return if !newValue || newValue == 0 || newValue == '0'
               return if oldValue == newValue
               if($("#nvfBrand").data("kendoAutoComplete"))
                 $("#nvfBrand").data("kendoAutoComplete").value('')
                 ds = $("#nvfBrand").data("kendoAutoComplete").dataSource
                 ds.filter({})
               delete $scope.query.BrandCode
               $scope.loadData_brand() 
               
#        $('#nvfBrand').on 'focus', ->
#              autocomplete = $('#nvfBrand').data('kendoAutoComplete')
#              autocomplete.popup.open()
])