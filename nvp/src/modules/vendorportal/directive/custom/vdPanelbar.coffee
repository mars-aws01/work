angular.module("vdPanelbar", ['ngSanitize'])
.directive("vdPanelbar",["$compile","$translate",($compile,$translate)->
    restrict:"E"
    scope: {
       isShow: "="
       paddingLeft: "="
       paddingRight: "="
       font:"="
    }
    template:" 
      <div class=\"col-xs-12\" ng-init=\"isShow=true\" ng-style=\"cStyle\">
        <div style=\"float: left;\">
            <label ng-show=\"!isTranslateTitle\" style=\"font-size: 15px; font-weight: bold; color: #626464; margin-right: 4px;\">
              {{ title }}
            </label>
            <label id='panelTranslatetitle'  ng-show=\"isTranslateTitle\" ng-style=\"fStyle\" style=\"font-weight: bold; color: #626464; margin-right: 4px;\">
              
            </label>
        </div>
        <div style=\"overflow: hidden;\">
            <div style=\"float: left; margin-top: -2px;\">
                <a href=\"#\" ng-click=\"isShow=!isShow\">
                    <i class=\"bigger-180 bolder\"
                        ng-class=\"{'icon-angle-down':isShow,'icon-angle-up':!isShow}\"></i>
                </a>
                <div id='panelBarSummary' class='visible-lg' style='float:right;color:#E07436'>
                </div>
            </div>
            <div style=\"overflow: hidden; border-top: 1px solid #DEE5E8; text-align: center; height: 0; margin: 10px 20px;\">
            </div>
        </div>
      </div>"
      
    link:($scope,element,attrs) ->
        $scope.cStyle = {
           'padding-left':if $scope.paddingLeft then $scope.paddingLeft else '0'
           'padding-right':if $scope.paddingRight then $scope.paddingRight else '0'
           'padding-top':'0'
           'padding-bottom':'0'
        }
        $scope.fStyle = {
           'font-size':if $scope.font then $scope.font else 15
        }
        titleSize = if $scope.font then $scope.font else 15
        $scope.title = attrs.title
        $scope.isTranslateTitle = if attrs.translatetitle then true else false
        if attrs.translatetitle
          panelTranslatetitleElm = $(element).find("#panelTranslatetitle")[0]
          replaceToAngularBinding = attrs.translatetitle.replace(/[{]/g,'{{').replace(/[}]/g,'}}')
          newTemplate = '<label  style="font-weight: bold; color: #626464; margin-right: 4px;font-size:'+titleSize+'px">' + replaceToAngularBinding + '</label>'
          $(panelTranslatetitleElm).html $compile(newTemplate)($scope.$parent) 
        if attrs.template
          panelBarSummaryElement = $(element).find("#panelBarSummary")[0]
          replaceToAngularBinding = attrs.template.replace(/[{]/g,'{{').replace(/[}]/g,'}}')
          newTemplate = "<div style='float:right;margin:3px 10px 0 10px'>"+ replaceToAngularBinding + "</div>"
          $(panelBarSummaryElement).html $compile(newTemplate)($scope.$parent)
])
