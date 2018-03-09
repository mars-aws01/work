angular.module('vp-vendorinvitation',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.vendorinvitation.us)
    .translations('zh-cn',resources.vendorportal.vendorinvitation.cn)
    .translations('zh-tw',resources.vendorportal.vendorinvitation.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/vendor-invitation",
      templateUrl: "/modules/vendorportal/app/vendor/vendor-invitation.tpl.html"
      controller: 'VendorInvitationManagementCtrl'
])

.controller('VendorInvitationManagementCtrl',
["$scope","$window","messager","common","authorize","$filter","vendorMgrAPI","$translate"
($scope,$window,messager,common,authorize,$filter,vendorMgrAPI,$translate) ->
    
    $scope.invitationEntity={Email:null}
    
    $scope.invitation=->
        request=angular.copy($scope.invitationEntity)
        #request.action1="vendor"
        request.action1="invitation"
        request.VendorType = "VF"
        vendorMgrAPI.inviteVendor request
            ,(response)->
                if(response&&response.Succeeded)
                    messager.success($translate('success_vendorinvitation.inviteVendorStart').concat(request.Email).concat($translate('success_vendorinvitation.inviteVendorEnd')))
                    $scope.invitationEntity.Email=null
                else
                   if(response.Errors && response.Errors.length > 0)
                      errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                      messager.error($translate('error_vendorinvitation.inviteVendor').concat(errorMsg))  
            ,(error)->
                        
])