angular.module('nvp-product-reviews',['ngRoute'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/product-reviews",
      templateUrl: "/modules/vendorportal-nvf/app/reviews/product-reviews.tpl.html"
      controller: 'ProductReviewsCtrl'
    .when "/product-reviews/:vendorNumber/:itemNumber",
      templateUrl: "/modules/vendorportal-nvf/app/reviews/product-reviews.tpl.html"
      controller: 'ProductReviewsCtrl'
])
.controller('ProductReviewsCtrl',
["$scope","common","customerReviewsAPI","messager","$fileUploader","$filter","$routeParams","$route","$location","$translate",
($scope,common,customerReviewsAPI,messager,$fileUploader,$filter,$routeParams,$route,$location,$translate) ->
   
    if(!$routeParams.vendorNumber)
      message.error('Vendor Number not be empty.')
      return
    if(!$routeParams.itemNumber)
      message.error('Item Number not be empty.')
      return
   
    $scope.common = common

    $scope.cbx_statusList = [
        {text:'status_customer_reviews.NoReply', value:'NoReply'}
        {text:'status_customer_reviews.Draft', value:'Draft'}
        {text:'status_customer_reviews.Pending', value:'Pending'}
        {text:'status_customer_reviews.Approved', value:'Approved'}
        {text:'status_customer_reviews.Declined', value:'Declined'}      
    ]
    
    $scope.cbx_sortList = [
        {text: $translate('sort_customer_reviews.Date'), value: {SortField: "PostDate", SortType: "desc"}}
        {text: $translate('sort_customer_reviews.Highest'), value:{SortField: "Rating", SortType: "desc"}}
        {text: $translate('sort_customer_reviews.Lowest'), value:{SortField: "Rating", SortType: "asc"}}
    ] 
    
    $scope.cbx_pageSizeList = [
        {text:'5', value: 5},
        {text:'10', value: 10},
        {text:'15', value: 15},
        {text:'20', value: 20},
        {text:'25', value: 25},
    ]
    
    #页面参数
    $scope.query = {
       KeyWordType : 'ItemNumber'
       KeyWord: $routeParams.itemNumber
       SortInfo: angular.copy($scope.cbx_sortList[0].value)
       VendorNumber: $routeParams.vendorNumber
       ProductReviewQuery: true
    } 
   
    #查询
    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging_list($scope.query.PagingInfo)
        $scope.query.PagingInfo.totalCount = 0
        
    $scope.getRequestItem = ->
        requestItem = angular.copy($scope.query)
        requestItem.action1 = 'query'
        requestItem.VendorNumber = $routeParams.vendorNumber
        return requestItem
    
    $scope.loadRatingChecked = ->
       return if !$scope.currentQuery.SelectedRating   
       for item in $scope.ratingSummaryList
          if $scope.currentQuery.SelectedRating.indexOf(item.Rating) >= 0
             item.isChecked = true 
    
    $scope.queryAPI = (currentQuery) ->
        requestItem = if currentQuery then currentQuery else $scope.getRequestItem()
        $scope.currentQuery = angular.copy(requestItem)
        customerReviewsAPI.search requestItem
        ,(response) ->
            if(response&&response.Succeeded) 
               $scope.getRatingSummary_ByAll($scope.currentQuery,response) 
               if !$scope.productReviewSummary
                  $scope.productReviewSummary = response.ProductReviewSummary
               $scope.reviewList = response.ReviewList 
               $scope.ratingSummaryList = response.RatingSummaryList 
               $scope.query.PagingInfo.totalCount = response.TotalRecordCount
               $scope.loadRatingChecked()
            else
                $scope.getRatingSummary_ByAll($scope.currentQuery,response)  
                $scope.reviewList = [] 
                $scope.ratingSummaryList = []
                $scope.query.PagingInfo.totalCount = 0
                $scope.currentQuery.PagingInfo.totalCount = 0
        ,(error) ->
            $scope.getRatingSummary_ByAll($scope.currentQuery,null)
            $scope.productReviewSummary ={}
            $scope.reviewList = [] 
            $scope.ratingSummaryList = []
            $scope.query.PagingInfo.totalCount = 0
            $scope.currentQuery.PagingInfo.totalCount = 0
            
    $scope.getRatingSummary_ByAll = (currentQuery,response) ->
        if currentQuery.PagingInfo.startpageindex != 0
           return
        requestItem = angular.copy(currentQuery)
        delete requestItem.SelectedRating
        if $scope.ratingSummaryList
           $scope.lastRatingSummaryList = angular.copy($scope.ratingSummaryList)
           $scope.currentSelectRating = $filter('filter')($scope.ratingSummaryList,(r) -> r.isChecked == true)
        if(response&&response.Succeeded)             
            $scope.ratingSummaryList = response.RatingSummaryList 
            if !$scope.ratingSummaryList || $scope.ratingSummaryList.length == 0 
                if $scope.lastRatingSummaryList
                    $scope.ratingSummaryList = $scope.lastRatingSummaryList  
                else 
                    $scope.ratingSummaryList = angular.copy(defaultRatingSummaryList) 
            else
                if $scope.currentSelectRating && $scope.currentSelectRating.length > 0
                    for r in $scope.ratingSummaryList
                        tempFilter = $filter('filter')($scope.currentSelectRating,(c) -> c.Rating == r.Rating)
                        r.isChecked = true if tempFilter && tempFilter.length > 0                 
    $scope.search = ->
        messager.clear()
        $scope.preparePaging()
        $scope.queryAPI()
    
    $scope.isEditing = ->
        if $scope.reviewList and $scope.reviewList.length >0
            items = (item for item in $scope.reviewList when item.isChanged is true)
            if items and items.length > 0
                return true
            else
                return false
        else
            return false
            
    #Rating Filter 
    $scope.ratingStars = {}
    $scope.getPercentage = (data) ->
        return { "width": data.Percentage + "%" }
        
    $scope.setQueryRating = ->
        tempQueryRatings = []
        for item in $scope.ratingSummaryList
          if item.isChecked == true
             tempQueryRatings.push(item.Rating)
        if tempQueryRatings.length > 0
           $scope.currentQuery.SelectedRating = tempQueryRatings if $scope.currentQuery
           $scope.query.SelectedRating = tempQueryRatings if $scope.query
        else
           delete $scope.currentQuery.SelectedRating if $scope.currentQuery
           delete $scope.query.SelectedRating if $scope.query
    
    #Status Filter   
    $scope.setQueryStatus = ->
        tempQueryStatus = []
        for item in $scope.cbx_statusList
          if item.isChecked == true
             tempQueryStatus.push(item.value)
        if tempQueryStatus.length > 0
           $scope.currentQuery.SelectedReplyStatusType = tempQueryStatus if $scope.currentQuery
           $scope.query.SelectedReplyStatusType = tempQueryStatus if $scope.query
        else
           delete $scope.currentQuery.SelectedReplyStatusType if $scope.currentQuery
           delete $scope.query.SelectedReplyStatusType if $scope.query
                                        
    #分页
    $scope.showPagination=->
        return false if !$scope.query || !$scope.query.PagingInfo || !$scope.query.PagingInfo.totalCount
        return $scope.query.PagingInfo.totalCount > $scope.query.PagingInfo.pageSize; 
   
    $scope.pageChanged = (page)->
       if $scope.isEditing()
            common.confirmBox $translate('confirm_customer_reviews.change'),"", ->
               $scope.pageChangedAction(page)
            ,->
                $scope.query.PagingInfo.currentPage = $scope.currentQuery.PagingInfo.currentPage
                $scope.$apply()                          
            return false
       else
            $scope.pageChangedAction(page)
    
    $scope.pageChangedAction =(page) ->
        $scope.currentQuery.PagingInfo.currentPage = page
        $scope.currentQuery.PagingInfo.startpageindex=page-1
        $scope.currentQuery.PagingInfo.endpageindex=page-1
        $scope.queryAPI($scope.currentQuery)
   
    #排序
    $scope.sortValue = $scope.cbx_sortList[0].value
    
    $scope.sortChange = ->
        if $scope.isEditing()
            common.confirmBox $translate('confirm_customer_reviews.change'),"", ->
               $scope.setSortInfo()
               $scope.queryAPI($scope.currentQuery)
            ,->
                if $scope.query.SortInfo
                    for s in $scope.cbx_sortList
                        if s.value.SortField == $scope.query.SortInfo.SortField && s.value.SortType == $scope.query.SortInfo.SortType
                            $scope.sortValue = s.value
                            break
                    $scope.$apply()                          
            return false
        else       
           $scope.setSortInfo()
           $scope.queryAPI($scope.currentQuery)
       
    $scope.setSortInfo = ->
       if !$scope.sortValue
          delete $scope.currentQuery.SortInfo if $scope.currentQuery
          delete $scope.query.SortInfo if $scope.query
          return
       $scope.currentQuery.SortInfo = $scope.sortValue if $scope.currentQuery
       $scope.query.SortInfo = $scope.sortValue  if $scope.query                  
         
    #pagesize changed
    $scope.pageSizeChanged = ->
        if $scope.isEditing()
            tmpPageSize = $scope.query.PagingInfo.pageSize
            $scope.query.PagingInfo.pageSize = $scope.currentQuery.PagingInfo.pageSize
            common.confirmBox $translate('confirm_customer_reviews.change'),"", ->
               $scope.query.PagingInfo.pageSize = tmpPageSize
               $scope.pageSizeChangedAction()
            ,->
                if $scope.query.PagingInfo
                    $scope.query.PagingInfo.pageSize = $scope.currentQuery.PagingInfo.pageSize
                    $scope.$apply()                          
            return false
        else     
            $scope.pageSizeChangedAction()
   
    $scope.pageSizeChangedAction = ->
        $scope.query.PagingInfo.startpageindex = 0
        $scope.query.PagingInfo.endpageindex = 0
        $scope.query.PagingInfo.pageSize = $scope.query.PagingInfo.pageSize
        $scope.query.PagingInfo.currentPage = 0 
        $scope.queryAPI(null)
   
     #Guide
    $scope.showUploadGuide=->
       $scope.uploadGuideModal = true
            
    $scope.closeUploadGuide=->
        $scope.uploadGuideModal = false  
        $('.modal-backdrop').remove()
        
    #Reply
    $scope.showReply = (item) ->
      item.replyItem={ 
         ReviewID:item.ReviewID,
         ItemNumber:item.ItemNumber,
         AttachmentList:[],
         LinkList:[] 
      }
      return if item.ReplyStatus == "N"
      requestItem = {
        action1 : 'reply'
        ReviewID: item.ReviewID
        VendorNumber: $routeParams.vendorNumber
      }
      customerReviewsAPI.getReply requestItem,
      (response) ->
          if(response&&response.Succeeded)  
              item.replyItem.AttachmentList = response.Reply.AttachmentList
              item.replyItem.LinkList = response.Reply.LinkList
              item.replyItem.LinkList = [] if !item.replyItem.LinkList 
              for link in item.replyItem.LinkList
                  link.isValid = true
              item.replyItem.Content = response.Reply.Content
              item.replyItem.AuditMemo = response.Reply.AuditMemo
              item.replyItem.ReviewReplyID = response.Reply.ReviewReplyID
              item.replyItem.TimeStamp = response.Reply.TimeStamp
              
    $scope.replyStatus = ""
    
    $scope.saveReply = () ->
       $scope.replyStatus = "Draft"
               
    $scope.submitReply = () ->
       $scope.replyStatus = "Approved"
       
    $scope.checkReply = (item) ->
       if !item.replyItem.Content || item.replyItem.Content.trim() == ''
          messager.warning($translate('warning_customer_reviews.contentEmpty'))
          return false
       if item.replyItem.AttachmentList
           inValidFileList = (f for f in item.replyItem.AttachmentList when !f.Title || f.Title.trim() == '')
           if inValidFileList and inValidFileList.length > 0
              messager.warning($translate('warning_customer_reviews.fileEmpty'))
              return  false 
       if item.replyItem.LinkList       
           inValidList = (link for link in item.replyItem.LinkList when !link.isValid)
           if inValidList and inValidList.length > 0
              messager.warning($translate('warning_customer_reviews.linkValid'))
              return  false
           inValidLinkList = (link for link in item.replyItem.LinkList when !link.Title || link.Title.trim() == '')
           if inValidLinkList and inValidLinkList.length > 0
              messager.warning($translate('warning_customer_reviews.linkEmpty'))
              return  false   
       return true
   
    $scope.linkWrapper = (hyperLink)->
        if hyperLink
            tmpLink = hyperLink.toLowerCase()
            if tmpLink.indexOf('http') is 0 or tmpLink.indexOf('https') is 0 or tmpLink.indexOf('ftp') is 0
                return hyperLink
            else
                return 'http://' + hyperLink
        else
            return hyperLink

    $scope.deleteReply = (item,index) ->
       confirmMsg = "Are you sure you want to delete this reply?"
       common.confirmBox confirmMsg,"", ->
           requestItem = angular.copy(item.replyItem)
           requestItem.action1 = 'reply'
           requestItem.DeleteMark = '1'
           requestItem.VendorNumber = common.currentUser.VendorNumber
           requestItem.Status = if item.ReplyStatus == 'A' then "Approved" else "Draft"
           succeedMsg = 'Delete this reply has been successful.'
           $scope.updateReply(requestItem,succeedMsg,item)
       return false 
	                 
    $scope.reply = (item) ->
       return if $scope.checkReply(item) == false
       confirmMsg = ''
       if $scope.replyStatus == "Pending"
           confirmMsg = $translate('confirm_customer_reviews.submit')
       else
           confirmMsg = $translate('confirm_customer_reviews.saveDraft')
       common.confirmBox confirmMsg,"", ->
           requestItem = angular.copy(item.replyItem)
           if requestItem.LinkList
              for link in requestItem.LinkList
                link.HyperLink = $scope.linkWrapper(link.HyperLink)
            
           requestItem.action1 = 'reply'
           requestItem.VendorNumber = $routeParams.vendorNumber
           requestItem.Status = $scope.replyStatus
           succeedMsg = $translate('success_customer_reviews.save')
           if $scope.replyStatus == "Pending"
              succeedMsg = $translate('success_customer_reviews.submit')
           if item.ReplyStatus == "N"
              $scope.createReply(requestItem,succeedMsg)  
           else
              $scope.updateReply(requestItem,succeedMsg)
        return false
             
    $scope.createReply = (item,succeedMsg) ->
       customerReviewsAPI.createReply item,
       (response) ->
          if(response&&response.Succeeded)
              showMsg(succeedMsg,response)
              $scope.queryAPI($scope.currentQuery)
           else
              showMsg($translate('error_customer_reviews.add_reply'),response)  
              
    $scope.updateReply = (item,succeedMsg,orignItem) ->    
       customerReviewsAPI.updateReply item,
       (response) ->
           if(response&&response.Succeeded)  
              showMsg(succeedMsg,response)
              if orignItem
                 orignItem.isDeleted = true
              else
                 $scope.queryAPI($scope.currentQuery)
           else
              showMsg($translate('error_customer_reviews.edit_reply'),response)
              
    #clear
    $scope.clear = (replyItem) ->
        return if !replyItem
        common.confirmBox $translate('confirm_customer_reviews.clear'),"", ->
            replyItem.LinkList=[]
            replyItem.AttachmentList=[]  
            replyItem.Content=''
            $scope.$apply()
        return false
        
    #上传文件
    $scope.currentUploadItem = {}
    $scope.url = "defaultUrl.html"
    $scope.uploadurl = ""
    $scope.uploadHeader=common.initHeader(common.currentUser)
    
    
    $scope.setCurrentUploadItem = (item) ->
       $scope.currentUploadItem = item     
     
    $scope.removeUploadFile = (item, index) ->
        item.replyItem.AttachmentList.splice(index,1)
        item.isChanged=true
        
    uploader=$scope.uploader=$fileUploader.create({
            scope: $scope
            url: $scope.uploadurl
            headers:$scope.uploadHeader
            removeAfterUpload:true
            queueLimit: 5
            autoUpload: true
            filters: [
                      (item)->    
                            messager.clear()         
                            valid=false
                            extensionName = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase()                       
                            if(extensionName in ['pdf','txt','jpg','gif','rar','doc','xls','ppt','html','htm','bmp'])
                                valid=true
                            if(valid==false)
                                messager.warning($translate('warning_customer_reviews.uploadCheck_1'))
                            if((item.size / 1024 / 1024) > 5)
                                messager.warning($translate('warning_customer_reviews.uploadCheck_2'))
                                valid=false
#                            if(item.size == 0)
#                                messager.warning($translate('warning_customer_reviews.uploadCheck_3'))
#                                valid=false
                            uploader.url = common.apiURL.customerReviewsUpload+ "?filename="+encodeURIComponent(item.name)+"&DFISFileGroup=VendorPortalAttachment&DFISFileType=ReviewReply&GenerateUniqueSuffix=true&format=json";
                            clearUploadfileInput()
                            return valid
                     ]    
      })
  
    uploader.bind('success', (event, xhr, item, msg) -> 
          #  uploader.queue[0].isUploading=false
            clearUploadfileInput()
            if(msg.Succeeded)       
                $scope.uploadSuccessProcess(msg)
            else
               if msg.ResponseCode is 'Authorization expired'
                    messager.error("The provided authorization information has expired,please login again.")        
               else
                    messager.error($translate('error_customer_reviews.upload'))
    )

    uploader.bind('error', (event, xhr, item, msg) ->
            clearUploadfileInput()
            if(msg&&msg.data)
                messager.error($translate('error_customer_reviews.upload'),msg.data)   
            else
                messager.error($translate('error_customer_reviews.upload'),msg)   
    )


    $scope.uploadSuccessProcess=(data)->
        return if !$scope.currentUploadItem
        if !$scope.currentUploadItem.replyItem.AttachmentList
           $scope.currentUploadItem.replyItem.AttachmentList = []
        $scope.currentUploadItem.replyItem.AttachmentList.push({
            Title: data.OriginalFileName.substring(0,data.OriginalFileName.lastIndexOf('.')).toLowerCase()
            SourceFileName: data.OriginalFileName
            TargetUrl: data.DownloadUrl
        })
        $scope.currentUploadItem.isChanged=true

    
    #Link   ^((https?|ftp|file)://)?([\w-]+\.)+[\w-]+(/[\w-./?%&=,]*)?$
    $scope.addLink = (item) ->
      if item.replyItem.LinkList && item.replyItem.LinkList.length > 4
        messager.warning($translate('warning_customer_reviews.linkMaxCount'))
        return
      item.replyItem.LinkList = [] if !item.replyItem.LinkList
      item.replyItem.LinkList.push({Title:"",HyperLink:""})
      item.isChanged=true
      
    $scope.removeLink = (item, index) ->
      item.replyItem.LinkList.splice(index,1)
      item.isChanged=true
      
    #refresh & back
    $scope.refresh = ->
        if $scope.isEditing()
            common.confirmBox $translate('confirm_customer_reviews.change'),"", ->
                $route.reload()
            return false
        else
            $route.reload()
       
    $scope.back = ->
      if $scope.isEditing()
          common.confirmBox $translate('confirm_customer_reviews.change'),"", ->
                common.pageInfo.isBackPage = true
                $location.path("/customer-reviews")
               # $window.history.go(-1)
                if(!$scope.$$phase) 
                    $scope.$apply()
          return false
      else
          common.pageInfo.isBackPage = true
          $location.path("/customer-reviews")
    
    $scope.backAction = ->
      common.pageInfo.isBackPage = true
      $location.path("/customer-reviews")
                    
    #私有函数
    showMsg = (oMsg,rep) ->
      return if !rep  
      if rep.Succeeded  
         messager.success(oMsg)   
      else
         if !rep.Errors || rep.Errors.length == 0
           messager.error(oMsg) 
           return
         messager.error(oMsg + " " +rep.Errors[0].Message)
         
    clearUploadfileInput = () ->
        return if !$scope.currentUploadItem || !$scope.currentUploadItem.ReviewID
        findElement = $("#fileInput_"+$scope.currentUploadItem.ReviewID)
        return if !findElement || findElement.length == 0
        btnFileInputRemove = findElement.find(".remove")[0]
        btnFileInputRemove.click()
    
    defaultRatingSummaryList = [{
		    "Rating": 5
		    "ReviewCount": 0
		    "Percentage": 0
	    }
	    {
		    "Rating": 4
		    "ReviewCount": 0
		    "Percentage": 0
	    }
	    {
		    "Rating": 3
		    "ReviewCount": 0
		    "Percentage": 0
	    }
	    {
		    "Rating": 2
		    "ReviewCount": 0
		    "Percentage": 0
	    }
	    {
		    "Rating": 1
		    "ReviewCount": 0
		    "Percentage": 0
	    }
	]  
	 
    #公共函数
    $scope.getOperationLabel = (status) ->
        return $translate('view_customer_reviews.ViewReply') if status == "R" || status == "A" 
        return $translate('view_customer_reviews.EditReply') if status == "P" || status == "D"
        return $translate('view_customer_reviews.Reply')
        
    $scope.getStatusDesc = (status) ->
       return $translate('status_customer_reviews.NoReply') if status == "N"
       return $translate('status_customer_reviews.Draft') if status == "P"
       return $translate('status_customer_reviews.Pending') if status == "R"
       return $translate('status_customer_reviews.Approved') if status == "A"
       return $translate('status_customer_reviews.Declined') if status == "D"
       return "Unknown" 
         
    $scope.checkReadonly = (item) ->
       return true if (item.ReplyStatus=='R' || (item.ReplyStatus=='A' && item.canEdit != true)) 
       return false 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    #页面初始化    
    $scope.init = ->
       $scope.preparePaging()      
       $scope.search()
       
    $scope.init()  
       
    $scope.$on "$locationChangeStart", (event,next,current) ->
        if next.indexOf("/customer-reviews") > 0 || next.indexOf("login") > 0
            return 
        if current.indexOf("/product-reviews") > 0 and $scope.isEditing()
            if(!confirm($translate('confirm_customer_reviews.change')))
                event.preventDefault()
                return false     
])