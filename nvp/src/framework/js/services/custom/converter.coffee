# CoffeeScript
negServices.factory 'converter',['$filter',($filter)->
       toMenus=(menuList)->
         if(!menuList)
           return [];
         tempMenu={}
         for menu in menuList
             tempMenu=toMenu(menu)  
             tempMenu.SubMenus=childMenus(menu)
             tempMenu   
     
       childMenus=(menu)->      
         if(menu.SubMenuList && menu.SubMenuList.length>0)
            for menu in menu.SubMenuList
              toMenu(menu)
         else []
         
       toMenu=(menuObj)->
         tempMenu=
         AuthResult:true            
         Icon:menuObj.Icon
         Url:menuObj.MenuURL
         MenuOrder:menuObj.MenuOrder
         IsVisible:menuObj.IsVisible 
         IsActived:menuObj.IsActived
         IsRelease:menuObj.IsVisible
         ApplicationId:menuObj.ApplicationId
         if(menuObj.MenuLocalizedResList && menuObj.MenuLocalizedResList.length > 0)
           setLanguages(tempMenu,menuObj.MenuLocalizedResList)         
         tempMenu 
          
       setLanguages=(menu,langs)->
         for langCode of NEG.languages
            tmpLang=$filter('filter')(langs,(lang)->
              return lang.LanguageCode.toLowerCase() is langCode.toLowerCase()
            )          
            if(tmpLang&&tmpLang.length>0)
              menuName=tmpLang[0].MenuName
            else
              if(langs&&langs.length > 0)
                menuName=$filter('filter')(langs,(lang)->
                  return lang.LanguageCode.toLowerCase() is 'en-us'
                )[0].MenuName    
              else
                menuName = ''    
            menu[langCode.toLowerCase()]=menuName
            
       
       convertFactory={}
       convertFactory.vendorPortal= (data)->
          menus:->
            toMenus(data.MenuList)             
   
       convert:(data)->
          vendorPortal:->
            factory=convertFactory['vendorPortal'];
            if(factory) then factory(data) else data
]