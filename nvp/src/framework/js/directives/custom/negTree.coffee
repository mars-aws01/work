angular.module("negTree",[])

.directive("negTree",["$parse","$compile",($parse,$compile)->
  $.fn.changeTag = (tag)->
     replacement = $('<' + tag + '>')
     attributes = {}
     $.each(this.get(0).attributes,(index, attribute)->
         attributes[attribute.name] = attribute.value
     );
     replacement.attr(attributes)
     replacement.data(this.data())
     contents = this.children().clone(true)
     replacement.append(contents)
     this.replaceWith(replacement)
     return replacement
 
  tree = {
    restrict:"A"
    scope:true
    defaultOptions:{
      listNodeName    : 'ol',                                                             #The HTML element to create for lists (default 'ol')
      itemNodeName    : 'li',                                                             #The HTML element to create for list items (default 'li')
      rootClass       : 'dd',                                                             #The class of the root element .nestable() was used on (default 'dd')
      listClass       : 'dd-list',                                                        #The class of all list elements (default 'dd-list')
      itemClass       : 'dd-item',                                                        #The class of all list item elements (default 'dd-item')
      dragClass       : 'dd-dragel',                                                      #The class applied to the list element that is being dragged (default 'dd-dragel')
      handleClass     : 'dd-handle',                                                      #The class of the content element inside each list item (default 'dd-handle')
      collapsedClass  : 'dd-collapsed',                                                   #The class applied to lists that have been collapsed (default 'dd-collapsed')
      placeClass      : 'dd-placeholder',                                                 #The class of the placeholder element (default 'dd-placeholder')
      noDragClass     : 'dd-nodrag',                                                      #The class of the content element inside each list item
      emptyClass      : 'dd-empty',                                                       #The class used for empty list placeholder elements (default 'dd-empty')
      expandBtnHTML   : '<button data-action="expand" type="button">Expand</button>',     #The HTML text used to generate a list item expand button
      collapseBtnHTML : '<button data-action="collapse" type="button">Collapse</button>', #The HTML text used to generate a list item collapse button
      group           : 0,                                                                #group ID to allow dragging between lists
      maxDepth        : 0,                                                                #number of levels an item can be nested
      threshold       : 20,
      status          : "expand",                                                         #treeitem is collapsed when init
      allCollapse     : false,                                                            #all teeitem are  collapsed/expanded
      onCollapse      : null,                                                             #trigge a treeitem collapsed/expanded
      onDrag          : null,                                                             #trigge a treeitem drag event
      onDrop          : null,                                                             #trigge a treeitem drop event
    }
    controller:["$scope",($scope)->
      $scope.$negTree = {
        options:tree.defaultOptions
      }
    ]
    link:(scope,element,attrs,ctrl)->
      options = ($parse(attrs["negTree"]))(scope)
      if(options)
        for key of tree.defaultOptions
          if(!options.hasOwnProperty(key))
            options[key] = tree.defaultOptions[key]
      else
        options = tree.defaultOptions
      
      if(options.maxDepth > -1)
        options.maxDepth = Number(element.data("maxDepth"))
      else
        options.maxDepth = Number.MAX_VALUE
        
      scope.$negTree.options = options
      if(!element.hasClass(scope.$negTree.options.rootClass))
        element.addClass(scope.$negTree.options.rootClass)
      scope.$negTree.root    = element
      scope.$negTree.mapping = element.data("mapping")
      element.nestable(scope.$negTree.options)
      
      itemSetAttr = scope.$negTree.options.listNodeName + "." + 
        scope.$negTree.options.listClass
      itemAttr = scope.$negTree.options.itemNodeName + '.' + 
        scope.$negTree.options.itemClass
      hasTouch = 'ontouchstart' in window
      eStart   = if hasTouch then 'touchstart' else 'mousedown'
      eEnd     = if hasTouch then 'touchend' else 'mouseup'
      eCancel  = if hasTouch then 'touchcancel' else 'mouseup'
      onDrag = (e)->
        sender = $(e.target)
        if(sender.hasClass(scope.$negTree.options.handleClass))
          sender     = sender.parents(itemAttr)
          itemSet    = element.find("div." + scope.$negTree.options.placeClass).parents(itemSetAttr)
          parent     = sender.parents(itemAttr+":first")

          if(parent.length == 0)
            parent = $(itemSet[0])
          scope      = sender.scope()
          parentScope= parent.scope()
          dataName   = scope.$negTree.mapping[itemSet.length*2-1]
          dataItem   = ($parse(dataName))(scope)
          parentItem = ($parse(scope.$negTree.mapping[(itemSet.length-1)*2]))(parentScope)
              
          sender.attr("tree-drag",dataName)
          for item,i in parentItem
            if(item == dataItem)
              parentItem.splice(i,1)
              if(scope.$negTree.options.onDrag)
                scope.$negTree.options.onDrag(scope,{index:i,item:dataItem,parent:parentItem})
              break
      onDrop = (e)->
        treeItem = element.find(scope.$negTree.options.itemNodeName + "[tree-drag]")
        if(treeItem.length > 0)
          itemSet        = treeItem.parents(itemSetAttr)
          parentItem     = treeItem.parents(itemAttr+":first")

          if(parentItem.length == 0)
            parentItem = $(itemSet[0])
          parentScope    = parentItem.scope()
          childScope     = treeItem.scope()
          index          = (itemSet.length-1)*2
          childDataName  = treeItem.attr("tree-drag")
          
          if(index > scope.$negTree.template.index)
            if(scope.$negTree.mapping.length <= index)
              scope.$negTree.mapping = scope.$negTree.mapping.concat(scope.$negTree.template.mapping)
            parentDataName = scope.$negTree.mapping[scope.$negTree.template.index - 1]
            newItemData    = ($parse(scope.$negTree.mapping[scope.$negTree.template.index + 1]))(parentScope)
            ($parse(parentDataName)).assign(parentScope,newItemData)
            
          parentDataName = scope.$negTree.mapping[index]
          parentData     = ($parse(parentDataName))(parentScope)
          
          childData      = ($parse(childDataName))(childScope)
          
          treeItem.removeAttr("tree-drag")
          if(!parentData)  
            parentData = []
            $parse(parentDataName).assign(parentScope,parentData)
          
          itemIndex = treeItem.prevAll(itemAttr).length
          scope.$apply()
          treeItem.remove()
          if(scope.$negTree.options.onDrop)
            scope.$negTree.options.onDrop(scope,{index:itemIndex,item:childData,parent:parentData})
          scope.$apply(()->
            parentData.splice(itemIndex,0,childData)
            scope.$negTree.parentItem = parentItem
          )

      if(hasTouch) 
        element[0].addEventListener(eStart, onDrag, false);
        window.addEventListener(eEnd, onDrop, false);
        window.addEventListener(eCancel, onDrop, false);
      else
        element.bind(eStart, onDrag)
        $(window).bind(eEnd, onDrop)
      
      if(scope.$negTree.options.maxDepth == Number.MAX_VALUE)
        scope.$negTree.template = element.data("template")
      
      scope.$on("$destroy",()->
        if(hasTouch) 
          element[0].removeEventListener(eStart, onDrag, false);
          window.removeEventListener(eEnd, onDrop, false);
          window.removeEventListener(eCancel, onDrop, false);
        else
          element.unbind(eStart, onDrag)
          $(window).unbind(eEnd, onDrop)
        element.nestable("destroy")
      )
        
    compile:(element,attrs)->
      queue = []
      scope = angular.element(element).scope()
      customOptions = options = ($parse(attrs["negTree"]))(scope)
      newOptions    = tree.defaultOptions
      if(customOptions)
        newOptions = $.extend(true,tree.defaultOptions,customOptions)
      
      element.children().each((i,item)->
        queue.push(item)
      )
      maxDepth = 0
      mapping  = []
      allow2Mapping = false
      template = null
      while(queue.length > 0)
        child = $(queue.pop())
        name  = child.prop("tagName").toLowerCase()
        if(name == "tree-item")
          itemSet = child.parent(newOptions.listNodeName + "." + newOptions.listClass + ":first")
          if((expression = child.attr("ng-repeat")))
            match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/)
            if(match)
              if(itemSet.length > 0)
                mapping.push(match[2])
                mapping.push(match[1])
                if(itemSet.attr("tree-template") != undefined || allow2Mapping)
                  allow2Mapping == true
                  if(!template)
                    template = {mapping:[],index:mapping.length - 2}
                  if(match)
                    template.mapping.push(match[2])
                    template.mapping.push(match[1])
                
          newChild = child.changeTag(newOptions.itemNodeName)
          newChild.addClass(newOptions.itemClass)
          newChild.attr("tree-item","")
          child = newChild
        else if(name == "tree-itemset")
          newChild = child.changeTag(newOptions.listNodeName)
          newChild.addClass(newOptions.listClass)
          newChild.attr("tree-itemset","")
          child = newChild
          itemSet = newChild
          ++maxDepth;
          
        child.children().each((i,item)->
          queue.push(item)
        )
      if(template)
        template.value =  element.find("[tree-template]").clone(true)
        element.data("template",template)
      element.data("mapping",mapping)
      element.data("maxDepth",maxDepth)
      return tree.link
  }
  
  return tree
])
.directive("treeItemset",["$parse",($parse)->
  restrict:"A"
  link:(scope,element,attrs)->
    itemAttr = scope.$negTree.options.itemNodeName + '.' + 
      scope.$negTree.options.itemClass + ":first"
    itemSetAttr = scope.$negTree.options.listNodeName + "." + 
      scope.$negTree.options.listClass
    parent = element.parents(itemAttr)
    if(parent.length > 0)
      parent.find('[data-action="expand"],[data-action="collapse"]').remove()
      btnExpand = $(scope.$negTree.options.expandBtnHTML)
      btnCollapse = $(scope.$negTree.options.collapseBtnHTML)
      parent.prepend(btnExpand)
      parent.prepend(btnCollapse)
      clickHandle = (sender,status)->
        dataName   = scope.$negTree.mapping[sender.parents(itemSetAttr).length * 2 - 1]
        dataSource = ($parse(dataName))(scope)
        
        if(!dataSource.$$treeItem)
          dataSource.$$treeItem = {}
        dataSource.$$treeItem.status = status
      
      btnExpand.on("click",()->
        sender = $(this)
        scope.$apply(()->
          clickHandle(sender,"expand")
        )
      )
      
      btnCollapse.on("click",()->
        sender = $(this)
        scope.$apply(()->
          clickHandle(sender,"collapse")
        )
      )
      
      dataName   = scope.$negTree.mapping[parent.parents(itemSetAttr).length * 2 - 1]
      dataSource = ($parse(dataName))(parent.scope())
      if(dataSource)
        if(!dataSource.$$treeItem)
          dataSource.$$treeItem = {}
        if(!dataSource.$$treeItem.status)
          dataSource.$$treeItem.status = scope.$negTree.options.status
        setTimeout(()->
          status = dataSource.$$treeItem.status; 
          dataSource.$$treeItem.status = "normal"
          parent.scope().$apply()
          dataSource.$$treeItem.status = status
          parent.scope().$apply()
        ,0)
       
      scope.$on('$destroy', ()->
        btnExpand.remove()
        btnCollapse.remove()
      )
      element.parent().find(">" + itemSetAttr + ":not('.ng-scope')").remove()
])
.directive("treeItem",["$compile","$parse",($compile,$parse)->
  restrict:"A"
  link:(scope,element,attrs)->
    itemAttr = scope.$negTree.options.itemNodeName + '.' + 
      scope.$negTree.options.itemClass + ":first"
    itemSetAttr = scope.$negTree.options.listNodeName + "." + 
      scope.$negTree.options.listClass
      
    if(element.parents("[neg-tree]:first").length == 0)
        scope.$negTree.parentItem.append(element.parents(itemSetAttr+":first"))
    itemSet = element.parents(itemSetAttr)
    
    if(itemSet.length > 0)
      itemIndex = itemSet.length * 2 - 1
      if(scope.$negTree.mapping.length <= itemIndex)
           scope.$negTree.mapping = scope.$negTree.mapping.concat(scope.$negTree.template.mapping)
      dataName  = scope.$negTree.mapping[itemIndex]
      
      if(scope.$negTree.options.maxDepth == Number.MAX_VALUE && 
          scope.$negTree.template.index < itemIndex)
        newItemSet = scope.$negTree.template.value.clone(true)
        dataItem = ($parse(dataName))(scope)
        childItemName = scope.$negTree.mapping[scope.$negTree.template.index - 1]
        childScope = scope.$new(false)
        ($parse(childItemName)).assign(childScope,dataItem)
        newItemSet = $compile(newItemSet)(childScope)
        element.append(newItemSet) 
      
      collapseHandle = (status)->
        itemSet      = element.find(itemSetAttr+":first")
        btnCollapse  = element.find('>[data-action="expand"]')
        btnExpand    = element.find('>[data-action="collapse"]')
        if(itemSet.length > 0 && status != "normal")
          if(status == "collapse")
            btnCollapse.show()
            btnExpand.hide()
            itemSet.hide()
            element.removeClass(scope.$negTree.options.collapsedClass)
            element.addClass(scope.$negTree.options.collapsedClass)
          else
            btnCollapse.hide()
            btnExpand.show()
            itemSet.show()
            element.removeClass(scope.$negTree.options.collapsedClass)
        else
          btnCollapse.hide()
          btnExpand.hide()
          element.removeClass(scope.$negTree.options.collapsedClass)
        
        if(scope.$negTree.options.onCollapse)
          scope.$negTree.options.onCollapse(scope,($parse(dataName))(scope))
      
      $parse(dataName + ".$$treeItem").assign(scope,{})    
      scope.$watch("$negTree.options.allCollapse",(newVal,oldVal)->
        dataItem = ($parse(dataName))(scope)
        if(newVal != oldVal && dataItem && dataItem.$$treeItem)
          dataItem.$$treeItem.status = if newVal then "collapse" else "expand" 
      )
      
      scope.$watch(dataName + ".$$treeItem.status",(newVal,oldVal)->
        if(newVal != undefined)
          collapseHandle(newVal)   
      )
])

