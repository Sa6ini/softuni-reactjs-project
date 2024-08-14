const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const usersFilePath = path.join(__dirname, 'users.json');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) return [];
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    res.cookie('authToken', username, { 
        httpOnly: true, 
        secure: false, 
        sameSite: 'None', 
        maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(200).json({ message: 'User logged in successfully' });
});

app.get('/api/user', (req, res) => {
    if (req.cookies && req.cookies.authToken) {
        const users = readUsers();
        const user = users.find(user => user.username === req.cookies.authToken);

        if (user) {
            res.status(200).json({ user: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(400).json({ message: 'No cookie found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
