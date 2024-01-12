function doPost(e) {
    let action = e.parameter.action

    if (action == 'login') {
        return checkLogin(e)
    }
}

function checkLogin(e) {
    let data = JSON.parse(e.postData.contents)
    let id = data.id;
    const ss = SpreadsheetApp.openById('1IvgAdEKzxkdsOPQrtd5J2CfU_6fYKQaIylvcsvzAWB8')
    const sheet = ss.getSheetByName('Users')

    if (id === 'user1') {
      sheet.getRange('B2').setValue("true")
    } else if (id === 'user2') {
      sheet.getRange('B3').setValue("true")
    }

    return ContentService.createTextOutput("login success").setMimeType(ContentService.MimeType.TEXT)
}
