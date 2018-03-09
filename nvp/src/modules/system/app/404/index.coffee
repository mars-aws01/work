angular.module('system-404',['ngRoute'])

.config(["$routeProvider",
    ($routeProvider) ->
      $routeProvider
      .when("/404",
          templateUrl: "/modules/system/app/404/index.tpl.html"
          controller: 'System404Ctrl')
  ])

.controller('System404Ctrl',
["$scope","$http", ($scope,$http) ->

])