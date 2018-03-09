angular.module('vp-cache-printer',[]).factory('printer', 
['$rootScope', '$compile', '$http', '$timeout', 'common', ($rootScope, $compile, $http, $timeout,common) ->
   printHtml = (html) ->
        hiddenFrame = $('<iframe style="display: none"></iframe>').appendTo('body')[0]
        hiddenFrame.contentWindow.printAndRemove = ->
            hiddenFrame.contentWindow.print()
            $(hiddenFrame).remove()
        htmlContent = "<!doctype html>"+
                    "<html>"+
                        '<body onload="printAndRemove();">' +
                            html +
                        '</body>'+
                    "</html>"

        if(navigator.appName == 'Microsoft Internet Explorer' || (navigator.appName == 'Netscape' && navigator.vendor != 'Google Inc.')) 
            disp_setting="toolbar=no,location=no,directories=no,menubar=no, scrollbars=no"
            printWindow = window.open("","",disp_setting)
            printWindow.document.write(htmlContent)
            printWindow.document.close()
            printWindow.focus()
            printWindow.print()
            printWindow.close()
        else 
            doc = hiddenFrame.contentWindow.document.open("text/html", "replace")
            doc.write(htmlContent)
            doc.close()

   openNewWindow =  (html) ->
        newWindow = window.open("printTest.html")
        newWindow.addEventListener('load', $(newWindow.document.body).html(html), false)


   print : (templateUrl, data) ->
        $http.get(templateUrl).success((template) ->
            printScope = $rootScope.$new()
            angular.extend(printScope, data)
            element = $compile($('<div>' + template + '</div>'))(printScope)
            waitForRenderAndPrint = ->
                if(printScope.$$phase || $http.pendingRequests.length) 
                    $timeout(waitForRenderAndPrint)
                else
                    common.confirmBox 'Packing slip(s) is ready, please click Yes to continue.', "", ->
                       printHtml(element.html())
                       printScope.$destroy()
            waitForRenderAndPrint()
        )

])

