angular.module("formatFilters", [])

.filter("menuLocalize", ["context",(context)->
  (input) ->
    return input if !input
    input[context.currentLanguage]
])

.filter "isFuture", ->
  (input) ->
    new Date(input)>new Date()

.filter 'moment',->
    (input,format)->
      if(typeof input=='undefined')
        return null   
      return moment(input).format(format)

.filter "line", ->
  (input) ->
    return input if !input
    return input.replace(/\n/g,'<br />')

.filter 'fileSize', ->
  (bytes) ->
    return bytes if bytes==null or bytes==undefined
    return '' if typeof bytes isnt 'number'
    return (bytes / 1000000000).toFixed(2) + ' GB' if bytes >= 1000000000
    return (bytes / 1000000).toFixed(2) + ' MB' if bytes >= 1000000
    return (bytes / 1000).toFixed(2) + ' KB'

.filter 'fromNow', ->
    (input) ->
      return if input==null
      return if input==undefined
      moment(input).fromNow()
