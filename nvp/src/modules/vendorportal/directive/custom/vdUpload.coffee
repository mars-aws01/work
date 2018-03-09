angular.module("vdUpload", [])
.controller('UploadCtrl',
["$scope", ($scope) ->
  $scope.url = "www.test.com"
])
.directive('vdUpload',["$compile","common","FileUploader","messager","$filter",($compile,common,FileUploader,messager,$filter) ->
  restrict: 'E'
  scope: {
    data:'='
    maxSize:"="
    maxCount:"="
    rejects:"="
    filenamePattern:"="
    filenamePatternTip:"="
    disabled:"="
    attachmentType:"="
    fileType:"="
    group:"="
    changed:"=?"
  }
  template:'<div class="col-xs-12"></div>'
  link: ($scope, element, attrs) ->
    contentTemplate = '
       <div class="col-xs-12 no-padding">
         <div class="col-xs-12" style="margin: 3px 0;" id="fileInput_{TypeName}">
            <div class="col-md-10 no-padding">
                <input ng-disabled="disabled || isUploading"  ng-controller="UploadCtrl" type="file" class="form-control" name="uploadFile" url="url" nv-file-select uploader="formUploader" ng-requred="true" />
                <validtip for="uploadFile" class="vp-validtip"></validtip>
                <span ng-show="formUploaderValidtip == true" style="position: absolute; border: 1px solid #d68273; color: #d68273; box-shadow: 0 1px 3px #ccc; border-radius: 2px; z-index: 1; padding: 4px 6px; background: #fffcef; margin-left: 480px;">W-9 Form file is required.
                </span>
            </div>
            <div class="col-md-2 no-padding-right">
                <a class="btn btn-grey btn-sm" ng-disabled="disabled || isUploading" href="#" ng-click="uploadFormFile()">
                <i class="ace-icon icon-spinner icon-spin white" ng-show="isUploading"></i>
                    <i class="icon-upload-alt" ng-hide="isUploading"></i>
                    Upload Now
                </a>
            </div>
        </div>

        <div class="col-xs-12 no-padding" >
            <div class="col-xs-12 alert alert-block alert-info"
                ng-show="data && data.length>0"
                style="margin: 5px 0 5px 0">
                <div class="col-xs-12 no-padding" ng-repeat="item in data"
                    style="border-bottom: 1px dotted #B2E0F5;">
                    <div class="col-md-8 col-sm-9 no-padding">
                        <label style="margin-right: 15px;">{{$index+1}}.</label>
                        <i class="icon-ok green bigger-140">&nbsp;</i>
                        <a class="underline bigger-110" target="_blank" href="{{ item.DownloadUrl }}">
                            {{ item.FileName }}
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-3 text-right" style="padding-top: 5px !important">
                        <a class="grey" href="#" ng-hide="disabled" title="Remove" ng-click="remove($index)">
                            <i class="icon-trash red bigger-140"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    '
    replaceToTypeTemplate = contentTemplate.replace(/[{]TypeName[}]/g,attrs.type)
    newTemplate = $(replaceToTypeTemplate).appendTo(element)

    $scope.maxSize = 10 if !$scope.maxSize
    $scope.uploadurl =common.apiURL.upload+ "?filename=1.txt&filetype=batch&format=json"
    $scope.uploadFile={}
    $scope.uploadHeader= ''
    $scope.fileFilter =[{
        name: 'customFilter',
        fn: (item, options)->
          messager.clear()
          extensionName = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase()
          if extensionName.length > 20
             extensionName = extensionName.substring(0, 19)
          if $scope.data.length >= $scope.maxCount
            messager.warning("The maximum upload file number is " + $scope.maxCount+".")
            return false
          if $scope.filenamePattern && $scope.filenamePattern.test(item.name)==false
            messager.warning($scope.filenamePatternTip)
            return false
          if $scope.rejects && (extensionName in $scope.rejects)
            messager.warning("An upload file can't be an extension \""+$scope.rejects.join()+"\", please select a valid upload file.")
            return false
          if $scope.data.length > 0 && attrs.sameName
            filterSameNameList = $filter("filter")($scope.data,(i) -> i.FileName.toLowerCase() == item.name.toLowerCase());
            if(filterSameNameList&&filterSameNameList.length > 0)
               messager.warning("Upload file name cannot be the same.")
               clearUploadfileInput()
               return false
          return true
    },{
        name: 'fileSizeFilter',
        fn: (item, options)->
          valid = false
          if item.size <= $scope.maxSize*1024*1024
            valid=true
          if(valid==false)
            messager.clear()
            messager.warning("The maximum allowed file size is "+$scope.maxSize+"MB.")
          if item.size == 0
            valid=false
            messager.clear()
            messager.warning("The file size must be greater than 0.")
            clearUploadfileInput()
          return valid
    }]

    clearUploadfileInput = () ->
        findElement = $("#fileInput_"+attrs.type)
        return if !findElement || findElement.length == 0
        btnFileInputRemove = findElement.find(".remove")[0]
        btnFileInputRemove.click()

    formUploader=$scope.formUploader=new FileUploader({
        scope: $scope
        url: $scope.uploadurl
        headers:$scope.uploadHeader
        filters:$scope.fileFilter
    })

    formUploader.onAfterAddingFile = (fileItem)->
        $scope.formUploaderValidtip = $scope.formUploader.queue.length==0 ? true : false
        $scope.isUploading = false

    formUploader.onWhenAddingFileFailed = (fileItem, filter, options)->
        formUploader.removeFromQueue(fileItem)
        $scope.isUploading = false

    formUploader.onSuccessItem = (fileItem, response, status, headers) ->
        if response and response.Succeeded
          extensionName = fileItem.file.name.slice(fileItem.file.name.lastIndexOf('.')).toLowerCase()
          if extensionName.length > 20
             extensionName = extensionName.substring(0, 19)
          $scope.data.push({
            AttachmentType : $scope.attachmentType,
            FileType : extensionName,
            FileName : fileItem.file.name,
            DestFileName : response.File.FileName,
            DFISFileName : response.File.DFISFileName,
            DownloadUrl : response.File.DownloadUrl,
            UploadDate : moment().format('YYYY-MM-DD HH:mm:ss')
          })
        else
          messager.error("Upload file failed.")
        clearUploadfileInput()
        $scope.isUploading = false

    formUploader.onErrorItem = (fileItem, response, status, headers) ->
        messager.error('Upload file failed.')

    getFileName =(name)->
      strs = name.split('.')
      strs.splice(strs.length-2,1,strs[strs.length-2]+'_'+(new Date()).getTime())
      return strs.join('.')

    $scope.isUploading = false
    $scope.uploadFormFile = ->
      messager.clear()
      if (!$scope.fileType)
        $scope.fileType="VendorAttachment"
      if (!$scope.group)
        $scope.group="POFile"
      if formUploader.queue.length == 0
         messager.warning('Please choose a file to upload.')
         return
      $scope.isUploading = true
      formFileItem = formUploader.queue[formUploader.queue.length-1]
      if attrs.addfilenamesuffix != undefined
        formatName = encodeURIComponent(formFileItem.file.name)
        url = common.formatString("{0}?filename={1}&AddFileNameSuffix=true&format=json&type={2}&group={3}",[common.apiURL.commonUpload,formatName,$scope.fileType,$scope.group])
      else
        formatName = getFileName(encodeURIComponent(formFileItem.file.name))
        url = common.formatString("{0}?filename={1}&SuppressSuffix=true&format=json&type={2}&group={3}",[common.apiURL.commonUpload,formatName,$scope.fileType,$scope.group])

      formFileItem.url = url
      formFileItem.upload()
      $scope.changed = true

    $scope.remove = (index) ->
        $scope.data.splice(index, 1)
        $scope.changed = true

    $compile(newTemplate)($scope)
])
