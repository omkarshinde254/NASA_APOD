const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Enable CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.CLUSTRNAME}`);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/register', async (req, res) => {
    try {
        // console.log('Register User API called');
        const newPass = await bcrypt.hash(req.body.password, 10);
        const u = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: newPass
        })
        res.send({ 'status': 'success' });
        // console.log("MongoDB: " + u);
        // console.log(req.body);
    } catch (error) {
        // console.log("Error- ",error);
        res.send({ 'status': 'error' });
    }
});


app.post('/api/login', async (req, res) => {
    const u = await user.findOne({
        email: req.body.email,
        // password: req.body.password
    })

    if (!u) {
        res.send({ 'status': 'error' });
    }

    const isValidPass = await bcrypt.compare(req.body.password, u.password);

    if (isValidPass) {
        const token = jwt.sign(
            {
                name: u.name
            }, process.env.JWT_SECRET, { expiresIn: '1h' }
        )

        res.send({ 'status': 'success', 'user': token });
    } else {
        res.send({ 'status': 'error' });
    }

});

app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});
