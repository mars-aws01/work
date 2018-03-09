angular.module("vp-cache-auth", []).factory('auth',
["common","$filter",(common,$filter) ->


  getCurrentRoleByNVF = ->
     pagePathArray = common.currentRoutePath().toLowerCase().split('/')  
     pagePath = "/"+pagePathArray[1]
     filterFunctionList = $filter('filter')(common.currentUser.newFunctionList,(f) -> return f.MenuURL && f.MenuURL.toLowerCase() == pagePath)
     return if(!filterFunctionList || filterFunctionList.length == 0)  
     assignedFunctionList = $filter('filter')(filterFunctionList,(f) -> return f.Assignable == true && f.IsAssigned == true)   
     return if(!assignedFunctionList || assignedFunctionList.length == 0)  then '' else assignedFunctionList[0].FunctionName.toLowerCase()
           
  return {
    getCurrentRoleByNVF
  }

])

