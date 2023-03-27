const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./models/user.model');
const jwt = require('jsonwebtoken');

// Enable CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://dbuser:ZhEsjLIyd3fAejMJ@atlascluster.8jvouzs.mongodb.net/nasa_apod');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/register', async (req, res) => {
    try {
        console.log('Register User API called');
        res.send({ 'status': 'success' });
        const u = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        console.log("MongoDB: " + u);
        console.log(req.body);
    } catch (error) {
        console.log(error);
        res.send({ 'status': 'error' });
    }
});


app.post('/api/login', async (req, res) => {
    const u = await user.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (u) {
        const token = jwt.sign(
            {
                name: u.name
            }, 'secret', { expiresIn: '1h' }
        )

        res.send({ 'status': 'success', 'user': token});
    } else {
        res.send({ 'status': 'error' });
    }

});


app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});
