const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const usersFilePath = path.join(__dirname, 'users.json');
const profilePicturesPath = path.join(__dirname, '/uploads/profile_pictures');

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

app.post('/api/register', (req, res) => {
    const { fname, email, username, password } = req.body;
    const users = readUsers();
    const userExists = users.find(user => user.username === username || user.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: uuidv4(),
        fname,
        email,
        username,
        password,
        profilePicture: '',
        role: 'user'
    };
    users.push(newUser);
    writeUsers(users);

    res.status(200).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.cookie('authToken', user.id, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'User logged in successfully' });
    console.log(`Setting authToken cookie for user ID: ${user.id}`);
});

app.post('/api/upload/profile_pictures', upload.single('profilePicture'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.cookies.authToken;
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const users = readUsers();
    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const profilePictureUrl = `${req.protocol}://${req.get('host')}/uploads/profile_pictures/${req.file.filename}`;
    user.profilePicture = profilePictureUrl;
    writeUsers(users);

    res.status(200).json({ message: 'Profile picture updated successfully' });
});

app.get('/api/user', (req, res) => {
    const userId = req.cookies.authToken;
    if (userId) {
        const users = readUsers();
        const user = users.find(user => user.id === userId);

        if (user) {
            res.status(200).json({ user: user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(400).json({ message: 'No cookie found' });
    }
});
app.get('/api/users', (req, res) => {
    const users = readUsers();
    res.status(200).json(users);
});
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    let users = readUsers();

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        writeUsers(users);
        return res.status(200).json({ message: 'User deleted successfully' });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});

app.put('/api/users/:id/role', (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;
    let users = readUsers();

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex].role = role;
        writeUsers(users);
        return res.status(200).json({ message: 'Role updated successfully' });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
});



app.post('/api/logout', (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
    });
    res.status(200).json({ message: 'User logged out successfully' });
});

app.use('/uploads', express.static(profilePicturesPath));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
