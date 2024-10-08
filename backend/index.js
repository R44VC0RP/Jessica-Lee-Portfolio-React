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
const { PDFDocument, PDFPage } = require('pdf-lib');
const { GenerateImage } = require('./opengraph');
const { UTApi, UTFile } = require("uploadthing/server");
const { fromBuffer } = require('pdf2pic');
const cors = require('cors');
const sharp = require('sharp');


app.use(express.json());
app.use(cors());

const tmpDir = './tmp-images';

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
    

    // Check if tmp-images directory exists, if not create it
    
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
      console.log('Created tmp-images directory');
    } else {
      console.log('tmp-images directory already exists');
    }

    const pdfLoadDoc = await PDFDocument.load(pdfBuffer);
    const pageCount = pdfLoadDoc.getPageCount();
    const page = pdfLoadDoc.getPage(0);
    const width = page.getWidth();
    const height = page.getHeight();
    console.log('page count', pageCount);
    console.log('width', width);
    console.log('height', height);
    const options = {
      density: 150,  // Reduced from 330 to 150 for smaller file size
      savePath: "./tmp-images",
      width: Math.round(width * 1.5),  // Reduced from 3x to 1.5x
      height: Math.round(height * 1.5),  // Reduced from 3x to 1.5x
      saveFilename: req.file.originalname
    };
    const convert = fromBuffer(pdfBuffer, options);
    const result = await convert.bulk(-1);

    const imageUrls = [];
    for (let i = 0; i < result.length; i++) {
      const image = result[i];
      const imagePath = path.join(tmpDir, image.name);
      
      // Resize and compress the image using sharp
      await sharp(imagePath)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(path.join(tmpDir, `compressed_${image.name}`));
      
      // Create a temporary URL for the compressed image
      const tempUrl = `https://itsmejessicalee.com/api/tmp-images/compressed_${image.name}`;
      
      // Upload the compressed image using UTApi
      const uploadedFile = await utapi.uploadFilesFromUrl(tempUrl);
      console.log("Uploaded file: ", uploadedFile);
      if (uploadedFile.data) {
        imageUrls.push(uploadedFile.data.url);
      } else if (uploadedFile.error) {
        console.error(`Error uploading file: ${uploadedFile.error.message}`);
      }
      
      // Delete both the original and compressed temporary image files
      fs.unlinkSync(imagePath);
      fs.unlinkSync(path.join(tmpDir, `compressed_${image.name}`));
    }

    // Remove the temporary directory
    fs.rmdirSync(tmpDir, { recursive: true });

    res.json({ imageUrls });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Error processing PDF: ' + error.message });
  }
});

// Serve temporary images
app.use('/api/tmp-images', express.static('./tmp-images'));

app.get('/api/getimages', async (req, res) => {
    try {
        const imageUrls = await utapi.getFiles();
        res.json(imageUrls);
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ error: 'Error getting images: ' + error.message });
    }
});



app.post('/api/opengraph/generate', async (req, res) => {

    try {
        const { title, description, imagePath } = req.body;

        
        const words = description.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            if ((currentLine + word).length <= 56) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        console.log("Number of lines: ", lines.length);

        // Restrict the number of lines to 5
        if (lines.length > 5) {
            lines.splice(5);
        }

        // On the 5th element in the array if there is a . do not keep any of the text after the .
        if (lines.length === 5) {
            const fifthLine = lines[4];
            const dotIndex = fifthLine.indexOf('.');
            if (dotIndex !== -1) {
                lines[4] = fifthLine.substring(0, dotIndex);
            }
        }

        // Ensure each line is no longer than 56 characters
        const newDescription = lines.map(line => line.substring(0, 56));

        const params = { title, description: newDescription, imagePath };
        
        const imageBuffer = await GenerateImage(params);
        const og_uuid = uuidv4();
        const imagePathToSave = path.join(__dirname, tmpDir, og_uuid + ".png"); // Specify the path where you want to save the image
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
            console.log('Created tmp-images directory');
        } else {
            console.log('tmp-images directory already exists');
        }
        fs.writeFileSync(imagePathToSave, imageBuffer); // Save the image buffer to the specified path

        // Send the image buffer as the response
        res.send("/api/tmp-images/" + og_uuid + ".png");
    } catch (error) {
        console.error('Error generating OpenGraph image:', error);
        res.status(500).json({ error: 'Error generating OpenGraph image: ' + error.message });
    }
});

