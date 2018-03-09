negServices.factory "publisher", ->
    listeners = []

    subscribe : (name,callback)->
        listeners.push({Name:name, Callback: callback})

    publish : (name, msg)->
        angular.forEach(listeners,(value,key)->
            if value.Name == name
                value.Callback(msg)
        )
    clear : (name)->
        tempListeners = []
        tempListeners.push(listener) for listener in listeners when listener.Name == name
        for listener in tempListeners
            index = listeners.indexOf(listener)
            listeners.splice(index,1)
    
    clearAll:()->
        listeners = []
