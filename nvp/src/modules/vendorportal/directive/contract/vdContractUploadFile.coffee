angular.module("vdContractUploadFile", ['ngSanitize'])
.directive("vdContractUploadFile",['common','eimsAPI','messager','$q', (common, eimsAPI, messager,$q) ->
  restrict: 'E'
  template: '<div modal="contractUploadModal" close="closeContractUploadFile()" options="{backdrop: true,dialogFade:true}">
    <div class="modal-dialog" style="width: 740px">
        <form name="contractUploadForm" class="modal-content">
            <div class="widget-header">
                <h4><i class="icon-hand-right"></i>&nbsp;Attachments For Request: {{detailEntity.RequestNumber}}</h4>
            </div>
            <div class="modal-body" style="min-height: 200px">
                <div class="row">
                    <div class="form-group col-lg-12">
                        <label class="edi-control-label col-md-2">Attachment Type</label>
                        <div class="col-md-10">
                            <input type="text" class="form-control vp-input" value="Supporting Document" disabled />
                        </div>
                    </div>
                    <div class="form-group col-lg-12">
                        <label class="edi-control-label col-md-2">Description</label>
                        <div class="col-md-10">
                            <textarea class="form-control" rows="3" ng-model="Description" maxlength="1000" /></textarea>
                        </div>
                    </div>
                    <div class="form-group col-lg-12">
                        <label class="edi-control-label col-md-2">Upload File</label>
                        <div class="col-md-10">
                            <vd-upload-v2 data="currentAttachment.uploadContractFileList"
                                          type="contract"
                                          max-count="currentAttachment.contractConfig.MaxCount"
                                          max-size="currentAttachment.contractConfig.MaxSize"
                                          rejects="currentAttachment.contractConfig.rejects"
                                          attachment-type="currentAttachment.contractConfig.Type"
                                          file-type="currentAttachment.contractConfig.Type"
                                          group="currentAttachment.contractConfig.Group" same-name-file-allow
                                          class="upload-directive-alignment">
                                
                            </vd-upload-v2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer no-margin-top">
                <button type="button" ng-disabled="disableSubmit" vd-auth="Submit" class="btn btn-default btn-sm" ng-click="insertAttachments()">
                    <i class="ace-icon icon-spinner icon-spin white bigger-120" style="margin-top:2px;" ng-show="disableSubmit"></i>Submit
                </button>
                <button type="button" class="btn btn-danger btn-sm" ng-click="closeContractUploadFile()">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>'
  link: ($scope, element, attrs) ->
    $scope.Description = ''
    $scope.disableSubmit = false
    $scope.currentAttachment.attachmentEntity = {}

    $scope.closeContractUploadFile = ()->
      $scope.contractUploadModal = false
      $scope.disableSubmit = false
      $scope.currentAttachment.uploadContractFileList = []
      $scope.Description = ''

    $scope.insertAttachmentApi = (item)->
      deferred = $q.defer()
      $scope.currentAttachment.attachmentEntity.action = 'contract'
      $scope.currentAttachment.attachmentEntity.action1 = 'attachment'
      $scope.currentAttachment.attachmentEntity.Attachment = {
          AttachmentTypeCode: $scope.attachmentType.SUPPORT_DOCUMENT
          BeginDate: new Date().toUTCString().replace("UTC","GMT")
          EndDate: new Date().toUTCString().replace("UTC","GMT")
          UploadDate: new Date().toUTCString().replace("UTC","GMT")
          DestFileName: item.DFISFileName
          EventType: $scope.eventType.ADD_ATTACHMENT
          IsFormTransaction: false
          IsFormalToPending: false
          IsSelected: false
          OrderNumber: $scope.detailEntity.RequestNumber
          OrderType: $scope.OrderType.EIMSContractRequest
          OriginalFileName: item.FileName
          Status: "O"
          UploadUser: common.currentUser.LoginName
          UploadUserCode: common.currentUser.LoginName
          VendorNumber: $scope.detailEntity.VendorNumber
          Description: $scope.Description
      }
      requestItem = angular.copy($scope.currentAttachment.attachmentEntity)
      eimsAPI.insertAttachment requestItem
        ,(response)->
          if !response.Succeeded
            messager.error('Internal Error,Please contract admin.')
          deferred.resolve('OK')
      return deferred.promise

    $scope.insertAttachments = ()->
      $scope.disableSubmit = true
      if $scope.currentAttachment.uploadContractFileList.length < 1
        messager.error('You must upload at least one file.')
        $scope.disableSubmit = false
        return
      $q.all($scope.currentAttachment.uploadContractFileList.map($scope.insertAttachmentApi))
        .then ->
            $scope.getContractAttachmentList()
            $scope.disableSubmit = false
            $scope.contractUploadModal = false

    $scope.SubmitAttachment = ()->
        $scope.insertAttachments().then(
            (info)->
                $scope.getContractAttachmentList()
                $scope.contractUploadModal = false
        )

])