app.get('/api/opengraph/image/:id.png', async (req, res) => {

    try {

        const projectId = req.params.id;
        const project = await Project.findOne({ p_id: projectId });
        const { p_title, p_description, p_images } = project;

        const imagePath = p_images[0];
        const title = p_title;
        const description = p_description;

        
        const words = description.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            if ((currentLine + word).length <= 56) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        console.log("Number of lines: ", lines.length);

        // Restrict the number of lines to 5
        if (lines.length > 5) {
            lines.splice(5);
        }

        // On the 5th element in the array if there is a . do not keep any of the text after the .
        if (lines.length === 5) {
            const fifthLine = lines[4];
            const dotIndex = fifthLine.indexOf('.');
            if (dotIndex !== -1) {
                lines[4] = fifthLine.substring(0, dotIndex);
            }
        }

        // Ensure each line is no longer than 56 characters
        const newDescription = lines.map(line => line.substring(0, 56));

        const params = { title, description: newDescription, imagePath };
        
        const imageBuffer = await GenerateImage(params);
        res.set('Content-Type', 'image/png');
        res.set('Content-Disposition', 'attachment; filename="og_image.png"');
        res.send(imageBuffer);

    } catch (error) {
        console.error('Error generating OpenGraph image:', error);
        res.status(500).json({ error: 'Error generating OpenGraph image: ' + error.message });
    }
});


app.get('/api/opengraph/image/:id', async (req, res) => {

    try {

        const projectId = req.params.id;
        const project = await Project.findOne({ p_id: projectId });
        const { p_title, p_description, p_images } = project;

        const imagePath = p_images[0];
        const title = p_title;
        const description = p_description;

        
        const words = description.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            if ((currentLine + word).length <= 56) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        console.log("Number of lines: ", lines.length);

        // Restrict the number of lines to 5
        if (lines.length > 5) {
            lines.splice(5);
        }

        // On the 5th element in the array if there is a . do not keep any of the text after the .
        if (lines.length === 5) {
            const fifthLine = lines[4];
            const dotIndex = fifthLine.indexOf('.');
            if (dotIndex !== -1) {
                lines[4] = fifthLine.substring(0, dotIndex);
            }
        }

        // Ensure each line is no longer than 56 characters
        const newDescription = lines.map(line => line.substring(0, 56));

        const params = { title, description: newDescription, imagePath };
        
        const imageBuffer = await GenerateImage(params);
        res.set('Content-Type', 'image/png');
        res.set('Content-Disposition', 'attachment; filename="og_image.png"');
        res.send(imageBuffer);

    } catch (error) {
        console.error('Error generating OpenGraph image:', error);
        res.status(500).json({ error: 'Error generating OpenGraph image: ' + error.message });
    }
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/api/optimize-project-images', authenticate, async (req, res) => {
  try {
    console.log('Starting image optimization process...');
    const projects = await Project.find();
    console.log(`Found ${projects.length} projects to process.`);
    const utapi = new UTApi();
    let optimizedCount = 0;

    for (const project of projects) {
      console.log(`Processing project with ID: ${project._id}`);
      const optimizedImages = [];

      for (const imageUrl of project.p_images) {
        console.log(`Processing image: ${imageUrl}`);
        try {
          // Download the image
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'binary');
          console.log(`Downloaded image size: ${buffer.length} bytes`);

          // Check file size
          if (buffer.length > 500 * 1024) { // 500KB
            console.log('Image is larger than 500KB, optimizing...');
            // Resize and optimize the image
            const optimizedBuffer = await sharp(buffer)
              .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
              .jpeg({ quality: 80 })
              .toBuffer();
            console.log('Image optimized successfully.');

            // Upload the optimized image
            const uploadedFile = await utapi.uploadFiles(optimizedBuffer);
            console.log('Image uploaded successfully.');

            if (uploadedFile.data && uploadedFile.data.url) {
              optimizedImages.push(uploadedFile.data.url);
              optimizedCount++;
              console.log(`Optimized image URL: ${uploadedFile.data.url}`);

              // Delete the old file
              const oldFileKey = imageUrl.split('/').pop();
              await utapi.deleteFiles(oldFileKey);
              console.log(`Deleted old image file: ${oldFileKey}`);
            } else {
              optimizedImages.push(imageUrl); // Keep the original if upload fails
              console.log('Upload failed, keeping the original image.');
            }
          } else {
            optimizedImages.push(imageUrl); // Keep the original if it's small enough
            console.log('Image is small enough, keeping the original.');
          }
        } catch (error) {
          console.error(`Error processing image ${imageUrl}:`, error);
          optimizedImages.push(imageUrl); // Keep the original if there's an error
        }
      }

      // Update the project with optimized images
      project.p_images = optimizedImages;
      project.dateUpdated = new Date(); // Update the dateUpdated field
      await project.save();
      console.log(`Project with ID: ${project._id} updated successfully.`);
    }

    res.json({ message: `Optimized ${optimizedCount} images across all projects.` });
    console.log('Image optimization process completed.');
  } catch (error) {
    console.error('Error optimizing project images:', error);
    res.status(500).json({ error: 'Error optimizing project images: ' + error.message });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});