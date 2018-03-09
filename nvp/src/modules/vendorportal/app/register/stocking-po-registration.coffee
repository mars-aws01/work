angular.module('vp-stocking-po-registration',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/stocking-po-registration",
      templateUrl: "/modules/vendorportal/app/register/stocking-po-registration.tpl.html"
      controller: 'StockingPoRegistrationCtrl'
])
.config(["$locationProvider", ($locationProvider) ->
    $locationProvider.html5Mode(true)
])
.filter "percentage", ["$filter",($filter) ->
    (amount, currencySymbol) ->
      if(!amount)
        return ''
      amount.toString() + '%';
]
.controller('StockingPoRegistrationCtrl',
["$scope","$location","$window"
 ($scope,$location,$window) ->
 
     $scope.initUploadFile = ->
       newRegistrationUrl = $location.url().replace(/stocking-po-registration/, 'vendor-application')
       console.log(newRegistrationUrl)
       $location.url(newRegistrationUrl)
       $window.location.reload()
     $scope.initUploadFile()
#   debugger
#   path=$location.$$path
#   console.log(path)
#   if path.toLowerCase() == '/stocking-po-registration'
#     debugger
#     newRegistrationUrl = $location.url().replace(/stocking-po-registration/, 'vendor-application')
#     $location.url(newRegistrationUrl)
])
