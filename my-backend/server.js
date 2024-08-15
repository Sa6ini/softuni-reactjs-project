const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const usersFilePath = path.join(__dirname, 'users.json');
const profilePicturesPath = path.join(__dirname, 'uploads/profile_pictures');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profilePicturesPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/register', (req, res) => {
    const { fname, email, username, password } = req.body;
    const users = readUsers();
    const userExists = users.find(user => user.username === username || user.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { fname, email, username, password, profilePicture: '' };
    users.push(newUser);
    writeUsers(users);

    res.status(200).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.cookie('authToken', username, { 
        httpOnly: true, 
        secure: false, 
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000 
    });
    console.log(`Setting authToken cookie for user: ${username}`);
    res.status(200).json({ message: 'User logged in successfully' });
});

app.post('/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const username = req.cookies.authToken;
    console.log(`Received cookie authToken: ${username}`);
    if (!username) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const users = readUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.profilePicture = `uploads/profile_pictures/${req.file.filename}`;
    writeUsers(users);

    res.status(200).json({ message: 'Profile picture updated successfully' });
});

app.get('/user', (req, res) => {
    console.log(`Cookies in /user: ${JSON.stringify(req.cookies)}`);
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

app.use('/uploads', express.static(profilePicturesPath));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
