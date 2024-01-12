const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
const service = require('./utils/service')
const bcrypt = require('bcryptjs')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).render('login')
})

app.get("/user", async(req, res) => {
    const users = await service.getUser();

    res.render('user', { users: users });
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const users = await service.getUser();
    const existingUser = users.find(user => user.username === username);

    if (!existingUser) {
        res.status(400).send('no user in database');
    };

    if (!await bcrypt.compare(password, existingUser.password)) {
        res.status(400).send('incorrect password');
    };

    const inventory = await service.getInventory();

    res.render('dashboard', { loggedinName: existingUser.username, productData: inventory, users: users });
});

app.get('/dashboard', async (req, res) => {
    const users = await service.getUser();
    const inventory = await service.getInventory();

    res.status(200).render('dashboard', { productData: inventory, users: users });
})

app.get('/addProduct-form', (req, res) => {
    res.status(200).render('addProduct');
});

app.post("/addProduct", async (req, res) => {
    const { product, quantity, amount } = req.body

    try {
        const productData = { product, quantity, amount };
        await service.addInventory(productData);

        const inventory = await service.getInventory();

        res.render('dashboard', {productData: inventory});
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/register-form', (req, res) => {
    res.status(200).render('register');
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const users = await service.getUser();
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            console.log('User already exists.');
            return res.status(400).send('User already exists.');
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user to the database
        await service.addUser({
            username,
            password: hashedPassword,
        });

        console.log('User registered successfully.');
        res.status(200).render('user', { users: users })
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/logout', (req, res) => {
    res.redirect('/');
});

module.exports = app
