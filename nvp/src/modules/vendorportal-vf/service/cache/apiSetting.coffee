angular.module("vf-cache-apiSetting", []).factory('apiSetting',
[() ->

 apiTimeOut={
    auth:15000
    retrieve:60000
    operation:90000
    max:6000000
    limit:15000
    queryLimit:60000
 }

 return {
       apiTimeOut
     }
     
])
