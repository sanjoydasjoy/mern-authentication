const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

main()
    .then(() => { console.log("Connection Successful") })
    .catch(err => console.log(err));

async function main() { 
    await mongoose.connect('mongodb://127.0.0.1:27017/auth'); 
}

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', error: 'Duplicate email' });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        );
        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
});


app.listen(1000, () => {
    console.log('Server is running on port 1000');
});
