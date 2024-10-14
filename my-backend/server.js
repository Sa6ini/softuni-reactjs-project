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

// Ensure the uploads directory exists
if (!fs.existsSync(profilePicturesPath)) {
    fs.mkdirSync(profilePicturesPath, { recursive: true });
}

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload configuration
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

// Utility functions
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

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Register user
app.post('/api/register', (req, res) => {
    const { fname, email, username, password } = req.body;
    const users = readUsers();
    const userExists = users.some(user => user.username === username || user.email === email);

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

// Login user
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
});

// Upload profile picture
// Ensure the profile pictures directory exists
const fsExtra = require('fs-extra');
fsExtra.ensureDirSync(profilePicturesPath);

app.post('/api/uploads/profile-picture', upload.single('profilePicture'), (req, res) => {
    const userId = req.cookies.authToken;

    // Check if the user is authenticated
    if (!userId) {
        console.error('User not authenticated');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if a file was uploaded
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const users = readUsers();
    const user = users.find(user => user.id === userId);

    // Check if the user was found
    if (!user) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile picture path
    user.profilePicture = `/uploads/profile_pictures/${req.file.filename}`;
    writeUsers(users);

    console.log('Profile picture uploaded successfully:', req.file.filename);

    // Send a response indicating success
    res.status(200).json({
        message: 'Profile picture uploaded successfully',
        filePath: user.profilePicture
    });
});



// Get profile picture
app.get('/api/uploads/profile_picture/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(profilePicturesPath, filename);

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            // Send a default image if the file is not found
            const defaultImagePath = path.join(__dirname, 'uploads/default-profile.png');
            res.sendFile(defaultImagePath);
        }
    });
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
        users.splice(userIndex, 1); // Remove the user from the array
        writeUsers(users); // Save updated users to the file
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




// Get logged-in user details
app.get('/api/user', (req, res) => {
    const userId = req.cookies.authToken;
    if (userId) {
        const users = readUsers();
        const user = users.find(user => user.id === userId);

        if (user) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } else {
        return res.status(400).json({ message: 'No authentication cookie found' });
    }
});

// Other routes (Get all users, Delete user, Update role, Logout, etc.) can stay the same...

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
