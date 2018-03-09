angular.module('vp-vendor-application',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/vendor-application",
      templateUrl: "/modules/vendorportal/app/register/vendor-application.tpl.html"
      controller: 'VendorApplicationCtrl'
])
.config(["$locationProvider", ($locationProvider) ->
    $locationProvider.html5Mode(true)
])
.filter "percentage", ["$filter",($filter) ->
    (amount, currencySymbol) ->
      if(!amount)
        return ''
      amount.toString() + '%';
]
.controller('VendorApplicationCtrl',
["$scope","$http","$sce","$parse","$location","$q","$filter","messager","common","contractAPI","registration","vendorMgrAPI","stockingPOAPI","applicationFormAPI","$timeout","zipCodeAPI","$compile"
 ($scope,$http,$sce,$parse,$location,$q,$filter,messager,common,contractAPI,registration,vendorMgrAPI,stockingPOAPI,applicationFormAPI,$timeout,zipCodeAPI,$compile) ->

    common.clearIECache()

    #初始化
    $scope.initUploadFile = ->
        $scope.fileList = {
            W9Form : []
            Void : []
            Bank : []
            Year : []
            DB : []
            Terms: []
        }

    $scope.initUploadFile()

    $scope.entity = {
         CompanyInformation : {
            MailingAddress : {}
            CompanyPhysicalAddress : {}
         }
         BusinessTerms : {}
         StandardLegalTerms : {}
         SupportingDocument : {
            AttachmentList : []
         }
         ContactInformation : [
            {
                Address : {}
                Contact : { Department: "3" }
            }
            {
                Address : {}
                Contact : { Department: "9" }
            }
            {
                Address : {}
                Contact : { Department: "4" }
            }
            {
                Address : {}
                Contact : { Department: "5" }
            }
         ]
    }

    #### check & init data
    $scope.currentDate=new Date()
    $scope.invitationID = $location.search().InvitationID

    if(!$scope.invitationID)
      messager.error('You need to provide effective invitation id.')
      return

    registration.initData(->
      $scope.poData = registration.poData
      $scope.config = registration.config
      $scope.invitationCheck()
    )

    $scope.invitationCheck=->
        request={
            action1: "invitation"
            ID:$scope.invitationID
        }
        vendorMgrAPI.inviteCheck request
            ,(response)->
                if(response&&response.Succeeded)
                    if(!response.InvitationList || response.InvitationList.length == 0)
                      $scope.errorMsg = "You need to provide effective invitation id."
                      $scope.showErrorMsg = true
                    else
                      if(response.InvitationList[0].Status == "Discarded")
                        $scope.errorMsg = "The invitation has expired, please contact Newegg for a new invitation."
                        $scope.showErrorMsg = true
                      else if(response.InvitationList[0].Status == "Used")
                        $scope.errorMsg = "The invitation has been used, please contact Newegg for assistance."
                        $scope.showErrorMsg = true
                      else if(response.InvitationList[0].Status == "Unused")
                        $scope.showAgreement = true
                        $scope.initFormData()
                      else
                        $scope.errorMsg = "You need to provide effective invitation id."
                        $scope.showErrorMsg = true
                else
                    $scope.errorMsg = "You need to provide effective invitation id."
                    $scope.showErrorMsg = true

    $scope.initFormData =->
        request={
            OriginalRequestID: $scope.invitationID
        }
        applicationFormAPI.get request
            ,(response)->
                if(response&&response.Succeeded)
                    if(!response.VendorApplicationForm || !response.VendorApplicationForm.VendorName)
                      messager.error "You need to provide effective invitation id."
                      $scope.showErrorMsg = true
                    else
                      resolveResponseData(response)
                      $scope.loadStandardLegalTerms()
                      if $scope.registerType == 'manual'
                        angular.element(document.getElementById('step1Territory')).append($compile($("#TerrioyTemplate").html())($scope))
                        $scope.currentStep = null
                        $scope.currentStep = 1
                        $scope.$apply()
                      else
                        angular.element(document.getElementById('step3Territory')).append($compile($("#TerrioyTemplate").html())($scope))
                        $scope.$apply()
                      $scope.showFront = true
                else
                    messager.error "You need to provide effective invitation id."
                    $scope.showErrorMsg = true

    $scope.isLoaded = false
    $scope.lastCountry = ''
    $scope.noBankCountryList = ['USA','CAN']
    getContactInfo = (depCode,data) ->
       filterItems = $filter('filter')(data, (i) -> return i.Contact && i.Contact.Department == depCode)
       if filterItems && filterItems.length > 0
          return filterItems[0]
       return { Address : {} ,  Contact : { Department: depCode }}
    resolveResponseData = (response) ->
        $scope.basicRequestItem = angular.copy(response.VendorApplicationForm)
        delete $scope.basicRequestItem.ApplicationForm
        delete response.VendorApplicationForm.ApplicationForm.ContactInformation if response.VendorApplicationForm.ApplicationForm.ContactInformation && response.VendorApplicationForm.ApplicationForm.ContactInformation.length == 0
        if response.VendorApplicationForm.ApplicationForm.ContactInformation && response.VendorApplicationForm.ApplicationForm.ContactInformation.length > 0
           tempArr = []
           tempArr.push(getContactInfo('3',response.VendorApplicationForm.ApplicationForm.ContactInformation))
           tempArr.push(getContactInfo('9',response.VendorApplicationForm.ApplicationForm.ContactInformation))
           tempArr.push(getContactInfo('4',response.VendorApplicationForm.ApplicationForm.ContactInformation))
           tempArr.push(getContactInfo('5',response.VendorApplicationForm.ApplicationForm.ContactInformation))
           response.VendorApplicationForm.ApplicationForm.ContactInformation = tempArr
        $scope.entity = $.extend($scope.entity,response.VendorApplicationForm.ApplicationForm)
        deleteEDIAttachmentFile()
        loadAttachmentList($scope.entity.SupportingDocument)
        $scope.entity.StandardLegalTerms.Date = moment().format('YYYY-MM-DD')
        if $scope.entity.SupportingDocument.BankInformation && $scope.entity.SupportingDocument.BankInformation.ValidFrom
           $scope.entity.SupportingDocument.BankInformation.ValidFrom = moment($scope.entity.SupportingDocument.BankInformation.ValidFrom).format('YYYY-MM-DD')
        if $scope.entity.ContractType && ($scope.entity.ContractType.toLowerCase() == 'online' || $scope.entity.ContractType.toLowerCase() == 'manual' )
           $scope.registerType = $scope.entity.ContractType.toLowerCase()
        else if  !$scope.entity.ContractType
           $scope.registerType = 'manual'
        else
           messager.error('Contract Type is invaild, please contact your administrator. --> ContractType = '+ $scope.entity.ContractType)
           $scope.showContiune = false
           return
        if $scope.registerType == 'manual' && response.VendorApplicationForm.ApplicationForm.AgreementDetail && response.VendorApplicationForm.ApplicationForm.AgreementDetail.AgreementFor
          $scope.entity.StandardLegalTerms.Territory = angular.copy(response.VendorApplicationForm.ApplicationForm.AgreementDetail.AgreementFor)
        $scope.haveBankInfo = if ($scope.entity.CompanyInformation.MailingAddress.Country == 'USA' || $scope.entity.CompanyInformation.MailingAddress.Country == 'CAN') then false else true
        $scope.lastCountry = angular.copy($scope.entity.CompanyInformation.MailingAddress.Country)
      #  $scope.entity.CompanyInformation.MailingAddress.ZipPostalCode = ''
        $scope.$watch "entity.CompanyInformation.MailingAddress.Country", (newVal, oldVal) ->
           if $scope.isLoaded == false
              $scope.isLoaded = true
              return
           if $scope.noBankCountryList.indexOf(newVal) >= 0
              $scope.haveBankInfo = false
           else
              $scope.haveBankInfo = true
           if newVal == $scope.lastCountry
              $scope.lastCountry = newVal
              return
           if $scope.noBankCountryList.indexOf($scope.lastCountry) >= 0 && $scope.noBankCountryList.indexOf(newVal) >= 0
              $scope.lastCountry = newVal
              return
           if $scope.noBankCountryList.indexOf($scope.lastCountry) < 0 && $scope.noBankCountryList.indexOf(newVal) < 0
              $scope.lastCountry = newVal
              return
           $scope.lastCountry = newVal
           $scope.initUploadFile()



     deleteEDIAttachmentFile = ->
        return if !$scope.entity.SupportingDocument || !$scope.entity.SupportingDocument.AttachmentList || $scope.entity.SupportingDocument.AttachmentList.length == 0
        tempList = []
        for file in $scope.entity.SupportingDocument.AttachmentList
            if file.AttachmentType != $scope.config.UploadFile.attachmentType_standard && file.AttachmentType != $scope.config.UploadFile.attachmentType_terms
               tempList.push(angular.copy(file))
        delete $scope.entity.SupportingDocument.AttachmentList
        $scope.entity.SupportingDocument.AttachmentList = tempList

    loadAttachmentList = (supportingDocument) ->
        return if !supportingDocument || !supportingDocument.AttachmentList || supportingDocument.AttachmentList.length == 0
        fileList = supportingDocument.AttachmentList
        $scope.fileList.W9Form = getFileList($scope.config.UploadFile.attachmentType_w9,fileList)
        $scope.fileList.Bank = getFileList($scope.config.UploadFile.attachmentType_bank,fileList)
        $scope.fileList.Void = getFileList($scope.config.UploadFile.attachmentType_void,fileList)
        $scope.fileList.Year = getFileList($scope.config.UploadFile.attachmentType_2year,fileList)
        $scope.fileList.DB = getFileList($scope.config.UploadFile.attachmentType_db,fileList)

    getFileList = (attType,fileList) ->
        items = $filter('filter')(fileList,(f) -> return f.AttachmentType == attType)
        return items

    ######################## 选择&上/下翻页 ######################

    $scope.isCompleted = false
    $scope.currentStep = 1

    $scope.stepInfo = {
        step1: false
        step2: false
        step3: false
        step4: false
        step5: false
    }

    formCheck = (step) ->
       currentFormName = "stepForm_" + step
       currentFormBottonName = "btnStep_" + step
       if(step !=4 && $scope[currentFormName].$valid == false)
          $("#"+currentFormBottonName+"").click()
          return false
       if step == 1
          if $scope.entity.CompanyInformation.MailingAddress.Address1.length > 60
             messager.warning('[Mailing Address] - Address 1 maximum length is 60.')
             return false
          if $scope.entity.CompanyInformation.MailingAddress.Address2 && $scope.entity.CompanyInformation.MailingAddress.Address2.length > 40
             messager.warning('[Mailing Address] - Address 2 maximum length is 40.')
             return false
          if $scope.entity.CompanyInformation.MailingAddress.City.length > 20
             messager.warning('[Mailing Address] - City maximum length is 20.')
             return false
          if $scope.registerType == 'manual' && !$scope.entity.StandardLegalTerms.Territory
             messager.warning('You must select territory.')
             return false
       if step == 3 && !$scope.entity.StandardLegalTerms.Territory
          messager.warning('You must select territory.')
          return false
       if step == 3 && !$scope.haveReadTerms_3
          messager.warning('You must agree to and check the above terms.')
          return false
       if step == 4 && !$scope.haveBankInfo
          if $scope.fileList.W9Form.length == 0 || $scope.fileList.Void.length == 0 || $scope.fileList.Bank.length == 0
            messager.warning('You must upload the specified file.')
            return false
       if step == 4 && $scope.haveBankInfo
          if $scope.fileList.Bank.length == 0
            messager.warning('You must upload the [Bank Reference Letter] file.')
            return false
          if new Date($scope.entity.SupportingDocument.BankInformation.ValidFrom).toString() == 'Invalid Date'
            messager.warning('Valid From is invalid date.')
            return false
          if ($scope[currentFormName].$valid == false)
            $("#"+currentFormBottonName+"").click()
            return false
       if step == 2 && !$scope.haveReadTerms
          messager.warning('You must agree to and check the above terms.')
          return false
       return true

    $scope.bankCheck = ->
       if !$scope.haveBankInfo
          if $scope.fileList.W9Form.length == 0 || $scope.fileList.Void.length == 0 || $scope.fileList.Bank.length == 0
            messager.warning('You must upload the specified file.')
            $scope.currentStep = 4
            return false
       if $scope.haveBankInfo
          if $scope.fileList.Bank.length == 0
            messager.warning('You must upload the [Bank Reference Letter] file.')
            $scope.currentStep = 4
            return false
          if !$scope.entity.SupportingDocument.BankInformation || !$scope.entity.SupportingDocument.BankInformation.ValidFrom || ($scope.entity.SupportingDocument.BankInformation.ValidFrom && new Date($scope.entity.SupportingDocument.BankInformation.ValidFrom).toString() == 'Invalid Date')
            messager.warning('Valid From is invalid date.')
            $scope.currentStep = 4
            return false
          if ($scope['stepForm_4'].$valid == false)
            messager.warning('Some fields are invalid, or some required fields are not filled in at [Support Document] step.' )
            $scope.currentStep = 4
            return false
       if ($scope['stepForm_1'].$valid == false)
            messager.warning('Some fields are invalid, or some required fields are not filled in at [Company Information] step.' )
            $scope.currentStep = 1
            return false
       if ($scope['stepForm_3'].$valid == false && $scope.registerType != 'manual')
            messager.warning('Some fields are invalid, or some required fields are not filled in at [Standard Legal Terms] step.' )
            $scope.currentStep = 3
            return false
       return true

    $scope.previous = ->
       messager.clear()
       if($scope.currentStep <= 1)
         return
       if $scope.registerType == 'manual' && $scope.currentStep == 4
          $scope.currentStep = 2
       $scope.currentStep--
       $scope.save()

    $scope.next = ->
       messager.clear()
       if($scope.currentStep >= 5)
          return
       if formCheck($scope.currentStep) == false
          return
       $scope.checkZipcode(()->
           $scope.stepInfo["step"+$scope.currentStep] = true
           if $scope.registerType == 'manual' && $scope.currentStep == 1
              $scope.currentStep = 3
           $scope.currentStep++
           $scope.save()
       )
       

    $scope.change = (step) ->
       messager.clear()
       if step <= $scope.currentStep
          $scope.currentStep = step
          return
       if($scope.registerType != 'manual' && step!=1 && $scope.stepInfo["step"+step] == false && $scope.stepInfo["step"+(step-1)] ==false)
          messager.warning('Can only choose have completed the module area, please register by next button to complete the wizard.')
          return
       if($scope.registerType == 'manual' && step==4 && $scope.stepInfo["step"+step] == false && $scope.stepInfo["step1"] ==false)
          messager.warning('Can only choose have completed the module area, please register by next button to complete the wizard.')
          return
       if($scope.registerType == 'manual' && step==5 && $scope.stepInfo["step"+step] == false && $scope.stepInfo["step4"] ==false)
          messager.warning('Can only choose have completed the module area, please register by next button to complete the wizard.')
          return
       # Form check
#       if formCheck($scope.currentStep) == false
#          messager.warning('Some fields are invalid, or some required fields are not filled in at step ' +i+'.' )
#          return
       $scope.checkZipcode(()->
        $scope.currentStep = step
       )

    ############################ Same As Mailing Address #########################
    sameAddressConfig = []

    setAddressConfig = (isSame,type) ->
        $scope.isSameTrigger = false
        if isSame
           $scope.isSameTrigger = true
           sameAddressConfig.push(type)
           $parse("entity." + type+'.Country').assign($scope,angular.copy($scope.entity.CompanyInformation.MailingAddress.Country))
           $parse("entity." + type+'.Address1').assign($scope,angular.copy($scope.entity.CompanyInformation.MailingAddress.Address1))
           $parse("entity." + type+'.Address2').assign($scope,angular.copy($scope.entity.CompanyInformation.MailingAddress.Address2))
           $scope.$apply()
           $scope.isSameTrigger = false
        else
           index = sameAddressConfig.indexOf(type)
           sameAddressConfig.splice(index, 1) if index >= 0

    setAddress = (fieldName,newVal) ->
        if fieldName == 'Country' then $scope.isMailingCountryTrigger = true else $scope.isMailingCountryTrigger = false
        for item in sameAddressConfig
            bindingName = "entity." + item + "." + fieldName
            $parse(bindingName).assign($scope,newVal)
        $scope.$apply()
        $scope.isMailingCountryTrigger = false

    # $scope.$watch "entity.CompanyInformation.CompanyPhysicalAddress.Country", (newVal, oldVal) ->
    #   if !$scope.isMailingCountryTrigger
    #     $scope.sameMailingAddress_CompanyPhysicalAddress = false
    # $scope.$watch "entity.ContactInformation[0].Address.Country", (newVal, oldVal) ->
    #   if !$scope.isMailingCountryTrigger
    #     $scope.sameMailingAddress_Sales = false
    # $scope.$watch "entity.ContactInformation[1].Address.Country", (newVal, oldVal) ->
    #   if !$scope.isMailingCountryTrigger
    #     $scope.sameMailingAddress_PM = false
    # $scope.$watch "entity.ContactInformation[2].Address.Country", (newVal, oldVal) ->
    #   if !$scope.isMailingCountryTrigger
    #     $scope.sameMailingAddress_Accounting = false
    # $scope.$watch "entity.ContactInformation[3].Address.Country", (newVal, oldVal) ->
    #   if !$scope.isMailingCountryTrigger
    #     $scope.sameMailingAddress_RMA = false

    $scope.initWatcher = ->
        $scope.$watch "sameMailingAddress_CompanyPhysicalAddress", (newVal, oldVal) -> setAddressConfig(newVal,'CompanyInformation.CompanyPhysicalAddress')
        $scope.$watch "sameMailingAddress_Sales", (newVal, oldVal) -> setAddressConfig(newVal,'ContactInformation[0].Address')
        $scope.$watch "sameMailingAddress_PM", (newVal, oldVal) -> setAddressConfig(newVal,'ContactInformation[1].Address')
        $scope.$watch "sameMailingAddress_Accounting", (newVal, oldVal) -> setAddressConfig(newVal,'ContactInformation[2].Address')
        $scope.$watch "sameMailingAddress_RMA", (newVal, oldVal) -> setAddressConfig(newVal,'ContactInformation[3].Address')
      #  for addressField in ['Address1','Address2','City','StateProvince','ZipPostalCode','Country']
           # $scope.$watch "entity.CompanyInformation.MailingAddress."+ addressField, (newVal, oldVal) -> tempAction(newVal)
        $scope.$watch "entity.CompanyInformation.MailingAddress.Address1", (newVal, oldVal) -> setAddress("Address1",newVal)
        $scope.$watch "entity.CompanyInformation.MailingAddress.Address2", (newVal, oldVal) -> setAddress("Address2",newVal)
        $scope.$watch "entity.CompanyInformation.MailingAddress.City", (newVal, oldVal) -> setAddress("City",newVal)
        $scope.$watch "entity.CompanyInformation.MailingAddress.StateProvince", (newVal, oldVal) -> setAddress("StateProvince",newVal)
        $scope.$watch "entity.CompanyInformation.MailingAddress.ZipPostalCode", (newVal, oldVal) -> setAddress("ZipPostalCode",newVal)
        $scope.$watch "entity.CompanyInformation.MailingAddress.Country", (newVal, oldVal) -> setAddress("Country",newVal)

    $scope.initWatcher()
    
    $scope.getVendorTypeString = ->
      return "ESD" if $scope.entity.CompanyInformation.VendorType == '7'
      return "VF" if $scope.entity.CompanyInformation.VendorType == '8'
      return "StockingPO"

    ################  Standard Legal Terms ################
    $scope.termsHtml = ''
    $scope.loadStandardLegalTerms = ->
        return if $scope.registerType != 'online'
        requestItem = {
            #action : "contract"
            vendorType : $scope.getVendorTypeString()
            contractType : "Standard"
        }
        contractAPI.getStandardTerms requestItem
            ,(response)->
               if response && response.Succeeded
                  $scope.entity.StandardLegalTerms.LegalTerms = $sce.trustAsHtml(response.ContractContent);

    ############################ Save / Submit #########################
    $scope.getApplicationForm = ->
      tempEntity = angular.copy($scope.basicRequestItem)
      # Attachment List
      attachmentList = []
      attachmentList.push.apply(attachmentList, $scope.fileList.W9Form)
      attachmentList.push.apply(attachmentList, $scope.fileList.Void)
      attachmentList.push.apply(attachmentList, $scope.fileList.Bank)
      attachmentList.push.apply(attachmentList, $scope.fileList.Year)
      attachmentList.push.apply(attachmentList, $scope.fileList.DB)
      attachmentList.push.apply(attachmentList, $scope.fileList.Terms)
      $scope.entity.SupportingDocument.AttachmentList = attachmentList
      $scope.entity.AgreementDetail = {}
      $scope.entity.AgreementDetail.AgreementFor = angular.copy($scope.entity.StandardLegalTerms.Territory)
      delete $scope.entity.SupportingDocument.BankInformation if $scope.haveBankInfo == false
      tempEntity.ApplicationForm = angular.copy($scope.entity)
      if tempEntity.ApplicationForm.ContactInformation && tempEntity.ApplicationForm.ContactInformation.length>0
        for contract in tempEntity.ApplicationForm.ContactInformation
          if contract.Address
            delete contract.Address.Phone
            delete contract.Address.Email
      return tempEntity

    $scope.errorAddressInfo = null
    $scope.errorAddressInfoIndex = 0
    $scope.checkZipCodeApi = (object) ->
        deferred = $q.defer()
        requestItem = {
            ZipCode : object.ZipPostalCode
            StateCode : object.StateProvince
            Country : object.Country
        }
        zipCodeAPI.getZipCodeList requestItem
            ,(response)->
              if(!response.Succeeded||!response.ZipCodeList||response.ZipCodeList.length == 0)
                 $scope.errorAddressInfo = object
              deferred.resolve "OK"
        deferred.promise       
        
             
    $scope.checkZipcode = (callback) -> 
        $scope.errorAddressInfo = null
        needCheckAddressList = []
        if $scope.currentStep == 1
           if $scope.entity.CompanyInformation.MailingAddress.Country == 'USA' && $scope.entity.CompanyInformation.MailingAddress.StateProvince != '99' && $scope.entity.CompanyInformation.MailingAddress.StateProvince != 'SA'
              needCheckAddressList.push($scope.entity.CompanyInformation.MailingAddress)
           if $scope.entity.CompanyInformation.CompanyPhysicalAddress.Country == 'USA' && $scope.entity.CompanyInformation.CompanyPhysicalAddress.StateProvince != '99' && $scope.entity.CompanyInformation.CompanyPhysicalAddress.StateProvince != 'SA'
              needCheckAddressList.push($scope.entity.CompanyInformation.CompanyPhysicalAddress)
           if needCheckAddressList.length <= 0
              callback()
              return
           $q.all(needCheckAddressList.map($scope.checkZipCodeApi))
             .then ->
               if $scope.errorAddressInfo
                  errorMsg = 'The zipcode is invalid. (country:UNITED STATES, state:'+$scope.errorAddressInfo.StateProvince+', zip code:'+$scope.errorAddressInfo.ZipPostalCode+')'
                  messager.error  errorMsg
               else
                  callback()
        else if $scope.currentStep == 5
          if $scope.entity.ContactInformation[0].Address.Country == 'USA' && $scope.entity.ContactInformation[0].Address.StateProvince != '99' && $scope.entity.ContactInformation[0].Address.StateProvince != 'SA'
            needCheckAddressList.push($scope.entity.ContactInformation[0].Address)
          if $scope.entity.ContactInformation[1].Address.Country == 'USA' && $scope.entity.ContactInformation[1].Address.StateProvince != '99' && $scope.entity.ContactInformation[1].Address.StateProvince != 'SA'
            needCheckAddressList.push($scope.entity.ContactInformation[1].Address)
          if $scope.entity.ContactInformation[2].Address.Country == 'USA' && $scope.entity.ContactInformation[2].Address.StateProvince != '99' && $scope.entity.ContactInformation[2].Address.StateProvince != 'SA'
            needCheckAddressList.push($scope.entity.ContactInformation[2].Address)
          if $scope.entity.ContactInformation[3].Address.Country == 'USA' && $scope.entity.ContactInformation[3].Address.StateProvince != '99' && $scope.entity.ContactInformation[3].Address.StateProvince != 'SA'
            needCheckAddressList.push($scope.entity.ContactInformation[3].Address)
          if needCheckAddressList.length <= 0
            callback()
            return
          $q.all(needCheckAddressList.map($scope.checkZipCodeApi))
            .then ->
              if $scope.errorAddressInfo
                errorMsg = 'The zipcode is invalid. (country:UNITED STATES, state:'+$scope.errorAddressInfo.StateProvince+', zip code:'+$scope.errorAddressInfo.ZipPostalCode+')'
                messager.error  errorMsg
              else
                callback()
        else
           callback()
                       
    $scope.save = ->
      deferred = $q.defer()
      requestItem = $scope.getApplicationForm()
      applicationFormAPI.save requestItem
            ,(response)->
                if(response&&response.Succeeded)
                   deferred.resolve "OK"
                else
                   errorMsg = "Submit failed with server errors, please try again or contact Newegg support team (<a href='mailto:vendortechsupport@newegg.com' style='color:#fff;text-decoration: underline;'>vendortechsupport@newegg.com</a>)."
                   messager.error  errorMsg
                   deferred.reject errorMsg
                   $scope.isCompleted = false
            ,(error)->
                $scope.isCompleted = false
      deferred.promise

    $scope.addVendorApplicationFormFile = ->
      deferred = $q.defer()
      requestItem = {
             action1 : 'export'
             OriginalRequestID : $scope.invitationID
      }
      stockingPOAPI.export requestItem
        ,(response)->
            if(response&&response.Succeeded)
                $scope.fileList.Terms.push({
                    AttachmentType : $scope.config.UploadFile.attachmentType_terms,
                    FileType :".pdf",
                    FileName : response.DisplayName,
                    DestFileName : response.Filename,
                    DownloadUrl : response.DFISDownloadUrl,
                    UploadDate : moment().format('YYYY-MM-DD HH:mm:ss')
                })
                deferred.resolve "OK"
            else
                errorMsg = "Submit failed with server errors, please try again or contact Newegg support team (<a href='mailto:vendortechsupport@newegg.com' style='color:#fff;text-decoration: underline;'>vendortechsupport@newegg.com</a>)."
                messager.error  errorMsg
                deferred.reject errorMsg
                $scope.isCompleted = false
        ,(error)->
            $scope.isCompleted = false
      deferred.promise

    $scope.addStandardTermsFile = ->
      deferred = $q.defer()
      if $scope.registerType == 'manual'
         deferred.resolve "OK"
      else
          requestItem = {
              #action : 'contract'
              action1 : 'export'
              VendorType : $scope.getVendorTypeString()
              ContractType : 'Standard'
              DataVariables : [
                {
                    Name:"#VENDOR_NAME_INITIAL#"
                    Value: $scope.entity.CompanyInformation.CompanyName.substr(0, 1).toUpperCase()
                }
                {
                    Name:"#VENDOR_NAME_WO_INITIAL#"
                    Value: $scope.entity.CompanyInformation.CompanyName.substr(1, ($scope.entity.CompanyInformation.CompanyName.length-1)).toUpperCase()
                }
                {
                    Name:"#VENDOR_SIGNED_BY#"
                    Value: $scope.entity.StandardLegalTerms.SignBy
                }
                {
                    Name:"#VENDOR_PRINTED_NAME#"
                    Value: $scope.entity.StandardLegalTerms.PrintedName
                }
                {
                    Name:"#VENDOR_TITLE#"
                    Value: $scope.entity.StandardLegalTerms.Title
                }
                {
                    Name:"#SIGNING_DATE#"
                    Value: $scope.entity.StandardLegalTerms.Date
                }
                {
                    Name:"#PAY_TERM_DAYS#"
                    Value: if $scope.entity.BusinessTerms.PayTermDays then $scope.entity.BusinessTerms.PayTermDays else 'N/A'
                }
                {
                    Name:"#CONSIGNMENT_PAYMENT_TERM#"
                    Value: if $scope.entity.BusinessTerms.ConsignmentPayTermDays then $scope.entity.BusinessTerms.ConsignmentPayTermDays else 'N/A'
                }
                {
                    Name:"#RMA_TERMS#"
                    Value: if $scope.entity.BusinessTerms.RMATerms then $scope.entity.BusinessTerms.RMATerms else 'N/A'
                }
                {
                    Name:"#MINIMUM_MARGIN#"
                    Value:  if  $scope.entity.BusinessTerms.MinGuaranteedMargin  != undefined then $scope.entity.BusinessTerms.MinGuaranteedMargin + "%" else 'N/A'
                }
                {
                    Name:"#STOCK_TERMS#"
                    Value: if $scope.entity.BusinessTerms.SRTerms != undefined then $scope.entity.BusinessTerms.SRTerms + " Days" else 'N/A'
                }
                {
                    Name:"#PRICE_TERMS#"
                    Value: if $scope.entity.BusinessTerms.PPTerms  != undefined then $scope.entity.BusinessTerms.PPTerms + " Days" else 'N/A'
                }
                {
                    Name:"#FREIGHT_CHARGES#"
                    Value: if $scope.entity.BusinessTerms.FreightChartToNewegg  != undefined then $scope.entity.BusinessTerms.FreightChartToNewegg else 'N/A'
                }
                {
                    Name:"#TERRITORY#"
                    Value: $scope.agreeForDesc
                }
              ]
          }
          contractAPI.exportStandardTerms requestItem
            ,(response)->
                if(response&&response.Succeeded)
                    $scope.fileList.Terms.push({
                        AttachmentType : $scope.config.UploadFile.attachmentType_standard,
                        FileType :".pdf",
                        FileName : response.DisplayName,
                        DestFileName : response.Filename,
                        DownloadUrl : response.DFISDownloadUrl,
                        UploadDate : moment().format('YYYY-MM-DD HH:mm:ss')
                    })
                    deferred.resolve "OK"
                else
                    errorMsg = "Submit failed with server errors, please try again or contact Newegg support team (<a href='mailto:vendortechsupport@newegg.com' style='color:#fff;text-decoration: underline;'>vendortechsupport@newegg.com</a>)."
                    messager.error  errorMsg
                    deferred.reject errorMsg
                    $scope.isCompleted = false
            ,(error)->
                $scope.isCompleted = false
      deferred.promise

    $scope.invitationSubmitCheck=->
        deferred = $q.defer()
        request={
            action1: "invitation"
            ID:$scope.invitationID
        }
        vendorMgrAPI.inviteCheck request
            ,(response)->
                if(response&&response.Succeeded)
                    if(!response.InvitationList || response.InvitationList.length == 0)
                      messager.error  "You need to provide effective invitation id."
                      deferred.reject "error"
                    else
                      if(response.InvitationList[0].Status == "Discarded")
                        messager.error  "The invitation has expired, please contact Newegg for a new invitation."
                        deferred.reject "error"
                      else if(response.InvitationList[0].Status == "Used")
                        messager.error  "The invitation has been used, please contact Newegg for assistance."
                        deferred.reject "error"
                      else if(response.InvitationList[0].Status == "Unused")
                        deferred.resolve "OK"
                      else
                        messager.error  "You need to provide effective invitation id."
                        deferred.reject "error"
        deferred.promise

    $scope.submit = ->
      if formCheck($scope.currentStep) == false
         return
      if $scope.bankCheck() == false
         return
      $scope.checkZipcode(()->
        common.confirmBox 'The application form information will be submitted for approval, and it cannot be modified, do you want to continue?',"", ->
          $scope.isCompleted = true
          $q.all([
            $scope.invitationSubmitCheck()
          ])
          .then ->
            $scope.save()
          .then ->
            $timeout (->$scope.addVendorApplicationFormFile()), 1200
          .then ->
            $scope.addStandardTermsFile()
          .then ->
            requestItem = $scope.getApplicationForm()
            requestItem.action1 = 'submit'
            #if $scope.registerType=='manual'
                #delete requestItem.ApplicationForm.StandardLegalTerms
            applicationFormAPI.submit requestItem
            ,(response)->
              if(response&&response.Succeeded)
                messager.success('Registration successfully, please wait for approval.')
                #$scope.isCompleted = true
                $scope.stepInfo["step"+$scope.currentStep] = true
              else
                errorMsg = "Submit failed with server errors, please try again or contact Newegg support team (<a href='mailto:vendortechsupport@newegg.com' style='color:#fff;text-decoration: underline;'>vendortechsupport@newegg.com</a>)."
                messager.error  errorMsg
                $scope.isCompleted = false
            ,(error)->
                $scope.isCompleted = false
      )
])
