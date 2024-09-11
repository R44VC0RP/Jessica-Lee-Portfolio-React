import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadButton } from "@uploadthing/react";
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminOptions = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ userProfileName: '', username: '', password: '', userImage: '' });
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users', {
            headers: {
                'Authorization': `${token}`
            },
        });
        setUsers(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editUser) {
            setEditUser({ ...editUser, [name]: value });
        } else {
            setNewUser({ ...newUser, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userData = editUser || newUser;

        try {
            if (editUser) {
                await axios.put(`/api/users/update/${editUser._id}`, userData, {
                    headers: {
                        'Authorization': `${token}`
                    },
                });
            } else {
                await axios.post('/api/users/register', userData, {
                    headers: {
                        'Authorization': `${token}`
                    },
                });
            }

            setShowModal(false);
            setNewUser({ userProfileName: '', username: '', password: '', userImage: '' });
            setEditUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error submitting user:', error);
            alert('Error submitting user. Please try again.');
        }
    };

    const handleDeleteAccount = async (username) => {
        if (username === localStorage.getItem('userName')) {
            alert('You cannot delete your own account');
            return;
        }
        const token = localStorage.getItem('token');
        if (confirm('Are you sure you want to delete this account? This action cannot be undone.') === true) {
            await axios.post('/api/users/delete', { username }, {
                headers: {
                    'Authorization': `${token}`
                },
            });
            fetchUsers();
        }
    };

    const handleEditUser = (user) => {
        setEditUser(user);
        setShowModal(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Active Users</h2>
                <button onClick={() => setShowModal(true)} className="main-button">Add User</button>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">{editUser ? 'Edit User' : 'Add User'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userProfileName">
                                        Profile Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="userProfileName"
                                        placeholder="Profile Name"
                                        value={editUser ? editUser.userProfileName : newUser.userProfileName}
                                        onChange={handleInputChange}
                                        required
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                {!editUser && (
                                    <>
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
                                    </>
                                )}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userImage">
                                        Profile Photo <span className="text-red-500">*</span>
                                    </label>
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            console.log("Files: ", res);
                                            if (editUser) {
                                                setEditUser({ ...editUser, userImage: res[0].url });
                                            } else {
                                                setNewUser({ ...newUser, userImage: res[0].url });
                                            }
                                        }}
                                        onUploadError={(error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                </div>
                                {(editUser?.userImage || newUser.userImage) && (
                                    <div className="mb-4 flex justify-center">
                                        <img
                                            src={editUser ? editUser.userImage : newUser.userImage}
                                            alt="Profile Preview"
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="main-button"
                                    >
                                        {editUser ? 'Update' : 'Submit'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditUser(null);
                                        }}
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
                                        onClick={() => handleEditUser(user)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="main-button-bad"
                                        onClick={() => handleDeleteAccount(user.username)}
                                    >
                                        <FaTrash />
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
