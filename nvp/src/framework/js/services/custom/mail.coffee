negServices.factory('mail', ['$http', 'common', ($http, common) ->
  sendMail: (to, cc, bcc, subject, body, from, callback) ->
    if !to
      throw 'You must provider the Addressee!'
      return
    if !subject
      throw 'You must provider the Email subject!'
      return
    if !body
      throw 'You must provider the Email body!'
      return
    # From Required
    from = from || common.currentUser.LoginName
    if !from
      throw 'You must provider the Email Address!'
      return
    mailEntity = {
      'From': from
      'To': to
      'CC': cc
      'BCC' : bcc
      'Subject': subject
      'Body': body
      'IsNeedLog': false
      'Priority': 'Normal'
      'ContentType': 'Html'
      'MailType': 'Smtp'
      'SmtpSetting': {
        'SubjectEncoding': 'UTF8'
        'BodyEncoding': 'UTF8'
      }
    }
    # NEG.APIGatewayAddress 'https://apis.newegg.org'  http://d2web16:8300/framework/v1/mail
    $http.post('https://apis.newegg.com' + '/framework/v1/mail', mailEntity).success((data, status, headers, config) ->
      callback(data.IsSendSuccess) if typeof callback is 'function'
    ).error((data, status, headers, config) ->
      callback(false) if typeof callback is 'function'
    )
])