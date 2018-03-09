angular.module('system-feedback', [])

.controller("ToolbarSystemFeedbackCtrl",["$scope","$rootScope","common","mail","$http","messager","userFeedbackAPI","$translate","$location",
($scope, $rootScope,common,mail,$http,messager,userFeedbackAPI,$translate,$location) ->

   $scope.entity = {}
   $scope.isPayAction = false
   
   $scope.supportTeamData = []
   if (NEG.Env == "gdev") 
       $scope.supportTeamData = [
               { text:'VF Team (Virtual Fulfillment)', value:'VF Team', isPayAction:false  ,mailTo: 'Ruby.J.Wang@newegg.com;', cc: 'Seven.H.Huang@newegg.com'}#'vf@newegg.com'
               { text:'Vendor Service (Reporting & Business)', value:'Vendor Service', isPayAction:false  ,mailTo: 'Ruby.J.Wang@newegg.com;Brent.X.Cheng@newegg.com',cc: 'Edward.J.Yang@newegg.com;Mark.X.Mou@newegg.com'}#'VendorService@newegg.com'
               { text:'Technical Team (Account, Access, Technical)', value:'Technical Team', isPayAction:false  ,mailTo: 'Ruby.J.Wang@newegg.com;Brent.X.Cheng@newegg.com',cc: 'Edward.J.Yang@newegg.com;Mark.X.Mou@newegg.com'}#'Andre.W.Shen@newegg.com;Gavin.J.Li@newegg.com;Marc.S.Chen@newegg.com'
               { text:'Newegg Partner (Customer Review)', value:'Newegg Partner', isPayAction:false  ,mailTo: 'Ruby.J.Wang@newegg.com;Brent.X.Cheng@newegg.com',cc: 'Edward.J.Yang@newegg.com;Mark.X.Mou@newegg.com'}#'VendorService@newegg.com'
       ]
   
   else if (NEG.Env == "gqc") 
       $scope.supportTeamData = [
               { text:'VF Team (Virtual Fulfillment)', value:'VF Team', isPayAction:false  ,mailTo: 'seven.h.huang@newegg.com;Brent.X.Cheng@newegg.com;', cc: 'ruby.j.wang@newegg.com'}#'vf@newegg.com'
               { text:'Vendor Service (Reporting & Business)', value:'Vendor Service', isPayAction:false  ,mailTo: 'seven.h.huang@newegg.com;Brent.X.Cheng@newegg.com;',cc: 'ruby.j.wang@newegg.com'}#'VendorService@newegg.com'
               { text:'Technical Team (Account, Access, Technical)', value:'Technical Team', isPayAction:false  ,mailTo: 'seven.h.huang@newegg.com;Brent.X.Cheng@newegg.com;',cc: 'ruby.j.wang@newegg.com'}#'Andre.W.Shen@newegg.com;Gavin.J.Li@newegg.com;Marc.S.Chen@newegg.com'
               { text:'Newegg Partner (Customer Review)', value:'Newegg Partner', isPayAction:false  ,mailTo: 'seven.h.huang@newegg.com;Brent.X.Cheng@newegg.com;',cc: 'ruby.j.wang@newegg.com'}#'VendorService@newegg.com'
       ]
   
   else if (NEG.Env == "prd-testing") 
       $scope.supportTeamData = [
               { text:'VF Team (Virtual Fulfillment)', value:'VF Team', isPayAction:false  ,mailTo: 'Ruby.J.Wang@newegg.com;Brent.X.Cheng@newegg.com', cc: 'Edward.J.Yang@newegg.com;Mark.X.Mou@newegg.com'}#'vf@newegg.com'
               { text:'Vendor Service (Reporting & Business)', value:'Vendor Service', isPayAction:false  ,mailTo: 'Ruby.J.Wang@newegg.com;Brent.X.Cheng@newegg.com',cc: 'Edward.J.Yang@newegg.com;Mark.X.Mou@newegg.com'}#'VendorService@newegg.com'
               { text:'Technical Team (Account, Access, Technical)', value:'Technical Team', isPayAction:false  ,mailTo: 'Ruby.J.Wang@newegg.com;Brent.X.Cheng@newegg.com',cc: 'Edward.J.Yang@newegg.com;Mark.X.Mou@newegg.com'}#'Andre.W.Shen@newegg.com;Gavin.J.Li@newegg.com;Marc.S.Chen@newegg.com'
               { text:'Newegg Partner (Customer Review)', value:'Newegg Partner', isPayAction:false  ,mailTo: 'Ruby.J.Wang@newegg.com;Brent.X.Cheng@newegg.com',cc: 'Edward.J.Yang@newegg.com;Mark.X.Mou@newegg.com'}#'VendorService@newegg.com'
       ]
   
   else if  (NEG.Env == "prd")    
       $scope.supportTeamData = [
           { text:'VF Team (Virtual Fulfillment)', value:'VF Team', isPayAction:false  ,mailTo: 'vf@newegg.com', cc: 'Max.P.Shaw@newegg.com; Andrew.H.Lu@newegg.com; Frank.S.Wang@newegg.com; Betty.L.Zheng@newegg.com; Seven.H.Huang@newegg.com'}#'vf@newegg.com'
           { text:'Vendor Service (Reporting & Business)', value:'Vendor Service', isPayAction:false  ,mailTo: 'VendorService@newegg.com',cc: 'Max.P.Shaw@newegg.com; Andrew.H.Lu@newegg.com; Frank.S.Wang@newegg.com; Betty.L.Zheng@newegg.com; Seven.H.Huang@newegg.com'}#'VendorService@newegg.com'
           { text:'Technical Team (Account, Access, Technical)', value:'Technical Team', isPayAction:false  ,mailTo: 'vendortechsupport@newegg.com',cc: 'vendortechsupport@newegg.com'}#'Andre.W.Shen@newegg.com;Gavin.J.Li@newegg.com;Marc.S.Chen@newegg.com'
           { text:'Newegg Partner (Customer Review)', value:'Newegg Partner', isPayAction:false  ,mailTo: 'partner@newegg.com',cc: 'Max.P.Shaw@newegg.com; Andrew.H.Lu@newegg.com; Frank.S.Wang@newegg.com; Betty.L.Zheng@newegg.com; Seven.H.Huang@newegg.com'}#'VendorService@newegg.com'
       ]
   
   $rootScope.$on 'ShowFeedback', (e,data) ->
       if data == 'pay'
          $scope.isPayAction = true
          $scope.entity.supportTeam = 'Vendor Service'
          $scope.entity.title='Upgrade to Advanced Program'
       else
          $scope.isPayAction = false   
          $scope.entity.supportTeam =null
          $scope.entity.title = null
       messager.clear()    
       $scope.feedbackNow()

   $scope.screenshot = (callback) ->
      html2canvas document.body,
        allowTaint: true
        taintTest: false
        useCORS: true
        onrendered: (canvas) ->
          callback canvas
          return

   $scope.showFeedback = ->  
     messager.clear()    
     $scope.isPayAction = false  
     $scope.entity.supportTeam =null
     $scope.entity.title = null
     $scope.entity.comment = null
     $scope.feedbackNow()

   $scope.feedbackNow = ->
     $scope.includeBrowserInfo=true
     $scope.includeScreenshot=true
     $scope.screenshot((canvas) ->
        imgSrc = canvas.toDataURL()
        $scope.screenshotCanvas = canvas
        $scope.$apply(()-> 
           $scope.screenshotImg = imgSrc
           $scope.feedbackModal = true
        )
     )

   $scope.closeFeedback = ->      
     $scope.feedbackModal = false
     
   $scope.sendFeedback = ->
     request = {
        Name : $scope.entity.title
        Memo : "Support Team: " + $scope.entity.supportTeam
        Page : $location.path()
        Email : common.currentUser.LoginName,
        Comment : $scope.entity.comment.replace(/\n/g,"<br>")
     }
     response = userFeedbackAPI.addFeedback request,
       ->
         if(response && response.Succeeded)
           $scope.sendFeedbackEmail()
         else
           messager.error($translate("system.feedback.submit_error"))

    post = (url, data, callback, isUploadFile) ->
      req = new XMLHttpRequest
      req.open 'POST', url, true
      if !isUploadFile
        req.setRequestHeader 'Content-Type', 'application/json'
        req.setRequestHeader 'Accept', 'application/json'
      else
        req.setRequestHeader 'Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundaryAreNxxwcZ6Dq2I2Z'
      req.onreadystatechange = ->
        if req.readyState == XMLHttpRequest.DONE
           callback req.responseText
        return
      req.send data
            
    $scope.uploadImgToDFIS = (canvas,callback) ->
       rndStr = Math.random().toString('36').substring(23)
       filename = Date.now()+rndStr+'.png'
       url = common.formatString("{0}?filename={1}&AddFileNameSuffix=true&format=json&type={2}&group={3}",[common.apiURL.commonUpload,filename,'VendorPortal','EDI'])
       if canvas.toBlob
         canvas.toBlob((blob)->
           post(url, blob, (res) ->
              callback(JSON.parse(res))
              return
           ,true)
         )
       else
         tb = canvas.msToBlob()
         post(url, tb, (res) ->
            callback(JSON.parse(res))
            return
         ,true)

    getBrowserInfo = -> 
      browerArr = []
      browerArr.push('<label style="width: 90px;font-weight: bold;">App Version:</label>'+navigator.appVersion)
      browerArr.push('<label style="width: 90px;font-weight: bold;">Language:</label>'+navigator.language)
      browerArr.push('<label style="width: 90px;font-weight: bold;">User Agent:</label>'+navigator.userAgent)
      browerArr.push('<label style="width: 90px;font-weight: bold;">Vendor:</label>'+navigator.vendor)
      browerArr.push('<label style="width: 90px;font-weight: bold;">Screen Width:</label>'+screen.width)
      browerArr.push('<label style="width: 90px;font-weight: bold;">Screen Height:</label>'+screen.height)
      return browerArr

    $scope.showBrowserInfo = ->
      msg = getBrowserInfo().join('<br>')
      return msg

    $scope.includeBrowserInfo=true
    $scope.includeScreenshot=true
    $('#divBrowserInfo_feedback').html($scope.showBrowserInfo())

    $scope.sendFeedbackEmail = ->
       $scope.uploadImgToDFIS($scope.screenshotCanvas, (rep) ->
           if(!rep.Succeeded)
              messager.error('Upload screen img falid..')
              return
           imgURL = rep.File.DownloadUrl
           $http.get('/modules/vendorportal/template/tpl_userFeedback.html').success((templateHtml)->
             from = common.currentUser.LoginName
             to = "seven.h.huang@newegg.com;Andre.W.Shen@newegg.com;" #"Matthew.M.Lau@newegg.com; Andre.W.Shen@newegg.com; Gavin.J.Li@newegg.com"
             cc = "betty.l.zheng@newegg.com;frank.s.wang@newegg.com"#"Max.P.Shaw@newegg.com; Andrew.H.Lu@newegg.com; Frank.S.Wang@newegg.com; Betty.L.Zheng@newegg.com; Seven.H.Huang@newegg.com"
             for team in $scope.supportTeamData
                if team.value == $scope.entity.supportTeam
                    to = team.mailTo
                    cc = team.cc
                    break
             subject = $scope.entity.title
             comment =  $scope.entity.comment.replace(/\n/g,"<br>")
             teampContent = templateHtml.replace('[Content]',comment) 
             teampContent = teampContent.replace('[Time]',moment().format('MM/DD/YYYY HH:mm'))
             teampContent = teampContent.replace('[user]',common.currentUser.LoginName)
             if($scope.includeScreenshot==true)
               screenshotImgInfo ='<div style="border-bottom: 1px solid #E3E3E3; margin: 7px 0 2px 0; color: #8f918d; line-height: 12px;"><label><b style="font-size: 13px;">Screenshot</b></label></div>'
               screenshotImgInfo += '<p><a target="_blank" href="'+imgURL+'"><img src="'+imgURL+'" alt="" style="width: 100%; height: 100%;" ></img></a></p>'
               teampContent = teampContent.replace('[screenshotImg]',screenshotImgInfo)
             else
               teampContent = teampContent.replace('[screenshotImg]','')
             if($scope.includeBrowserInfo==true)
               browserInfo = '<p style="font-size:12px">'+getBrowserInfo().join('<br>')+'</p>'
               teampContent = teampContent.replace('[BrowserInformation]',browserInfo) 
             else
               teampContent = teampContent.replace('[BrowserInformation]','')
             vendor = if common.currentUser.VendorNumber == '0' || common.currentUser.VendorNumber == 0 then 'Administrator' else (common.currentUser.VendorName + ' - ' + common.currentUser.VendorNumber)
             teampContent = teampContent.replace('[vendor]', vendor)
             body = teampContent
             if subject && subject.indexOf('seventest') >= 0
                to = 'seven.h.huang@newegg.com;Brent.X.Cheng@newegg.com;ruby.j.wang@newegg.com'
                cc = ''
             mail.sendMail(to,'', cc,subject,body,from, (isSucceed) ->
                if isSucceed
                  messager.success($translate("system.feedback.submit_succeed"))
                  $scope.entity.comment = ''
                  $scope.feedbackModal = false
                else
                  messager.error($translate("system.feedback.submit_error"))
             )
           )
       )
])