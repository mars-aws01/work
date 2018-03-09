negServices.factory "lastBreadCrumb", ["$rootScope", ($rootScope) ->
  set: (newBread) ->
    $rootScope.$broadcast("editLastBreadCrumb", newBread)
  description: (desc) ->
     $rootScope.$broadcast("editLastBreadCrumb_Description", desc)
]