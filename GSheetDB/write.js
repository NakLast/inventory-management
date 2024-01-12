function doPost(e) {
  var action = e.parameter.action

  if (action == 'addUser') {
    return addUser(e)
  }

  if (action == 'addInventory') {
    return addInventory(e)
  }
}

function addUser(e) {
  const ss = SpreadsheetApp.openById('1IvgAdEKzxkdsOPQrtd5J2CfU_6fYKQaIylvcsvzAWB8')
  const sheet = ss.getSheetByName('Users')
  var user = JSON.parse(e.postData.contents)

  sheet.appendRow([user.username, user.password])

  return ContentService.createTextOutput("success").setMimeType(ContentService.MimeType.TEXT)
}

function addInventory(e) {
  const ss = SpreadsheetApp.openById('1IvgAdEKzxkdsOPQrtd5J2CfU_6fYKQaIylvcsvzAWB8')
  const sheet = ss.getSheetByName('Inventory')
  var inventory = JSON.parse(e.postData.contents)

  sheet.appendRow([inventory.product, inventory.quantity, inventory.amount])

  return ContentService.createTextOutput("success").setMimeType(ContentService.MimeType.TEXT)
}
