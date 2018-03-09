negServices.provider "progress", ->
  @$get = [
    "$document"
    "$window"
    "$compile"
    "$rootScope"
    ($document, $window, $compile, $rootScope) ->
      $scope = $rootScope
      $body = $document.find("body")
      el = $compile("<div class='loadingbox' ng-show='globalProgress'>{{ globalProgress }}</div>")($scope)
      $body.append el

      (
        start : (tip) ->
          $scope.globalProgress = (tip || "Loading") + "..."
        complete : ->
          $scope.globalProgress = ""
        status : ->
          !!$scope.globalProgress
      )
  ]
  return

