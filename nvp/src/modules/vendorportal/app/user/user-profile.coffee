angular.module('vp-user-profile',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/user-profile",
      templateUrl: "/modules/vendorportal/app/user/user-profile.tpl.html"
      controller: 'UserProfileCtrl'
])

.controller('UserProfileCtrl',
["$scope","$window","messager","common",
($scope,$window,messager,common) ->
                                                                                                                                                                                     
])
  