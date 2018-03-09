﻿# CoffeeScript
NEG.namespace('resources.vendorportal.itemupdate.us',
  update_basic:
    webDescription: "Item Web Description"
    manufacturePartNumber: "Mfr. Part #"
    neweggItemNumber: "Newegg Item #"
    upc: "UPC/EAN"
    search: "Search"
    brand: "Brand"
  update_detail:
    webDescription: "Web Description"
    bulletPointDescription: "Bullet Point Description"
    vendorMemo: "Vendor Memo"
    field: "Field"
    currentValue: "Current Value"
    updateValue: "Updated Value"
    groupName: "Group Name"
    itemInformation: "Item Information"
    specificationInformation: "Specification Information"
    propertyName: "Property Name"
    currentPropertyValue: "Current Property Value"
    updatePropertyValue: "Updated Property Value"
    currentInputtedValue: "Current Inputted Value"
    updateInputtedValue: "Updated Inputted Value"
    requestType: "Request Type"
    requestStatus: "Request Status"
    requestId: "Request ID"
    requestDate: "Request Date"
    submit:"Submit Change Request"
    reset:"Reset"
    releaseAfterReview:"All the modifications will be reviewed by Newegg Web Management Team before releasing to product page."
  update_notice:
    mfrConfirm:"You must input either \"Mfr. Parts#\" or \"UPC/EAN\" or both. If \"Mfr. Parts#\" is empty, system will automatically copy the value from \"UPC/EAN\"."
    upcError:"Please enter valid UPC Code(8,12-14 digit number) if you check the checkbox."
    mfrError:"Mfr. Part# can not be empty if you check the checkbox."
    mfrandUPCError:"UPC/EAN or ManufacturerPartNumber must input one if you check the checkbox."
    mfrLengthError:"The length of Mfr. Part# should not more than 20 if you check the checkbox."
    webDescLengthError:"The length of Web Description should not more than 300 if you check the checkbox."
    bulletDescLengthError:"The length of Bullet Point Description should not more than 1000 if you check the checkbox."
    mustEditError:"Nothing will be modified! Please modify one parameter at least."
    submitConfirm:"Are you sure to submit?"
    resetConfirm:"Are you sure to reset modify?"
  update_success:
    submitSuccess:"Submit success."
)