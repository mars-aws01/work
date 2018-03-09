angular.module("vdTerritoryV2",[])
.directive("vdTerritoryV2",["brandAPI","common","$filter","$window","$timeout",(brandAPI,common,$filter,$window,$timeout) ->
    restrict : "E"
    template:"<div class=\"col-xs-12 no-padding\">
                        <span class=\"input-icon input-icon-right col-xs-12 no-padding\">
                        <input id=\"cmbTerritoryV2\"
                             required=\"required\"
                             title=\"{{territoryDesc}}\"
                             kendo-auto-complete 
                             readonly=\"readonly\"
                             k-options=\"brandOptions\" 
                             style=\"width: 100%;border-radius:0px !important;background-color:white !important\" ng-click=\"showAll_BrandV2()\"/>
                         <div class=\"arrows-select arrows-down\" ng-click=\"showAll_BrandV2()\"></div>               
                     </div>"
    link: ($scope, element, attrs) ->
        $scope.isBlur = false
        $scope.isCheckBoxBlur = true
        
        $scope.showAll_BrandV2 = ->
            autocomplete = $('#cmbTerritoryV2').data('kendoAutoComplete')
            autocomplete.popup.open()
        
        $scope.preventBlur = (e)->
          el = angular.element(e.target).parent().parent().parent()
          $scope.isCheckBoxBlur = false
        
        $scope.InitListener =->
          angular.element($window).bind('click',(e)->
            if(angular.element(e.target).is("#cmbTerritoryV2_listbox"))
              return
            if(angular.element(e.target).is("[aria-owns='cmbTerritoryV2_listbox']"))
              return
            if(angular.element(e.target).is("#cmbTerritoryV2_listbox span"))
              return
            if(angular.element(e.target).is("#cmbTerritoryV2_listbox label"))
              return
            if(angular.element(e.target).is("#cmbTerritoryV2_listbox input"))
              return
            if(angular.element(e.target).is(".arrows-select.arrows-down"))
              return
            $scope.isBlur = false
            autocomplete = $('#cmbTerritoryV2').data('kendoAutoComplete')
            autocomplete.close()
          )
          
        setValue = (isChecked)->
            autoComplete = $("#cmbTerritoryV2").data("kendoAutoComplete")
            tempValues = []
            tempDesc = []
            filterVItems = $filter('filter')($scope.poData.territory, (i) -> i.isChecked == true)
            if filterVItems && filterVItems.length > 0
              for terr in filterVItems
                tempValues.push(terr.TerritoryCode)
                tempDesc.push(terr.TerritoryDescription)
            $scope.entity.StandardLegalTerms.Territory = tempValues.join(";")
            desc = tempDesc.join(";") if tempDesc.length > 0 
            desc = '' if desc == undefined
            autoComplete.value(desc)
            $scope.territoryDesc = tempDesc.join(";") if tempDesc.length > 0 
            $scope.agreeForDesc = tempDesc.join(", ") if tempDesc.length > 0
                
        loadDesc = ->
            autoComplete = $("#cmbTerritoryV2").data("kendoAutoComplete")   
            if !$scope.entity.StandardLegalTerms.Territory
               tempDescStr=[]
               tempValueStr=[]
               for item in $scope.poData.territory
                   item.isChecked = true
                   tempDescStr.push(item.TerritoryDescription)
                   tempValueStr.push(item.TerritoryCode)
               autoComplete.dataSource.data($scope.poData.territory)
               desc = tempDescStr.join(";")
               autoComplete.value(desc)
               $scope.entity.StandardLegalTerms.Territory = tempValueStr.join(";")
               $scope.territoryDesc = tempDescStr.join(";") if tempDescStr.length > 0   
               $scope.agreeForDesc = tempDescStr.join(", ") if tempDescStr.length > 0
               return
            tempValues = $scope.entity.StandardLegalTerms.Territory.split(";")
            tempDesc = []
            for item in tempValues 
                for terr in $scope.poData.territory
                  if terr.TerritoryCode == item
                    terr.isChecked = true
                    tempDesc.push(terr.TerritoryDescription)
            autoComplete.dataSource.data($scope.poData.territory)
            desc = tempDesc.join(";")  
            autoComplete.value(desc)   
            $scope.territoryDesc = tempDesc.join(";") if tempDesc.length > 0   
            $scope.agreeForDesc = tempDesc.join(", ") if tempDesc.length > 0
                     
        $scope.brandOptions = {
            dataTextField:'TerritoryDescription'
            filter: "contains"
            placeholder: "Enter Keywords..."
            separator: ";"
            template: kendo.template($("#territoryTemplate").html())
            select: (e) ->
              e.preventDefault()
              $scope.isBlur = true
              dataItem = this.dataItem(e.item.index())
              for terr in $scope.poData.territory
                if terr.TerritoryCode == dataItem.TerritoryCode
                  terr.isChecked = angular.element(e.item[0]).find('input')[0].checked
              setValue()
            close: (e)->
              if $scope.isBlur
                e.preventDefault()
              #return false
            change: (e) ->
              #setValue()
        }
        
        $scope.isLoaded = false
        
        $scope.loadData_brand = ->
            autoComplete = $("#cmbTerritoryV2").data("kendoAutoComplete")
            if(autoComplete == undefined)
              $timeout($scope.loadData_brand,1000)
              return
            autoComplete.dataSource.data($scope.poData.territory)
            $scope.isLoaded = true
            loadDesc()
            
        $scope.$watch 'currentStep', (newValue,oldValue) ->
            return if newValue != 3 && newValue != 1
            $scope.loadData_brand()
            $scope.InitListener()
])
