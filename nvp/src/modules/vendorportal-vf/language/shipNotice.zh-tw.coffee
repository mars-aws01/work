﻿NEG.namespace('resources.vendorportal.shipnotice.tw',
  view_shipnotice:
    orderNumber:"訂單號"
    orderDate:"訂單日期"
    customerPoNumber:"客戶採購單編號"
    expectedShipService:"期望運輸方式"
    orderStatus:"訂單狀態"
    invoiceStatus:"發票狀態"
    shipmentStatus:"運輸狀態"
    shipNotice:"發貨單"
    shipNoticeNumber:"發貨單編號"
    shippedService:"運輸方式"
    shippingDate:"發貨日期"
    from:"從"
    warehouseId:"倉庫編號"
    warehouseName:"倉庫名稱"
    address:"地址"
    cityStateZipcode:"市/州/郵編"
    to:"至"
    customerName:"客戶名稱"
    packageList:"包裹清單"
    package:"包裹"
    addItem:"添加商品"
    removeItem:"删除商品"
    weightTip:"包裹毛重"
    weight:"重量"
    length:"長"
    width:"寬"
    height:"高"
    addPackage:"添加包裹"
    submitShipNotice:"提交發貨單"
    deleteShipNotice:"刪除發貨單"
    selectWarehouseAddress:"選擇倉庫地址"
    useDefaultAddress:"使用預設地址"
    ok:"確定"
    cancel:"取消"
    packTip:"請選擇一個或多個商品添加至"
    serialNumberTip:"商品序號清單 "
    add:"添加"
    clearAll:"全部清除"
    trackingNumber:"運單號"
    removePackageTip:"删除包裹"
    printPackageList:"列印包裹清單"
    serialNumberListTip:"序號清單"
    shipservice:"運輸方式"
    enterShipserviceTip:"請輸入發貨單號。"
    enterAddressTip:"請輸入地址。"
    city:"城市"
    state:"州"
    zipCode:"郵編"
    country:"國家"
  header_shipnotice:
    vendorPartNumber:"供應商商品編號"
    nePartNumber:"新蛋商品編號"
    manufacturer:"製造商"
    mrfPartNumber:"製造商商品編號"
    UPC:"UPC編碼"
    description:"描述"
    price:"成本($)"
    qtyOrdered:"下單數量"
    qtyShipped:"發貨數量"
    qtyIncluded:"數量"
    qtyInvoice:"開票數量"
    qtyToRemove:"刪除數量"
    ackStatus:"確認狀態"
    serialNumber:"序號"
    address:"地址"
    cityStateZipcode:"市,區,郵編"
    isDefault:"(預設)"
  confirm_shipnotice:
    updateShipNotice:"是否需要更新發貨單？"
    createShipNotice:"是否需要創建發貨單？"
    deleteShipNotice:"是否需要刪除發貨單？"
    removePackStart:"是否需要從發貨單中刪除包裹"
    removePackEnd:""
    printPackList:"發貨單資訊已經完成，是否需要列印包裝清單？"
    addRejectItem:"部分商品已經刪除，是否需要添加到發貨單中？"
    removeItemFromPack:"是否需要從包裹中刪除所選商品？"
  error_shipnotice:
    poNumberEmpty:"採購單編號不能為空！"
    shipDateInvalid:"請輸入一個正確格式的發貨日期。"
    update:"更新發貨單失敗。"
    create:"創建發貨單失敗。"
    isDuplicate:"發貨單中已經存在相同的包裹運單號，請修改後再試。"
    deleteShipNotice:"刪除發貨單失敗"
    addressInvalid:"請選擇一個地址。"
  success_shipnotice:
    update:"您的請求已經提交成功，系統正在處理，請稍等片刻後再刷新頁面查看結果。"
    create:"您的請求已經提交成功，系統正在處理，請稍等片刻後再刷新頁面查看結果。"
    deleteShipNotice:"您的請求已經提交成功，系統正在處理，請稍等片刻後再刷新頁面查看結果。"
  warning_shipnotice:
    shipDateRange:"發貨日期不允許低於3個月或者超過当前的訂單日期範圍."
    packageNone:"請至少為發貨單選擇一個包裹。"
    trackNumberDuplicateStart:"包裹運單號["
    trackNumberDuplicateEnd:"] 已經在該發貨單中。"
    itemNoneStart:"包裹"
    itemNoneEnd:" 为空,請至少選擇一個商品後再試。"
    lessThanZeroStart:"包裹毛重或者尺寸(長、寬、高)必須設置，並且必須大於0，請修改[包裹 "
    lessThanZeroEnd:"] 後再試。"
    extraSerialNumber:"部分已發貨商品中已經存在額外的序號，請修改[包裹 "
    symbolEnd:" ]"
    existTrackingNumber:"當前訂單已經存在一個包裹運單號[ "
    orderCompleted:"訂單已經完成，不能更新發貨單。"
    addNoItem:"請至少為該包裹添加一個商品。"
    removeNoItem:"從包裹中刪除時，請至少選擇一個商品。"
    serialNumberStart:"只有"
    serialNumberEnd:" 個序號,不能繼續添加。"
    serialNumberInvalid:"序號無效，請修改後再試。"
    serialNumberDuplicate:"序號已經存在，請刪除重複的序號。"
)