require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
const port = process.env.PORT || 4000;
const mongo_user = process.env.MONGO_USER;
const mongo_password = process.env.MONGO_PASSWORD;
const fs = require('fs');
const path = require('path');

app.use(express.json());

mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_password}@cluster0.gkeabiy.mongodb.net/itsmejessicalee?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const projectSchema = new mongoose.Schema({
    p_id: String,
    p_title: String,
    p_description: String,
    p_images: [String],
    p_date_added: { type: Date, default: Date.now },
    p_date: { type: Date, default: Date.now },
});

const imageSchema = new mongoose.Schema({
    i_id: String,
    p_id: String,
    i_src: String,
    i_date_added: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
    userProfileName: { type: String, required: true, default: 'Unknown' },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userImage: { type: String, required: false, default: 'https://cdn.itsmejessicalee.com/profile.jpg' },
    userRole: { type: String, required: false, default: 'user' },
    userCreated: { type: Date, required: false, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);
const Image = mongoose.model('Image', imageSchema);
const User = mongoose.model('User', userSchema);

const s3 = new aws.S3({
    endpoint: 'https://475fe7a9850defb092143b6adbda5028.r2.cloudflarestorage.com',
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
    signatureVersion: 'v4',
});



const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        if (token.startsWith('Bearer ')) {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

app.get('/api', async (req, res) => {
    try {
        res.json({ message: 'works!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.post('/api/projects/new', async (req, res) => {
    const { title, description, images } = req.body;

    if (!title || !description || !images || !Array.isArray(images)) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const p_id = uuidv4();
    const imageLinks = [];

    try {
        for (const image of images) {
            const i_id = uuidv4();
            const buffer = Buffer.from(image.data, 'base64');
            const params = {
                Bucket: 'r2-jessicalee',
                Key: `${i_id}.jpg`,
                Body: buffer,
                ContentType: 'image/jpeg',
                ACL: 'public-read',
            };

            const uploadResult = await s3.upload(params).promise();
            const i_src = uploadResult.Location;

            const newImage = new Image({
                i_id,
                p_id,
                i_src,
            });

            await newImage.save();
            imageLinks.push(i_src);
        }

        const newProject = new Project({
            p_id,
            p_title: title,
            p_description: description,
            p_images: imageLinks,
        });

        await newProject.save();

        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.get('/api/projects/getall', authenticate, async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.get('/api/projects/get/:p_id', async (req, res) => {
    const { p_id } = req.params;

    try {
        const project = await Project.findOne({ p_id });
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

const uploadFile = async (file, prefix) => {
    const { originalname, buffer, mimetype } = file;
    const fileId = uuidv4();
    // Log the buffer to check its content
    console.log('Buffer:', buffer);

    if (!buffer) {
        throw new Error('Buffer is empty or undefined');
    }

    const params = {
        Bucket: 'r2-jessicalee',
        Key: `${prefix}/${fileId}.${originalname.split('.').pop()}`,
        Body: buffer,
        ContentType: mimetype || 'image/jpeg',
        ACL: 'public-read',
    };

    try {
        await s3.upload(params).promise();
        console.log('File uploaded successfully');
        const fileUrl = `https://cdn.itsmejessicalee.com/${prefix}/${fileId}.${originalname.split('.').pop()}`;
        return fileUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('File upload failed');
    }
};

app.post('/api/users/register', authenticate, upload.single('file'), async (req, res) => {
    const { userProfileName, username, password } = req.body;
    console.log("Registering user " + username + " with profile name " + userProfileName);
    const file = req.file;

    if (!username || !password || !file) {
        return res.status(400).send('Username, password, and file are required');
    }

    console.log("File received: ", file);

    // // Save the file to a temporary location
    // const tmpDir = path.join(__dirname, 'tmp');
    // if (!fs.existsSync(tmpDir)) {
    //     fs.mkdirSync(tmpDir);
    // }
    // const tmpFilePath = path.join(tmpDir, file.originalname);
    // fs.writeFileSync(tmpFilePath, file.buffer);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Ensure uploadFile is correctly implemented
    const userImage = await uploadFile(file, 'profile');
    console.log("User image uploaded to " + userImage);

    const user = new User({ userProfileName, username, password: hashedPassword, userImage: userImage });
    await user.save();


    res.send('User registered successfully');
});




app.get('/api/users', authenticate, async (req, res) => {
    try {
        const users = await User.find();
        console.log("Getting all users")
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.post('/api/users/login', async (req, res) => {
    
    const { username, password } = req.body;
    console.log("Logging in user" + username)
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Invalid username');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token, userImage: user.userImage, userProfileName: user.userProfileName });
});

app.post('/api/users/delete', authenticate, async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Invalid username');
    }
    await User.deleteOne({ username });
    res.send('User deleted successfully');
});

app.get('/api/auth/verify', authenticate, (req, res) => {
    res.json({ isAuthenticated: true });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

