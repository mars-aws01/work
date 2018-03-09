angular.module("vdBrandV2",[])
.directive("vdBrandV2",["brandV2API","common",(brandV2API,common) ->
    restrict : "E"
    scope: {
      brandEntity:"=ngModel"
    }
    template:"<div class=\"col-xs-12 no-padding\">
                        <span class=\"input-icon input-icon-right col-xs-12 no-padding\">
                        <input ng-attr-id=\"{{guid}}\"
                             kendo-auto-complete
                             k-options=\"brandOptions\"
                             style=\"width: 100%;border-radius:0px !important;\" ng-click=\"showAll_Brand()\"/>
                         <div class=\"arrows-select arrows-down\" ng-click=\"showAll_Brand()\"></div>               
                     </div>"
    link: (scope, element, attrs) ->
        scope.guid = UUID.generate()
        scope.required = false
        if attrs.required != undefined
           scope.required = true
        scope.TempBrandList = []
        scope.currentUser_brand = common.currentUser
        scope.showAll_Brand = ->
             #  $('#nvfBrand').focus()
              autocomplete = $('#'+scope.guid).data('kendoAutoComplete')
              autocomplete.popup.open()
        scope.brandOptions = {
            dataTextField:'Description'
            filter: "contains"
            placeholder: "Enter Keywords..."
            minLength: 1
            select: (e) ->
              dataItem = this.dataItem(e.item.index())
              scope.brandEntity = angular.copy(dataItem)
            change: (e) ->
              if(!e.sender._old)
                 scope.$apply ()-> scope.brandEntity = null
              hasSameItem = false
              for item in scope.TempBrandList
                if item.Description.toLowerCase() == e.sender._old.toLowerCase()
                    scope.$apply ()-> scope.brandEntity = angular.copy(item)
                    hasSameItem = true
                    break
              if hasSameItem == false
                  scope.$apply ()-> scope.brandEntity = null
        }
        scope.loadData_brand = ->
            requestItem = {
                VendorNumber: common.currentUser.VendorNumber
                IsActive:true
            }
            response = brandV2API.search requestItem,
            ->
              if(response) 
                autoComplete = $('#'+scope.guid).data("kendoAutoComplete")  
                if response.BrandList
                    scope.TempBrandList = response.BrandList
                else
                    scope.TempBrandList = []
                scope.$parent.brandControlData = angular.copy(scope.TempBrandList)
                autoComplete.dataSource.data(scope.TempBrandList)
                
        if scope.currentUser_brand.VendorNumber != 0 && scope.currentUser_brand.VendorNumber != "0"          
           scope.loadData_brand() 
         
        scope.$watch 'brandEntity', (newValue,oldValue) ->
               if newValue
                   if ($('#'+scope.guid).data("kendoAutoComplete") != undefined)
                       $('#'+scope.guid).data("kendoAutoComplete").value(newValue.Description)

        scope.$watch 'currentUser_brand.VendorNumber', (newValue,oldValue) ->
               return if !newValue || newValue == 0 || newValue == '0'
               return if oldValue == newValue
               if($('#'+scope.guid).data("kendoAutoComplete"))
                 $('#'+scope.guid).data("kendoAutoComplete").value('')
                 ds = $('#'+scope.guid).data("kendoAutoComplete").dataSource
                 ds.filter({})
               scope.brandEntity = null
               scope.loadData_brand() 
               
#        $('#nvfBrand').on 'focus', ->
#              autocomplete = $('#nvfBrand').data('kendoAutoComplete')
#              autocomplete.popup.open()
])