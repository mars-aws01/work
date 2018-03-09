angular.module("negDatePicker",[])

.directive "negDatePicker", ->
  restrict: "A"
  require: "ngModel"
  scope: {
    minDate:"="
    maxDate:"="
  }
  link: (scope, element, attrs, ngModelCtrl) ->
   # element.attr("readonly":"readonly")
   # element.css("cursor","pointer")
    element.css("background","#FFF")

    options = {}
    options = $.parseJSON(attrs.negDatePicker) if attrs.negDatePicker
    if options.addMonth
      currentDate = new Date()
      options.minDate = new Date(currentDate)
      options.minDate.setMonth(currentDate.getMonth() + options.addMonth)
   
    if scope.minDate
      options.minDate = scope.minDate
    if scope.maxDate
      options.maxDate = scope.maxDate
         
    addonElement = $(element[0].parentElement).find(".input-group-addon")
    if(addonElement.length == 1)
      addonElement[0].onclick = ->
        element[0].focus()
    element.datepicker
      changeMonth: options.changeMonth || false
      changeYear: options.changeYear || false
      dateFormat: options.dateFormat ||  "mm/dd/yy"
      showAnim: "drop"
      minDate: options.minDate || null
      maxDate: options.maxDate || null
      onSelect: (date) ->
        ngModelCtrl.$setViewValue date
        scope.$apply()

 

