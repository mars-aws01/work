angular.module("vdContractReject", ['ngSanitize'])

.directive('vdContractReject',["common","$filter","eimsAPI","messager",(common,$filter,eimsAPI,messager) ->
  restrict: 'E'
  template: '<div modal="rejectModal" close="closeRejectModal()" options="{backdrop: true,dialogFade:true}">
    <div class="modal-dialog" style="width: 650px">
        <form name="rejectForm" class="modal-content form-horizontal">
            <div class="modal-body" style="padding-bottom: 0;">
                <label class="text-right orange">
                    <i class="icon-exclamation-triangle"></i>
                    Request can only be rejected when Memo OR Attachment is submitted with rejection!
                </label>
                <div class="form-group">
                    <label class="col-md-2 edi-control-label no-padding-right">Memo:</label>
                    <div class="col-md-10">
                        <textarea class="form-control vp-input"
                            ng-model="rejectDescription"
                            maxlength="1000"
                            style="height:70px; resize: none"
                            ></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 edi-control-label no-padding-right">Attachment Type:</label>
                    <div class="col-md-5">
                        <input type="text" class="form-control vp-input" value="Supporting Document" disabled />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 edi-control-label no-padding-right">Upload File:</label>
                    <div class="col-md-10">
                        <vd-upload-v2 data="currentAttachment.uploadRejectFileList"
                                        type="reject"
                                        max-count="currentAttachment.rejectConfig.MaxCount"
                                        max-size="currentAttachment.rejectConfig.MaxSize"
                                        rejects="currentAttachment.rejectConfig.rejects"
                                        attachment-type="currentAttachment.rejectConfig.Type"
                                        file-type="currentAttachment.rejectConfig.Type"
                                        group="currentAttachment.rejectConfig.Group" same-name-file-allow
                                        class="upload-directive-alignment">
                                
                        </vd-upload-v2>
                    </div>
                </div>
                <label style="height:1px">&nbsp;</label>  
            </div>
            <div class="modal-footer no-margin-top">
                <button type="submit" ng-disabled="disableReject" vd-auth="Submit" class="btn btn-grey btn-sm" ng-click="reject()">
                    <div class="col-xs-12"><i class="ace-icon icon-spinner icon-spin-position-reject icon-spin white bigger-120" ng-show="loadingReject"></i>
					<i class="icon-close" ng-hide="loadingReject"></i>
                    Reject Now</div>
                </button>
                <button type="button" class="btn btn-danger btn-sm" ng-click="closeRejectModal()">
                    <i class="icon-undo"></i>
                    Close
                </button>
            </div>
        </form>
    </div>
</div>'
  link: ($scope, element, attrs) ->
    $scope.rejectDescription = ''
    $scope.rejectDesRequired = true
    $scope.rejectAttachmentNumber = 0
    $scope.rejectMemo = undefined
    $scope.disableReject = false
    $scope.currentAttachment.rejectAttachment = {}
    $scope.rejectEntity = {}
    $scope.currentAttachment.uploadRejectFileList = []

    $scope.insertRejectAttachmentApi = (item)->
      $scope.currentAttachment.attachmentEntity.action = 'contract'
      $scope.currentAttachment.attachmentEntity.action1 = 'attachment'
      $scope.currentAttachment.attachmentEntity.Attachment = {
          AttachmentTypeCode: $scope.attachmentType.SUPPORT_DOCUMENT
          BeginDate: new Date().toUTCString().replace("UTC","GMT")
          EndDate: new Date().toUTCString().replace("UTC","GMT")
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
          Description: $scope.rejectDescription
      }
      eimsAPI.insertAttachment $scope.currentAttachment.attachmentEntity
        ,(response)->
          if !response.Succeeded
            messager.error('Internal Error,Please contract admin.')
            $scope.disableReject = false
            $scope.loadingReject = false
          else
            $scope.getContractAttachmentList()
            $scope.rejectApi()
            $scope.rejectAttachmentNumber = response.AttachmentList[0].AttachmentNumber
            $scope.creatEventLogApi() if $scope.rejectDescription && $scope.rejectDescription.trim().length > 0

    $scope.rejectApi = ->
      eimsAPI.approve {
        action:'contract',
        RequestNumber: $scope.detailEntity.RequestNumber,
        Handler: {ActionType:$scope.actionTypes.decline,ActionUserID:common.currentUser.LoginName}
      }
      ,(response) ->
        $scope.loadingReject = false
        if(!response.ErrorList || response.ErrorList.length == 0)
          messager.success('Reject this contract successfully.')
          $scope.sendRejectMail()
          $scope.rejectModal = false
          common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)
        else
          errorMsg = $scope.getApiErrorMsg(response.ErrorList)
          messager.error(errorMsg)
          $scope.disableReject = false
      ,(error) ->
        messager.error('Reject contract error.')
        $scope.disableReject = false
        $scope.loadingReject = false

    $scope.creatEventLogApi = ->
      eimsAPI.createEventlog {
        action:'event-info',
        Log: {
          EventMemo: $scope.rejectDescription,
          EventType: 161,
          OrderNumber: $scope.detailEntity.RequestNumber,
          OrderType: $scope.OrderType.EIMSContractRequest,
          UserID: common.currentUser.LoginName
        }
      }
      ,(response) ->

    $scope.sleep =(time) ->
      date = Date.now()
      currentDate = null
      loop
        currentDate = Date.now()
        unless currentDate - date < time
          break
        return

    $scope.checkRejectForm = ->
      return false if $scope.currentAttachment.uploadRejectFileList.length == 0 && (!$scope.rejectDescription || $scope.rejectDescription.length == 0)
      return true
    $scope.reject = ->
      $scope.disableReject = true
      if !$scope.checkRejectForm()
        messager.warning('You must input memo or upload a file.')
        $scope.disableReject = false
        return
      common.confirmBox "Are you sure reject this contract?","", ->
          $scope.$apply(() -> $scope.loadingReject = true)
          if($scope.currentAttachment.uploadRejectFileList.length > 0)
            $scope.insertRejectAttachmentApi($scope.currentAttachment.uploadRejectFileList[0])
          else
            $scope.rejectMemo = $scope.rejectDescription
            $scope.rejectApi()
            $scope.creatEventLogApi() if $scope.rejectDescription && $scope.rejectDescription.trim().length > 0
      , ->
         $scope.$apply(()-> $scope.disableReject = false)
         $scope.$apply(()-> $scope.loadingReject = false)
      return

    $scope.closeRejectModal = ->
     $scope.rejectModal = false
     $scope.rejectDescription = ''
     $scope.currentAttachment.uploadRejectFileList = []

])