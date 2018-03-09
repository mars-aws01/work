angular.module('system-translate', [])

.controller("ToolbarSystemTranslateCtrl",["$scope","$rootScope","$translate","context",($scope, $rootScope, $translate,context) ->
    $scope.languages=NEG.languages
    context.currentLanguage=$translate.uses()
    $scope.currentLanguage=$translate.uses()

    unless $scope.languages[$scope.currentLanguage]?
      $translate.uses('en-us')
      context.currentLanguage='en-us'
      $scope.currentLanguage='en-us'

    $scope.changeLanguage = (langKey) ->
      context.currentLanguage=langKey
      $scope.currentLanguage=langKey
      $translate.uses(langKey)
      $rootScope.$broadcast("chageLanguage")
  ])