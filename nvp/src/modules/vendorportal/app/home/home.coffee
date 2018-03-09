angular.module('vp-home', [
  'ngRoute'
  'pascalprecht.translate'
]).config([
  '$translateProvider'
  ($translateProvider) ->
    $translateProvider.translations('en-us', resources.vendorportal.dashboard.us).translations('zh-cn', resources.vendorportal.dashboard.cn).translations 'zh-tw', resources.vendorportal.dashboard.tw
]).config([
  '$routeProvider'
  ($routeProvider) ->
    $routeProvider.when('/',
      templateUrl: '/modules/vendorportal/app/home/home.tpl.html'
      controller: 'HomeCtrl').when '/home',
      templateUrl: '/modules/vendorportal/app/home/home.tpl.html'
      controller: 'HomeCtrl'
]).controller 'HomeCtrl', [
  '$scope'
  '$rootScope'
  '$sce'
  '$filter'
  'messager'
  'common'
  '$translate'
  'latestUpdateAPI'
  'context'
  'customerReviewsAPI'
  'vendorSurveyAPI'
  'eimsAPI'
  ($scope, $rootScope, $sce, $filter, messager, common, $translate, latestUpdateAPI, context, customerReviewsAPI, vendorSurveyAPI, eimsAPI) ->
    agentVendorRefresh = undefined
    $scope.vendorType = 'admin'
    $scope.isAdmin = if common.currentUser.Type == 'Internal' then true else false
    $scope.actionItemList = null
    if common.pageInfo.isBackPage == true
      if common.pageInfo.home and common.agentVendorList.all and common.agentVendorList.all.length > 0
        common.currentUser.VendorNumber = common.pageInfo.home.lastVendorNumber
      common.pageInfo.isBackPage = false

    $scope.initData = ->
      if common.currentUser.VendorNumber == '0' or common.currentUser.VendorNumber == 0
        $scope.vendorType = 'admin'
        return
      if common.currentUser.VendorType == 'StockingPO'
        $scope.vendorType = 'nvf'
        return
      if common.currentUser.VendorType == 'ESD'
        $scope.vendorType = 'esd'
        return
      $scope.vendorType = 'vf'

    $scope.initData()
    $scope.isShowCustomerReviews = common.checkPageAuth('/customer-reviews')
    $scope.isShowLatestUpdate = common.checkPageAuth('/home')
    $scope.isShowVendorSurvey = common.checkPageAuth('/dashboard')
    $scope.ContractRequestTotal = 0
    $scope.isShowContractRequest = common.checkPageAuth('/query-program-contract')
    $scope.latestUpdateList = []

    $scope.loadActionItems = ->
      request = undefined
      request2 = undefined
      $scope.actionItemList = []
      request =
        action1: 'query'
        VendorNumber: common.currentUser.VendorNumber
        Status: 'Release'
      request.PagingInfo =
        'PageSize': 10
        'StartPageIndex': 0
        'EndPageIndex': 0
      if common.currentUser.VendorNumber == 0 or common.currentUser.VendorNumber == '0'
        return #request.VendorNumber = '0'
      if $scope.isShowVendorSurvey == true
        vendorSurveyAPI.search request, ((response) ->
          if response and response.Succeeded
            return $scope.actionItemList.push(
              text: 'Vendor Survey'
              value: response.TotalRecordCount
              type: 'survey')
          return
        ), (error) ->
          temp = undefined
      if $scope.isShowCustomerReviews == true
        request2 = angular.copy(request)
        delete request2.Status
        request2.FromDate = $filter('date')((new Date).setDate((new Date).getDate() - 365), 'yyyy-MM-dd')
        request2.ToDate = $filter('date')(new Date, 'yyyy-MM-dd')
        request2.ReplyStatus = 'NoReply'
        return customerReviewsAPI.search(request2, ((response) ->
          if response and response.Succeeded
            return $scope.actionItemList.push(
              text: 'Customer Reviews'
              value: response.TotalRecordCount
              type: 'customer')
          return
        ), (error) ->
        )
      return

    $scope.loadLatestUpdate = (vendorType) ->
      requestItem = undefined
      tempDate = undefined
      if !$scope.isShowLatestUpdate
        return
      tempDate = (new Date).toUTCString().replace('UTC', 'GMT')
      $scope.loadActionItems()
      requestItem =
        VendorNumber: common.currentUser.VendorNumber
        VendorType: vendorType
        CurrentDate: tempDate
        action: 'query'
      latestUpdateAPI.query requestItem, (response) ->
        if response and response.Succeeded
          if response.LatestUpdateBasicList != undefined
            return $scope.latestUpdateList = angular.copy(response.LatestUpdateBasicList)
        else
          return $scope.latestUpdateList = []
        return

    $scope.loadContractRequest = ->
      if common.currentUser.VendorNumber == 0 or common.currentUser.VendorNumber == '0'
        return
      requestItem = undefined
      if !$scope.isShowContractRequest
        return
      requestItem =
        action: 'contract'
        action1: 'query'
        ApplyStartDate: false
        ApplyEndDate: false
        BeginIndex: 1
        PageCount: 1
        vendorNumber: common.currentUser.VendorNumber
        Status: '003'
      eimsAPI.queryProgramContract requestItem, (response) ->
        if response and response.Succeeded
          $scope.ContractRequestTotal = response.TotalCount
        else
          $scope.ContractRequestTotal = 0

    $scope.loadContractRequest()
    if common.currentUser.VendorType == 'StockingPO'
      $scope.loadLatestUpdate common.currentUser.VendorType
    if common.currentUser.VendorType == 'VF'
      $scope.loadLatestUpdate common.currentUser.VendorType

    $scope.getTranslateTitle = (item) ->
      filterTranslateTitleArray = undefined
      if !item.TitleList or item.TitleList.length == 0
        item.Title = ''
        return ''
      filterTranslateTitleArray = $filter('filter')(item.TitleList, (i) ->
        i.LanguageCode.toLowerCase() == context.currentLanguage
      )
      if filterTranslateTitleArray.length == 0
        filterTranslateTitleArray = $filter('filter')(item.TitleList, (i) ->
          i.LanguageCode.toLowerCase() == 'en-us'
        )
      item.Title = filterTranslateTitleArray[0].Title

    $scope.search = ->
      tempVFVendorList = undefined
      vendors = undefined
      tempVFVendorList = angular.copy(common.agentVendorList['vf'])
      $scope.latestUpdateList = []
      vendors = $filter('filter')(tempVFVendorList, (i) ->
        i.vendorNumber == common.currentUser.VendorNumber
      )
      if vendors != undefined and vendors != null and vendors.length > 0
        $scope.loadLatestUpdate 'VF'
      else
        $scope.loadLatestUpdate 'StockingPO'
      $scope.loadContractRequest()

    if $scope.isAdmin and common.currentUser.VendorNumber != '0'
      $scope.search()
    $scope.titleEntity = {}
    $scope.contentEntity = {}
    $scope.ShowDatailModal = false
    $scope.attachmentList = []
    $scope.headerReleaseDate = '01/01/2008'
    
    $scope.trustAsHtml = (htmlStr) ->
       return $sce.trustAsHtml(htmlStr)

    $scope.showDetail = (item) ->
      requestItem = undefined
      requestItem = ID: item.ID
      $scope.attachmentList = []
      $scope.contentEntity = {}
      $scope.titleEntity = {}
      latestUpdateAPI.get requestItem, ((response) ->
        file = undefined
        filterContentArray = undefined
        filterTitleArray = undefined
        j = undefined
        len = undefined
        ref = undefined
        if response and response.Succeeded
          filterTitleArray = $filter('filter')(response.LatestUpdateInfo.TitleList, (i) ->
            i.LanguageCode.toLowerCase() == context.currentLanguage
          )
          if filterTitleArray.length == 0
            filterTitleArray = $filter('filter')(response.LatestUpdateInfo.TitleList, (i) ->
              i.LanguageCode.toLowerCase() == 'en-us'
            )
          filterContentArray = $filter('filter')(response.LatestUpdateInfo.ContentList, (i) ->
            i.LanguageCode.toLowerCase() == context.currentLanguage
          )
          if filterContentArray.length == 0
            filterContentArray = $filter('filter')(response.LatestUpdateInfo.ContentList, (i) ->
              i.LanguageCode.toLowerCase() == 'en-us'
            )
          $scope.titleEntity = angular.copy(filterTitleArray[0])
          $scope.contentEntity = angular.copy(filterContentArray[0])
          $scope.ShowDatailModal = true
          $scope.headerReleaseDate = response.LatestUpdateInfo.ReleaseDate
          ref = response.LatestUpdateInfo.AttachmentList
          j = 0
          len = ref.length
          while j < len
            file = ref[j]
            file.FileSize = (file.FileSize / 1048576).toFixed(3)
            j++
          if response.LatestUpdateInfo.AttachmentList
            return $scope.attachmentList = angular.copy(response.LatestUpdateInfo.AttachmentList)
        else
          messager.error 'Get item failed!'
          return $scope.attachmentList = []
        return
      ), (error) ->

    $scope.closeShowDatailModal = ->
      $scope.ShowDatailModal = false

    $scope.jumpToPage = (type) ->
      url = undefined
      url = 'customer-reviews'
      if type == 'survey'
        url = 'vendor-survey/' + common.currentUser.VendorNumber
        common.pageInfo.home = lastVendorNumber: common.currentUser.VendorNumber
        $rootScope.vendorPortalPrePage = '/home'
      else
        common.pageInfo.dashboard =
          jumpToCR: true
          lastVendorNumber: common.currentUser.VendorNumber
      common.navigate url

    $scope.jumpToEIMSPage = ->
      url = undefined
      url = 'query-program-contract/pm-approve'
      common.pageInfo.home = lastVendorNumber: common.currentUser.VendorNumber
      $rootScope.vendorPortalPrePage = '/home'
      common.navigate url

    agentVendorRefresh = ->
      filterNVFVendor = undefined
      filterVFVendor = undefined
      filterESDVendor = undefined
      if !common.agentVendorList
        return
      if common.agentVendorList.vf and common.agentVendorList.vf.length > 0
        filterVFVendor = $filter('filter')(common.agentVendorList.vf, (v) ->
          v.vendorNumber == common.currentUser.VendorNumber
        )
        if filterVFVendor and filterVFVendor.length > 0
          return $scope.vendorType = 'vf'
        else
          if common.agentVendorList.nvf and common.agentVendorList.nvf.length > 0
            filterNVFVendor = $filter('filter')(common.agentVendorList.nvf, (v) ->
              v.vendorNumber == common.currentUser.VendorNumber
            )
            if filterNVFVendor and filterNVFVendor.length > 0
              return $scope.vendorType = 'nvf'
            else
              if common.agentVendorList.esd and common.agentVendorList.esd.length > 0
                filterESDVendor = $filter('filter')(common.agentVendorList.esd, (v) ->
                  v.vendorNumber == common.currentUser.VendorNumber
                )
              if filterESDVendor and filterESDVendor.length > 0
                return $scope.vendorType = 'esd'
      return

    $rootScope.$on 'VendorChanged', (e, data) ->
      if common.currentUser.VendorNumber == '0' or common.currentUser.VendorNumber == 0
        return
      agentVendorRefresh()

    $scope.showFeedback = ->
      $rootScope.$broadcast 'ShowFeedback', ''

]
