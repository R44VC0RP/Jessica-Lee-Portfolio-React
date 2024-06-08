import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOptions = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ userProfileName: '', username: '', password: '', file: null });
    const [filePreview, setFilePreview] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUsers = async () => {
            const response = await axios.get('/api/users', {
                headers: {
                    'Authorization': `${token}`
                },
            });
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewUser({ ...newUser, file });
        setFilePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', newUser.username);
        formData.append('password', newUser.password);
        formData.append('userProfileName', newUser.userProfileName);
        formData.append('file', newUser.file);
        const token = localStorage.getItem('token');

        await axios.post('/api/users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`
            },
        });

        setShowModal(false);
        const response = await axios.get('/api/users', {
            headers: {
                'Authorization': `${token}`
            },
        });
        setUsers(response.data);
        setNewUser({ userProfileName: '', username: '', password: '', file: null });
        setFilePreview(null);
    };

    const handleDeleteAccount = async (username) => {
        const token = localStorage.getItem('token');
        await axios.post('/api/users/delete', { username }, {
            headers: {
                'Authorization': `${token}`
            },
        });
        setDeleteUser(username);
        const response = await axios.get('/api/users', {
            headers: {
                'Authorization': `${token}`
            },
        });
        setUsers(response.data);
        setDeleteUser(null);
    };

    return (
        <div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Active Users</h2>
                <button onClick={() => setShowModal(true)} className="main-button">Add User</button>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">Add User</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userProfileName">
                                        Profile Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="userProfileName"
                                        placeholder="Profile Name"
                                        value={newUser.userProfileName}
                                        onChange={handleInputChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={newUser.username}
                                        onChange={handleInputChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4 flex items-center">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                                            Profile Photo <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={handleFileChange}
                                            required
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                    {filePreview && (
                                        <div className="w-1/2 flex justify-center">
                                            <img
                                                src={filePreview}
                                                alt="Profile Preview"
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="main-button-good"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="main-button-bad"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <table className="bg-white w-full">
                <thead>
                    <tr>
                        <th className="py-2">Profile Name</th>
                        <th className="py-2">Username</th>
                        <th className="py-2">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.userProfileName}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">
                                <div className="flex space-x-2 items-center justify-center">
                                    <button
                                        className="main-button"
                                        onClick={() => handleResetPassword(user._id)}
                                    >
                                        Reset Password
                                    </button>
                                    <button
                                        className="main-button"
                                        onClick={() => handleDeleteAccount(user.username)}
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOptions;
