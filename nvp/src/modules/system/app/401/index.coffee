angular.module('system-401',['ngRoute'])

.config(["$routeProvider",
    ($routeProvider) ->
      $routeProvider
      .when("/401",
          templateUrl: "/modules/system/app/401/index.tpl.html"
          controller: 'System401Ctrl')
  ])

.controller('System401Ctrl',
["$scope","$http", ($scope,$http) ->

])