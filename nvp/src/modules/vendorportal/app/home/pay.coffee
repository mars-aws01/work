angular.module('vp-pay',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/pay",
      templateUrl: "/modules/vendorportal/app/home/pay.tpl.html"
      controller: 'PayCtrl'
])

.controller('PayCtrl',
["$scope","$rootScope","$filter","messager","common","$translate"
($scope,$rootScope,$filter,messager,common,$translate) ->
   
   $scope.showFeedback_pay = ->
     $rootScope.$broadcast 'ShowFeedback' ,'pay'    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
])