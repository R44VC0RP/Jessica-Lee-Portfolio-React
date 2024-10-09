import React, { useState, useEffect } from 'react';
import ProjectItem from '../project-item';
import axios from 'axios';
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { FaUpload, FaTimes } from 'react-icons/fa';

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
        if (projectName === '' || projectDescription === '' || files.length === 0) {
            alert('Please fill out the form and upload at least one file.');
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
        if (projectName === '' || projectDescription === '' || files.length === 0) {
            alert('Please fill out the form and upload at least one file.');
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
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 z-10">
                        <h2 className="text-xl mb-4">Add New Project</h2>
                        <input
                            type="text"
                            className="border p-2 mb-4 w-full"
                            placeholder="Project Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <textarea
                            className="border p-2 mb-4 w-full"
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
                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={handleUploadComplete}
                            className=""
                        />
                        <div className="flex flex-wrap">
                            {files.map((file, index) => (
                                <div key={index} className="relative w-24 h-24 m-2 border border-gray-400 rounded-lg">
                                    <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                                    <button 
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        onClick={() => handleDeleteFile(index)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
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
                        <div className="flex justify-between">
                            
                            <button className="main-button-bad" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="main-button" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 z-10">
                        <h2 className="text-xl mb-4">Edit Project</h2>
                        <input
                            type="text"
                            className="border p-2 mb-4 w-full"
                            placeholder="Project Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <textarea
                            className="border p-2 mb-4 w-full"
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
                        <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={handleUploadComplete}
                            className=""
                        />
                        <div className="flex flex-wrap">
                            {files.map((file, index) => (
                                <div key={index} className="relative w-24 h-24 m-2 border border-gray-400 rounded-lg">
                                    <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                                    <button 
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                        onClick={() => handleDeleteFile(index)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
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
                        <div className="flex justify-between">
                            <button className="main-button" onClick={handleEditSubmit}>Submit</button>
                            <button className="main-button-bad" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
