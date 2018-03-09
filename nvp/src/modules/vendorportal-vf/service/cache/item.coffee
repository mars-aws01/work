angular.module("vf-cache-item", []).factory('item',
[() ->

  keyList = [
      { text:'Vendor Part#', value:'VendorPartNumber' , isActive:true, maxLength:40}
      { text:'NE Part#', value:'NeweggItemNumber', maxLength:25 }
      { text:'Manufacturer', value:'Manufacturer', maxLength:40 }
      { text:'Manufacturer Part#', value:'ManufacturerPartNumber', maxLength:40 }
      { text:'UPC', value:'UPC', maxLength:50 }
      { text:'Description', value:'Description', maxLength:200 }
  ]


  basicQuery = {
    UnlistedOnly:false
  }

  advancedQuery = {
    UnlistedOnly:false
  }

  return {
    keyList
    basicQuery
    advancedQuery
  }

])

