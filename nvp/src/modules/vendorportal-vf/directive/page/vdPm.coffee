angular.module("vdPm",[])
.directive("vdPm",["itemCreationAPI","common","$filter","itemCreation","publisher",(itemCreationAPI,common,$filter,itemCreation,publisher) ->
    restrict : "E"
    scope:{
      userId:'='
      subscribe:'='
      category:'='
    }
    template:"<div class=\"col-xs-12 no-padding\">
                        <span class=\"input-icon input-icon-right col-xs-12 no-padding vd-pm-nopadding-left\">
                        <input ng-attr-id=\"{{ 'vfPm' + id}}\" name=\"pm\"
                             kendo-auto-complete
                             k-options=\"brandOptions\" class=\"no-padding-top no-padding-bottom\"
                             ng-required=\"config.basic.PM.req && category == 'edit'\"
                             ng-model='userName'
                             style=\"height:30px;width: 100%;border-radius:0px !important;\" />
                         <!--<div class=\"arrows-select arrows-down\" ng-click=\"showAll_Pm()\"></div>-->
                         <!-- <validtip for=\"pm\" class=\"vp-validtip\"></validtip>  -->
                     </div>"
    link: ($scope, element, attrs) ->
        $scope.config= angular.copy(itemCreation.config)
        $scope.ctrlId = attrs.ctrlId
        $scope.id = $scope.$id
        $scope.TempPmList = []

        $scope.$watch 'userName',(newValue,oldValue)->
          if !newValue || newValue == ''
            delete $scope.userId

        $scope.showAll_Pm = ->
              autocomplete = $('#vfPm' + $scope.id).data('kendoAutoComplete')
              if !autocomplete.old
                  autocomplete.search(autocomplete.old)
              autocomplete.popup.open()

        $scope.brandOptions = {
            dataTextField:'UserName'
            filter: "startswith"
            placeholder: "Enter Keywords..."
            minLength: 1
            filtering: (e) ->
                  filter = e.filter
                  if filter.value.length < 2
                      e.preventDefault()
                      this.search("!@#$%^&*()*&")
            select: (e) ->
              dataItem = this.dataItem(e.item.index())
              $scope.userId = dataItem.UserID
            change: (e) ->
              if(!e.sender._old)
                    delete $scope.userId
                    return
              hasSameItem = false
              for item in $scope.TempPmList
                if item.UserName.toLowerCase() == e.sender._old.toLowerCase()
                    $scope.userId = item.UserID
                    hasSameItem = true
                    break
              if hasSameItem == false
                  delete $scope.userId
        }
        $scope.loadData_pm = ->
            requestItem = {
                action1: 'newegg-pm'
            }
            itemCreationAPI.search requestItem
            ,(response)->
                if(response && response.Succeeded)
                  autoComplete = $("#vfPm" + $scope.id).data("kendoAutoComplete")
                  $scope.TempPmList = response.NeweggPMList
                  autoComplete.dataSource.data($scope.TempPmList)

        $scope.loadData_pm()

        $scope.clear = ()->
          $('#vfPm' + $scope.$id).data("kendoAutoComplete").value("")
          return

        $scope.update = (userId)->
          if userId
            userList = $filter('filter')($scope.TempPmList, {UserID: userId})
            if userList.length > 0
              $('#vfPm' + $scope.$id).data("kendoAutoComplete").value(userList[0].UserName)
            else
              $('#vfPm' + $scope.$id).data("kendoAutoComplete").value("")

        $scope.pmSubscriber = (msg)->
          $scope[msg.Callback](msg.Param) if $scope.subscribe

        publisher.subscribe('vdPm' + $scope.ctrlId, $scope.pmSubscriber)

#$('#nvfBrand').on 'focus', ->
#              autocomplete = $('#nvfBrand').data('kendoAutoComplete')
#              autocomplete.popup.open()
])
