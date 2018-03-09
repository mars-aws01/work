angular.module("vdPoStatus",[])
.directive("vdPoStatus",[() ->
    restrict : "E"
    scope: {
        status: '='
        potype:'='
    }
    template:"<div class=\"col-md-12 col-sm-12 col-xs-12 no-padding-left\">
                  <label class=\"radio-inline no-margin-left no-padding-right no-padding-left\" 
                         ng-repeat=\"status in StatusList track by $index\"  ng-hide=\"status.Disabled\">
                      <input ng-model=\"status.IsChecked\" type=\"checkbox\" class=\"ace\" checked=\"{{status.IsChecked}}\" 
                            ng-change=\"selectEntity(status)\"\">
                      <span class=\"lbl\">&nbsp;{{status.Text | menuLocalize}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </label>
              </div>"
    link: ($scope, element, attrs) ->
        $scope.StatusList = [
                {
                    "Text":{"en-us": "All", "zh-cn":"所有", "zh-tw":"所有"},
                    "Value": "All",
                    "IsChecked":true,
                    "Disabled":false
                },{
                    "Text":{"en-us":"Open","zh-cn":"打开","zh-tw":"打开"},
                    "Value": "Open",
                    "IsChecked":true,
                    "Disabled":false
                },{
                    "Text":{"en-us":"Partial Received", "zh-cn":"部分收货","zh-tw":"部分收货"},
                    "Value": "PartialReveived",
                    "IsChecked":true,
                    "Disabled":false
                },{
                    "Text":{"en-us":"Closed","zh-cn":"关闭", "zh-tw":"关闭"},
                    "Value": "Closed",
                    "IsChecked":true,
                    "Disabled":false
                }
        ]
        $scope.status = (s.Value for s in $scope.StatusList when s.IsChecked is true)
        $scope.updateOutput = ->
            #$scope.status = if $scope.StatusList[0].IsChecked is true then (s.Value for s in $scope.StatusList when s.Value is "All") else (s.Value for s in $scope.StatusList when s.IsChecked is true)
            $scope.status = []
            if $scope.StatusList[0].IsChecked is true
                $scope.status =  (s.Value for s in $scope.StatusList when s.Value is "All") 
            else
                for s in $scope.StatusList when s.IsChecked is true
                    continue if ($scope.potype is 'Consignment' and s.Value is 'PartialReveived')                        
                    $scope.status.push(s.Value)
            return status
                  
        $scope.selectEntity = (status)->
            if status 
                if status.Value is "All"
                    for s in $scope.StatusList when s.Value isnt "All"
                        continue if ($scope.potype is 'Consignment' and s.Value is 'PartialReveived')
                        s.IsChecked = status.IsChecked if s.Disabled is false
                else
                    sameEntityList = []
                    for s in $scope.StatusList when s.IsChecked is true and s.Value isnt "All"
                        continue if($scope.potype is 'Consignment' and s.Value is 'PartialReveived')                            
                        sameEntityList.push(s)
                    if sameEntityList.length is 3 or (sameEntityList.length is 2 and $scope.potype is 'Consignment')                        
                        $scope.StatusList[0].IsChecked = true
                    else
                        $scope.StatusList[0].IsChecked = false
            $scope.updateOutput()                            
        
        $scope.$watch  'potype', (newValue, oldValue) ->
            if newValue is 'Consignment'
                $scope.StatusList[2].Disabled = true
                #$scope.StatusList[2].IsChecked = false
                if( (s.Value for s in $scope.StatusList when s.IsChecked is true and s.Value isnt 'PartialReveived' and s.Value isnt 'All').length is 2)
                    $scope.StatusList[0].IsChecked = true
                else
                    $scope.StatusList[0].IsChecked = false
            else
                $scope.StatusList[2].Disabled = false
                if( (s.Value for s in $scope.StatusList when s.IsChecked is true and s.Value isnt 'All').length is 3)
                    $scope.StatusList[0].IsChecked = true
                else
                    $scope.StatusList[0].IsChecked = false
            $scope.updateOutput()
    
])