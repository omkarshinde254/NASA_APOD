const express = require('express');
const app = express();
const cors = require('cors');
// const mongoose = require('mongoose');
// const user = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Enable CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Connect to MongoDB
// mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.CLUSTRNAME}`);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.post('/api/register', async (req, res) => {
//     try {
//         if (!req.body.name || !req.body.email || !req.body.password) {
//             res.send({ 'status': 'error' });
//             return;
//         }
//         // console.log('Register User API called');
//         const newPass = await bcrypt.hash(req.body.password, 10);
//         const u = await user.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: newPass,
//             oauth: 'N'
//         })
//         res.send({ 'status': 'success' });
//         // console.log("MongoDB: " + u);
//         // console.log(req.body);
//     } catch (error) {
//         // console.log("Error- ",error);
//         res.send({ 'status': 'error' });
//     }
// });


// app.post('/api/login', async (req, res) => {
//     try {
//         if (!req.body.email || !req.body.password) {
//             res.send({ 'status': 'error' });
//             return;
//         }

//         const u = await user.findOne({
//             email: req.body.email,
//             // password: req.body.password
//         })

//         if (!u) {
//             res.send({ 'status': 'error' });
//             return;
//         }

//         const isValidPass = await bcrypt.compare(req.body.password, u.password);

//         if (isValidPass) {
//             const token = jwt.sign(
//                 {
//                     name: u.name
//                 }, process.env.JWT_SECRET, { expiresIn: '1h' }
//             )

//             res.send({ 'status': 'success', 'user': token });
//         } else {
//             res.send({ 'status': 'error' });
//             return;
//         }
//     } catch (error) {
//         res.send({ 'status': 'error' });
//     }

// });


// app.post('/api/login_outh', async (req, res) => {
//     try {
//         var createuser = false;
//         if (!req.body.oauth) {
//             res.send({ 'status': 'error' });
//             return;
//         }

//         token = jwt.decode(req.body.oauth.credential);
//         // console.log("Oauth-- ",req.body.oauth.credential);
//         // console.log("Token-- ",token);

//         const u = await user.findOne({
//             email: token.email,
//             oauth: 'Y'
//             // password: req.body.password
//         })

//         if (!u) {
//             // console.log('Register User API called');
//             const u = await user.create({
//                 name: token.name,
//                 email: token.email,
//                 oauth: 'Y'
//             })
//             createuser = true;
//         }
//         const new_token = jwt.sign(
//             {
//                 name: token.name
//             }, process.env.JWT_SECRET, { expiresIn: '1h' }
//         )

//         res.send({ 'status': 'success', 'user': new_token, 'createuser': createuser });
//     } catch (error) {
//         // console.log("Error- ", error)
//         res.send({ 'status': 'error' });
//     }

// });

app.get('/api/nasa_apod', async (req, res) => {
    try {
        // console.log("Calling for date- ", req.query.date)
        const response = await fetch('https://api.nasa.gov/planetary/apod?'
        + new URLSearchParams({
                'date': req.query.date,
                'api_key': process.env.NASA_APOD_KEY,
            })
        );
        const data = await response.json();
        // console.log("Apod Response- ",data);
        res.send(data);

    } catch (error) {
        console.log("Error- ", error)
        res.send({ 'status': 'error' });
    }
});

app.listen(3001, () => {
    console.log('App Started');
});
