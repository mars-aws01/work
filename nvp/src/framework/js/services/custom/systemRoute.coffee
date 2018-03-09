negServices.factory "systemRoute", ["authorize", "userProfile", (authorize, userProfile) ->
  addMostUsed : (routePath)->
    if routePath and routePath.length > 0
      menu = routePath[routePath.length-1]
      if !@isFrameworkPage(menu.Url)
        mostUsed = userProfile.get("most-used-menus") || {}
        if !mostUsed[menu.Url]
          mostUsed[menu.Url]=0
        mostUsed[menu.Url]++
        userProfile.set("most-used-menus", mostUsed)

  buildMenuTree: ->
    data = authorize.menus || []
    @getHasSub(data)
    return data

  getHasSub : (menus) ->
    return if !menus or !menus.length
    for m in menus
      m.HasSubMenus = @hasSubMenus(m)
      @getHasSub(m.SubMenus)

  hasSubMenus : (menu) ->
    if !menu.SubMenus or menu.SubMenus.length is 0
      return false
    for m in menu.SubMenus
      return true if m.IsVisible
    return false

  generateRoute : (currentPath, menus)->
    routePath = []
    if menus? and menus.length > 0
      result = @findPath routePath, menus, currentPath
      if result is true
        for item in routePath
          item.isSelected = true
          item.isOpen = item.isSelected and (item.HasSubMenus||(item.SubMenus&&item.SubMenus.length>0))
    return routePath

  findPath : (routePath, menus, url) ->
    for menu in menus
      #modify by clark for support dynamic route.
      if menu.Url? and (menu.Url.toLowerCase() is url.toLowerCase() or url.toLowerCase().indexOf(menu.Url.toLowerCase())>=0)
        routePath.push menu
        return true
      else if menu.SubMenus? and menu.SubMenus.length > 0
        routePath.push menu
        if @findPath(routePath, menu.SubMenus, url) is true
          return true
        else
          routePath.pop()
    return false

  menuEquals : (m1, m2)->
    if not m1? and not m2?
      return true
    else if not m1? or not m2
      return false
    else
      return m1["en-us"] is m2["en-us"] and m1["zh-cn"] is m2["zh-cn"] and m1["zh-tw"] is m2["zh-tw"] and m1.Url is m2.Url


  #Special pages
  FrameworkInnerPages:[
    {
      "Icon": "icon-home",
      "en-us": "Home",
      "zh-cn": "首页",
      "zh-tw": "首頁",
      "Url": "/"
    },
    {
      "en-us": "Setting",
      "zh-cn": "设置",
      "zh-tw": "設置",
      "Url": "/system/setting"
    },
    {
      "en-us": "401",
      "zh-cn": "401",
      "zh-tw": "401",
      "Url": "/401"
    },
    {
      "en-us": "404",
      "zh-cn": "404",
      "zh-tw": "404",
      "Url": "/404"
    },
    {
      "en-us": "loading",
      "zh-cn": "loading",
      "zh-tw": "loading",
      "Url": "/loading"
    },
    {
      "en-us": "login",
      "zh-cn": "login",
      "zh-tw": "login",
      "Url": "/login"
    }
  ]

  isFrameworkPage: (path, routePath)->
    for page in @FrameworkInnerPages
      if page.Url is path
        routePath.push page if routePath?
        return true
    return false
]