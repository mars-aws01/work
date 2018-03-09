angular.module("negMenu",[])

.directive("negMenu", ["$compile","$location","$rootScope","$filter","$window", ($compile,$location,$rootScope,$filter,$window) ->
  restrict: 'A',
  scope: {
    val: '='
    parent: '='
    top: '='
  }
  link: (scope, element, attrs, ngModel) ->
    init = (list) ->
      if list
        template = "<ul ng-attr-id='{{parent.$$hashKey}}' ng-style=\"cStyle\" ng-class=\"{'nav nav-list': !parent, 'submenu': parent}\" >
                       <li ng-repeat='menu in val' ng-init='getParent(menu, parent)' ng-class=\"{'active': menu.isSelected,'open': menu.isOpen, 'hsub': menu.HasSubMenus, 'hover': top}\" >
                          <a href='JavaScript:void(0)' 
                            ng-click='setToggle(menu, $event.target)' 
                            title='{{menu | menuLocalize}}' 
                            ng-class=\"{'dropdown-toggle':menu.HasSubMenus,'menu-active': menu.isSelected}\" 
                            ng-show='menu.IsVisible && menu.HasSubMenus'>
                            <i class='{{menu.Icon}}'></i>
                            <span class='menu-text'>{{menu | menuLocalize}} </span>
                            <i class='arrow icon icon-caret-down' style='color:#B1B5B8;font-size: 12px !important;'></i>
                          </a>
                          <div neg-menu val='menu.SubMenus' parent='menu' top='top' ng-if='menu.IsVisible && menu.HasSubMenus'></div>
                          <a href='javascript:void(0)' ng-click='toggleMenu(menu,$event)' title='{{menu | menuLocalize}}' ng-class=\"{'home-active':menu.isHome}\" ng-show='menu.IsVisible && !menu.HasSubMenus && menu.Url'>
                            <i class='{{menu.Icon}} bigger-130' ng-show=\"menu['en-us']=='Home'\"></i>
                            <i class='icon icon-caret-right bigger-140' style='color:#747E89;font-size: 20px !important' ng-show=\"menu['en-us']!='Home'\"></i>
                            <span class='menu-text'>{{menu | menuLocalize}}</span>
                          </a>
                        </li>
                    </ul>"
        $rootScope.refreshMenu()
        newElement = angular.element(template)
        $compile(newElement)(scope)
        element.replaceWith(newElement)
        #get the reference of new element(ul element)
        element = newElement	 
    scope.cStyle = {
        #"overflow-y":"auto"
        "height":($window.innerHeight - 140)+"px"
    }
    $(window).on "resize", ->
       scope.cStyle = {
            #"overflow-y":"auto"
            "height":($window.innerHeight - 140)+"px"
       }
  
    scope.setToggle = (menu, target)->
      if $rootScope.lastMenuID && menu.$$hashKey != $rootScope.lastMenuID
         $("#"+$rootScope.lastMenuID).css('display','none')
      if(menu.top == undefined)
        menu.top = true
      else
        menu.top = !menu.top
      if  menu.isSelected and menu.HasSubMenus  
        if(menu.isOpen)
          menu.isOpen = !menu.isOpen
        else
          menu.isOpen = true
      $rootScope.lastMenuID =  menu.$$hashKey      
    scope.toggleMenu=(menu,$event)->
        for menu1 in $rootScope.__menus
           if(menu1.SubMenus && menu1.SubMenus.length > 0)
             for sub in menu1.SubMenus
                 sub.isSelected = false
                 menu1.isSelected = false
        $rootScope.__menus[0].isHome = false
        if(menu.Url=='/home')
             $rootScope.__menus[0].isHome = true
        for menu1 in $rootScope.__menus
          isReset = true
          if(menu1.SubMenus && menu1.SubMenus.length > 0)
            filterItems = $filter('filter')(menu1.SubMenus, (sub) -> sub.Url == menu.Url)
            if(filterItems && filterItems.length > 0)
               isReset = false
               filterItems[0].isSelected = true
               menu1.isSelected = true
          if(isReset)
             menu1.top = undefined
        $location.path(menu.Url).replace();
        scope.$emit 'toggle.menu',menu
     
    scope.getParent = (menu, parent) ->
      return if !parent
      if($location.$$path == menu.Url)
        parent.top = true
      menu.Parent = angular.copy parent
      menu.Parent.SubMenus = null

    scope.$watch (->
      scope.val
    ), (newVal) ->
      init(newVal)
])




