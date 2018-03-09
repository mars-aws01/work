
negServices.factory 'storage',['$window',
  ($window)->
    storageFactory=
       local:->
          $window.localStorage
       session:->
          $window.sessionStorage   
       
    create=(storageName)->
      storage=(storageFactory[storageName]&&storageFactory[storageName]())||$.cookie
      
      set=(key,val,extend)->
       if(storage.setItem) 
         return storage.setItem(key,val)       
       extend||extend={path:'/'}
       storage(key,val,extend)
       
      get=(key,val,extend)->
       if(storage.getItem) 
         return storage.getItem(key,val)       
       extend||extend={path:'/'}
       storage(key,extend)
       
      del=(key)->
       if(storage.removeItem) 
         return storage.removeItem(key)       
       $.removeCookie(key)   
      
      set:set
      get:get
      del:del
    local:create('local')
    session:create('session')
    cookie:create('cookie')
]