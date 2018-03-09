NEG.namespace('resources.vendorportal.dashboard.us',
  vendor_survey:
     title:'Vendor Survey Information'
     surveryTitle:'Survery Title'
     desc:'Description'
     expiration:'Expiration Date'
     link:'Survey Link'
  view_title:
    openorders:"Open Orders"
    missingdocuments:"Missing Documents"
    delays:"Vendor Processing Delay"
    skuinformation:"SKU Information"
    vendorinformation:"Vendor Information"
    costofgoodssold:"Cost of Goods Sold"
    top5sku:"Top 5 SKU Last 30 Days"
    top5rejectedsku:"Top 5 Rejected SKU Last 30 Days"
    actionItems:"Action Items"
  view_header: 
    type:"Type"
    total:"Total"
    prioritydelaytotal:"Priority Delay/Total"
    prioritydelayrate:"Priority Delay Rate (%)"
    delaytotal:"Delay/Total"
    rate:"Rate (%)"
    mapped:"Mapped"
    unmapped:"Unmapped"
    outofdate:"Out of date"
    voidheader:"Rejected Orders"
    delay:"Delay"
    totalOrders:"Total Orders"
    priorityrank:"Priority Rank"
    duration:"Duration"
    cogs:"COGS"
    soldqty:"Sold Quantity"
    vendorpartnumber:"Vendor Part #"
    neweggpartnumber:"Newegg Part #"
    orderedqty:"Ordered Quantity"
    rejectedqty:"Rejected Quantity"
  view_tooltip:
    openorderstip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:25%;vertical-align:top'>Open Orders:</td><td>Orders that are currently open due to not receiving a proper ship notice and/or invoice.</td></tr><tr><td>Past Due:</td><td>Orders that remained open for 2 or more days.</td></tr><tr><td style='vertical-align:top'>Exceptions:</td><td>Orders that received an improper ship notice and/or invoice.</td></tr></table>"  
    missingdoctip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:40%;vertical-align:top'>Missing Acknowledgment:</td><td>Orders that are missing an accept or decline.</td></tr><tr><td style='vertical-align:top'>Missing Tracking #:</td><td>Number of orders that still requires a tracking# uploaded.</td></tr><tr><td style='vertical-align:top'>Missing Invoice:</td><td>Number of orders that still require an invoice upload.</td></tr></table>"
    delaytip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:30%;vertical-align:top'>Priority Delays:</td><td>Priority orders that did not reach the customer in the expected time.</td></tr><tr><td style='vertical-align:top'>Delay:</td><td>Total order that did not reach the customer in the expected time.</td></tr></table>"
    skutip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:25%;vertical-align:top'>Mapped:</td><td>Mapped SKU are SKUS that have a relationship to Newegg SKU and ready to sell.</td></tr><tr><td style='vertical-align:top'>Out of date:</td><td>Newegg has not received an update on this SKU for an extended time period and have assume there is no inventory to this item.</td></tr></table>"
    vendortip:"<table style='text-align:left; font-weight:bold'><tr><td style='width:30%;vertical-align:top'>Rejected Orders:</td><td>Number of orders that were rejected.</td></tr><tr><td style='vertical-align:top'>Priority Rank:</td><td>NA rank given for sourcing priority. The better the rank the higher the chance an order goes to you. Rank 1 is the highest.</td></tr></table>"
) 