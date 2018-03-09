negServices.config ["$provide", ($provide) ->
  $provide.decorator '$log', ["$delegate", "$window", "$injector", ($delegate, $window, $injector) ->
    _info = $delegate.info
    _error = $delegate.error
    _warn = $delegate.warn
    _debug = $delegate.debug
    log = (msg, logType) ->
      authorize = $injector.get("authorize")
      ip = if authorize.accountInfo? then authorize.accountInfo.IpAddress else ""
      userName = if authorize.accountInfo? then authorize.accountInfo.UserID else ""
      logEntry =
        CategoryName:NEG.LogCategory
        GlobalName: NEG.LogGlobal
        LocalName: NEG.LogLocal
        LogType: logType
        LogServerIP:ip
        LogUserName: userName
        ExtendedProperties:[
          Key: "Browser Information"
          Value: $window.navigator.appVersion
        ,
          Key: "Page Url"
          Value: $window.location.href
        ]
        Content:formatError(msg)
      $http = $injector.get("$http")
#      $http.post("#{NEG.APIGatewayAddress}/framework/v1/log-entry", logEntry)
#      .success (data)->
#          return
#      , (err)->
#          console.log err


    formatError = (arg) ->
      if arg instanceof Error
        if arg.stack?
          if arg.message? and arg.stack.indexOf(arg.message) is -1
            arg = "Error #{arg.message} \n #{arg.stack}"
          else
            arg = arg.stack
      arg

    $delegate.info = (msg)->
      _info(msg)
      log(msg, "I") if NEG.debug is false

    $delegate.error = (msg)->
      _error(msg)
      log(msg, "E") if NEG.debug is false

    $delegate.warn = (msg)->
      _warn(msg)
      log(msg, "A") if NEG.debug is false

    $delegate.debug = (msg)->
      _debug(msg)
      log(msg, "D") if NEG.debug is false

    return $delegate
  ]
]

