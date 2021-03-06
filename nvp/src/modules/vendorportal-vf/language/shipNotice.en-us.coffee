﻿NEG.namespace('resources.vendorportal.shipnotice.us',
  view_shipnotice:
    orderNumber:"Order #"
    orderDate:"Order Date"
    customerPoNumber:"Customer PO #"
    expectedShipService:"Expected Ship Service"
    orderStatus:"Order Status"
    invoiceStatus:"Invoice Status"
    shipmentStatus:"Shipment Status"
    shipNotice:"Ship Notice"
    shipNoticeNumber:"Ship Notice #"
    shippedService:"Shipped Service"
    shippingDate:"Shipping Date"
    from:"From"
    warehouseId:"Warehouse ID"
    warehouseName:"Warehouse Name"
    address:"Address"
    cityStateZipcode:"City/State/Zipcode"
    to:"To"
    customerName:"Customer Name"
    packageList:"Package List"
    package:"Package"
    addItem:"Add Item"
    removeItem:"Remove Item"
    weightTip:"Package Gross Weight"
    weight:"Weight"
    length:"Length"
    width:"Width"
    height:"Height"
    addPackage:"Add a Package"
    submitShipNotice:"Submit Ship Notice"
    deleteShipNotice:"Delete Ship Notice"
    selectWarehouseAddress:"Select Warehouse Address"
    useDefaultAddress:"Use Default Address"
    ok:"OK"
    cancel:"Cancel"
    packTip:"Please select one or more items to add to the "
    serialNumberTip:"Serial Number list for item "
    add:"Add"
    clearAll:"Clear All"
    trackingNumber:"Tracking #"
    removePackageTip:"Remove Package"
    printPackageList:"Print Packing List"
    serialNumberListTip:"Serial Number List"
    shipservice:"Ship Service"
    enterShipserviceTip:"Please enter the ship notice #."
    enterAddressTip:"Please enter the address."
    city:"City"
    state:"State"
    zipCode:"ZipCode"
    country:"Country"
  header_shipnotice:
    vendorPartNumber:"Vendor Part #"
    nePartNumber:"NE Part #"
    manufacturer:"Manufacturer"
    mrfPartNumber:"Mfr Part #"
    UPC:"UPC"
    description:"Description"
    price:"Cost ($)"
    qtyOrdered:"Qty Ordered"
    qtyShipped:"Qty Shipped"
    qtyIncluded:"Qty Included"
    qtyInvoice:"Qty Invoiced"
    qtyToRemove:"Qty To Remove"
    ackStatus:"Ack Status"
    serialNumber:"Serial Number"
    address:"Address"
    cityStateZipcode:"City, State, ZipCode"
    isDefault:"(Default)"
  confirm_shipnotice:
    updateShipNotice:"Are you sure update this ship notice?"
    createShipNotice:"Are you sure create this ship notice?"
    deleteShipNotice:"Are you sure delete this ship notice?"
    removePackStart:"Are you sure want to remove Package "
    removePackEnd:" from this ship notice?"
    printPackList:"The ship notice information is incomplete, are you sure you want to print packing list for this package?"
    addRejectItem:"Some of your selected items have been rejected, are you sure you want to add them to the ship notice?"
    removeItemFromPack:"Are you sure you want to remove selected items from this package?"
  error_shipnotice:
    poNumberEmpty:"PO Number must not be empty!"
    shipDateInvalid:"Please enter a valid shipping date time format"
    update:"Update this ship notice failed."
    create:"Create ship notice failed."
    isDuplicate:"The following tracking number(s) in this ship notice already exist in our system, please correct it before continue."
    deleteShipNotice:"Delete this ship notice failed."
    addressInvalid:"Please select a address info."
  success_shipnotice:
    update:"Your request have been submitted successfully, and it need a while for the system to process, please refresh the page later for the latest result."
    create:"Your request have been submitted successfully, and it need a while for the system to process, please refresh the page later for the latest result."
    deleteShipNotice:"Your request have been submitted successfully, and it need a while for the system to process, please refresh the page later for the latest result."
  warning_shipnotice:
    shipDateRange:"The shipping date that 1 day later or 3 months earlier than order date is not allowed."
    packageNone:"You must have at least one package in a ship notice."
    trackNumberDuplicateStart:"The tracking # ["
    trackNumberDuplicateEnd:"] was occurred more than one package of this ship notice."
    itemNoneStart:"Package "
    itemNoneEnd:" is empty, please add at least one item before continue."
    lessThanZeroStart:"The package gross weight or dimensions (length, width, height), one of them must be specified, and value must be larger than 0, please correct it in [Package "
    lessThanZeroEnd:"] before continue."
    extraSerialNumber:"Some shipped items have extra serial number, please correct it before continue. [ Package "
    symbolEnd:" ]"
    existTrackingNumber:"The current order existing this tracking number. [ "
    orderCompleted:"Cannot update this ship notice, because the order status is completed."
    addNoItem:"Please select at least one item to add it to the package."
    removeNoItem:"Please select at least one item to remove it from the package."
    serialNumberStart:"You can only have "
    serialNumberEnd:" serial number(s) for this item, no more serial number can be added."
    serialNumberInvalid:"Your input have some invalid values, please correct them before proceed."
    serialNumberDuplicate:"There are duplicate serial numbers in the list, please remove duplicate serial number."
)