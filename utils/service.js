const axios = require('axios')

exports.addUser = (async  (username, password) => {
    try {
        const response = await axios.post('https://script.google.com/macros/s/AKfycbweMRPhY_xyyx73nvPZAZHDcP4SNjFQl0Z6kTHiMbDIN9N4LKZLF6coOPARyqdVhwb1gQ/exec?action=addUser', username, password);
        return response.data
    } catch (err) {
        console.log(err)
        res.status(500).send('Error adding user:');
    }
})

exports.getUser = (async (req, res) => {
    try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbweMRPhY_xyyx73nvPZAZHDcP4SNjFQl0Z6kTHiMbDIN9N4LKZLF6coOPARyqdVhwb1gQ/exec?action=readData')
        return response.data
    } catch (err) {
        console.log(err)
        res.status(500).send('server internal error')
    }
})

exports.addInventory = (async (productData) => {
    try {
        const response = await axios.post('https://script.google.com/macros/s/AKfycbweMRPhY_xyyx73nvPZAZHDcP4SNjFQl0Z6kTHiMbDIN9N4LKZLF6coOPARyqdVhwb1gQ/exec?action=addInventory', productData)
        return response.data
    } catch (err) {
        console.log(err)
        res.status(500).send('server internal error')
    }
})

exports.getInventory = (async (req, res) => {
    try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbweMRPhY_xyyx73nvPZAZHDcP4SNjFQl0Z6kTHiMbDIN9N4LKZLF6coOPARyqdVhwb1gQ/exec?action=readInventory')
        return response.data
    } catch (err) {
        console.log(err)
        res.status(500).send('server internal error')
    }
})
