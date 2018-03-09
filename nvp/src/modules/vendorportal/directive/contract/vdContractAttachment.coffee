angular.module("vdContractAttachment", ['ngSanitize'])

.directive('vdContractAttachment',["common","$filter","eimsAPI","messager",(common,$filter,eimsAPI,messager) ->
  restrict: 'E'
  template: '<div modal="contractAttachmentModal" close="closeContractAttachmentModal()" options="{backdrop: true,dialogFade:true}">
    <div class="modal-dialog" style="width: 800px">
        <form name="contractAttachmentForm" class="modal-content">
            <div class="widget-header">
                <h4><i class="icon-hand-right"></i>&nbsp;Attachments For Request: {{detailEntity.RequestNumber}}</h4>
            </div>
            <div class="modal-body" style="min-height: 300px;max-height: 600px; overflow:auto;">
                <div class="row">
                    <table class="table table-detail ml-20 animated fadeInDown" style="width:95%" >
                        <thead>
                            <tr>
                                <td class="vp-table-Header">Void</td>
                                <td class="vp-table-Header">Attachment Type</td>
                                <td class="vp-table-Header">Description</td>
                                <td class="vp-table-Header">File Name</td>
                                <td class="vp-table-Header">Upload User</td>
                                <td class="vp-table-Header">Update Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in currentAttachment.contractAttachmentList">
                               <td>
                                <div class="col-xs-12 no-padding action-buttons text-left" style="text-align: center; padding-top: 4px; padding-bottom: 4px;">
                                    <a href="\#" title="Void" ng-click="voidAttachment(item)" ng-class="{\'vp-disabled\':detailEntity.Status != \'003\'}" >
                                        <i class="icon-remove bigger-140 red"></i>
                                    </a>
                                </div>
                                </td>
                                <td><span>{{item.AttachmentType}}</span></td>
                                <td><span title="{{item.Description}}">{{item.Description | limitTo:10}}{{item.Description.length>10? \' ...\':\'\'}}</span></td>
                                <td><span title="{{item.OriginalFileName}}"><a href={{item.DownloadUrl}} target="_blank">{{item.OriginalFileName | limitTo:10}}{{item.OriginalFileName.length>10? \' ...\':\'\'}}</a></span></td>
                                <td><span>{{item.UploadUserCode}}</span></td>
                                <td><span>{{item.UploadDate | moment:\'MM/DD/YYYY\'}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer no-margin-top">
                <button type="button" vd-auth="Submit" class="btn btn-grey btn-sm" ng-click="uploadContractAttachment()" ng-disabled="detailEntity.Status != \'003\'">
                    <i class="icon-upload-alt"></i>
                    Upload File
                </button>
                <button type="button" class="btn btn-danger btn-sm" ng-click="closeContractAttachmentModal()">
                   <i class="icon-undo"></i>
                   Close
                </button>
            </div>
        </form>
    </div>
  </div>'
  link: ($scope, element, attrs) ->
    $scope.uploadContractAttachment = () ->
      $scope.contractUploadModal = true
      $scope.disableSubmit = false
      eimsAPI.getDFISProperty {
        action:"dfis-property",
        ContractRequestNumber: $scope.detailEntity.RequestNumber
      }
      ,(response)->
        $scope.currentAttachment.contractConfig.Type = response.FileType
        $scope.currentAttachment.contractConfig.Group = response.FileGroup
      ,(error)->
        messager.error('Get DFIS property failed.')

    $scope.voidAttachment = (attachmentEntity) ->
      common.confirmBox "Are you sure to void this attachment?", "", ->
        requestItem = {
            Attachment: angular.copy(attachmentEntity)
        }
        requestItem.action = 'contract'
        requestItem.action1 = 'attachment'
        requestItem.Attachment.Status = 'V'
        requestItem.Attachment.EventType = $scope.eventType.VOID_ATTACHMENT
        requestItem.Attachment.EditUser = common.currentUser.LoginName
        eimsAPI.updateAttachment requestItem
        ,(response)->
          $scope.getContractAttachmentList()
        ,(error)->
          messager.error('Internal Error,Maybe No Connected.')

    $scope.closeContractAttachmentModal = () ->
      $scope.contractAttachmentModal = false
])