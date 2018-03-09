angular.module("vdContractEventLog", ['ngSanitize'])

.directive('vdContractEventLog',["common","$filter","eimsAPI",(common,$filter,eimsAPI) ->
  restrict: 'E'
  template: '<div modal="eventModal" close="closeEventModal()" options="{backdrop: true,dialogFade:true}">
    <div class="modal-dialog" style="width: 800px">
        <form name="eventForm" class="modal-content">
            <div class="widget-header">
                <h4><i class="icon-hand-right"></i>&nbsp;View Event Log</h4>
            </div>
            <div class="modal-body" style="max-height: 600px; overflow:auto;">
                <table class="table table-detail table-striped table-hover">
                    <thead>
                        <tr>
                            <td class="vp-table-Header">Index</td>
                            <td class="vp-table-Header">Event</td>
                            <td class="vp-table-Header">Occur Date</td>
                            <td class="vp-table-Header">User</td>
                            <td class="vp-table-Header">Memo</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="item in currentEventLog.data"  ng-click="currentEventLog.selected = item" style="cursor:pointer;">
                            <td><span>{{ $index+1 }}</span></td>
                            <td><span>{{ item.Event }}</span></td>
                            <td><span>{{ item.EventDate | moment:\'MM/DD/YYYY\'}}</span></td>
                            <td><span>{{ item.UserID }}</span></td>
                            <td><span>{{ item.EventMemo | limitTo:40}}{{item.EventMemo.length>40? \' ...\':\'\'}}</span></td>
                        </tr>
                    </tbody>
                </table>
                <label class="mt-10 bold">Memo:</label>
                <textarea class="form-control vp-input bigger-110"
                    ng-model="currentEventLog.selected.DetailMemo"
                    title="{{ currentEventLog.selected.DetailMemo }}"
                    disabled>
                </textarea>
            </div>
            <div class="modal-footer no-margin-top">
                <button type="button" class="btn btn-danger btn-sm" ng-click="closeEventModal()">
                    <i class="icon-undo"></i>
                    {{ \'view_itemlist.close\' | translate }}
                </button>
            </div>
        </form>
    </div>
  </div>'
  link: ($scope, element, attrs) ->
   $scope.showEventModal = ->
     $scope.currentEventLog = {
        selected:{}
        data:[]
     }
     loadEventLogList()
     $scope.eventModal = true

   $scope.closeEventModal = ->
     $scope.eventModal = false

   loadEventLogList = () ->
        eimsAPI.getEventLogList {
           action:'event-info'
           OrderNumber: $scope.detailEntity.RequestNumber
           OrderType: $scope.OrderType.EIMSContractRequest
           TotalCount:500
          }
        ,(response) ->
            if(response)
              $scope.currentEventLog.data = $filter('filter')(response,(i)-> return i.UserID.trim().toLowerCase() == common.currentUser.LoginName.trim().toLowerCase()) #common.currentUser.LoginName
              if $scope.currentEventLog.data.length > 0
                 $scope.currentEventLog.selected = $scope.currentEventLog.data[0]
        ,(error) ->
            messager.error('Get event log failed.')
])