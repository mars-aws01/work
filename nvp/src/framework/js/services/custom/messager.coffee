negServices.factory "messager", ->
  success : (msg) ->
    Messenger().post({ message : msg, type : 'success', showCloseButton : true })

  warning : (msg) ->
    Messenger().post({ message : msg, type : 'warning', showCloseButton : true })
    
  error : (msg) ->
    msg = 'Unauthorized.' if (msg == '401')
    Messenger().post({ message : msg, type : 'error', showCloseButton : true, delay : 600 })

  clear : ->
    Messenger().hideAll();

  confirm : (callback,msg) ->
    content = arguments[arguments.length - 1] || msg
    okFn = arguments[0] || callback
    cancelFn = arguments[arguments.length - 2]
    
    messenger = Messenger().post(
      message : content || "Do you want to continue?"
      id : "Only-one-message"
      showCloseButton : true
      actions :
        OK :
          label : "OK"
          phrase : "Confirm"
          delay : 60
          action : ->
            okFn&&okFn()
            messenger.cancel()
        cancel :
          action : ->
            cancelFn&&cancelFn()
            messenger.cancel()
    )

  prompt : (callback,msg) ->
    #todo

  notice : (option) ->
    $.gritter.add(option)