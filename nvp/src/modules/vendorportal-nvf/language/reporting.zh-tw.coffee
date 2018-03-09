NEG.namespace('resources.vendorportal_nvf.reporting.tw',
  view_report:
    #InventoryReport
    search:"搜索"
    keyword:"關鍵字"
    itemNumber:"新蛋商品編號"
    mfrPartNumber:"MPN"
    category:"類別"
    brand:"品牌"
    itemStatus:"商品狀態"
    itemStatus_all:"所有"
    itemStatus_active:"活動"
    itemStatus_inactive:"無效"
    openPOQty:"待定PO總數量"
    q4s_info:"Q4S并不包括在运输途中和保留數量."
    #PurchasingReport
    poNumber:"PO#"
    poStatus:"PO狀態"
    poType:"PO類型"
    poType_consignment:"代售"
    poType_regular:"正常"
    poDate:"PO日期"
    etaDate_eta:"ETA"
    etaDate_date:"日期"
    itemStatus_deactivated:"無效"
    total:"總"
    poAmount:"PO金額"
    orderQty:"訂貨量"
    receivedQty:"收貨數量"
    pendingQty:"待定數量"
    #SellThroughReport
    saledDate:"日期"
    qty:"數量"
    soldAmount:"共賣出金額"
    help:"Help"
    helpContent:"為了使報告更準確,銷售日期必須是7天之前."
    #RMA Report
    month:"月份"
    returnAmount:"退貨金額"
    returnQuantity:"退貨數量"
    #WHS Reveiving Violation Report
    date:"日期"
    #Iron Egg Prive Match report
    reportDate:"報告日期"
    totalCredit:"總計"
    #Vendor RMA Report
    daysInVendorQueue:"Days in Vendor Queue"
    daysInVendorQueue_all:"所有"
    daysInVendorQueue_month:"0-30天"
    daysInVendorQueue_aboveMonth:"超過30天"
    vendorQueueAmount:"金額"
    agingVendorQueueAmount:"超期金額(超過30天)"
    export:"匯出"
    print:"列印"
    resultList:"結果清單"
    byPO:"By PO"
    byItem:"By Item"
    type:"類型"
    withDetail:"含詳細資訊"
    withoutDetail:"不含詳細資訊"
    detailCount:"詳細資訊數量"
    #Out Of Stock Report
    totalEstimatedAmount:"預計日銷售總額"
    totalRecords:"總數量"
    oosItemNumber:"缺貨商品編號"

  header_report:
    #InventoryReport
    brand:"品牌"
    category:"類別"
    itemNumber:"組件編號"
    itemDescription:"商品描述"
    mfrPartNumber:"製造商零件編號"
    status:"狀態"
    usInventory:"美國庫存"
    totalQ4s:"總庫存"
    openPoQty:"待定PO數量"
    canadaInventory:"加拿大庫存"
    usCurrentQ4S:"美國庫存"
    currentQ4S:"總庫存"
    usOpenPoQty:"美國待定PO數量"
    canTotalQ4S:"加拿大庫存"
    canOpenPoQty:"加拿大待定PO數量"
    usTotalQ4S:"美國庫存"
    #PurchasingReport
    type:"類型"
    poNumber:"PO #"
    poDate:"PO日期"
    poStatus:"PO狀態"
    receivedDate:"收貨日期"
    orderQty:"訂購數量"
    receivedQty:"收貨數量"
    pendingQty:"待定數量"
    poAmount:"PO金額"
    whNumber:"WH #"
    eta:"ETA"
    purchaser:"購買者"
    vendorNumber:"供應商名稱"
    cost:"成本"
    #SellThroughReport
    totalQty:"總數量"
    avgCost:"平均成本"
    avgSellingPrice:"平均售價"
    salesAmount:"賣出數量"
    orderCount:"订单數量"
    totalCost:"总成本"
    #RMA Report
    returnAmount:"退貨金額"
    returnAmountRate:"退貨金額占比 %"
    returnQuantity:"退貨數量"
    returnQuantityRate:"退貨數量占比 %"
    #WHs
    buyer:"購買者"
    receivingDate:"收貨日期"
    violationType:"異常類型"
    violationDetail:"異常詳情"
    #Iro Egg Price Match Report
    issueDate:"訂單日期"
    customerNumber:"客戶編碼"
    orderNumber:"訂單編號"
    modelNumber:"型號"
    sellingPrice:"售價"
    ironEggCredit:"Iron Egg 金額"
    #Vendor RMA Queue Report
    vendorRMANumber:"供應商退貨單號"
    wirNumber:"WIR #"
    obNumber:"OB #"
    obDate:"OB日期"
    qty:"數量"
    totalRMAAmount:"總共退貨金額"
    vendorQueueDays:"Days in Vendor Queue"
    #Out Of Stock Report
    estimatedDailyAmount:"預計日銷售額"
    oosItemNumber:"缺貨商品編號"

  error_report:
    exceedLimit:'資料總數大於可操作的最大限制,請增加更多查詢準則.可操作的最大數量為: '
    exceedLimitWithDetail:'詳細資訊數量超過最大限制,請增加更多查詢準則.可操作的最大詳細數量為: '
    invalidDate:'請輸入正確的開始和結束日期.開始日期必須大於結束日期.開始和結束日期範圍是: '
    invalidDate_and:' -- ' 
    mfrPartLength:"選擇製造商零件編號時,關鍵字長度為1-20."
    selectPOStatus:"請至少選擇一個PO狀態. "
    invalidPONumber:"PO#無效,請輸入數位. "
    invalidPODate:'請輸入正確的PO開始和結束日期.開始日期必須大於結束日期,並且開始和結束日期必須在六個月以內.'
    invalidETADate:'請輸入正確的ETA開始和結束日期.開始日期必須大於結束日期,並且開始和結束日期必須在六個月以內.'
    salesFromEmpty:'開始日期為空.'
    salesToEmpty:'結束日期為空.'
    salesFromInvalid:'開始日期無效.'
    salesToInvalid:'結束日期無效.'
    invalidSalesDate:'請輸入正確的開始和結束日期.開始日期必須大於結束日期,並且開始和結束日期必須在六個月以內.'

)
