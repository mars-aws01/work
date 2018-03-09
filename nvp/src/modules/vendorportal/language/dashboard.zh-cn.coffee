NEG.namespace('resources.vendorportal.dashboard.cn',
  vendor_survey:
     title:'Vendor Survey Information'
     surveryTitle:'Survery Title'
     desc:'Description'
     expiration:'Expiration Date'
     link:'Survey Link'
  view_title:
    openorders:"未结订单"
    missingdocuments:"未收到文件"
    delays:"供货商处理延迟"
    skuinformation:"SKU信息"
    vendorinformation:"供货商信息"
    costofgoodssold:"商品销售成本价"
    top5sku:"最近30天销量前五的SKU"
    top5rejectedsku:"最近30天被拒绝的前五SKU"
    actionItems:"Action Items"
  view_header: 
    type:"类型"
    total:"总数"
    prioritydelaytotal:"优先商品的延迟数/总数"
    prioritydelayrate:"优先商品的延迟率(%)"
    delaytotal:"延迟数/总数"
    rate:"比率(%)"
    mapped:"已关联"
    unmapped:"未关联"
    outofdate:"过期的数量"
    voidheader:"被拒绝过的订单数"
    delay:"延迟数"
    totalOrders:"订单总数"
    priorityrank:"优先排行"
    duration:"持续类型"
    cogs:"COGS"
    soldqty:"销售数量"
    vendorpartnumber:"供货商零件编号"
    neweggpartnumber:"Newegg零件编号"
    orderedqty:"已售出的数量"
    rejectedqty:"被退回的数量"
  view_tooltip:
    openorderstip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:25%;vertical-align:top'>未结订单:</td><td>未结订单为尚未收到对应的发货单或者发票而未完成的订单。</td></tr><tr><td class='vertical-align:top'>逾期订单:</td><td>超过2天（含2天）未完成的订单。</td></tr><tr><td style='vertical-align:top'>异常订单:</td><td>上传的发货单或者发票有问题的订单。</td></tr></table>"  
    missingdoctip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:40%;vertical-align:top'>丢失确认通知:</td><td>既没有接受也没有拒绝的订单。</td></tr><tr><td style='vertical-align:top'>丢失发货单号:</td><td>还没有上传发货单的订单。</td></tr><tr><td style='vertical-align:top'>丢失发票单号:</td><td>还没有上传发票的订单。</td></tr></table>"
    delaytip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:35%;vertical-align:top'>优先订单延迟:</td><td>没有按时到达客户的优先订单。</td></tr><tr><td style='vertical-align:top'>延迟:</td><td>没有按时到达客户的订单总数。</td></tr></table>"
    skutip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:25%;vertical-align:top'>已关联:</td><td>关联SKU为已与Newegg SKU建立对应关系可以出售的SKU。</td></tr><tr><td style='vertical-align:top'>过期:</td><td>Newegg如果在一定时间内没有收到这个SKU的库存更新，则会认为这件商品已经没有库存。</td></tr></table>"
    vendortip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:30%;vertical-align:top'>被拒绝过的订单:</td><td>被拒绝过的订单总数。</td></tr><tr><td style='vertical-align:top'>优先级评级:</td><td>订单分发优先级评级。越高的等级，订单分发到您的几率越大。1为最高等级。</td></tr></table>"
) 