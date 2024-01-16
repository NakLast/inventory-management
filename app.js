const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const service = require('./utils/service')
const bcrypt = require('bcryptjs')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))

function formatTime(timeString) {
    const parsedTime = new Date(timeString);

    if (isNaN(parsedTime.getTime())) {
        return '-:-';
    }

    const formattedTime = parsedTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return formattedTime;
}

app.get('/', (req, res) => {
    res.status(200).render('login')
})

app.get("/user", async (req, res) => {
    const users = await service.getUser()

    res.render('user', { users: users })
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const users = await service.getUser()
    const existingUser = users.find(user => user.username === username)

    if (!existingUser) {
        res.status(400).send('no user in database')
    }

    if (!await bcrypt.compare(password, existingUser.password)) {
        res.status(400).send('incorrect password')
    }

    const inventory = await service.getInventory()

    res.render('dashboard', { loggedinName: existingUser.username, productData: inventory, users: users })
})

app.get('/dashboard', async (req, res) => {
    const users = await service.getUser()
    const inventory = await service.getInventory()

    res.status(200).render('dashboard', { productData: inventory, users: users })
})

app.get('/addProduct-form', (req, res) => {
    res.status(200).render('addProduct')
})

app.post("/addProduct", async (req, res) => {
    const { product_id, product, quantity, amount } = req.body

    try {
        const productData = { product_id, product, quantity, amount }
        await service.addInventory(productData)

        const inventory = await service.getInventory()

        res.render('dashboard', { productData: inventory })
    } catch (error) {
        console.error('Error adding product:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/register-form', (req, res) => {
    res.status(200).render('register')
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body

    try {
        // Check if the user already exists
        const users = await service.getUser()
        const existingUser = users.find(user => user.username === username)

        if (existingUser) {
            console.log('User already exists.')
            return res.status(400).send('User already exists.')
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10)

        // Save the new user to the database
        await service.addUser({
            username,
            password: hashedPassword,
        })

        console.log('User registered successfully.')
        res.status(200).render('user', { users: users })
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/employee-form', async (req, res) => {
    res.status(200).render('addEmployee')
})

app.get('/employee', async (req, res) => {
    const employee = await service.getEmployee()

    res.status(200).render('employee', { employee: employee })
})

app.post('/addEmployee', async (req, res) => {
    const { first_name, last_name, phone } = req.body

    try {
        const employeeData = { first_name, last_name, phone }
        await service.addEmployee(employeeData)

        const employee = await service.getEmployee()

        res.render('employee', { employee: employee })
    } catch {
        console.error('Error adding product:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/recordWorkTime', async (req, res) => {
    const employee_name = await service.getEmployee()
    const recordWorkTime = await service.getRecordWorkTime()

    const formattedRecordWorkTime = recordWorkTime.map(item => ({
        date: item.date,
        employee: item.employee,
        start_time: formatTime(item.start_time),
        end_time: formatTime(item.end_time),
    }))

    res.status(200).render('recordWorkTime', { recordWorkTime: formattedRecordWorkTime, employee_name: employee_name })
})

app.post('/addRecordWorkTime', async (req, res) => {
    const { employee, start_time, end_time } = req.body

    try {
        const recordWorkTimeData = {
            employee,
            start_time,
            end_time,
        }

        await service.addRecordWorkTime(recordWorkTimeData)

        const employee_name = await service.getEmployee()

        const recordWorkTime = await service.getRecordWorkTime()

        const formattedRecordWorkTime = recordWorkTime.map(item => ({
            date: item.date,
            employee: item.employee,
            start_time: formatTime(item.start_time),
            end_time: formatTime(item.end_time),
        }))

        res.render('recordWorkTime', { recordWorkTime: formattedRecordWorkTime, employee_name: employee_name })
    } catch (error) {
        console.error('Error adding record work time:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.post("/updateRecordWorkTime", async (req, res) => {
    const { recordId, start_time, end_time } = req.body;

    try {
        const recordData = await service.updateRecordWorkTime({ id: recordId, start_time, end_time });
        await service.updateRecordWorkTime(recordData)
        const recordWorkTime = await service.getRecordWorkTime()

        const formattedRecordWorkTime = recordWorkTime.map(item => ({
            date: item.date,
            employee: item.employee,
            start_time: formatTime(item.start_time),
            end_time: formatTime(item.end_time),
        }))
        const employee_name = await service.getEmployee()

        res.render('recordWorkTime', { recordWorkTime: formattedRecordWorkTime, employee_name: employee_name });
    } catch (error) {   
        console.error('Error updating record work time:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/logout', (req, res) => {
    res.redirect('/')
})

module.exports = app
