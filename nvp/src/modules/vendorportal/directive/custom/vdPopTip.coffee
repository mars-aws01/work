angular.module("vdPopTip", ['ngSanitize'])
.directive('vdPopTip',["$rootScope","$compile", ($rootScope,$compile) ->
  restrict: 'EA'
  scope:{
      ngTitle: '@'
      ngContent: '@'
      ngTrigger: '@'
      ngRegion: '@'
      single: '@'
      color: '@'
  }

  template: '<span style="font-size: 17px;"
             class="icon-question-circle {{color || \'grey\'}}" popover-region="{{ngRegion}}"
             single="{{single||\"true\"}}"
             popover-content="{{ngContent}}"
             popover-title="{{ngTitle}}"
             popover-trigger="{{ngTrigger}}"
              ></span>',
  link: ($scope, $element, attrs) ->
      popover.create({
                target: $element,
                title: attrs.ngTitle,
                content: attrs.ngContent,
                single: attrs.single,
                region: attrs.ngRegion,
                trigger: attrs.ngTrigger
            })

])
