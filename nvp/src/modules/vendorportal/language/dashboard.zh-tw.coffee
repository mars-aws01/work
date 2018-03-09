NEG.namespace('resources.vendorportal.dashboard.tw',
  vendor_survey:
     title:'Vendor Survey Information'
     surveryTitle:'Survery Title'
     desc:'Description'
     expiration:'Expiration Date'
     link:'Survey Link'
  view_title:
    openorders:"未結訂單"
    missingdocuments:"未收到文件"
    delays:"供貨商處理延遲"
    skuinformation:"SKU信息"
    vendorinformation:"供貨商信息"
    costofgoodssold:"商品銷售成本價"
    top5sku:"最近30天銷量前五的SKU"
    top5rejectedsku:"最近30天被拒絕的前五SKU"
    actionItems:"Action Items"
  view_header: 
    type:"類型"
    total:"總數"
    prioritydelaytotal:"優先商品的延遲數/總數"
    prioritydelayrate:"優先商品的延遲率(%)"
    delaytotal:"延遲數/總數"
    rate:"比率(%)"
    mapped:"已關聯"
    unmapped:"未關聯"
    outofdate:"過期的數量"
    voidheader:"被拒絕過的訂單數"
    delay:"延遲數"
    totalOrders:"訂單總數"
    priorityrank:"優先排行"
    duration:"持續類型"
    cogs:"COGS"
    soldqty:"銷售數量"
    vendorpartnumber:"供貨商零件編號"
    neweggpartnumber:"Newegg零件編號"
    orderedqty:"已售出的數量"
    rejectedqty:"被退回的數量"
  view_tooltip:
    openorderstip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:25%;vertical-align:top'>未結訂單:</td><td>未結訂單為尚未收到對應的發貨單或者發票而未完成的訂單。</td></tr><tr><td class='vertical-align:top'>逾期訂單:</td><td>超過2天（含2天）未完成的訂單。</td></tr><tr><td style='vertical-align:top'>異常訂單:</td><td>上傳的發貨單或者發票有問題的訂單。</td></tr></table>"  
    missingdoctip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:40%;vertical-align:top'>丟失確認通知:</td><td>既沒有接受也沒有拒絕的訂單。</td></tr><tr><td style='vertical-align:top'>丟失發貨單號:</td><td>還沒有上傳發貨單的訂單。</td></tr><tr><td style='vertical-align:top'>丟失發票單號:</td><td>還沒有上傳發票的訂單。</td></tr></table>"
    delaytip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:35%;vertical-align:top'>優先訂單延遲:</td><td>沒有按時到達客戶的優先訂單。</td></tr><tr><td style='vertical-align:top'>延遲:</td><td>沒有按時到達客戶的訂單總數。</td></tr></table>"
    skutip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:25%;vertical-align:top'>已關聯:</td><td>關聯SKU為已與Newegg SKU建立對應關係可以出售的SKU。</td></tr><tr><td style='vertical-align:top'>過期:</td><td>Newegg如果在一定時間內沒有收到這個SKU的庫存更新，則會認為這件商品已經沒有庫存。</td></tr></table>"
    vendortip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:30%;vertical-align:top'>被拒絕過的訂單:</td><td>被拒絕過的訂單總數。</td></tr><tr><td style='vertical-align:top'>優先順序評級:</td><td>訂單分發優先順序評級。越高的等級，訂單分發到您的幾率越大。1為最高等級。</td></tr></table>"
) 