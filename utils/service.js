const axios = require('axios')

exports.addUser = (async (username, password) => {
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
        const response = await axios.post('https://script.google.com/macros/s/AKfycbxoczEzSkn-c6cYIg1BBkl9S5SB6lBX5MwY8PAsJfV44rsx1dH3-uzTJezqV17ZoC_T4Q/exec?action=addInventory', productData)
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

exports.addEmployee = (async (employeeData) => {
    try {
        const response = await axios.post('https://script.google.com/macros/s/AKfycbzXv6K1XxlmH-gHrPvtIyfwAyeuK3lRMXkkK_MyrN1MMvkiESaZI3G9FneA9FDJmQ4p3Q/exec?action=addEmployee', employeeData)
        return response.data
    } catch (err) {
        console.log(err)
        res.status(500).send('server internal error')
    }
})

exports.getEmployee = (async (req, res) => {
    try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbyg9Bg9WmgEBVkJ6bk3HBohsRwIntnuDN-tmu1GmIFqe5VWM3nIsHP0YWgMPomnSZ7qpA/exec?action=readEmployee')
        return response.data
    } catch (err) {
        console.log(err)
        res.status(500).send('server internal error')
    }
})

exports.getRecordWorkTime = (async (req, res) => {
    try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbxWs5KmYlqk0HjjAAKHFC3Gh69SOThcuKTyU5_xvSeT4fA7fYwXjM_n5_36gCW7Q4KjUQ/exec?action=readRecordWorkTime')
        return response.data
    } catch (err) {
        console.log(err)
        res.status(500).send('server internal error')
    }
})

exports.addRecordWorkTime = (async (req, res) => {
    try {
        const response = await axios.post('https://script.google.com/macros/s/AKfycbxWs5KmYlqk0HjjAAKHFC3Gh69SOThcuKTyU5_xvSeT4fA7fYwXjM_n5_36gCW7Q4KjUQ/exec?action=addRecordWorkTime', recordWorkTimeData)
        return response.data
    } catch {
        console.log(err)
        res.status(500).send('server internal error')
    }
})

exports.getRecordWorkTimeById = async (id) => {
    try {
        const response = await axios.get(`https://script.google.com/macros/s/AKfycbzM4ljnCPSj48kB5hhESSD052DXlwKqV93WIoWzOe2CdOxSlFG0n28POK7QJXc90AhUIQ/exec?action=readRecordWorkTime&id=${id}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching record by id:', err);
        throw err;
    }
}

exports.updateRecordWorkTime = async (id, start_time, end_time) => {
    try {
      const response = await axios.post(`https://script.google.com/macros/s/AKfycbysfv6PsHF3VaRcSsoQ_2bLvebHNBMVD2Hovqhz9m1wvHSJ2Qa8vkf7uSUyiz30ypDI4Q/exec?action=updateRecordWork&id=${id}`, {
        start_time,
        end_time,
      });
  
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  


