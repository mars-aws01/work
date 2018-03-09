angular.module("vf-cache-order", []).factory('order',
[() ->

  keyList = [
      { text:'Order Number', value:'poNumber' , isActive:true, maxLength:15 }
      { text:'Invoice Number', value:'invoiceNumber', maxLength:20  }
      { text:'Ship Notice#', value:'shipNoticeNumber', maxLength:40  }
      { text:'Tracking Number', value:'trackingNumber', maxLength:40  }
      { text:'Vendor Part#', value:'vendorPartNumber', maxLength:40  }
      { text:'Newegg Item#', value:'neweggItemNumber', maxLength:25  }
  ]

  orderStatusList = [
      { text:'All' }
      { text:'New', value:'New' }
      { text:'Canceled', value:'Canceled' }
      { text:'Completed', value:'Completed' }
      { text:'Processing', value:'Processing' }
  ]

  shipmentStatusList = [
      { text:'All' }
      { text:'Unshipped', value:'UnShipped' }
      { text:'Processing', value:'Processing' }
      { text:'Partial Shipped', value:'PartialShipped' }
      { text:'Shipped', value:'Shipped' }
  ]

  invoiceStatusList = [
      { text:'All' }
      { text:'Uninvoiced', value:'UnInvoiced' }
      { text:'Processing', value:'Processing' }
      { text:'Partial Invoiced', value:'PartialInvoiced' }
      { text:'Invoiced', value:'Invoiced' }
  ]

  basicQuery = {
 
  }

  advancedQuery = {

  }

  return {
    keyList
    orderStatusList
    shipmentStatusList
    invoiceStatusList
    basicQuery
    advancedQuery
  }

])

