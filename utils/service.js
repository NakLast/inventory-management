const axios = require('axios')

exports.getUser = (async (req, res) => {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbweMRPhY_xyyx73nvPZAZHDcP4SNjFQl0Z6kTHiMbDIN9N4LKZLF6coOPARyqdVhwb1gQ/exec?action=readData')
    return response.data
})
exports.addUser = (async (username, password) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbweMRPhY_xyyx73nvPZAZHDcP4SNjFQl0Z6kTHiMbDIN9N4LKZLF6coOPARyqdVhwb1gQ/exec?action=addUser', username, password)
    return response.data
})

exports.addInventory = (async (productData) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbxoczEzSkn-c6cYIg1BBkl9S5SB6lBX5MwY8PAsJfV44rsx1dH3-uzTJezqV17ZoC_T4Q/exec?action=addInventory', productData)
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
exports.deleteRecordInventory = async (productId) => {
    const response = await axios.post(`https://script.google.com/macros/s/AKfycbxi1i0arxv7Jj_OO054G1ob2cDwvW48O8uUhUSvEj5unAQ5g8wR2PAY7vkw3SUDFOUnLQ/exec?action=deleteInventory`, productId);
    return response.data;
}

exports.getEmployee = (async (req, res) => {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbyg9Bg9WmgEBVkJ6bk3HBohsRwIntnuDN-tmu1GmIFqe5VWM3nIsHP0YWgMPomnSZ7qpA/exec?action=readEmployee')
    return response.data

})
exports.addEmployee = (async (employeeData) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbzXv6K1XxlmH-gHrPvtIyfwAyeuK3lRMXkkK_MyrN1MMvkiESaZI3G9FneA9FDJmQ4p3Q/exec?action=addEmployee', employeeData)
    return response.data

})

exports.getRecordWorkTime = (async (req, res) => {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbxWs5KmYlqk0HjjAAKHFC3Gh69SOThcuKTyU5_xvSeT4fA7fYwXjM_n5_36gCW7Q4KjUQ/exec?action=readRecordWorkTime')
    return response.data

})
exports.addRecordWorkTime = (async (req, res) => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbxWs5KmYlqk0HjjAAKHFC3Gh69SOThcuKTyU5_xvSeT4fA7fYwXjM_n5_36gCW7Q4KjUQ/exec?action=addRecordWorkTime', recordWorkTimeData)
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
