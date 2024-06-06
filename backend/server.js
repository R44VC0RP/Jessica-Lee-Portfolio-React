require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = process.env.PORT || 4000;
const mongo_user = process.env.MONGO_USER;
const mongo_password = process.env.MONGO_PASSWORD;

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

const Project = mongoose.model('Project', projectSchema);
const Image = mongoose.model('Image', imageSchema);

const s3 = new aws.S3({
    endpoint: 'https://475fe7a9850defb092143b6adbda5028.r2.cloudflarestorage.com',
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
    signatureVersion: 'v4',
});

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

app.get('/api/projects/getall', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});