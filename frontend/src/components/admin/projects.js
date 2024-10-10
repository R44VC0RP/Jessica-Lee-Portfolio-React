import React, { useState, useEffect } from 'react';
import ProjectItem from '../project-item';
import axios from 'axios';
import { generateUploadDropzone, generateUploadButton } from "@uploadthing/react";
import { FaUpload, FaTimes, FaFilePdf, FaSpinner, FaImage } from 'react-icons/fa';
import { uploadFiles } from './uploadthing'; // Adjust the import path as needed

// Generate the UploadDropzone and UploadButton components
const UploadDropzone = generateUploadDropzone();
const UploadButton = generateUploadButton();

const Projects = () => {
    const [projectCount, setProjectCount] = useState(0);
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [projectDate, setProjectDate] = useState('');
    const [editProjectId, setEditProjectId] = useState(null);
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [isPdfProcessing, setIsPdfProcessing] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects/getall', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProjects(response.data);
                setProjectCount(response.data.length);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleUploadComplete = (data) => {
        const newFiles = data.map(file => ({
            name: file.name,
            preview: file.url
        }));
        setFiles([...files, ...newFiles]);
    };

    const handleAddTag = () => {
        if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async () => {
        const errors = [];
        if (projectName.trim() === '') {
            errors.push('Project name');
        }
        if (projectDescription.trim() === '') {
            errors.push('Project description');
        }
        if (files.length === 0) {
            errors.push('At least one image');
        }
        if (projectDate.trim() === '') {
            errors.push('Project date');
        }

        if (errors.length > 0) {
            alert(`Please provide the following:\n${errors.join('\n')}`);
            return;
        }

        try {
            const response = await axios.post('/api/projects/add', {
                projectName,
                projectDescription,
                projectDate,
                files: files.map(file => file.preview),
                tags
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Project created successfully:', response.data);
            setIsModalOpen(false);
            setProjectName('');
            setProjectDescription('');
            setProjectDate('');
            setFiles([]);
            setTags([]);
            // Fetch projects again to update the list
            const updatedProjects = await axios.get('/api/projects/getall');
            setProjects(updatedProjects.data);
            setProjectCount(updatedProjects.data.length);
        } catch (error) {
            console.error('Error creating project:', error);
            alert('Error creating project. Please try again.');
        }
    };

    const handleEditSubmit = async () => {
        const errors = [];
        if (projectName.trim() === '') {
            errors.push('Project name');
        }
        if (projectDescription.trim() === '') {
            errors.push('Project description');
        }
        if (files.length === 0) {
            errors.push('At least one image');
        }
        if (projectDate.trim() === '') {
            errors.push('Project date');
        }

        if (errors.length > 0) {
            alert(`Please provide the following:\n${errors.join('\n')}`);
            return;
        }

        try {
            const response = await axios.put(`/api/projects/update/${editProjectId}`, {
                projectName,
                projectDescription,
                projectDate,
                files: files.map(file => file.preview),
                tags
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Project updated successfully:', response.data);
            setIsEditModalOpen(false);
            setProjectName('');
            setProjectDescription('');
            setProjectDate('');
            setFiles([]);
            setTags([]);
            // Fetch projects again to update the list
            const updatedProjects = await axios.get('/api/projects/getall');
            setProjects(updatedProjects.data);
            setProjectCount(updatedProjects.data.length);
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Error updating project. Please try again.');
        }
    };

    const openEditModal = (project) => {
        setEditProjectId(project.p_id);
        setProjectName(project.p_title);
        setProjectDescription(project.p_description);
        setProjectDate(project.p_date);
        setFiles(project.p_images.map(image => ({ preview: image })));
        setTags(project.p_tags || []);
        setIsEditModalOpen(true);
    };

    const renderFilePreviews = () => {
        files.forEach(async (file, index) => {
            if (!file.preview.startsWith('https://')) {
                try {
                    const response = await axios.get(`/api/projects/get_images/${file.preview}`);
                    const updatedFiles = [...files];
                    updatedFiles[index].preview = response.data;
                    setFiles(updatedFiles);
                } catch (error) {
                    console.error('Error fetching image src:', error);
                }
            }
        });
        return files.map((file, index) => (
            <div key={index} className="relative w-24 h-24 m-2 border border-gray-400 rounded-lg">
                <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                <button 
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => handleDeleteFile(index)}
                >
                    &times;
                </button>
            </div>
        ));
    };

    const handleDeleteFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const handlePdfUpload = async (event) => {
        console.log("handlePdfUpload called", event.target.files);
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            try {
                setIsPdfProcessing(true);
                const formData = new FormData();
                formData.append('pdf', file);

                const response = await axios.post('/api/convert-pdf', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("PDF conversion response:", response.data);

                if (response.data.imageUrls && response.data.imageUrls.length > 0) {
                    const newFiles = response.data.imageUrls.map((url, index) => ({
                        name: `page_${index + 1}.jpg`,
                        preview: url
                    }));
                    setFiles([...files, ...newFiles]);
                } else {
                    console.error("No image URLs returned from the server");
                    alert('Error processing PDF: No images were generated');
                }
            } catch (error) {
                console.error("PDF processing error:", error);
                alert('Error processing PDF: ' + (error.response?.data?.error || error.message));
            } finally {
                setIsPdfProcessing(false);
            }
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    return (
        <div className="flex flex-col mb-4 w-full" id="projects_hud">
            <div className="flex flex-row items-center w-full justify-between">
                <span className="admin-management-text2 mr-4">You have {projectCount} Projects</span>
                <button className="main-button" onClick={() => setIsModalOpen(true)}>Add Project</button>
            </div>
            {projects.slice().reverse().map((project) => (
                <ProjectItem 
                    key={project.p_id} 
                    rootClassName="project-item-root-class-name w-full" 
                    project={project} 
                    onEdit={() => openEditModal(project)}
                />
            ))}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-500 overflow-y-auto">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl z-10">
                        <h2 className="text-xl mb-4">Add New Project</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    className="border p-2 mb-4 w-full"
                                    placeholder="Project Name"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                                <textarea
                                    className="border p-2 mb-4 w-full h-32"
                                    placeholder="Project Description"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="border p-2 mb-4 w-full"
                                    placeholder="Project Date"
                                    value={projectDate}
                                    onChange={(e) => setProjectDate(e.target.value)}
                                />
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="border p-2 w-full"
                                        placeholder="Add a tag"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                    />
                                    <button className="main-button mt-2" onClick={handleAddTag}>Add Tag</button>
                                    <div className="flex flex-wrap mt-2">
                                        {tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                {tag}
                                                <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-red-500">
                                                    <FaTimes />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                                    <div className="flex flex-col space-y-4">
                                        <div className=" p-4 rounded-lg">
                                            <h4 className="text-md font-medium mb-2">Image Upload</h4>
                                            <UploadDropzone
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    console.log("Files: ", res);
                                                    handleUploadComplete(res);
                                                }}
                                                onUploadError={(error) => {
                                                    console.error("ERROR!", error);
                                                }}
                                            />
                                        </div>
                                        
                                        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                                            <h4 className="text-md font-medium mb-2">PDF Upload</h4>
                                            <p className="text-sm text-gray-600 mb-4">Convert your PDF to images, each page will be an image and added to the project</p>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handlePdfUpload}
                                                    className="hidden"
                                                    id="pdfUpload"
                                                    disabled={isPdfProcessing}
                                                />
                                                <label
                                                    htmlFor="pdfUpload"
                                                    className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors ${isPdfProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {isPdfProcessing ? (
                                                        <>
                                                            <FaSpinner className="mr-2 animate-spin" />
                                                            Processing PDF...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaFilePdf className="mr-2" />
                                                            Upload PDF
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
                                    <div className="flex flex-wrap">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative w-24 h-24 m-2 border border-gray-400 rounded-lg overflow-hidden">
                                                <img src={file.preview} alt={file.name} className="w-full h-full object-contain" />
                                                <button 
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                    onClick={() => handleDeleteFile(index)}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button className="main-button-bad" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="main-button" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-500 overflow-y-auto">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl z-10">
                        <h2 className="text-xl mb-4">Edit Project</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    className="border p-2 mb-4 w-full"
                                    placeholder="Project Name"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                                <textarea
                                    className="border p-2 mb-4 w-full h-32"
                                    placeholder="Project Description"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="border p-2 mb-4 w-full"
                                    placeholder="Project Date"
                                    value={projectDate}
                                    onChange={(e) => setProjectDate(e.target.value)}
                                />
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="border p-2 w-full"
                                        placeholder="Add a tag"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                    />
                                    <button className="main-button mt-2" onClick={handleAddTag}>Add Tag</button>
                                    <div className="flex flex-wrap mt-2">
                                        {tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                {tag}
                                                <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-red-500">
                                                    <FaTimes />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                                    <div className="flex flex-col space-y-4">
                                        <div className="p-4 rounded-lg">
                                            <h4 className="text-md font-medium mb-2">Image Upload</h4>
                                            <UploadDropzone
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    console.log("Files: ", res);
                                                    handleUploadComplete(res);
                                                }}
                                                onUploadError={(error) => {
                                                    console.error("ERROR!", error);
                                                }}
                                            />
                                        </div>
                                        
                                        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                                            <h4 className="text-md font-medium mb-2">PDF Upload</h4>
                                            <p className="text-sm text-gray-600 mb-4">Convert your PDF to images, each page will be an image and added to the project</p>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handlePdfUpload}
                                                    className="hidden"
                                                    id="pdfUploadEdit"
                                                    disabled={isPdfProcessing}
                                                />
                                                <label
                                                    htmlFor="pdfUploadEdit"
                                                    className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors ${isPdfProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {isPdfProcessing ? (
                                                        <>
                                                            <FaSpinner className="mr-2 animate-spin" />
                                                            Processing PDF...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaFilePdf className="mr-2" />
                                                            Upload PDF
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
                                    <div className="flex flex-wrap">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative w-24 h-24 m-2 border border-gray-400 rounded-lg overflow-hidden">
                                                <img src={file.preview} alt={file.name} className="w-full h-full object-contain" />
                                                <button 
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                    onClick={() => handleDeleteFile(index)}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button className="main-button-bad" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            <button className="main-button" onClick={handleEditSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;