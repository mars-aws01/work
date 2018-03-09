angular.module('vp-vendor-registration',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/vendor-registration",
      templateUrl: "/modules/vendorportal/app/register/vendor-registration.tpl.html"
      controller: 'VendorRegistrationCtrl'
])
.config(["$locationProvider", ($locationProvider) ->
    $locationProvider.html5Mode(true)
])

.controller('VendorRegistrationCtrl',
["$scope","$window","$location","messager","common","FileUploader","$filter","uuid","accountAPI","userAPI","vendorMgrAPI","$q","zipCodeAPI"
 ($scope,$window,$location,messager,common,FileUploader,$filter,uuid,accountAPI,userAPI,vendorMgrAPI,$q,zipCodeAPI) ->

    $scope.showErrorMsg = false
    $scope.showAgreement = false
    $scope.showUserRegistration = false
    $scope.showRegistration = false
    $scope.groundValidtip = false
    $scope.nextDayValidtip = false
    $scope.formUploaderValidtip = false
    $scope.bankUploaderValidtip = false
    $scope.voidCheckUploaderValidtip = false
    $scope.isSubmitProcessing = false
    $scope.password = ''
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
                      else
                        $scope.errorMsg = "You need to provide effective invitation id."
                        $scope.showErrorMsg = true
                else
                    $scope.errorMsg = "You need to provide effective invitation id."
                    $scope.showErrorMsg = true


    $scope.invitationID = $location.search().InvitationID
    if(!$scope.invitationID)
        $scope.errorMsg = "You need to provide effective invitation id."
        $scope.showErrorMsg = true
        return
    else
        $scope.invitationCheck()

    $scope.nowYear = new Date().getFullYear()
    $scope.currentUser = {}
    $scope.createArray = (length) ->
      tempArray = []
      for index of length
        tempArray.push({})
      return tempArray

    ######################## 协议页 ######################
    $scope.termsDisagree=->
      $window.location.href='/login'

    $scope.termsAgree=->
      $scope.showAgreement = false
      #$scope.showRegistration = true
      $scope.showUserRegistration = true

    ########################User 注册/登陆页 ######################
    $scope.tab1={}
    $scope.tab2={}
    $scope.creationErrorMsg=''
    $scope.loginErrorMsg=''
    $scope.imgObject = { CaptchaImageUrl : '' }
    $scope.creationEntity = { create_email1:'',create_email2:'',create_pwd1:'',create_pwd2:''}
    $scope.loginEntity = { login_email1:'',login_pwd1:''}

    $scope.toNext = ->
      $scope.showAgreement = false
      $scope.showUserRegistration = false
      $scope.showRegistration = true

    #login newegg account
    $scope.loginNeweggAccount = ->
      messager.clear()
      loginRequest = {
        action1: 'customer-login'
        LoginName: $scope.loginEntity.login_email1
        Password: $scope.loginEntity.login_pwd1
        ValidatorCode: $scope.loginEntity.validCode
        ValidatorToken: $scope.ValidateToken
        ValidatorTransationNumber: $scope.ValidateTransNo
      }
      userAPI.login loginRequest
        ,(response) ->
          if(response && response.Code == '000')
            $scope.currentUser.CustomerNumber = response.Body.Customer.CustomerNumber
            $scope.currentUser.LoginName = response.Body.Customer.LoginName
            $scope.currentUser.InvitationID = $scope.invitationID
            $scope.toNext()
          else
            $scope.loginErrorMsg='Login failed, please confirm and re-enter.'
            $scope.getLoginToken()
        ,(error)->
            $scope.loginErrorMsg='Internal has occur exception,Please retry after a minute or contact support team.'
            $scope.getLoginToken()

    #create newegg account
    $scope.registerCustomer =->
        if($scope.creationEntity.create_email1==undefined||$scope.creationEntity.create_email2==undefined||$scope.creationEntity.create_pwd1==undefined||$scope.creationEntity.create_pwd2==undefined)
            $scope.creationErrorMsg='Email or Password is required and can not be whitespace.'
            return
        if($scope.creationEntity.create_email1!=$scope.creationEntity.create_email2)
            $scope.creationErrorMsg='Confirm Email Address is not equal to Email Address.'
            return
        $scope.creationEntity.create_pwd1 = angular.copy($scope.password)
        if($scope.creationEntity.create_pwd1!=$scope.creationEntity.create_pwd2)
            $scope.creationErrorMsg='Confirm Password is not equal to Password.'
            return
        if($scope.creationEntity.create_pwd1.length<8)
            $scope.creationErrorMsg='Password should be eight (8) to thirty (30) characters long.'
            return
        $scope.creationErrorMsg=''
        #$scope.createCustomer()
        $scope.verifyVendorPortalAccount()

    $scope.verifyVendorPortalAccount = ->
        requestUser = {
            action1: "validation",
            LoginName : $scope.creationEntity.create_email1
        }
        userAPI.validateUser requestUser
            ,(response) ->
                if(response&&response.IsExisting ==false)
                    $scope.currentUser.LoginName = $scope.creationEntity.create_email1
                    $scope.currentUser.InvitationID = $scope.invitationID
                    $scope.currentUser.LoginPassword = $scope.creationEntity.create_pwd1
                    $scope.toNext()
                else
                    $scope.creationErrorMsg='Create Vendor Portal acount failed, the login name is used, please enter other email address.'
            ,(error)->
                $scope.creationErrorMsg='Internal has occur exception,Please retry after a minute or contact support team.'

    $scope.createCustomer =->
        customerNumberRequest={
        'action1':'registration'
        'action2':'customer',
        'LoginName':$scope.creationEntity.create_email1,
        'Password':$scope.creationEntity.create_pwd1,
        'InvitationID':$scope.invitationID,
        'CountryCode':'USA',}
        vendorMgrAPI.register customerNumberRequest
            ,(response)->
                if(response?&&response.Succeeded)
                    $scope.currentUser.CustomerNumber = response.CustomerNumber
                    $scope.currentUser.LoginName = $scope.creationEntity.create_email1
                    $scope.currentUser.InvitationID = $scope.invitationID
                    $scope.toNext()
                else if(response.Errors&&response.Errors.length>0)
                    $scope.creationErrorMsg='Register failed. '+response.Errors[0].Message
                    $scope.getLoginToken()
                else
                    $scope.creationErrorMsg='The interface said that the login was succeeded, but no customer information provided.'
            ,(error)->
                $scope.creationErrorMsg='Internal has occur exception,Please retry after a minute or contact support team.'
                $scope.getLoginToken()

    $scope.getLoginToken = ->
        accountAPI.token { action:"loginvalidator" }
            ,(response) ->
                if(response&&response.Code=='000'&& response.Body)
                    $scope.imgObject.CaptchaImageUrl = response.Body.CaptchaImageUrl
                    $scope.ValidateTransNo = response.Body.ValidateTransNo
                    $scope.ValidateToken = response.Body.ValidateToken
            ,(error) ->
                    # messager.error('Request login validator error.')

    #$scope.getLoginToken()

    ######################## Vendor 注册页 ######################
    $scope.entity = {
         TempInfo: {}
         MainInfo: {}
         RMAInfo: {}
         ACHBankInfo: {}
         VendorInfo : {
            VendorType : "3"
            IsCompanyPartyLawsuit : 1
            VendorAddressList:{
              TotalCount:4
              VendorAddresses:[]
            }
            VendorContactList:{
              TotalCount:4
              VendorContacts:[]
            }
            VendorAttachmentList:{
              TotalCount:4
              VendorAttachments:[]
            }
         }
         ProductInfo : [   # List<Survey> ProductInfo
           { Subject: 'List the primary categories and subcategories which best describe your products' }
           { Subject: 'Give a brief description of the products/services being offered' }
           { Subject: 'Average Product MSRP' }
           { Subject: 'Expected Number of SKUs at Newegg' }
           { Subject: 'Average Product Price to distributor' }
           { Subject: 'Total SKUs Available' }
           { Subject: 'Average Distributor Margin' }
         ]
         GeneralTerms : [   # List<Survey> GeneralTerms
           { Subject: 'Payment Terms' }
           { Subject: 'RMA Terms (From Customer Invoice Date)' }
           { Subject: 'RMA Model' }
           { Subject: 'Credit Day' }
           { Subject: 'Effective On', Response:'Customer Invoice Date' }
         ]
         BusinessOutlook : {
            Subject : 'Expected Revenue & Margin for Newegg'
            SubSurveyList : [
               { Subject: '3 Months Revenue' }
               { Subject: 'Margin' }
               { Subject: '6 Months Revenue' }
               { Subject: 'Margin' }
               { Subject: '9 Months Revenue' }
               { Subject: 'Margin' }
               { Subject: '12 Months Revenue' }
               { Subject: 'Margin' }
            ]
         }
         MarketingInfo : [   # List<Survey> MarketingInfo
           { Subject: 'What is your marketing budget for this year?' }
           { Subject: 'Demand Generation' }
           { Subject: 'Targeted Reseller Market Segment' }
           { Subject: 'Other' }
         ]
         VirtualFulfillmentInfo:{
            ProfileInfo : {
                OptimizedSourcing : true
            }
            SurveyList : [
               { Subject: 'How often are you able to update us on inventory? Are you able to update and report inventory by warehouse level?' }
               { Subject: 'What is the cutoff time to receive a PO for you to be able to ship the order on the same day?' }
               { Subject: 'How many warehouses do you have? Where are your warehouses located? Which states do you have warehouses in that carry a full selection of your products?' }
               { Subject: 'Which states do you have a Nexus in and is registered to collect Sales Tax?' }
               { Subject: 'Which retailers do you currently drop ship for?' }
               { Subject: 'What is Newegg\'s current credit line? Can it be increased due to the extra business drop ship will provide?' }
               { Subject: 'Are there any handling fees? Customer refusal fees? Drop ship fees?' }
               { Subject: 'Can you print out packing slip through Newegg web-forms and include the packing slip in the shipment?' }
               { Subject: 'Can you customize your shipping label to reference Newegg as the shipper?' }
               { Subject: 'Can your system support CSV files to update inventory or print shipping labels?' }
               { Subject: 'Can you upload tracking # and invoice us within 1 business day of receiving a PO?' }
            ]
            WarehouseList : [
                {
                    IsPrimary : true
                    Address : null
                    City : null
                    State : null
                    ZipCode : null
                    CountryCode : "USA"
                }
            ]
            ShipMethodList : [

            ]
         }
    }

    $scope.isCompleted = false
    $scope.currentStep = 1
    $scope.chk_RMA_SameMainAddress = false
    $scope.chk_VendorCompany_SameStoreName = false
    $scope.chk_VendorCompany_SameMainAddress = false

    $scope.goToNewegg=->
      window.location.href ='http://www.newegg.com'

    $scope.stateList = [
      { text:'OTHER', value:'99'  }
      { text:'AA', value:'AA' }
      { text:'AE', value:'AE'  }
      { text:'ALASKA', value:'AK' }
      { text:'ALABAMA', value:'AL'  }
      { text:'AP', value:'AP' }
      { text:'ARKANSAS', value:'AR'  }
      { text:'AMERICAN SAMOA', value:'AS' }
      { text:'ARIZONA', value:'AZ'  }
      { text:'CALIFORNIA', value:'CA' }
      { text:'COLORADO', value:'CO'  }
      { text:'CONNECTICUT', value:'CT' }
      { text:'DISTRICT OF COLUMBIA', value:'DC'  }
      { text:'DELAWARE', value:'DE' }
      { text:'FLORIDA', value:'FL'  }
      { text:'GEORGIA', value:'GA' }
      { text:'HAWAII', value:'HI'  }
      { text:'IOWA', value:'IA' }
      { text:'IDAHO', value:'ID'  }
      { text:'ILLINOIS', value:'IL' }
      { text:'INDIANA', value:'IN'  }
      { text:'KANSAS', value:'KS' }
      { text:'KENTUCKY', value:'KY'  }
      { text:'LOUISIANA', value:'LA' }
      { text:'MASSACHUSETTS', value:'MA'  }
      { text:'MARYLAND', value:'MD' }
      { text:'MAINE', value:'ME'  }
      { text:'MICHIGAN', value:'MI' }
      { text:'MINNESOTA', value:'MN'  }
      { text:'MISSOURI', value:'MO' }
      { text:'MISSISSIPPI', value:'MS'  }
      { text:'MONTANA', value:'MT' }
      { text:'NORTH CAROLINA', value:'NC'  }
      { text:'NORTH DAKOTA', value:'ND' }
      { text:'NEBRASKA', value:'NE'  }
      { text:'NEW HAMPSHIRE', value:'NH' }
      { text:'NEW JERSEY', value:'NJ'  }
      { text:'NEW MEXICO', value:'NM' }
      { text:'NEVADA', value:'NV'  }
      { text:'NEW YORK', value:'NY' }
      { text:'OHIO', value:'OH'  }
      { text:'OKLAHOMA', value:'OK' }
      { text:'OREGON', value:'OR'  }
      { text:'PENNSYLVANIA', value:'PA' }
      { text:'PUERTO RICO', value:'PR'  }
      { text:'RHODE ISLAND', value:'RI' }
      { text:'SA', value:'SA'  }
      { text:'SOUTH CAROLINA', value:'SC' }
      { text:'SOUTH DAKOTA', value:'SD'  }
      { text:'TENNESSEE', value:'TN' }
      { text:'TEXAS', value:'TX'  }
      { text:'UTAH', value:'UT' }
      { text:'VIRGINIA', value:'VA'  }
      { text:'U.S. Virgin Islands', value:'VI' }
      { text:'VERMONT', value:'VT'  }
      { text:'WASHINGTON', value:'WA' }
      { text:'WISCONSIN', value:'WI'  }
      { text:'WEST VIRGINIA', value:'WV' }
      { text:'WYOMING', value:'WY'  }
    ]

    $scope.paymentTermList = [
      { text:'Net 30', value:'NT30'  }
      { text:'Net 45', value:'NT45'  }
      { text:'Net 60', value:'NT60'  }
      { text:'Net 90', value:'NT90'  }
    ]

    $scope.rmaModelList = [
      { text:'Request', value:'Request'  }
      { text:'Blanket', value:'Blanket'  }
      { text:'Allowance', value:'Allowance'  }
    ]

    $scope.edi_shipmethodList = [
      { CarrierCode:'FED', CarrierName:'FEDEX', ServiceCode:'FEDX STD OVR', ServiceName:'FedEx Standard Overnight' }
      { CarrierCode:'FED', CarrierName:'FEDEX', ServiceCode:'FEDX 2 DAYS', ServiceName:'FedEx 2Day' }
      { CarrierCode:'FED', CarrierName:'FEDEX', ServiceCode:'FEDEX EXPRESS SAVER', ServiceName:'FedEx Express Saver' }
      { CarrierCode:'FED', CarrierName:'FEDEX', ServiceCode:'FEDEX GROUND', ServiceName:'FedEx Ground' }
      { CarrierCode:'UPS', CarrierName:'UPS', ServiceCode:'UPS 3 DAYS', ServiceName:'UPS 3 DAYS' }
      { CarrierCode:'UPS', CarrierName:'UPS', ServiceCode:'UPS 2ND DAY', ServiceName:'UPS 2nd Day' }
      { CarrierCode:'UPS', CarrierName:'UPS', ServiceCode:'UPS GROUND', ServiceName:'UPS Ground' }
      { CarrierCode:'UPS', CarrierName:'UPS', ServiceCode:'UPS RED NEXT RESI', ServiceName:'UPS Next Day Air Saver' }
      { CarrierCode:'AIT', CarrierName:'AIT', ServiceCode:'AIT WHITE GLOVE SERVICE', ServiceName:'AIT White Glove Delivery' }
      { CarrierCode:'AIT', CarrierName:'AIT', ServiceCode:'AIT FRONT DOOR DELIVERY', ServiceName:'AIT Front Door Delivery' }
      { CarrierCode:'UPS', CarrierName:'UPS', ServiceCode:'UPSMI', ServiceName:'UPS Mail Innovations' }
      { CarrierCode:'DHL', CarrierName:'DHL', ServiceCode:'DHLGM', ServiceName:'DHL Global Mail' }
      { CarrierCode:'CEVA', CarrierName:'CEVA', ServiceCode:'TTD', ServiceName:'CEVA Threshold' }
      { CarrierCode:'CEVA', CarrierName:'CEVA', ServiceCode:'WGD', ServiceName:'CEVA White Glove' }
      { CarrierCode:'FED', CarrierName:'FEDEX', ServiceCode:'FEDEX SMART POST', ServiceName:'FedEx Smart Post' }
    ]

    $scope.stepInfo = {
        step1: false
        step2: false
        step3: false
        step4: false
        step5: false
    }
    $scope.previous = ->
       if($scope.currentStep <= 1)
         return
       messager.clear()
       $scope.currentStep--

    $scope.errorAddressInfo = null
    $scope.errorAddressInfoIndex = null
    $scope.checkZipCodeApi = (object)->
      deferred = $q.defer()
      requestItem = {
        ZipCode : object.ZipCode
        StateCode : object.State
        Country : 'USA'
      }
      zipCodeAPI.getZipCodeList requestItem
      ,(response) ->
        if(!response.Succeeded||!response.ZipCodeList||response.ZipCodeList.length == 0)
          $scope.errorAddressInfo = object
        deferred.resolve "OK"
      deferred.promise

    $scope.checkZipcode = (callback) ->
      $scope.errorAddressInfo = null
      needCheckAddressList = []
      if($scope.currentStep == 1)
        if $scope.entity.MainInfo.State != '99' && $scope.entity.MainInfo.State != 'SA'
          needCheckAddressList.push($scope.entity.MainInfo)
      else if($scope.currentStep == 2)
        if $scope.entity.RMAInfo.State != '99' && $scope.entity.RMAInfo.State != 'SA'
          needCheckAddressList.push($scope.entity.RMAInfo)
        if $scope.entity.ACHBankInfo.State != '99' && $scope.entity.ACHBankInfo.State != 'SA'
          needCheckAddressList.push($scope.entity.ACHBankInfo)
      else if($scope.currentStep == 3)
        if $scope.entity.VendorInfo.State != '99' && $scope.entity.VendorInfo.State != 'SA'
          needCheckAddressList.push($scope.entity.VendorInfo)
      else if($scope.currentStep == 4)
        for wh in $scope.entity.VirtualFulfillmentInfo.WarehouseList
          if wh.State != '99' && wh.State != 'SA'
            needCheckAddressList.push(wh)
      else
        needCheckAddressList = []
      if(needCheckAddressList.length <= 0)
        callback()
        return
      $q.all(needCheckAddressList.map($scope.checkZipCodeApi))
        .then ->
          if($scope.errorAddressInfo)
            errorMsg = 'The zipcode is invalid. (country:UNITED STATES, state:'+$scope.errorAddressInfo.State+', zip code:'+$scope.errorAddressInfo.ZipCode+')'
            messager.error errorMsg
          else
            callback()


    $scope.next = ->
       messager.clear()
       if($scope.currentStep >= 5)
         return

       if($scope.currentStep == 1 and $scope.mainContactInvalid)
         return

       if($scope.currentStep == 2)
         if($scope.formUploader.queue.length==0)
           $scope.formUploaderValidtip = true
         if($scope.bankReferenceFileUploader.queue.length==0)
           $scope.bankUploaderValidtip = true
         if($scope.voidCheckFileUploader.queue.length==0)
           $scope.voidCheckUploaderValidtip = true
         return if $scope.formUploaderValidtip or $scope.bankUploaderValidtip or $scope.voidCheckUploaderValidtip

       if($scope.currentStep == 4)
         if !$scope.entity.TempInfo.Ground_UPSGround and !$scope.entity.TempInfo.Ground_FedexGround
           $scope.groundValidtip = true
         else
           $scope.groundValidtip = false
         if !$scope.entity.TempInfo.NextDay_UPS and !$scope.entity.TempInfo.NextDay_Fedex and !$scope.entity.TempInfo.N2Day_UPS and !$scope.entity.TempInfo.N2Day_Fedex and !$scope.entity.TempInfo.N3Day_UPS and !$scope.entity.TempInfo.N3Day_Fedex
           $scope.nextDayValidtip = true
         else
           $scope.nextDayValidtip = false
         warehouseValid = $scope.warehouseValid()
         zipcodeValid = $scope.zipcodeValid()
         cityValid = $scope.cityValid()
         return if $scope.groundValidtip or $scope.nextDayValidtip or !warehouseValid or !zipcodeValid or !cityValid

       # Form check
       currentFormName = "stepForm_" + $scope.currentStep
       currentFormBottonName = "btnStep_" + $scope.currentStep
       if($scope[currentFormName].$valid == false)
         $("#"+currentFormBottonName+"").click()
         return
       $scope.checkZipcode(()->
        $scope.stepInfo["step"+$scope.currentStep] = true
        $scope.currentStep++
       )

    $scope.change = (step) ->
       #$scope.currentStep = step
       #return
       messager.clear()
       xx = "step"+(step-1)
       if($scope.stepInfo["step"+step] == false && $scope.stepInfo["step"+(step-1)] == false)
          messager.warning('Can only choose have completed the module area, please register by next button to complete the wizard.')
          return
       # Form check

       if step > $scope.currentStep
         i = $scope.currentStep
         while( i<step)
           currentFormName = "stepForm_" + i
           if i == 1 and $scope.mainContactInvalid
             messager.warning('Some fields are invalid, or some required fields are not filled in at step ' +i+'.' )
             return
           if $scope[currentFormName].$valid == false
             messager.warning('Some fields are invalid, or some required fields are not filled in at step ' +i+'.' )
             return
           i++

       if($scope.currentStep == 4)
         warehouseValid = $scope.warehouseValid()
         zipcodeValid = $scope.zipcodeValid()
         cityValid = $scope.cityValid()
         return if !warehouseValid or !zipcodeValid or !cityValid
       $scope.checkZipcode(()->
        $scope.currentStep = step
       )

    $scope.groundChagned = ->
      if !$scope.entity.TempInfo.Ground_UPSGround and !$scope.entity.TempInfo.Ground_FedexGround
           $scope.groundValidtip = true
      else
           $scope.groundValidtip = false

    $scope.nextDayChangd = ->
      if !$scope.entity.TempInfo.NextDay_UPS and !$scope.entity.TempInfo.NextDay_Fedex and !$scope.entity.TempInfo.N2Day_UPS and !$scope.entity.TempInfo.N2Day_Fedex and !$scope.entity.TempInfo.N3Day_UPS and !$scope.entity.TempInfo.N3Day_Fedex
           $scope.nextDayValidtip = true
      else
           $scope.nextDayValidtip = false

    ######### Uploader Start ##############
    $scope.uploadurl =common.apiURL.upload+ "?filename=1.txt&filetype=batch&format=json"
    $scope.uploadFile={}
    $scope.uploadHeader= '' #common.initHeader(common.currentUser)
    $scope.fileFilter =[{
        name: 'customFilter',
        fn: (item, options)->
          valid=false
          extensionName = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase()
          if(extensionName in ['pdf','doc','jpg','jpeg'])
            valid=true
          if(valid==false)
            messager.error("A upload file must have an extension \".pdf .doc .jpeg\", please select a valid upload file.")
          return valid
    },{
        name: 'fileSizeFilter',
        fn: (item, options)->
          valid = false
          if item.size < 10*1024*1024
            valid=true
          if(valid==false)
            messager.error("The maximum allowed file size is 10MB.")
          return valid
    }]

    formUploader=$scope.formUploader=new FileUploader({
        scope: $scope
        url: $scope.uploadurl
        headers:$scope.uploadHeader
        filters:$scope.fileFilter
    })

    formUploader.onAfterAddingFile = (fileItem)->
        $scope.formUploaderValidtip = $scope.formUploader.queue.length==0 ? true : false

    formUploader.onWhenAddingFileFailed = (fileItem, filter, options)->
        formUploader.removeFromQueue(fileItem);

    formUploader.onSuccessItem = (fileItem, response, status, headers) ->
        if response and response.Succeeded
          $scope.entity.VendorInfo.VendorAttachmentList.VendorAttachments.push({
            AttachmentType : "05",
            FileType :fileItem.file.type,
            FileName : fileItem.file.name,
            DestFileName : response.File.FileName,
            UploadUser : "VendorPortal",
            UploadDate : new Date(),
            SequenceNumber : 0,
            GeneratedAttachmentID : 0
          })
        else
          messager.error("Upload W-9 Form file failed.")
        $scope.uploadBankReferenceFile()

    formUploader.onErrorItem = (fileItem, response, status, headers) ->
        messager.error('Upload W-9 Form file failed.')

    bankReferenceFileUploader = $scope.bankReferenceFileUploader=new FileUploader({
        scope: $scope
        url: $scope.uploadurl
        headers:$scope.uploadHeader
        filters:$scope.fileFilter
    })

    bankReferenceFileUploader.onAfterAddingFile = (fileItem)->
       $scope.bankUploaderValidtip = $scope.bankReferenceFileUploader.queue.length==0 ? true : false

    bankReferenceFileUploader.onWhenAddingFileFailed = (fileItem, filter, options)->
        bankReferenceFileUploader.removeFromQueue(fileItem)

    bankReferenceFileUploader.onSuccessItem = (fileItem, response, status, headers) ->
        if response and response.Succeeded
          $scope.entity.VendorInfo.VendorAttachmentList.VendorAttachments.push({
            AttachmentType : "15",
            FileType :fileItem.file.type,
            FileName : fileItem.file.name,
            DestFileName : response.File.FileName,
            UploadUser : "VendorPortal",
            UploadDate : new Date(),
            SequenceNumber : 0,
            GeneratedAttachmentID : 0
          })
        else
          messager.error("Upload bank reference file failed.")
        $scope.uploadVoidCheckFile()

    bankReferenceFileUploader.onErrorItem = (fileItem, response, status, headers) ->
        messager.error('Upload bank reference file failed.')

    voidCheckFileUploader = $scope.voidCheckFileUploader=new FileUploader({
        scope: $scope
        url: $scope.uploadurl
        headers:$scope.uploadHeader
        filters:$scope.fileFilter
    })

    voidCheckFileUploader.onAfterAddingFile = (fileItem)->
        $scope.voidCheckUploaderValidtip = $scope.voidCheckFileUploader.queue.length==0 ? true : false

    voidCheckFileUploader.onWhenAddingFileFailed = (fileItem, filter, options)->
        voidCheckFileUploader.removeFromQueue(fileItem)

    voidCheckFileUploader.onSuccessItem = (fileItem, response, status, headers) ->
        if response and response.Succeeded
          $scope.entity.VendorInfo.VendorAttachmentList.VendorAttachments.push({
            AttachmentType : '14',
            FileType :fileItem.file.type,
            FileName : fileItem.file.name,
            DestFileName : response.File.FileName,
            UploadUser : "VendorPortal",
            UploadDate : new Date(),
            SequenceNumber : 0,
            GeneratedAttachmentID : 0
          })
        else
          messager.error("Upload void check file failed.")
        $scope.uploadCompleted()

    voidCheckFileUploader.onErrorItem = (fileItem, response, status, headers) ->
        messager.error('Upload void check file failed.')

    $scope.uploadFormFile = ->
      formFileItem = formUploader.queue[formUploader.queue.length-1]
      formFileItem.url = common.apiURL.commonUpload+ "?filename="+$scope.getFileName(encodeURIComponent(formFileItem.file.name))+"&SuppressSuffix=true&format=json&type=VendorAttachment&group=POFile";
      formFileItem.upload()

    $scope.uploadBankReferenceFile = ->
      bankReferenceFile = bankReferenceFileUploader.queue[bankReferenceFileUploader.queue.length-1]
      bankReferenceFile.url = common.apiURL.commonUpload+ "?filename="+$scope.getFileName(encodeURIComponent(bankReferenceFile.file.name))+"&SuppressSuffix=true&format=json&type=VendorAttachment&group=POFile";
      bankReferenceFile.upload()

    $scope.uploadVoidCheckFile = ->
      voidCheckFile = voidCheckFileUploader.queue[voidCheckFileUploader.queue.length-1]
      voidCheckFile.url = common.apiURL.commonUpload+ "?filename="+$scope.getFileName(encodeURIComponent(voidCheckFile.file.name))+"&SuppressSuffix=true&format=json&type=VendorAttachment&group=POFile";
      voidCheckFile.upload()

    $scope.getFileName =(name)->
      strs = name.split('.')
      strs.splice(strs.length-2,1,strs[strs.length-2]+'_'+(new Date()).getTime())
      return strs.join('.')

    $scope.uploadFiles = ->
      $scope.uploadFormFile()

    $scope.uploadClick=->
      $scope.uploadFormFile()
    ######### Uploader End ##############


    $scope.$watch "chk_RMA_SameMainAddress", (newVal, oldVal) ->
       if newVal
         $scope.entity.RMAInfo.Address = $scope.entity.MainInfo.Address
         $scope.entity.RMAInfo.Address2 = $scope.entity.MainInfo.Address2
         $scope.entity.RMAInfo.City = $scope.entity.MainInfo.City
         $scope.entity.RMAInfo.State = $scope.entity.MainInfo.State
         $scope.entity.RMAInfo.ZipCode = $scope.entity.MainInfo.ZipCode
       else
         $scope.entity.RMAInfo.Address = null
         $scope.entity.RMAInfo.Address2 = null
         $scope.entity.RMAInfo.City = null
         $scope.entity.RMAInfo.State = null
         $scope.entity.RMAInfo.ZipCode = null

    $scope.$watch "chk_VendorCompany_SameStoreName", (newVal, oldVal) ->
      if newVal
         $scope.entity.VendorInfo.VendorName = $scope.entity.MainInfo.StoreName
       else
         $scope.entity.VendorInfo.VendorName = null

    $scope.$watch "chk_VendorCompany_SameMainAddress", (newVal, oldVal) ->
      if newVal
         $scope.entity.VendorInfo.Address1 = $scope.entity.MainInfo.Address
         $scope.entity.VendorInfo.CompanyPhysicalSuiteUnitNo = $scope.entity.MainInfo.Address2
         $scope.entity.VendorInfo.City = $scope.entity.MainInfo.City
         $scope.entity.VendorInfo.State = $scope.entity.MainInfo.State
         $scope.entity.VendorInfo.ZipCode = $scope.entity.MainInfo.ZipCode
       else
         $scope.entity.VendorInfo.Address1 = null
         $scope.entity.VendorInfo.CompanyPhysicalSuiteUnitNo = null
         $scope.entity.VendorInfo.City = null
         $scope.entity.VendorInfo.State = null
         $scope.entity.VendorInfo.ZipCode = null

    $scope.$watch "entity.VirtualFulfillmentInfo.ProfileInfo.OptimizedSourcing", (newVal, oldVal) ->
       if !newVal
         if($scope.entity.VirtualFulfillmentInfo.WarehouseList.length > 1)
           # common.confirmBox "This operation will automatically remove excess warehouse list, are you sure to continue?","", ->
            primaryWHList = $filter('filter')($scope.entity.VirtualFulfillmentInfo.WarehouseList,(w) -> w.IsPrimary == true)
            if(primaryWHList && primaryWHList.length > 0)
               delete primaryWHList.WarehouseNumber
               $scope.entity.VirtualFulfillmentInfo.WarehouseList = primaryWHList

    $scope.$watch "entity.MainInfo.Address", (newVal, oldVal) ->
      if $scope.chk_RMA_SameMainAddress
        $scope.entity.RMAInfo.Address = newVal
      if $scope.chk_VendorCompany_SameMainAddress
        $scope.entity.VendorInfo.Address1 = newVal

    $scope.$watch "entity.MainInfo.Address2", (newVal, oldVal) ->
      if $scope.chk_RMA_SameMainAddress
        $scope.entity.RMAInfo.Address2 = newVal
      if $scope.chk_VendorCompany_SameMainAddress
        $scope.entity.VendorInfo.CompanyPhysicalSuiteUnitNo = newVal

    $scope.$watch "entity.MainInfo.City", (newVal, oldVal) ->
      if $scope.chk_RMA_SameMainAddress
        $scope.entity.RMAInfo.City = newVal
      if $scope.chk_VendorCompany_SameMainAddress
        $scope.entity.VendorInfo.City = newVal

    $scope.$watch "entity.MainInfo.State", (newVal,oldVal) ->
      if $scope.chk_RMA_SameMainAddress
        $scope.entity.RMAInfo.State = newVal
      if $scope.chk_VendorCompany_SameMainAddress
        $scope.entity.VendorInfo.State = newVal

    $scope.$watch "entity.MainInfo.ZipCode", (newVal,oldVal) ->
      if $scope.chk_RMA_SameMainAddress
        $scope.entity.RMAInfo.ZipCode = newVal
      if $scope.chk_VendorCompany_SameMainAddress
        $scope.entity.VendorInfo.ZipCode = newVal

    $scope.$watch "entity.MainInfo.StoreName", (newVal,oldVal) ->
      if $scope.chk_VendorCompany_SameStoreName
        $scope.entity.VendorInfo.VendorName = newVal

    $scope.$watch "entity.VendorInfo.IsCompanyPartyLawsuit", (newVal,oldVal) ->
      if newVal is 0
        $scope.entity.VendorInfo.IsCompanyPartyLawsuitValue = ''

    $scope.mainContactInvalid = false
    $scope.$watch "entity.TempInfo.MainContact_firstName" ,(newVal,oldVal) ->
      contact = $scope.getLength(newVal,$scope.entity.TempInfo.MainContact_lastName)
      if contact > 20
        $scope.mainContactInvalid = true
      else
        $scope.mainContactInvalid = false

    $scope.$watch "entity.TempInfo.MainContact_lastName",(newVal,oldVal) ->
      contact = $scope.getLength($scope.entity.TempInfo.MainContact_firstName,newVal)
      if contact > 20
        $scope.mainContactInvalid = true
      else
        $scope.mainContactInvalid = false

    $scope.getLength = (first,last) ->
      count = 1
      if first
        count = count + first.length
      if last
        count = count + last.length

    $scope.warehouseValid =()->
      if $scope.entity.VirtualFulfillmentInfo.ProfileInfo.OptimizedSourcing
        whNumberList = []
        sameWhNumberList = []
        for wh in $scope.entity.VirtualFulfillmentInfo.WarehouseList
          if wh.WarehouseNumber and wh.WarehouseNumber not in whNumberList
            whNumberList.push(wh.WarehouseNumber)
          else
            sameWhNumberList.push(wh.WarehouseNumber) if wh.WarehouseNumber and wh.WarehouseNumber not in sameWhNumberList
        if sameWhNumberList.length > 0
          messager.error("There are some repeat warehouse number.Please check warehouse number: "+sameWhNumberList.join('&'))
          return false
        else
          return true
      else
        return true

    $scope.cityValid = () ->
      patten = /^[^0-9]+$/
      for wh in $scope.entity.VirtualFulfillmentInfo.WarehouseList
        if !patten.test(wh.City)
          messager.error("Please enter valid city.")
          return false
        return true

    $scope.zipcodeValid = () ->
      ptn = /\d{5,10}/
      for wh in $scope.entity.VirtualFulfillmentInfo.WarehouseList
        if !ptn.test(wh.ZipCode)
          messager.error("Please enter valid zipcode.")
          return false
      return true

    $scope.addWarehouse = ->
      $scope.entity.VirtualFulfillmentInfo.WarehouseList.push({
                    IsPrimary : false
                    Address : null
                    City : null
                    State : null
                    ZipCode : null
                    CountryCode : "USA"
      })

    $scope.removeWarehouse = (index) ->
       $scope.entity.VirtualFulfillmentInfo.WarehouseList.splice(index, 1)

    $scope.changePrimaryWH = (selectedIndex) ->
       for cindex of $scope.entity.VirtualFulfillmentInfo.WarehouseList
           $scope.entity.VirtualFulfillmentInfo.WarehouseList[cindex].IsPrimary = (cindex == selectedIndex.toString()) ? true : false

    $scope.register = ->
      $scope.isSubmitProcessing = true
      $scope.entity.VendorInfo.VendorAttachmentList.VendorAttachments=[{
                   AttachmentType: "02",
                   FileType: "pdf",
                   FileName: "Vendor_Common_Agreement.pdf",
                   DestFileName: "Vendor_Common_Agreement.pdf",
                   UploadUser: "VendorPortal",
                   UploadDate: "\/Date(1418138032930-0800)\/",
                   SequenceNumber: 0,
                   GeneratedAttachmentID: 0
                }]
      $scope.uploadFiles()

    $scope.uploadCompleted = ->
      if $scope.entity.VendorInfo.VendorAttachmentList.VendorAttachments.length <4
        $scope.regFailed = true
        $scope.isSubmitProcessing = false
        return
      $scope.entity.InvitationID = $scope.currentUser.InvitationID
      $scope.entity.CustomerNumber = $scope.currentUser.CustomerNumber
      $scope.entity.LoginName  = $scope.currentUser.LoginName
      $scope.entity.LoginPassword = $scope.currentUser.LoginPassword

      #RequestInfo
      $scope.entity.RequestInfo = {
        SystemSource : "VendorPortal"
        RequestGuid : $scope.currentUser.InvitationID
        Memo : "Vendor registration"
        UserID : $scope.currentUser.CustomerNumber
        RequestTimeUtc : new Date()
      }

      #merge contact & phone
      tempInfo = $scope.entity.TempInfo
      $scope.entity.VendorInfo.Contact= $scope.getContactWithName(tempInfo.MainContact_firstName,tempInfo.MainContact_lastName)
      $scope.entity.VendorInfo.Phone= $scope.getPhoneNumber(tempInfo.MainContact_Phone_tell,tempInfo.MainContact_Phone_originalTel2,tempInfo.MainContact_Phone_originalTel3)
      $scope.entity.MainInfo.CustomerServicePhoneNumber= $scope.getPhoneNumber(tempInfo.CustomerServiceContact_Phone_tell,tempInfo.CustomerServiceContact_Phone_originalTel2,tempInfo.CustomerServiceContact_Phone_originalTel3)
      $scope.entity.RMAInfo.ContactName = $scope.getContactWithName(tempInfo.RMA_firstName,tempInfo.RMA_lastName)
      $scope.entity.RMAInfo.PhoneNumber= $scope.getPhoneNumber(tempInfo.RMA_Phone_tell,tempInfo.RMA_Phone_originalTel2,tempInfo.RMA_Phone_originalTel3)
      #PaymentTermsCode & country
      $scope.entity.VendorInfo.PaymentTermsCode = $scope.entity.GeneralTerms[0].Response
      $scope.entity.VendorInfo.Address2 = $scope.entity.VendorInfo.CompanyPhysicalSuiteUnitNo
      #VendorInfo.Handler
      $scope.entity.VendorInfo.Handler = {
        SystemSource : "VendorPortal"
        RequestGUID : uuid.newguid()
        ActionType : "00"
        ActionMemo : "Vendor registration"
        ActionUserID : $scope.currentUser.CustomerNumber
        ActionTime : new Date()
      }

      $scope.entity.VirtualFulfillmentInfo.ProfileInfo.VendorName = $scope.entity.VendorInfo.VendorName

      ############  VendorContactList ############
      $scope.entity.VendorInfo.VendorContactList.VendorContacts=[]
      #1.Accounting
      accountingContact = {
        DepartmentNo : 4
        ContactID : 1
        MappingAddressID : "1"
        DefaultMark : "0"
        ContactName :  $scope.getContactWithName(tempInfo.AccountingContact_Accounting_firstName,tempInfo.AccountingContact_Accounting_lastName)
        Phone : $scope.getPhoneNumber(tempInfo.AccountingContact_Phone_tell,tempInfo.AccountingContact_Phone_originalTel2,tempInfo.AccountingContact_Phone_originalTel3)
        PhoneExtension : angular.copy(tempInfo.AccountingContact_Phone_originalExt1)
        EmailAddress : angular.copy(tempInfo.AccountingContact_Accounting_emailAddress)
      }
      $scope.entity.VendorInfo.VendorContactList.VendorContacts.push(accountingContact)

      #2.RMA
      rmaContact = {
        DepartmentNo : 5
        ContactID : 2
        MappingAddressID : "2"
        DefaultMark : "0"
        ContactName : angular.copy($scope.entity.RMAInfo.ContactName)
        Phone : angular.copy($scope.entity.RMAInfo.PhoneNumber)
        PhoneExtension : angular.copy($scope.entity.RMAInfo.PhoneExtension)
        EmailAddress : angular.copy($scope.entity.RMAInfo.EmailAddress)
      }
      $scope.entity.VendorInfo.VendorContactList.VendorContacts.push(rmaContact)

      #3.Sales - Marketing
      salesContact = {
        DepartmentNo : 3
        ContactID : 3
        MappingAddressID : "3"
        DefaultMark : "1"
        ContactName :  $scope.getContactWithName(tempInfo.MarketingContact_firstName,tempInfo.MarketingContact_lastName)
        Phone : $scope.getPhoneNumber(tempInfo.MarketingContact_Phone_tell,tempInfo.MarketingContact_Phone_originalTel2,tempInfo.MarketingContact_Phone_originalTel3)
        PhoneExtension : angular.copy(tempInfo.MarketingContact_Phone_originalExt1)
        EmailAddress : angular.copy(tempInfo.MarketingContact_emailAddress)
      }
      $scope.entity.VendorInfo.VendorContactList.VendorContacts.push(salesContact)

      #4.Rebate Program - Marketing
      rebateProgramContact = {
        DepartmentNo : 9
        ContactID : 4
        MappingAddressID : "4"
        DefaultMark : "0"
        ContactName :  $scope.getContactWithName(tempInfo.MarketingContact_firstName,tempInfo.MarketingContact_lastName)
        Phone : $scope.getPhoneNumber(tempInfo.MarketingContact_Phone_tell,tempInfo.MarketingContact_Phone_originalTel2,tempInfo.MarketingContact_Phone_originalTel3)
        PhoneExtension : angular.copy(tempInfo.MarketingContact_Phone_originalExt1)
        EmailAddress : angular.copy(tempInfo.MarketingContact_emailAddress)
      }
      $scope.entity.VendorInfo.VendorContactList.VendorContacts.push(rebateProgramContact)

      ############  VendorAddressList  ############
      default_Country = "USA"
      $scope.entity.VendorInfo.VendorAddressList.VendorAddresses=[]
      #1.Accounting
      accountingAddress = {
        DepartmentNo : 4
        Country : default_Country
        DefaultMark : "0"
        AddressID: 1
        MappingContactID : "1"
        Phone : $scope.getPhoneNumber(tempInfo.AccountingContact_Phone_tell,tempInfo.AccountingContact_Phone_originalTel2,tempInfo.AccountingContact_Phone_originalTel3)
        PhoneExtension : angular.copy(tempInfo.AccountingContact_Phone_originalExt1)
        Address1 : angular.copy($scope.entity.VendorInfo.Address1)
        ZipCode : angular.copy($scope.entity.VendorInfo.ZipCode)
        City : angular.copy($scope.entity.VendorInfo.City)
        State : angular.copy($scope.entity.VendorInfo.State)
        EmailAddress : angular.copy(tempInfo.AccountingContact_Accounting_emailAddress)
        Website : angular.copy($scope.entity.TempInfo.WebsiteURL)
      }
      $scope.entity.VendorInfo.VendorAddressList.VendorAddresses.push(accountingAddress)

      #2.RMA
      rmaAddress = {
        DepartmentNo : 5
        Country : default_Country
        DefaultMark : "0"
        AddressID: 2
        MappingContactID : "2"
        Phone : angular.copy($scope.entity.RMAInfo.PhoneNumber)
        PhoneExtension : angular.copy($scope.entity.RMAInfo.PhoneExtension)
        Address1 : angular.copy($scope.entity.VendorInfo.Address1)
        ZipCode : angular.copy($scope.entity.VendorInfo.ZipCode)
        City : angular.copy($scope.entity.VendorInfo.City)
        State : angular.copy($scope.entity.VendorInfo.State)
        EmailAddress : angular.copy($scope.entity.RMAInfo.EmailAddress)
        Website : angular.copy($scope.entity.TempInfo.WebsiteURL)
      }
      $scope.entity.VendorInfo.VendorAddressList.VendorAddresses.push(rmaAddress)

      #3.Sales
      salesAddress = {
        DepartmentNo : 3
        Country : default_Country
        DefaultMark : "1"
        AddressID: 3
        MappingContactID : "3"
        Phone : $scope.getPhoneNumber(tempInfo.MarketingContact_Phone_tell,tempInfo.MarketingContact_Phone_originalTel2,tempInfo.MarketingContact_Phone_originalTel3)
        PhoneExtension : angular.copy(tempInfo.MarketingContact_Phone_originalExt1)
        Address1 : angular.copy($scope.entity.VendorInfo.Address1)
        ZipCode : angular.copy($scope.entity.VendorInfo.ZipCode)
        City : angular.copy($scope.entity.VendorInfo.City)
        State : angular.copy($scope.entity.VendorInfo.State)
        EmailAddress : angular.copy(tempInfo.MarketingContact_emailAddress)
        Website : angular.copy($scope.entity.TempInfo.WebsiteURL)
      }
      $scope.entity.VendorInfo.VendorAddressList.VendorAddresses.push(salesAddress)

      #4.Rebate Program
      rebateProgramAddress = {
        DepartmentNo : 9
        Country : default_Country
        DefaultMark : "0"
        AddressID: 4
        MappingContactID : "4"
        Phone : $scope.getPhoneNumber(tempInfo.MarketingContact_Phone_tell,tempInfo.MarketingContact_Phone_originalTel2,tempInfo.MarketingContact_Phone_originalTel3)
        PhoneExtension : angular.copy(tempInfo.MarketingContact_Phone_originalExt1)
        Address1 : angular.copy($scope.entity.VendorInfo.Address1)
        ZipCode : angular.copy($scope.entity.VendorInfo.ZipCode)
        City : angular.copy($scope.entity.VendorInfo.City)
        State : angular.copy($scope.entity.VendorInfo.State)
        EmailAddress : angular.copy(tempInfo.MarketingContact_emailAddress)
        Website : angular.copy($scope.entity.TempInfo.WebsiteURL)
      }
      $scope.entity.VendorInfo.VendorAddressList.VendorAddresses.push(rebateProgramAddress)

      ############VF - add ship method ############
      $scope.entity.VirtualFulfillmentInfo.ShipMethodList=[]
      $scope.addShipMethod($scope.entity.TempInfo.Ground_UPSGround)
      $scope.addShipMethod($scope.entity.TempInfo.Ground_FedexGround)
      $scope.addShipMethod($scope.entity.TempInfo.NextDay_UPS)
      $scope.addShipMethod($scope.entity.TempInfo.NextDay_Fedex)
      $scope.addShipMethod($scope.entity.TempInfo.N2Day_UPS)
      $scope.addShipMethod($scope.entity.TempInfo.N2Day_Fedex)
      $scope.addShipMethod($scope.entity.TempInfo.N3Day_UPS)
      $scope.addShipMethod($scope.entity.TempInfo.N3Day_Fedex)
      $scope.addShipMethod($scope.entity.TempInfo.FrontDoor_AIT)
      $scope.addShipMethod($scope.entity.TempInfo.FrontDoor_CEVA)
      $scope.addShipMethod($scope.entity.TempInfo.WhiteGlove_AIT)
      $scope.addShipMethod($scope.entity.TempInfo.WhiteGlove_CEVA)
      $scope.addShipMethod($scope.entity.TempInfo.MediaMail_UPSMI)
      $scope.addShipMethod($scope.entity.TempInfo.MediaMail_Fedex)
      $scope.addShipMethod($scope.entity.TempInfo.MediaMail_DHL)

      #register request
      request = angular.copy($scope.entity)
      request.action1 = "registration"
      vendorMgrAPI.register request
            ,(response)->
                $scope.isSubmitProcessing = false
                if(response&&response.Succeeded)
                    messager.success('Registration successfully.')
                    $scope.stepInfo.step5 = true
                    $scope.isCompleted = true
                else
                   if(response.Errors && response.Errors.length > 0)
                      errorMsg =  response.Errors[0].Message
                      messager.error('Registration failed. Error: '.concat(errorMsg))
            ,(error)->
                $scope.isSubmitProcessing = false

    $scope.getContactWithName = (firstName,lastName) ->
      return firstName + " " + lastName

    $scope.getPhoneNumber = (phone1,phone2,phone3) ->
      return phone1 + "-" + phone2 + "-" + phone3

    $scope.addShipMethod = (code) ->
      if(!code)
        return
      filterItems = $filter('filter')($scope.edi_shipmethodList, (s) -> s.ServiceCode == code)
      if(filterItems && filterItems.length > 0)
        $scope.entity.VirtualFulfillmentInfo.ShipMethodList.push(angular.copy(filterItems[0]))

    $scope.openWebSite =(webSite) ->
      $window.open(webSite)
])
.controller('UploadCtrl',
["$scope", ($scope) ->

  $scope.url = "www.test.com"
])
