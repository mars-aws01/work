angular.module("vdNeweggUser",[])
.directive("vdNeweggUser",["common",(common) ->
    restrict : "E"
    scope: {
      bindValue: '='
    }
    template:"<div class=\"col-xs-12 no-padding\">
                   <input kendo-auto-complete  k-options=\"userOptions\" k-ng-model=\"bindValue\"
                   style=\"width: 100%;border-radius:0px !important;\" />
              </div>"
    link: ($scope, element, attrs) ->
        $scope.userOptions = {
           dataTextField:'Description'
           filter: "contains"
           placeholder: "Enter Keywords..."
           minLength: 1
           dataSource: {
              type:"json",
              serverFiltering: true,
              transport:{
                read: "#{NEG.PO_EIMS_API}/userentity"
                parameterMap: (options, type) -> 
                   if type == 'read'
                     return { Description:options.filter.filters[0].value,format:'json',TotalCount:150}
              },
              schema: {data : "UserList"}
        }
    }
])