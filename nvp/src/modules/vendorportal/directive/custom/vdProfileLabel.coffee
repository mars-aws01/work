angular.module("vdProfileLabel",[])
.directive("vdProfileLabel",["common","$rootScope",(common,$rootScope) ->
    restrict : "E"    
    scope: {
        type:'@'
        }
    template:"<span ng-show=\"Profile.CurrencyCode && Profile.VendorNumber !== '0' && selectedProperty\">&nbsp;({{selectedProperty}})</span>"
    link: ($scope, element, attrs) ->
        $scope.Profile ={}
        $scope.noneVendorNumber = "0"
        $scope.updateProfile = (data)->
            if(data.VendorNumber not in [$scope.noneVendorNumber] and data.CurrencyCode is undefined)
                $scope.Profile.VendorNumber = data.VendorNumber
                $scope.Profile.CurrencyCode = 'USD'
                $scope.Profile.LengthMeasurementCode = 'in'
                $scope.Profile.WeightMeasurementCode = 'lb'
            else
                $scope.Profile = data
            if $scope.type
                $scope.selectedProperty = $scope.Profile[$scope.type]
        
        $scope.updateProfile(common.currentProfile)
        
        $rootScope.$on 'ProfileChanged', (e,data) ->
            if(data)
                $scope.updateProfile(data)
            
            
])
