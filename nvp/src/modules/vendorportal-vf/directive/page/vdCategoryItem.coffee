angular.module("vdCategoryItem",[])
.directive("vdCategoryItem",["itemCreationAPI","common","$filter","itemCreation","publisher",(itemCreationAPI,common,$filter,itemCreation,publisher) ->
    restrict:'E'
    scope:{
        categoryId: '='
        subscribe: '='
        action: '='
    }
    template:"<div class=\"col-xs-12 no-padding\">
                        <span class=\"input-icon input-icon-right col-xs-12 no-padding\" >
                        <input ng-attr-id=\"{{ 'vfCategory' + id}}\" name=\"category\"
                             kendo-auto-complete
                             k-options=\"categoryOptions\" class=\"no-padding-top no-padding-bottom\"
                             ng-required=\"config.basic.ItemCategory.req && action == 'edit'\"
                             ng-model='categoryName'
                             ng-click=\"showAll_Category()\"
                             style=\"height:30px;width:100%;border-radius:0px !important;\" />
                         <div class=\"arrows-select arrows-down\" ng-click=\"showAll_Category()\"></div>
                         <!--<validtip for=\"category\" class=\"vp-validtip\"></validtip>-->
                     </div>"
    link: (scope, element, attr) ->
        scope.config= angular.copy(itemCreation.config)
        scope.id = scope.$id
        scope.ctrlId = attr.ctrlId
        scope.TempCategoryList = []

        scope.$watch 'categoryName',(newValue,oldValue)->
          if !newValue || newValue == ''
            delete scope.categoryId

        scope.showAll_Category = ->
              autocomplete = $('#vfCategory' + scope.id).data('kendoAutoComplete')
              autocomplete.popup.open()

        scope.categoryOptions = {
            dataTextField:'CategoryName'
            filter: "contains"
            highlightFirst: true
            placeholder: "Enter Keywords..."
            select: (e) ->
              dataItem = this.dataItem(e.item.index())
              scope.$apply ()-> scope.categoryId = dataItem.CategoryID
            change: (e) ->
              if(!e.sender._old)
                    delete scope.categoryId
                    return
              hasSameItem = false
              for item in scope.TempCategoryList
                if item.CategoryName.toLowerCase() == e.sender._old.toLowerCase()
                    scope.$apply ()-> scope.categoryId = item.CategoryID
                    hasSameItem = true
                    break
              if hasSameItem == false
                  scope.$apply ()-> delete scope.categoryId
        }

        scope.loadData_pm = ->
            requestItem = {
                action1: 'product-category'
            }
            itemCreationAPI.search requestItem
            ,(response)->
                if(response && response.Succeeded)
                  autoComplete = $("#vfCategory" + scope.id).data("kendoAutoComplete")
                  scope.TempCategoryList = $.grep(response.CategoryList, (e) ->
                        return e.CategoryName != 'Other'
                  )
                  .sort((a,b)->
                        categoryNameA = a.CategoryName
                        categoryNameB = b.CategoryName
                        if categoryNameA < categoryNameB
                            return -1
                        if categoryNameA > categoryNameB
                            return 1
                  )
                  tempOther = response.CategoryList.find((category)->
                        return category.CategoryName == 'Other'
                  )
                  if tempOther
                      scope.TempCategoryList.push(tempOther)
                  if autoComplete && autoComplete.dataSource
                     autoComplete.dataSource.data(scope.TempCategoryList)

        scope.loadData_pm()

        scope.clear = ()->
          $('#vfCategory' + scope.$id).data("kendoAutoComplete").value("")
          ds = $('#vfCategory' + scope.$id).data("kendoAutoComplete").dataSource
          ds.filter({})
          return

        scope.update = (categoryId)->
          if categoryId
            categoryList = $filter('filter')(scope.TempCategoryList, {CategoryID: categoryId}, true)
            if categoryList.length > 0
              $('#vfCategory' + scope.$id).data("kendoAutoComplete").value(categoryList[0].CategoryName)
            else
              $('#vfCategory' + scope.$id).data("kendoAutoComplete").value("")
          else
            $('#vfCategory' + scope.$id).data("kendoAutoComplete").value("")

        scope.pmSubscriber = (msg)->
          scope[msg.Callback](msg.Param) if scope.subscribe

        publisher.subscribe('vfCategory' + scope.ctrlId, scope.pmSubscriber)
])