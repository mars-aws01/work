NEG.namespace('resources.vendorportal_nvf.reporting.cn',
  view_report:
    #InventoryReport
    search:"搜索"
    keyword:"关键字"
    itemNumber:"新蛋商品编号"
    mfrPartNumber:"MPN"
    category:"类别"
    brand:"品牌"
    itemStatus:"商品状态"
    itemStatus_all:"所有"
    itemStatus_active:"活动"
    itemStatus_inactive:"无效"
    openPOQty:"待定PO总数量"
    q4s_info:"Q4S并不包括在运输途中和保留数量."
    #PurchasingReport
    poNumber:"PO#"
    poStatus:"PO状态"
    poType:"PO类型"
    poType_consignment:"代售"
    poType_regular:"正常"
    poDate:"PO日期"
    etaDate_eta:"ETA"
    etaDate_date:"日期"
    itemStatus_deactivated:"无效"
    total:"总"
    poAmount:"PO金额"
    orderQty:"订货量"
    receivedQty:"收货数量"
    pendingQty:"待定数量"
    #SellThroughReport
    saledDate:"日期"
    qty:"数量"
    soldAmount:"共卖出金额"
    help:"Help"
    helpContent:"为了使报告更准确,销售日期必须是7天之前."
    #RMA Report
    month:"月份"
    returnAmount:"退货金额"
    returnQuantity:"退货数量"
    #WHS Reveiving Violation Report
    date:"日期"
    #Iron Egg Prive Match report
    reportDate:"报告日期"
    totalCredit:"总计"
    #Vendor RMA Report
    daysInVendorQueue:"Days in Vendor Queue"
    daysInVendorQueue_all:"所有"
    daysInVendorQueue_month:"0-30天"
    daysInVendorQueue_aboveMonth:"超过30天"
    vendorQueueAmount:"金额"
    agingVendorQueueAmount:"超期金额(超过30天)"
    export:"导出"
    print:"打印"
    resultList:"结果列表"
    byPO:"By PO"
    byItem:"By Item"
    type:"类型"
    withDetail:"含详细信息"
    withoutDetail:"不含详细信息"
    detailCount:"详细信息数量"
    #Out Of Stock Report
    totalEstimatedAmount:"预计日销售总额"
    totalRecords:"总数量"
    oosItemNumber:"缺货商品编号"

  header_report:
    #InventoryReport
    brand:"品牌"
    category:"类别"
    itemNumber:"商品编号"
    itemDescription:"商品描述"
    mfrPartNumber:"制造商零件编号"
    status:"状态"
    usInventory:"美国库存"
    totalQ4s:"总库存"
    openPoQty:"待定PO数量"
    canadaInventory:"加拿大库存"
    usCurrentQ4S:"美国库存"
    currentQ4S:"总库存"
    usOpenPoQty:"美国待定PO数量"
    canTotalQ4S:"加拿大库存"
    canOpenPoQty:"加拿大待定PO数量"
    usTotalQ4S:"美国库存"
    #PurchasingReport
    type:"类型"
    poNumber:"PO #"
    poDate:"PO日期"
    poStatus:"PO状态"
    receivedDate:"收货日期"
    orderQty:"订购数量"
    receivedQty:"收货数量"
    pendingQty:"待定数量"
    poAmount:"PO金额"
    whNumber:"WH #"
    eta:"ETA"
    purchaser:"购买者"
    vendorNumber:"供应商名称"
    cost:"成本"
    #SellThroughReport
    totalQty:"总数量"
    avgCost:"平均成本"
    avgSellingPrice:"平均售价"
    salesAmount:"卖出数量"
    orderCount:"订单数量"
    totalCost:"总成本"
    #RMA Report
    returnAmount:"退货金额"
    returnAmountRate:"退货金额占比 %"
    returnQuantity:"退货数量"
    returnQuantityRate:"退货数量占比 %"
    #WHs
    buyer:"购买者"
    receivingDate:"收货日期"
    violationType:"异常类型"
    violationDetail:"异常详情"
    #Iro Egg Price Match Report
    issueDate:"订单日期"
    customerNumber:"客户编号"
    orderNumber:"订单编号"
    modelNumber:"型号"
    sellingPrice:"售价"
    ironEggCredit:"Iron Egg 金额"
    #Vendor RMA Queue Report
    vendorRMANumber:"供应商退货单号"
    wirNumber:"WIR #"
    obNumber:"OB #"
    obDate:"OB日期"
    qty:"数量"
    totalRMAAmount:"总共退货金额"
    vendorQueueDays:"Days in Vendor Queue"
    #Out Of Stock Report
    estimatedDailyAmount:"预计日销售额"
    oosItemNumber:"缺货商品编号"

  error_report:
    exceedLimit:'数据总数大于可操作的最大限制,请增加更多查询条件.可操作的最大数量为: '
    exceedLimitWithDetail:'详细信息数量超过最大限制,请增加更多查询条件.可操作的最大详细数量为: '
    invalidDate:'请输入正确的开始和结束日期.开始日期必须大于结束日期.开始和结束日期范围是: '
    invalidDate_and:' -- ' 
    mfrPartLength:"选择制造商零件编号时,关键字长度为1-20."
    selectPOStatus:"请至少选择一个PO状态. "
    invalidPONumber:"PO#无效,请输入数字. "
    invalidPODate:'请输入正确的PO开始和结束日期.开始日期必须大于结束日期,并且开始和结束日期必须在六个月以内.'
    invalidETADate:'P请输入正确的ETA开始和结束日期.开始日期必须大于结束日期,并且开始和结束日期必须在六个月以内.'
    salesFromEmpty:'开始日期为空.'
    salesToEmpty:'结束日期为空.'
    salesFromInvalid:'开始日期无效.'
    salesToInvalid:'结束日期无效.'
    invalidSalesDate:'请输入正确的开始和结束日期.开始日期必须大于结束日期,并且开始和结束日期必须在六个月以内.'

)
