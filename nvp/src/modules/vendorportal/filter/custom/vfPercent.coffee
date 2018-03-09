angular.module("vfPercent",[]).filter "vfPercent", ["$filter",($filter) ->
    (amount, currencySymbol) ->      
      if(amount == 0) 
        return 0
      if(!amount)
        return '/0'
      currency = $filter("currency")
      currencyAmount = currency(amount * 100, currencySymbol)
      currencyAmount.replace("(", "-").replace(")", "")
]