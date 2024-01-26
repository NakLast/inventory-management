const axios = require('axios')

exports.getUser = (async (req, res) => {
    const response = await axios.get('https://script.google.com/macros/s/AKfycby1fuv43FHA9b0NjNairfv66jvu8A-oNcn5jG9tyGs-exriehJNyWulvRICdkq65RYsDQ/exec?action=readData')
    return response.data
})
exports.addUser = (async (username, password) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbweMRPhY_xyyx73nvPZAZHDcP4SNjFQl0Z6kTHiMbDIN9N4LKZLF6coOPARyqdVhwb1gQ/exec?action=addUser', username, password)
    return response.data
})

exports.addInventory = (async (productData) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbyv1zINaMxy5Auxh7B0cb9D-x97X0qKu2PVMIFsu5bskbUP5oD7Psm0zBwdfMehCSvkwQ/exec?action=addInventory', productData)
    return response.data
})

exports.getInventory = (async (req, res) => {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbweMRPhY_xyyx73nvPZAZHDcP4SNjFQl0Z6kTHiMbDIN9N4LKZLF6coOPARyqdVhwb1gQ/exec?action=readInventory')
    return response.data

})
exports.getInventoryById = async (id) => {
    const response = await axios.get(`https://script.google.com/macros/s/AKfycbwKlTB-Mgrl_a-ZUAL-h3qYnQ46lctE_F_w55XzuXuVET3X0tibaUTN1vNFHA9wR3g0-A/exec?action=readRecordInventory&id=${id}`)
    return response.data
}
exports.updateRecordInvetory = async (updateRecordInvetory) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbzJIGyekFQroo00PV6MM2FexGsapeGg1_FVABM2FRA5dRJ35i9iDjwm9Z98nqN_ijIQpQ/exec?action=updateIRecordnvetory', updateRecordInvetory)
    return response.data
}
exports.deleteRecordInventory = async (id) => {
    const response = await axios.post(`https://script.google.com/macros/s/AKfycbxszDApK16XiE1RRXn7byEQYWY0_OcRaBq-XwFz1gdegSIVw_Biyqhuy9hMaYONanU7_Q/exec?action=deleteInventory`, id);
    return response.data;
}

exports.getEmployee = (async (req, res) => {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbyg9Bg9WmgEBVkJ6bk3HBohsRwIntnuDN-tmu1GmIFqe5VWM3nIsHP0YWgMPomnSZ7qpA/exec?action=readEmployee')
    return response.data

})
exports.addEmployee = (async (employeeData) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbw_ZgjRpUMly8GVvn3MpidejdD0GsVJtRZt6J37kt9L5UV-ZDD8Pv-fQU4G0pHROVSwmQ/exec?action=addEmployee', employeeData)
    return response.data

})

exports.getRecordWorkTime = (async (req, res) => {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbxWs5KmYlqk0HjjAAKHFC3Gh69SOThcuKTyU5_xvSeT4fA7fYwXjM_n5_36gCW7Q4KjUQ/exec?action=readRecordWorkTime')
    return response.data

})
exports.addRecordWorkTime = (async (recordWorkTimeData) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycby1fuv43FHA9b0NjNairfv66jvu8A-oNcn5jG9tyGs-exriehJNyWulvRICdkq65RYsDQ/exec?action=addRecordWorkTime', recordWorkTimeData)
    return response.data

})
exports.getRecordWorkTimeById = async (id) => {
    const response = await axios.get(`https://script.google.com/macros/s/AKfycbzM4ljnCPSj48kB5hhESSD052DXlwKqV93WIoWzOe2CdOxSlFG0n28POK7QJXc90AhUIQ/exec?action=readRecordWorkTime&id=${id}`)
    return response.data

}
exports.updateRecordWorkTime = async (updateRecordWorkTime) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbzvzojjgUXpzjjJ172NZNNtytBN0FjjjFcpzEspulBjTJsEc153PgEjAQ0E3WsRI81zvw/exec?action=updateRecordWorkTime', updateRecordWorkTime)
    return response.data
}
