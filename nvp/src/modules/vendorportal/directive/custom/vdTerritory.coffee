angular.module("vdTerritory",[])
.directive("vdTerritory",["brandAPI","common","$filter",(brandAPI,common,$filter) ->
    restrict : "E"
    template:"<div class=\"col-xs-12 no-padding\">
                        <span class=\"input-icon input-icon-right col-xs-12 no-padding\">
                        <input id=\"cmbTerritory\"
                             required=\"required\"
                             title=\"{{territoryDesc}}\"
                             kendo-auto-complete 
                             k-options=\"brandOptions\" 
                             style=\"width: 100%;border-radius:0px !important;\" ng-click=\"showAll_Brand()\"/>
                         <div class=\"arrows-select arrows-down\" ng-click=\"showAll_Brand()\"></div>               
                     </div>"
    link: ($scope, element, attrs) ->
        $scope.showAll_Brand = ->
            autocomplete = $('#cmbTerritory').data('kendoAutoComplete')
            autocomplete.popup.open()
        
        setValue = ->
            autoComplete = $("#cmbTerritory").data("kendoAutoComplete")
            currentDescStr = autoComplete._old   
            tempDescList = currentDescStr.split(",")
            tempValues = []
            for item in tempDescList 
                filterVItems = $filter('filter')($scope.poData.territory, (i) -> i.TerritoryDescription.trim() == item.trim())
                if filterVItems && filterVItems.length > 0 && tempValues.indexOf(filterVItems[0].TerritoryCode) < 0
                   tempValues.push(filterVItems[0].TerritoryCode)
            $scope.entity.StandardLegalTerms.Territory = tempValues.join(",")
            tempDesc = []
            for item in tempValues 
                filterVItems = $filter('filter')($scope.poData.territory, (i) -> i.TerritoryCode == item)
                if filterVItems && filterVItems.length > 0 && tempDesc.indexOf(filterVItems[0].TerritoryDescription) < 0
                   tempDesc.push(filterVItems[0].TerritoryDescription)
            desc = ''
            desc = tempDesc.join(",")+"," if tempDesc.length > 0 
            autoComplete.value(desc)
            $scope.territoryDesc = tempDesc.join(",") if tempDesc.length > 0 
                
        loadDesc = ->
            autoComplete = $("#cmbTerritory").data("kendoAutoComplete")   
            if !$scope.entity.StandardLegalTerms.Territory
               tempDescStr=[]
               tempValueStr=[]
               for item in $scope.poData.territory
                   tempDescStr.push(item.TerritoryDescription)
                   tempValueStr.push(item.TerritoryCode)
               desc = tempDescStr.join(",")+","
               autoComplete.value(desc)
               $scope.entity.StandardLegalTerms.Territory = tempValueStr.join(",")
               $scope.territoryDesc = tempDescStr.join(",") if tempDescStr.length > 0   
               return
            tempValues = $scope.entity.StandardLegalTerms.Territory.split(",")
            tempDesc = []
            for item in tempValues 
                filterVItems = $filter('filter')($scope.poData.territory, (i) -> i.TerritoryCode == item)
                if filterVItems && filterVItems.length > 0 && tempDesc.indexOf(filterVItems[0].TerritoryDescription) < 0
                   tempDesc.push(filterVItems[0].TerritoryDescription)
            desc = tempDesc.join(",")+","  
            autoComplete.value(desc)   
            $scope.territoryDesc = tempDesc.join(",") if tempDesc.length > 0   
                     
        $scope.brandOptions = {
            dataTextField:'TerritoryDescription'
            filter: "contains"
            placeholder: "Enter Keywords..."
            separator: ","
            select: (e) ->
              dataItem = this.dataItem(e.item.index())
              console.log("select event")
            change: (e) ->
              setValue()
              console.log("change event")
        }
        
        $scope.isLoaded = false
        
        $scope.loadData_brand = ->
            autoComplete = $("#cmbTerritory").data("kendoAutoComplete")
            autoComplete.dataSource.data($scope.poData.territory)
            $scope.isLoaded = true
            loadDesc()
            
        $scope.$watch 'currentStep', (newValue,oldValue) ->
            return if newValue != 3
            $scope.loadData_brand() 
           
])
