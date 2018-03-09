NEG.namespace('resources.vendorportal_nvf.reporting.us',
  view_report:
    #InventoryReport
    search:"Search"
    keyword:"KeyWords"
    itemNumber:"Newegg Item #"
    mfrPartNumber:"Mfr.Part #"
    category:"Category"
    brand:"Brand"
    itemStatus:"Item Status"
    itemStatus_all:"All"
    itemStatus_active:"Active"
    itemStatus_inactive:"Inactive"
    openPOQty:"Open PO QTY"
    q4s_info:"Q4S doesn't include In Transit and Reserved Qty."
    #PurchasingReport
    poNumber:"PO#"
    poStatus:"PO Status"
    poType:"PO Type"
    poType_consignment:"Consignment"
    poType_regular:"Regular"
    poDate:"PO Date"
    etaDate_eta:"ETA"
    etaDate_date:"Date"
    itemStatus_deactivated:"Deactivated"
    total:"Total"
    poAmount:"PO Amount"
    orderQty:"Order Qty"
    receivedQty:"Received Qty"
    pendingQty:"Pending Qty"
    #SellThroughReport
    saledDate:"Sales Date"
    qty:"Qty"
    soldAmount:"Sold Amt"
    help:"Help"
    helpContent:"For accurate reporting, sales date must exceed 7 days prior to current date."
    #RMA Report
    month:"Month"
    returnAmount:"Return Amount"
    returnQuantity:"Return Quantity"
    #WHS Reveiving Violation Report
    date:"Date"
    #Iron Egg Prive Match report
    reportDate:"Report Date"
    totalCredit:"Total Credit"
    #Vendor RMA Report
    daysInVendorQueue:"Days in Vendor Queue"
    daysInVendorQueue_all:"All"
    daysInVendorQueue_month:"0-30 Days"
    daysInVendorQueue_aboveMonth:"Above 30 Days"
    vendorQueueAmount:"Vendor Queue Amount"
    agingVendorQueueAmount:"Aging vendor Queue Amount (30+Days)"
    export:"Export"
    print:"Print"
    resultList:"Result List"
    byPO:"By PO"
    byItem:"By Item"
    type:"Type"
    withDetail:"With Detail"
    withoutDetail:"Without Detail"
    detailCount:"Detail Count"
    #Out Of Stock Report
    totalEstimatedAmount:"Total Estimated Possible Daily Sales Amount"
    totalRecords:"Total Records"
    oosItemNumber:"OOS Item#"

  header_report:
    #InventoryReport
    brand:"Brand"
    category:"Category"
    itemNumber:"Item #"
    itemDescription:"Item Description"
    mfrPartNumber:"Mfr.Part #"
    status:"Status"
    usInventory:"US Inventory"
    totalQ4s:"Total Q4S"
    openPoQty:"Open PO Qty"
    canadaInventory:"Canada Inventory"
    usCurrentQ4S:"US-Current Q4S"
    currentQ4S:"Current Q4S"
    usOpenPoQty:"US-Open PO Qty"
    canTotalQ4S:"Can-Total Q4S"
    canOpenPoQty:"CAN-Open PO Qty"
    usTotalQ4S:"US-Total Q4s"
    #PurchasingReport
    type:"Type"
    poNumber:"PO #"
    poDate:"PO Date"
    receivedDate:"Final Received Date"
    poStatus:"PO Status"
    orderQty:"Order Qty"
    receivedQty:"Received Qty"
    pendingQty:"Pending Qty"
    poAmount:"PO Amount"
    whNumber:"WH #"
    eta:"ETA"
    purchaser:"Purchaser"
    vendorNumber:"Vendor Number"
    cost:"Cost"
    #SellThroughReport
    totalQty:"Total Qty"
    avgCost:"Avg. Cost"
    avgSellingPrice:"Avg. Selling Price"
    salesAmount:"Sales Amt"
    orderCount:"Order Count"
    totalCost:"Total Cost"
    #RMA Report
    returnAmount:"Return Amt"
    returnAmountRate:"Return Amt %"
    returnQuantity:"Return Qty"
    returnQuantityRate:"Return Qty %"
    #WHs
    buyer:"Buyer"
    receivingDate:"Receiving Date"
    violationType:"Violation Type"
    violationDetail:"Violation Detail"
    #Iro Egg Price Match Report
    issueDate:"Issue Date"
    customerNumber:"Customer #"
    orderNumber:"Order #"
    modelNumber:"Model #"
    sellingPrice:"Selling Price"
    ironEggCredit:"Iron Egg Credit"
    #Vendor RMA Queue Report
    vendorRMANumber:"Vendor RMA #"
    wirNumber:"WIR #"
    obNumber:"OB #"
    obDate:"OB Date"
    qty:"Qty"
    totalRMAAmount:"Total RMA Amt"
    vendorQueueDays:"Days In Vendor Queue"
    #Out Of Stock Report
    estimatedDailyAmount:"Estimated Possible Daily Sales Amount"
    oosItemNumber:"OOS Item#"

  error_report:
    exceedLimit:'The total records exceeds the maximum limit, please add more query conditions. The max count of records is '
    exceedLimitWithDetail:'The total detail count exceeds the maximum limit, please add more query conditions. The maximum detail count is '
    invalidDate:'Please input correct Start Date and End Date. The Start Date should be earlier than End Date. The Start Date and End Date should be between '
    invalidDate_and:' and ' 
    mfrPartLength:"When 'Mfr. Part#' is selected, 'Key Word' must be between 1 and 20 characters. "
    selectPOStatus:"Please select one 'PO Status' at least. "
    invalidPONumber:"PO Number is invalid, please enter number. "
    invalidPODate:'Please input correct PO Date, DateFrom must be earlier than DateTo, and the date must be within 6 months.'
    invalidETADate:'Please input correct ETA Date, DateFrom must be earlier than DateTo, and the date must be within 6 months.'
    salesFromEmpty:'Sales From date is empty.'
    salesToEmpty:'Sales To date is empty.'
    salesFromInvalid:'Sales From date invalid.'
    salesToInvalid:'Sales To date invalid.'
    invalidSalesDate:'Please choose correct Sales Date, DateFrom must be earlier than DateTo, and the date must be within 6 months.'

)
