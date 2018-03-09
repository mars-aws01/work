negServices.factory "userProfile",
["$http", "$q", "$log", ($http, $q, $log) ->
  init: (userId) ->
    #Get user id from login server in future
    self = this
    self.userId = userId
    deferred = $q.defer()
    $http.get("#{NEG.APIGatewayAddress}/framework/v1/user-profile/#{NEG.DomainName}/#{userId}")
    .success (data)->
      if data? and data isnt ""
        self.profileData = data
      else
        self.set("system", defaultProfile.system)
      deferred.resolve "OK"
    .error (data)->
      deferred.reject "Error"

    deferred.promise

  get: (key)->
    if @profileData?
      data = profile.Value for profile in @profileData.Profiles when profile.Key is key
      try
        return JSON.parse(data)
      catch e
        return data

  set: (key, value)->
    value = JSON.stringify(value) if typeof value is "object"
    if not @profileData?
      @profileData =
        SystemName: NEG.DomainName
        UserId: @userId
        Profiles: []
    exists = false
    for profile in @profileData.Profiles
      if profile.Key is key
        profile.Value = value
        profile.LastEditDate = new Date()
        exists = true
        break;
    if !exists
      @profileData.Profiles.push
        Key: key
        Value: value
        LastEditDate: new Date()
    #Save to Cloud
    pushData =
      SystemName: NEG.DomainName
      UserId: @userId
      Profiles:
        [
          Key: key
          Value: value
          LastEditDate: new Date()
        ]
    $http.put("#{NEG.APIGatewayAddress}/framework/v1/user-profile", pushData)
    .success ->
        return
    .error (err)->
        $log.error err


  remove: (key)->
    if @profileData?
      for item,i in @profileData.Profiles
        if item.Key is key
          @profileData.Profiles.splice(i,1)
          break
    $http.delete("#{NEG.APIGatewayAddress}/framework/v1/user-profile/#{NEG.DomainName}/#{@userId}?key=#{key}")
    .success ->
        return
    .error (err)->
        $log.error err
]