angular.module("vdImAttachments",[])
.directive("vdImAttachments",["$filter","manufacturerAPI","itemCreationAPI","common","publisher",($filter,manufacturerAPI,itemCreationAPI,common,publisher) ->
    restrict : "E"
    scope:{
        config:"=config"
        attachments:'=attachments'
        mfrPartNumber:"="
        upc:"=upc"
        uploadDisabled:"="
    }
    template:'
    <button type="button" class="btn btn-xs btn-primary" ng-click="openAttachmentModal()">{{ \'view_basic.attachments\' | translate }} ({{attachments.length}})</button>
        <span class="im-tip icon-question-sign grey" title="Please upload Specification Sheet or User Manual" style="font-size: 17px;"></span>
    <div modal="addAttachmentModal" close="closeAttachmentModal()" options="{backdrop: true,dialogFade:true}"  id="addAttachment">
        <div class="modal-dialog" style="width:840px;">
            <ng-form name="attachmentsForm" class="form-horizontal" role="form">
                <div name="addAttachmentForm" class="modal-content">
                    <div class="widget-header">
                        <h4>{{ \'view_basic.uploadHeader\' | translate }}</h4>
                    </div>
                    <div class="modal-body" style="min-height:300px;max-height:600px;overflow:hidden">
                        <div class="form-group col-md-12 no-padding" style="margin-left: 20px;">
                            <label class="col-lg-2 col-xs-11 no-padding-left">{{ \'view_basic.mfrPartNumber\' | translate }}:</label>
                            <div class="col-lg-10 col-xs-12 no-padding">
                                <div class="col-xs-11 no-padding-left attch-padding-right">
                                    <input type="text" class="col-xs-12 vp-input vp-input-sm"
                                      name="mfrPartNumber"
                                      ng-model="mfrPartNumber"
                                      disabled/>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-md-12 no-padding" style="margin-left: 20px;">
                            <label class="col-lg-2 col-xs-11 no-padding-left">{{ \'view_basic.upc\' | translate }}:</label>
                            <div class="col-lg-10 col-xs-12 no-padding">
                                <div class="col-xs-11 no-padding-left attch-padding-right">
                                    <input type="text" class="col-xs-12 vp-input vp-input-sm"
                                      name="upc"
                                      ng-model="upc"
                                      disabled/>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 no-padding" style="margin-left: 20px;">
                            <h5>{{ \'view_basic.attachment\' | translate }}
                                <i class="icon-info-circle grey" ng-show="uploadDisabled" title="To make sure file name is unique in our system, several characters will be added to the file name after it get uploaded and submitted to our system.You may see the file name is different from the one you\'ve uploaded."></i>
                            </h5>
                            <div class="vp-panel-bar">
                                <ul class="nav nav-tabs" style="margin-right: 20px;" id="myTab">
                                    <li class="active"><a href="#" id="spec_a" ng-click="specTabSelected()" data-toggle="tab">&nbsp;{{ \'view_basic.specSheet\' | translate }}&nbsp;</a></li>
                                    <li><a href="#" ng-click="manualTabSelected()" data-toggle="tab">&nbsp;{{ \'view_basic.userManual\' | translate }}&nbsp;</a></li>
                                </ul>
                                <div class="tab-content no-border" style="padding-right: 0px;">
                                    <div class="tab-pane active" id="spec" active="specTabActive" ng-class="{active:specTabActive}">
                                       
                                        <div class="form-group upload-no-padding" style="padding-left:4px;margin-left:-12px;width: 95%;">
                                            <vd-upload-v2 data="SpecList"
                                                type="spec"
                                                max-count="config.SpecFile.MaxCount"
                                                max-size="config.SpecFile.MaxSize"
                                                rejects="config.SpecFile.Rejects"
                                                filename-pattern="config.SpecFile.FileNamePattern"
                                                filename-pattern-tip="config.SpecFile.FileNamePatternTip"
                                                disabled="uploadDisabled"
                                                attachment-type="config.SpecFile.Type"
                                                file-type="config.SpecFile.Type"
                                                group="config.SpecFile.Group"></vd-upload-v2>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="manual" active="manualTabActive" ng-class="{active:manualTabActive}">
                                     
                                        <div class="form-group upload-no-padding" style="padding-left:4px;margin-left:-12px;width: 95%;">
                                            <vd-upload-v2 data="ManualList"
                                                type="manual"
                                                max-count="config.ManualFile.MaxCount"
                                                max-size="config.ManualFile.MaxSize"
                                                rejects="config.ManualFile.Rejects"
                                                filename-pattern="config.ManualFile.FileNamePattern"
                                                filename-pattern-tip="config.ManualFile.FileNamePatternTip"
                                                disabled="uploadDisabled"
                                                attachment-type="config.ManualFile.Type"
                                                file-type="config.ManualFile.Type"
                                                group="config.ManualFile.Group"
                                                class="col-xs-12 no-padding"></vd-upload-v2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary btn-sm" style="width: 76px;" ng-click="saveAttachments()">
                            <i class="icon-save"></i> {{ \'view_basic.save\' | translate }}
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" ng-click="closeAttachmentModal()" style="width: 76px;" id="addAttachmentCancelBtn">
                            <i class="icon-undo"></i> {{ \'view_basic.cancel\' | translate }}
                        </button>
                    </div>
                </div>
            </ng-form>
        </div>
    </div>
    '
    link: ($scope, element, attrs) ->
        $scope.SpecList = []
        $scope.ManualList = []
        $scope.specTabActive = true
        $scope.manualTabActive = false
        $scope.attachments = [] if !$scope.attachments
        $scope.tempAttachments = []
        
        $scope.openAttachmentModal = ()->
            if $scope.attachments
                $scope.tempAttachments = angular.copy($scope.attachments)
                $scope.updateAttachements($scope.attachments)
            else
                $scope.tempAttachments = []
                $scope.SpecList = []
                $scope.ManualList = []
            $scope.specTabActive = true
            $scope.manualTabActive = false            
            $scope.addAttachmentModal = true

        $scope.closeAttachmentModal=->
            if $scope.addAttachmentModal
                $scope.attachments = angular.copy($scope.tempAttachments)
                $scope.addAttachmentModal = false

        $scope.specTabSelected = ->
            $scope.specTabActive = true
            $scope.manualTabActive = false

        $scope.manualTabSelected = ->
            $scope.specTabActive = false
            $scope.manualTabActive = true

        $scope.saveAttachments = ()->
            $scope.attachments = []
            for file in $scope.SpecList
                $scope.attachments.push({FileName: file.DFISFileName,AttachmentTypeID:3})
            for file in $scope.ManualList
                $scope.attachments.push({FileName: file.DFISFileName,AttachmentTypeID:4})
            $scope.addAttachmentModal = false

        $scope.getFileNameWithoutDate = (name)->
            strs = name.split('.')
            extensionName = strs.pop()
            originFileName = strs.shift()
            targetList = [originFileName, extensionName]
            return targetList.join('.')


        $scope.updateAttachements = (attachments)->
            $scope.SpecList = []
            $scope.ManualList = []
            $scope.attachments = angular.copy(attachments)
            $scope.attachments = [] if !$scope.attachments
            if $scope.attachments
                for file in $scope.attachments
                    if file.AttachmentTypeID == 3
                        file.DownloadUrl = common.formatString('{0}{1}/{2}',[NEG.IMCreation_DFIS_URL,$scope.config.SpecFile.Type,file.FileName])
                        file.DestFileName = file.FileName
                        file.FileName = file.FileName
                        $scope.SpecList.push(file)
                    else if file.AttachmentTypeID == 4
                        file.DownloadUrl = common.formatString('{0}{1}/{2}',[NEG.IMCreation_DFIS_URL,$scope.config.ManualFile.Type,file.FileName])
                        file.DestFileName = file.FileName
                        file.FileName = file.FileName
                        $scope.ManualList.push(file);

        $scope.updateSubscribe=(msg)->
            $scope.updateAttachements(msg.Param)

        publisher.subscribe('vdImAttachments',$scope.updateSubscribe)
])
