require('dotenv').config();
const express = require('express');
const { createRouteHandler } = require("uploadthing/express");
const { uploadRouter } = require("./uploadthing");
const mongoose = require('mongoose');
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
const nodemailer = require('nodemailer');
const axios = require('axios');
const { PDFDocument } = require('pdf-lib');

const { UTApi } = require("uploadthing/server");
const { fromBuffer } = require('pdf2pic');

app.use(express.json());



mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_password}@cluster0.gkeabiy.mongodb.net/itsmejessicalee?retryWrites=true&w=majority&appName=Cluster0`, {

    useUnifiedTopology: true,
});

const projectSchema = new mongoose.Schema({
    p_id: String,
    p_title: String,
    p_description: String,
    p_images: [String],
    p_date_added: { type: Date, default: Date.now },
    p_date: { type: Date, default: Date.now },
    p_tags: [String], // Add this line
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



const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-2.amazonaws.com', // Replace with your Amazon SES SMTP endpoint
    port: 465, // Use the TLS Wrapper Port for secure connection
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
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

app.use(
    "/api/uploadthing",
    createRouteHandler({
      router: uploadRouter,
    }),
);

const getAllInUseFileIds = async () => {
    try {
        const projects = await Project.find();
        const fileIds = [];

        for (const project of projects) {
            if (project.p_images && project.p_images.length > 0) {
                fileIds.push(...project.p_images);
            }
        }

        return fileIds;
    } catch (error) {
        console.error('Error fetching file IDs:', error);
        throw new Error('Failed to fetch file IDs');
    }
};




app.get('/', async (req, res) => {
    res.send({ "message": "works!"});
});

app.post('/api/users/register', authenticate, async (req, res) => {
    const { userProfileName, username, password, userImage } = req.body;
    console.log("Registering user " + username + " with profile name " + userProfileName);

    if (!username || !password || !userImage) {
        return res.status(400).send('Username, password, and user image are required');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ userProfileName, username, password: hashedPassword, userImage });
    await user.save();

    res.send('User registered successfully');
});

app.put('/api/users/update/:id', authenticate, async (req, res) => {
    const { userProfileName, userImage } = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.userProfileName = userProfileName;
        user.userImage = userImage;

        await user.save();
        res.send('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
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

app.post('/api/projects/add', authenticate, async (req, res) => {
    try {
        const { projectName, projectDescription, projectDate, files, tags } = req.body;

        if (!projectName || !projectDescription || files.length === 0) {
            return res.status(400).json({ message: 'Please fill out the form and upload at least one file.' });
        }

        const project = new Project({
            p_id: uuidv4(),
            p_title: projectName,
            p_description: projectDescription,
            p_images: files,
            p_date: projectDate,
            p_tags: tags // Add this line
        });

        await project.save();

        res.status(201).json({ message: 'Project created successfully', projectId: project.p_id });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/projects/get_count', async (req, res) => {
    try {
        const projectCount = await Project.countDocuments();
        res.status(200).json({ count: projectCount });
    } catch (error) {   
        console.error('Error fetching project count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/projects/getall', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/projects/get/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findOne({ p_id: projectId });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/projects/get_images/:id', async (req, res) => {
    try {
        const imageId = req.params.id;
        const image = await Image.findOne({ i_id: imageId });

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json(image.i_src);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/projects/delete/:id', authenticate, async (req, res) => {
    const projectId = req.params.id;
    await Image.deleteMany({ p_id: projectId });
    await Project.deleteOne({ p_id: projectId });
    res.send('Project deleted successfully');
});

app.put('/api/projects/update/:id', authenticate, async (req, res) => {
    try {
        const projectId = req.params.id;
        const { projectName, projectDescription, projectDate, files, tags } = req.body;

        const project = await Project.findOne({ p_id: projectId });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.p_title = projectName;
        project.p_description = projectDescription;
        project.p_date = projectDate;
        project.p_images = files;
        project.p_tags = tags; // Add this line

        await project.save();
        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/projects/newest', async (req, res) => {
    try {
        const newestProjects = await Project.find().sort({ p_date_added: -1 }).limit(3);
        // Console log the projects
        res.json(newestProjects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

app.get('/api/projects/get_images', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

app.post('/api/email/submit', async (req, res) => {
    const { name, email, message, token } = req.body;
    console.log("Email received: ", name, email, message);

    // Verify reCAPTCHA token
    const secretKey = '6LdfWvQpAAAAAHYLnwEWBqOi4OfH7rQpIenG9p2r';
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
        const response = await axios.post(verificationUrl);
        const { success } = response.data;

        if (!success) {
            return res.status(400).send('reCAPTCHA verification failed');
        }

        const mailOptions = {
            from: '"Your Name" <jess@mail.raavcorp.com>', // Replace with your "from" address
            to: 'ryan@theryanvogel.com', // Replace with the recipient's email address
            subject: 'New Contact Form Submission from ' + name,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="text-align: center; color: #4A5568;">Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            </div>
        `
        };

        try {
            await transporter.sendMail(mailOptions);
            res.send('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        } // Add this closing brace to properly close the try block
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    } // Add this closing brace to properly close the try block
}); // Add this closing parenthesis to properly close the app.post function

// Initialize UploadThing API
const utapi = new UTApi();

app.post('/api/convert-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfBuffer = req.file.buffer;
    const options = {
      density: 3300,      
      savePath: "./tmp-images",
      width: 2000,
      height: 2000
    };

    // Check if tmp-images directory exists, if not create it
    const tmpDir = './tmp-images';
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
      console.log('Created tmp-images directory');
    } else {
      console.log('tmp-images directory already exists');
    }

    

    const pdfLoadDoc = await PDFDocument.load(pdfBuffer);
    const pageCount = pdfLoadDoc.getPageCount();
    console.log('page count', pageCount);

    const convert = fromBuffer(pdfBuffer, options);
    // const imageUrls = [];

    // for (let i = 1; i <= pageCount; i++) {
    //     convert(i, { responseType: "image" })
    //     .then((resolve) => {
    //         console.log("Page 1 is now converted as image");

    //         return resolve;
    //     });
        
        
    // }
    const result = await convert.bulk(-1);
    console.log(result);
    console.log(typeof result);

    

    const tempDir = './tmp-images';
    const imageUrls = [];
    let count = 0;
    for (const image of result) {
        const imageUrl = await utapi.uploadFiles(new File([image], image.name + count + '.png', { type: 'image/png' }));
        imageUrls.push(imageUrl);
        fs.unlinkSync(image.path);
        count++;
    }

    res.json({ imageUrls });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Error processing PDF: ' + error.message });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});