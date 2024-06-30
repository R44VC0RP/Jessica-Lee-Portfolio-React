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
const nodemailer = require('nodemailer');
const axios = require('axios');
// const bodyParser = require('body-parser');

app.use(express.json());
// app.use(bodyParser.json());

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

const contactSchema = new mongoose.Schema({
    c_name: String,
    c_email: String,
    c_message: String,
    c_date: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);
const Image = mongoose.model('Image', imageSchema);
const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

const s3 = new aws.S3({
    endpoint: 'https://475fe7a9850defb092143b6adbda5028.r2.cloudflarestorage.com',
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
    signatureVersion: 'v4',
});

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

const cleanUpUnusedFiles = async () => {
    try {
        const inUseFileIds = await getAllInUseFileIds();
        const allFiles = await Image.find();
        const unusedFiles = allFiles.filter(file => !inUseFileIds.includes(file.i_id));

        for (const file of unusedFiles) {
            await deleteFile(file.i_src); // Delete the file from S3
            await Image.deleteOne({ i_id: file.i_id }); // Remove the file record from the database
        }

        console.log('Unused files cleaned up successfully');
    } catch (error) {
        console.error('Error cleaning up unused files:', error);
        throw new Error('Failed to clean up unused files');
    }
};



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

const deleteFile = async (fileUrl) => {
    const params = {
        Bucket: 'r2-jessicalee',
        Key: fileUrl.split('/').slice(3).join('/'),
    };
    await s3.deleteObject(params).promise();
    console.log('File deleted successfully');
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

app.post('/api/projects/add', authenticate, upload.array('files', 10), async (req, res) => {
    try {
        const { projectName, projectDescription, projectDate } = req.body;
        const files = req.files;
        console.log("Adding a new project with the name " + projectName + " and description " + projectDescription + " with " + files.length + " files");

        if (!projectName || !projectDescription || files.length === 0) {
            return res.status(400).json({ message: 'Please fill out the form and upload at least one file.' });
        }

        // 1. Create the project in the DB
        const project = new Project({
            p_id: uuidv4(),
            p_title: projectName,
            p_description: projectDescription,
            p_images: [],
            p_date: projectDate
        });

        // 2. For each image, create an image ID, upload the image, and add image to the DB (with the project ID)
        for (const file of files) {
            const imageId = uuidv4();
            const fileUrl = await uploadFile(file, 'projects');
            const image = new Image({
                i_id: imageId,
                p_id: project.p_id,
                i_src: fileUrl
            });
            await image.save();
            project.p_images.push(imageId);
        }

        // 3. Save the project in the DB with all of the image IDs
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

app.put('/api/projects/update/:id', authenticate, upload.array('files', 10), async (req, res) => {
    const projectId = req.params.id;
    const { projectName, projectDescription, projectDate } = req.body;
    const files = req.files;

    const project = await Project.findOne({ p_id: projectId });
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    project.p_title = projectName;
    project.p_description = projectDescription;
    project.p_date = projectDate;

    if (files && files.length > 0) {

        const existingImages = await Image.find({ p_id: project.p_id });
        const existingImageIds = existingImages.map(image => image.i_id);
        for (const image of existingImages) {
            await deleteFile(image.i_src); // Delete the image from S3
            await Image.deleteOne({ i_id: image.i_id }); // Remove the image record from the database
        }

        // 2. Upload new images to S3 and update the project
        project.p_images = [];
        for (const file of files) {
            const imageId = uuidv4();
            const fileUrl = await uploadFile(file, 'projects');
            const image = new Image({
                i_id: imageId,
                p_id: project.p_id,
                i_src: fileUrl
            });
            await image.save();
            project.p_images.push(imageId);
        }
    }

    await project.save();
    res.json({ message: 'Project updated successfully' });
});

app.get('/api/projects/newest', async (req, res) => {
    try {
        cleanUpUnusedFiles();
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
            from: '"New Contact Form Submission" <jess@mail.raavcorp.com>', // Replace with your "from" address
            to: 'jessicaleehornung@gmail.com', // Replace with the recipient's email address
            subject: 'New Contact Form Submission from ' + name,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="text-align: center; color: #4A5568;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            </div>
        `
        };

        const contact = new Contact({ c_name: name, c_email: email, c_message: message });
        await contact.save();

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


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
