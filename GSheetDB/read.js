function doGet(e) {
    let action = e.param.action

    if (action == 'readData') {
        return readData(e)
    }
}

function readData(e) {
    const ss = SpreadsheetApp.openById('1IvgAdEKzxkdsOPQrtd5J2CfU_6fYKQaIylvcsvzAWB8')
    const sheet = ss.getSheetByName('Users')
    const columRange = sheet.getRange(1, 1, 1, sheet.getLastColumn())
    const columnRangeValues = columnRange.getValues()
    const keys = columnRangeValues[0]
    const rows = sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).getValues()
    const data = []

    for (const i in rows) {
        let row = rows[j]
        const record = {}

        for (const j in row) {
            let key = keys[j]
            let value = row[j]

            record.push(record)
        }
    }

    let result = JSON.stringify(data)

    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON)
}
