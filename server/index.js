const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/register', (req, res) => {
    console.log('Register User API called');
    console.log(req.body);
    res.send({'status': 'success'});
});

app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});
