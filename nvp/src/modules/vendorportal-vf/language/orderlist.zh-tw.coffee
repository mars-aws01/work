NEG.namespace('resources.vendorportal.orderlist.tw',
view_orderlist:
    search:"查詢"
    advancedSearch:"過濾"
    byStatus:"按狀態"
    orderStatus:"訂單狀態"
    invoiceStatus:"發票狀態"
    shipmentStatus:"发货狀態"
    exceptional:"只顯示異常訂單"
    myOrdersOnly:"只顯示我的訂單"
    byDate:"按日期"
    createdFrom:"創建時間從"
    createdTo:"創建時間到"
    updatedFrom:"更新時間從"
    updatedTo:"更新時間到"
    quickSearch:"快速搜尋"
    close:"關閉"
    clearAll:"全部清除"
    searchPlaceholder:"輸入關鍵字"
    exactMatch:"精確匹配"
    vendorName:"供應商名稱"
    vendorSearchHelpTitle:"提示"
    vendorSearchHelpContent:"請選擇一個供應商進行管理."
    vendorSearchPlaceHolder:"請輸入關鍵字進行查找或者設置供應商."
    focusOnCurrentVendor:"只關注當前供應商"
  header_orderlist:
    orderNumber:'訂單編號'
    action:"操作"
    orderStatus:"訂單狀態"
    shipmentStatus:"发货狀態"
    invoiceStatus:"發票狀態"
    poNumber:"採購單號"
    poDate:"採購日期"
    shipFrom:"發貨地點"
    expectedShipService:"期望運輸方式"
    noMatchItems:"未找到相關記錄"
    vendorPartNumber:"供應商商品編號"
    quantity:"數量"
    unitPrice:"成本"
    lineTotal:"合計"
    subTotal:"共計"
    invoiceActions:"發票操作"
    shipNoticeActions:"發貨操作"
    menuView:"查看"
    menuCreate:"創建"
    menuUpdate:"更新"
    menuShowException:"顯示異常"
    noPermission:"沒有權限"
    orderActions:"處理訂單"
    orderExceptionDetail:"訂單異常詳情"
    orderDate:"訂單日期"
    customerPONumber:"客戶採購單號"
    totalAmount:"總計"
    itemAmount:"商品費用"
    shipToState:"目的地"
    actualTaxRate:"實際稅率(%)"
    shippingAmount:"運費"
    neweggSOStatus:"新蛋訂單狀態"
    order:"訂單"
    orderSummary:"訂單描述"
    itemNumber:"商品編號"
    partNumber:"賣家商品編號"
    price:"成本"
    qty:"數量"
    shipment:"發貨"   
    invoice:"發票" 
    orderExceptionList:"訂單異常清單"
    exceptionType:"異常類型"
    shipmentException:"發貨異常"
    invoiceExpception:"發票異常"
    status:"狀態"
    indate:"異常日期"
    shipNoticeHeader:"請選擇一個發貨單進行"
    shipNoticeNumber:"發貨單編號"
    actualShipService:"實際運輸方式"
    shippingDate:"發貨日期"
    packageList:"包裝清單"
    trackingNumber:"包裹追蹤號"
    invoiceHeader:"請選擇一張發票進行"
    invoiceNumber:"發票編號"
    invoiceDate:"開票日期"
    itemList:"商品清單"
    itemTotal:"總計"
    redirectToShipNoticePage:"跳轉至出貨單頁面"
    redirectToInvoicePage:"跳轉至發票頁面"
    actionView:"查看"
    tableSummaryShow:"第"
    tableSummaryTo:"至第"
    tableSummaryOf:"條資料, 總計:"
    tableSummaryOfEntries:"條資料"    
    editOrderDetailTip:"修改訂單"
    confirmOrderTip:"接受訂單"
    cancelOrderTip:"拒絕訂單"
  buttonPanel_orderlist:
    confirm:"接受訂單"
    cancel:"拒絕訂單"
    printPackingSlip:"列印發貨單"
    refresh:"更新訂單狀態"
  confirm_orderlist:
    confirmOrder:"是否需要接受訂單？"
    cancelOrder:"是否需要拒絕訂單？"
    confirmOrderConfirm:"該操作將接受所有訂單，是否繼續？"
    cancelShippedOrder:"選中項中包含已經發貨或者開票的訂單，該操作將拒絕所有訂單。是否繼續？"
    cancelOrderConfirm:"該操作將拒絕所有已選訂單，是否繼續？"
    printConfirm:"因為訂單被拒絕或拒絕，部分發貨單沒能生成，是否需要列印所選訂單的發貨單？"
  error_orderlist:
    createdFromDateInvalid:"請輸入有效的創建起始時間。"
    createdToDateInvalid:"請輸入有效的創建結束時間。"
    updateFromDateInvalid:"請輸入有效的更新起始時間。"
    updateToDateInvalid:"請輸入有效的更新結束時間。"
    confirmOrder:"接受訂單失敗。原因: "
    cancelOrder:"拒絕訂單失敗。原因: "
    refreshOrder:"更新訂單狀態失敗。"
  success_orderlist:
    confirmOrder:"您的訂單接受請求已经提交成功，系統正在處理中，請稍後刷新訂單清單以查看最新結果。"  
    cancelOrder:"您的拒絕訂單請求已经提交成功，系統正在處理中，請稍後刷新訂單清單以查看最新結果。"
    refreshOrder:"您的更新訂單狀態請求已經提交成功，系統正在進行處理，您可以繼續您的工作，稍後返回該頁面查詢訂單的最新狀態。"
  warning_orderlist:
    statusInvalidConfirm:"部分訂單狀態不是\"New\"或者\"Processing\", 不能接受訂單，請刷新訂單清單後再試。"  
    invalidOrderConfirm:"請至少選擇一個訂單進行接受。"
    statusInvalidCancel:"部分訂單狀態不是\"New\"或者\"Processing\", 不能拒絕訂單，請刷新訂單清單後再試。"
    invalidOrderCancel:"請至少選擇一個訂單進行拒絕。"
    noItemForPrinting:"請至少選擇一個訂單用於列印發貨單。"
    noPackageForPriting:"您選擇的訂單沒有包裹資訊，可能是因為訂單已取消或拒絕，造成發貨單沒有生成。"
    cancelledOrrejectedForPriting:"某些包裹資訊可能因為訂單已取消或拒絕，造成發貨單沒有生成，是否繼續?"
)