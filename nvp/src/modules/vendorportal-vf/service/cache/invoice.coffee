angular.module("vf-cache-invoice", []).factory('invoice',
[() ->

  keyList = [
      { text:'Vendor Part#', value:'VendorPartNumber' , isActive:true}
      { text:'NE Part#', value:'NeweggItemNumber' }
  ]




  return {
    keyList
  }

])

