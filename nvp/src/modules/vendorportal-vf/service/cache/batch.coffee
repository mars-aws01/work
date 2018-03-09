angular.module("vf-cache-batch", []).factory('batch',
[() ->

  templateTypeList = [
      { text:'Please select a template type',value:'' },
      { text:'Pricing & Inventory', value:'SC' },
      { text:'Order Change', value:'PR' },
      { text:'Ship Notice', value:'SH' },
      { text:'Invoice', value:'IN' }
  ]

  templateTypeForSearchList = [
      { text:'All' },
      { text:'Pricing & Inventory', value:'SC' },
      { text:'Order Change', value:'PR' },
      { text:'Ship Notice', value:'SH' },
      { text:'Invoice', value:'IN' }
  ]

  templateTypeForUploadList = [
      { text:'All'},
      { text:'Pricing & Inventory', value:'SC' },
      { text:'Order Change', value:'PR' },
      { text:'Ship Notice', value:'SH' },
      { text:'Invoice', value:'IN' }
  ]   
   
  fileFormatList = [ 
      { text:'Microsoft Excel Format (*.xls)', value:'xls' },
      { text:'CSV - Comma delimited (*.csv)', value:'csv' }
  ]
  
  statusList = [ 
      { text:'All'},      
      { text:'Ready', value:'RD' },
      { text:'Preparing', value:'PR' },
      { text:'Failed', value:'FA' }
  ]
  
  uploadStatusList = [ 
      { text:'All'},      
      { text:'Processing', value:'PR' },
      { text:'Failed', value:'FA' },
      { text:'Completed With Error', value:'CE' },
      { text:'Completed', value:'CD' },
  ]
  
  return {
    templateTypeList
    fileFormatList
    statusList
    templateTypeForSearchList
    templateTypeForUploadList
    uploadStatusList
  }

])

