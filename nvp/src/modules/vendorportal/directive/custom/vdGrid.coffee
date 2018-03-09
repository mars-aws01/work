angular.module("vdGrid", ['ngSanitize','pascalprecht.translate'])
.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.vdgrid.us)
    .translations('zh-cn',resources.vendorportal.vdgrid.cn)
    .translations('zh-tw',resources.vendorportal.vdgrid.tw)
  ])
.directive "vdGrid", ["$compile","$rootScope","$window","$http","$translate","context","storage","common",($compile,$rootScope,$window,$http,$translate,context,storage,common) ->
      #
      #        ng-Options:         Data Grid的Options对象
      #        ng-Detail-Options:  Row Detail Data Grid 显示的Options对象
      #        refreshKey:         Datagrid 控件会通过此Key注册该事件，UI通过该事件通知触发Search加载
      #  
      restrict: "E" 
      template: ""     
      link: ($scope, $el, attrs) ->
        ######### Grid用户定制化 Start #########
        gridKeyPrefix = common.currentUser.LoginName+"_"+attrs.gid
        gridKey_columnHide = gridKeyPrefix + "_columnHide"
        
        getStorage_columnHideArray = ->
            localSettingsStr = storage.local.get(gridKey_columnHide)
            if localSettingsStr
              return localSettingsStr.split(",")
            return null
            
        saveStorage_columnVisbile = (fieldKey) ->
            hideColumns = getStorage_columnHideArray() 
            if hideColumns && hideColumns.indexOf(fieldKey) >= 0
                   hideColumns.splice(hideColumns.indexOf(fieldKey),1)
                   storage.local.set(gridKey_columnHide,hideColumns,{path:'/'})
                
        saveStorage_columnHide = (fieldKey) ->
            hideColumns = getStorage_columnHideArray() 
            if hideColumns && hideColumns.indexOf(fieldKey) < 0
                hideColumns.push(fieldKey)
                storage.local.set(gridKey_columnHide,hideColumns,{path:'/'})
            else
                storage.local.set(gridKey_columnHide,[fieldKey],{path:'/'})
        
        _columnVisbileHide = (columns) -> 
            hideColumns = getStorage_columnHideArray()  
            for column in columns
              if column.field && hideColumns && hideColumns.indexOf(column.field) >= 0
                 column.hidden = true  
        ######### Grid用户定制化 END #########
                          
        gridOptions = $.extend(
          height: 500
          toolbar: []
          columns: []
          sortable: true
          resizable: true
          reorderable: true
          messages: 
            commands:
                excel: $translate("export.excel")
                excelAll:$translate("export.excelAll")
          pageable:
            refresh: false
            pageSizes: [
              10
              20
              50
              100
            ]
            pageSize: 20
            buttonCount: 5
            messages: 
              first:$translate("pageable.first")
              last:$translate('pageable.last') 
              next: $translate('pageable.next')
              previous:$translate('pageable.previous') 
              refresh:$translate('pageable.refresh') 
              display: $translate('pageable.display')
              itemsPerPage: $translate('pageable.itemsPerPage')
              empty: $translate('pageable.empty')
          autoBind: false
          checkBoxColumn: false
        , $scope[attrs.ngOptions])
        $scope[attrs.ngOptions] = gridOptions
        isAutoHeight = attrs.autoHeight
        databoundCallback = angular.copy(gridOptions.dataBound)
        dataSourceReadCallback = !!gridOptions.dataSource and !!gridOptions.dataSource.transport and angular.copy(gridOptions.dataSource.transport.read)
       
        _columnVisbileHide(gridOptions.columns)
        
        #关闭双过滤
        gridOptions.filterable = { extra:false } if gridOptions.filterable == true
        
        _initKendoGrid = ->
          $kendoGrid = $el.find("#" + attrs.gid).data("kendoGrid")
          options = gridOptions
          options.pageable.pageSize = $kendoGrid.pager.pageSize()  if !!options.pageable and !!$kendoGrid
          
          options.dataBound = (e) ->
            if not e.sender.selectable? or e.sender.selectable is false
              $(e.sender.tbody).find("tr").on "mousedown", ->
                $(e.sender.tbody).find("tr").removeClass "selectedRow"
                $(this).addClass "selectedRow"
            if e.sender && e.sender.dataSource && e.sender.dataSource._total == -99
               _showEmptyRow $translate('pageable.timeout')
            else
               _showEmptyRow $translate('pageable.empty')
            databoundCallback e  if typeof (databoundCallback) is "function"

            
          if typeof (dataSourceReadCallback) is "function"
            options.dataSource.transport.read = (options) ->
              grid = $el.find("#" + attrs.gid).data("kendoGrid")
              
              #filter (clear) Action时不请求后台服务
              if grid.dataSource.isFilterAction == true
                options.success d:
                      results: grid.dataSource._data or []
                      __count: grid.dataSource._data.length 
                grid.dataSource.isFilterAction = false
                return
              if grid.dataSource.isFilterClearAction == true
                options.success d:
                      results: grid.dataSource._data or []
                      __count: if grid.dataSource._filter != null then grid.dataSource._data.length else grid.dataSource.totalCache
                grid.dataSource.isFilterClearAction = false
                return
              #纠正window弹出确认框导致的pageIndex不一致
              if options.data && grid.pager && grid.pager.dataSource && grid.dataSource.options.isExportAction != true
                if(options.data.page != grid.pager.dataSource._page || options.data.pageSize != grid.pager.dataSource._pageSize)
                   options.data.page = grid.pager.dataSource._page
                   options.data.pageSize = grid.pager.dataSource._pageSize
                   grid.dataSource.query({ page: grid.pager.dataSource._page, pageSize: grid.pager.dataSource._pageSize })
              _vdGrid.selectedAll = false
              options.data.isExportAction = grid.dataSource.options.isExportAction
              options.data.isExportAction_All = grid.dataSource.options.isExportAction_All
              #服务端排序设置
              if grid.dataSource.options.serverSorting and options.data.sort and options.data.sort.length>0
                 for col in grid.dataSource.options.fields when options.data.sort[0].field and col.sortfield and col.field==options.data.sort[0].field 
                     options.data.sort[0].field=col.sortfield
              #调用页面callback事件      
              dataSourceReadCallback options
              grid.dataSource.options.isExportAction = false 
              grid.dataSource.options.isExportAction_All = false
              _toggleLoading()
              _resetGrid()
          
          checkBoxColumn.locked = true if !attrs.ngDetailOptions        
          options.columns.unshift checkBoxColumn  if options.checkBoxColumn is true and $.grep(options.columns, (column, _) ->
            column.field is "_CheckBox"
          ).length is 0
          unless not options.columns
            _rowTemplateColumns = []
            mode = "rowTemplate"
            $.each options.columns, (_, column) ->
              unless not column.customTemplate
                _rowTemplateColumns.push column.customTemplate  unless column.hidden is true
              else
                mode = "template"
                false
            options.rowTemplate = kendo.template("<tr data-uid=\"#: uid #\">" + _rowTemplateColumns.join("") + "</tr>")  if mode is "rowTemplate"
          
          #获取Detail Template，如果没有就加载空模板
          detailOptions = if attrs.ngDetailOptions then eval("$scope." + attrs.ngDetailOptions)() else {}
          otherDetailTemplate = (if detailOptions.otherDetailTemplate then detailOptions.otherDetailTemplate else "")
          detailTemplate = (if !!attrs.ngDetailOptions then "<div style='margin:8px 20px 8px 0px;' k-detail-template><div kendo-grid k-options=\"" + attrs.ngDetailOptions + "(dataItem)\"></div> "+otherDetailTemplate+" </div>" else "")
          
          #编译执行 Data Grid, 绑定到当前Scope作用域，并渲染到HTML
          $el.html $compile("<kendo-grid id=\"" + attrs.gid + "\" options=\"" + attrs.ngOptions + "\" class=\"custom_k-grid col-xs-12 no-padding no-margin\">" + detailTemplate + "</kendo-grid>")($scope)
          
          _toggleLoading()  if options.autoBind is true
          
          _resizeGridWidth = ->
            if $("#" + attrs.gid).parents("div[class*='modal-body']").length > 0
              _setGridWidth "modal-body"
            else 
              _setGridWidth "main-content"  if $("#" + attrs.gid).parents("div.main-content").length > 0
          
          $(window).on "resize", ->
            if(isAutoHeight != "false")
              _autoGridHeight()
          
          
 ########################################## 公共函数列表 ##########################################

        #加载数据完毕后，重置滚动条置顶和判断特殊场景处理
        _resetGrid = ->
         timer = setInterval(->
                loadingMask = $el.find(".k-loading-mask")
                if loadingMask and loadingMask.length == 0
                   gridDataArea = $el.find(".k-grid-content")
                   gridDataArea.scrollTop 0
                   gridDataArea.scrollLeft 0
                   grid = $el.find("#" + attrs.gid).data("kendoGrid")
                   if(grid.dataSource._total > 0 && (!grid.dataSource._data || grid.dataSource._data.length == 0))
                     lastPageIndex = (grid.dataSource._total / grid.dataSource._pageSize)
                     if((grid.dataSource._total % grid.pager.dataSource._pageSize) > 0)
                       lastPageIndex += 1
                     if(lastPageIndex.toString().indexOf(".") >= 0)
                       lastPageIndex = 1
                     grid.dataSource.query({ page: lastPageIndex, pageSize: grid.pager.dataSource._pageSize })
                   grid.dataSource.totalCache = grid.dataSource._total
                   if(isAutoHeight != "false")
                     _autoGridHeight()
                   _changeLang() 
                   clearInterval timer
              ,100)
         
        #加载图标方法，用于请求API的时候移除框架级别的Loading效果
        _toggleLoading = ->
          timer = setInterval(->
            $('#target').hide()
            loadingMask = $el.find(".k-loading-mask")
            if loadingMask and loadingMask.length
              clearInterval timer
          )
          
       #用于显示空数据Row提示信息, 一般用于查询结果没有数据的时候调用
        _showEmptyRow = (msg) ->
          setTimeout (->
            $scope.$apply ->
              kendoGrid = $el.find("#" + attrs.gid).data("kendoGrid")
              if !!kendoGrid and !!kendoGrid.tbody
                $tbody = kendoGrid.tbody
                $tbody.append "<tr><td colspan='" + kendoGrid.columns.length + "' style='border:0px none; font-weight:bold;'>" + msg + "</td></tr>"  if $tbody.find("tr").length is 0
          ), 100
        
        #设置Data Grid 高度 
        _autoGridHeight = ->
          otherSubHeight = 60
          otherDataAreaSubHeight = 0
          fixedBottom = $(".fixed-bottom")
          if fixedBottom and fixedBottom.length > 0
            otherSubHeight += 45 
          else
            otherDataAreaSubHeight = 5
          grid = $("#" + attrs.gid)
          if attrs.gid == 'itemListGrid'
             otherDataAreaSubHeight += 2
          hasGroupHeader = false
          groupHeader =  grid.find('[rowspan="2"]')
          if(groupHeader && groupHeader.length > 0)
            hasGroupHeader = true
          gridDataArea = $el.find(".k-grid-content")
          rec = $el[0].children[0].getBoundingClientRect()
          if(rec.top == 0)
            return
          contentOffsetTop = rec.top
          grid.height $window.innerHeight - contentOffsetTop - otherSubHeight + (if hasGroupHeader then 10 else 0) + 5
          gridDataArea.height $window.innerHeight - contentOffsetTop - otherSubHeight - otherDataAreaSubHeight - 93 - (if hasGroupHeader then 20 else 0)
        
           
        #初始化渲染DataGrid，需要等待父级控件都生成之后再执行
        interval = setInterval(->
          if $scope.$$destroyed is true
            clearInterval interval
          else unless $el.parents("[data-role='window']:first").length is 0
            clearInterval interval
          else if $el.parent().is(":visible") is true
            clearInterval interval
            _initKendoGrid()
        , 10)
        
        #Data Grid生成之后的事件，可以添加委托注入这个事件中
        onLoadInterval = setInterval(->
          grid = $("#"+attrs.gid+"").data("kendoGrid")
          if grid
            clearInterval onLoadInterval
            grid.thead.find("[data-field=_CheckBox]>.k-header-column-menu").remove()
            if !grid.options.toolbar || grid.options.toolbar.length == 0
              grid.wrapper.find(".k-grid-toolbar").hide()
            else
              toolbarGenerator()
        , 1000)
        
        toolbarGenerator = ->
          $http.get('/modules/vendorportal/template/tpl_gridCustomMenu.html').success((templateHtml)->
              template = kendo.template(templateHtml)
              toolbar = ''
              grid = $("#"+attrs.gid+"").data("kendoGrid")
              templateData = []
              return if !grid || !grid.columns
              $.each grid.columns, (idx, item) ->
                if item.field 
                    tempItem = angular.copy(item)
                    tempItem.idx = item.field.replace(".","")
                    tempItem.gid = attrs.gid
                    templateData.push(tempItem)
                else
                   if item.columns
                     $.each item.columns, (idx2, item2) ->
                        if item2.field 
                            tempItem2 = angular.copy(item2)
                            tempItem2.idx = item2.field.replace(".","")
                            tempItem2.gid = attrs.gid
                            templateData.push(tempItem2)
                return
              toolbar = template(templateData) 
              toolbarPanel = $("#"+attrs.gid+" .k-grid-toolbar")[0]
              $(toolbarPanel).find('.k-grid-toolbar-CustomSettingMenu')[0].outerHTML = toolbar
             # toolbarPanel.innerHTML = toolbarPanel.innerHTML.replace('<a class="k-grid-toolbar-CustomSettingMenu"></a>',toolbar) 
              $(toolbarPanel).find("#grid_customMenu").kendoMenu();
              btnRestore = $(toolbarPanel).find(".edi-btn-restore")[0] 
              $(btnRestore).click (e) ->
                $.each templateData, (idx, item) ->
                    cbxColumn = $(toolbarPanel).find("#cfield-"+item.idx+"-"+attrs.gid)[0] 
                    cbxColumn.checked = true
                    grid.showColumn(item.field)
                    saveStorage_columnVisbile(item.field) 
                    
              $.each templateData, (idx, item) ->
                cbxColumn = $(toolbarPanel).find("#cfield-"+item.idx+"-"+attrs.gid)[0] 
                cbxColumn.checked = if item.hidden == true then false else true
                $(cbxColumn).click (e) ->
                  if e.currentTarget.checked == true
                    grid.showColumn(item.field)
                    saveStorage_columnVisbile(item.field)
                  else
                    grid.hideColumn(item.field)
                    saveStorage_columnHide(item.field)
                return
          )
          
        
        

          
        #注册刷新事件
        $scope.$on attrs.refreshKey, (e,pagging) ->
          $kendoGrid = $el.find("#" + attrs.gid).data("kendoGrid")
          if pagging
            $kendoGrid.dataSource.query(pagging)
          else
            $kendoGrid.dataSource.query({ page: 1, pageSize: 20 })
       
         #grid控件的footer多源
        $scope.$on "chageLanguage",() ->
           _changeLang()
           
        _changeLang = ->
            $kendoGrid = $el.find("#" + attrs.gid).data("kendoGrid")
            if !$kendoGrid
                return
            html = kendo.format($translate("pageable.display"),($kendoGrid.dataSource._page - 1) * $kendoGrid.dataSource._pageSize + 1, Math.min($kendoGrid.dataSource._page * $kendoGrid.dataSource._pageSize, $kendoGrid.dataSource._total), $kendoGrid.dataSource._total);
            if $kendoGrid.dataSource._total>0
              $el.find(".k-pager-info").html(html)
            else if $kendoGrid.dataSource._total == -99
              $el.find(".k-pager-info").html('')
            else
              $el.find(".k-pager-info").html($translate("pageable.empty"))
            pager = $el.find("div[data-role='pager']")
            pager.find("a[class*=k-pager-nav]:eq(0)").attr("title",$translate("pageable.first"))
            pager.find("a[class*=k-pager-nav]:eq(1)").attr("title",$translate("pageable.previous"))
            pager.find("a[class*=k-pager-nav]:eq(2)").attr("title",$translate("pageable.next"))
            pager.find("a[class*=k-pager-nav]:eq(3)").attr("title",$translate("pageable.last"))
            pager.find("a[class*=k-pager-refresh]").attr("title",$translate("pageable.refresh"))
            $el.find(".k-pager-sizes").find("span[lang=_itemPerPage]").html($translate("pageable.itemsPerPage"))
            #toolbar
            $el.find("div[class^=k-header]").find("a[class$='k-grid-excel-current']").find('span:eq(1)').html($translate("export.excel"))
            $el.find("div[class^=k-header]").find("a[class$='k-grid-excel-all']").find('span:eq(1)').html($translate("export.excelAll"))
            #$kendoGrid.options.pageable.messages.display=$translate("pageable.display")
        
        #Data grid Checkbox column 模板和全选/单选事件 
        checkBoxColumn =
          headerTemplate: "<input id='checkBoxAll' style=\"margin-left: 1px;\" type='checkbox' ng-model='_vdGrid.selectedAll' ng-change='_vdGrid.checkAll()' />"
          sortable: false
          width: "28px"
          template: "<input id='checkBoxSingle' style=\"margin-left: 3px;margin-top: 7px;\" type=\"checkbox\" ng-model=\"dataItem.selected\" ng-change=\"_vdGrid.checkSingle(dataItem)\" ng-hide=\"dataItem.selected == 'hidden'\" ng-disabled=\"dataItem.selected == 'disabled' || dataItem.disabled == 'disabled'\" />"
          customTemplate: "<td><input type=\"checkbox\" ng-model=\"dataItem.selected\" ng-change=\"_vdGrid.checkSingle(dataItem)\" ng-hide=\"dataItem.selected == 'hidden'\" ng-disabled=\"dataItem.selected == 'disabled' || dataItem.disabled == 'disabled'\" /></td>"

        _vdGrid = $scope._vdGrid =
          selectedAll: false
          checkSingle: (item) ->
            if item.selected is false
              _vdGrid.selectedAll = false
            else
              dataItems = $el.find("#" + attrs.gid).data("kendoGrid").dataItems()
              _vdGrid.selectedAll = true  if $.grep(dataItems, (item, _) ->
                item.selected is true
              ).length is dataItems.length
           

          checkAll: ->
            $.each $el.find("#" + attrs.gid).data("kendoGrid").dataItems(), (_, item) ->
              item.selected = _vdGrid.selectedAll  if item.selected isnt "hidden" and item.selected isnt "disabled" and item.disabled isnt "disabled"
              tempIndex = 1
              
          getSelectedItems: ->
            result = []
            $.each $el.find("#" + attrs.gid).data("kendoGrid").dataItems(), (_, item) ->
              result.push(angular.copy(item)) if item.selected 
          
]





#    kendo.data.binders.widget.columns = kendo.data.Binder.extend(refresh: ->
#      value = @bindings['columns'].get()
#      @element.setOptions columns: value.toJSON
#      @element._columns value.toJSON()
#      @element._templates()
#      @element.thead.empty()
#      @element._thead()
#      @element._renderContent @element.dataSource.view()
#      return
#    )
#