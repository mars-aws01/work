angular.module("vfCurrency",[]).filter "vfCurrency", ["$filter",($filter) ->
    (amount, currencySymbol) ->
      currency = $filter("currency")
      currencyAmount = currency(amount, currencySymbol)
      currencyAmount.replace("(", "-").replace(")", "")
]