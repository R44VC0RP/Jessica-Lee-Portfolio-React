import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import MainNavbar from '../components/main-navbar';
import Footer from '../components/footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js?render=6LdfWvQpAAAAAImdAjzlI6P9mhe6ZBdUvQfrRGYz";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (window.grecaptcha) {
            window.grecaptcha.ready(async () => {
                const token = await window.grecaptcha.execute('6LdfWvQpAAAAAImdAjzlI6P9mhe6ZBdUvQfrRGYz', { action: 'submit' });
                try {
                    const response = await fetch('/api/email/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...formData, token })
                    });
                    if (response.ok) {
                        alert('Message sent successfully!');
                        setFormData({
                            name: '',
                            email: '',
                            message: ''
                        });
                    } else {
                        alert('Failed to send message.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                }
            });
        } else {
            alert('reCAPTCHA not loaded. Please try again later.');
        }
    };

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <>
            <MainNavbar />
            {isMobile ? (
                <div className="flex flex-col h-screen">
                    <div className="flex flex-col justify-center items-center pb-3 mt-4 px-6">
                        <h2 className="text-4xl font-bold pb-3" style={{ fontFamily: 'DM Serif Display' }}>Contact Me</h2>
                        <img src="/jess_masked_better.png" alt="Person" className="w-1/2 h-auto object-cover" />
                        <p className="text-sm text-gray-700 pt-3">You can contact me for jobs and other inquiries. I will get back to you shortly.</p>
                    </div>
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div>
                                <button type="submit" className="main-button mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="flex flex-col md:flex-row w-[60vw] items-center justify-center">
                        <div className="md:w-1/2 space-y-4 p-6">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold" style={{ fontFamily: 'DM Serif Display' }}>Contact Me</h2>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-700">You can contact me for jobs and other inquiries. I will get back to you shortly.</p>
                            </div>
                            <div className=" bg-[#D4D1CC] rounded-lg">
                                <img src="/jess_masked_better.png" alt="Person" style={{ maxHeight: '60%' }} />
                            </div>
                        </div>
                        <div className="md:w-1/2 p-8">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        rows="4"
                                        required
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="main-button mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default Contact;
