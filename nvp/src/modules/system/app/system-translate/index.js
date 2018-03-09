(function() {

  angular.module('system-translate', []).controller("ToolbarSystemTranslateCtrl", [
    "$scope", "$rootScope", "$translate", "context", function($scope, $rootScope, $translate, context) {
      $scope.languages = NEG.languages;
      context.currentLanguage = $translate.uses();
      $scope.currentLanguage = $translate.uses();
      if ($scope.languages[$scope.currentLanguage] == null) {
        $translate.uses('en-us');
        context.currentLanguage = 'en-us';
        $scope.currentLanguage = 'en-us';
      }
      return $scope.changeLanguage = function(langKey) {
        context.currentLanguage = langKey;
        $scope.currentLanguage = langKey;
        $translate.uses(langKey);
        return $rootScope.$broadcast("chageLanguage");
      };
    }
  ]);

}).call(this);
