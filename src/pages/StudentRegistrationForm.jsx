import React, { useState } from 'react';

const StudentRegistrationForm = () => {
    const [studentName, setStudentName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [trade, setTrade] = useState('');
    const [level, setLevel] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            studentName,
            email,
            phone,
            address,
            trade,
            level,
        };
        console.log('Form Data Submitted:', formData);
        // You can send formData to your server here
    };

    return (
        <div className="max-w-md mx-left p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Student Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name:</label>
                    <input
                        type="text"
                        id="studentName"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Home Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="trade" className="block text-sm font-medium text-gray-700">Trade:</label>
                    <select
                        id="trade"
                        value={trade}
                        onChange={(e) => setTrade(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    >
                        <option value="">Select Trade</option>
                        <option value="MMP">MMP</option>
                        <option value="SWD">SWD</option>
                        <option value="BDC">BDC</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level:</label>
                    <select
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    >
                        <option value="">Select Level</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default StudentRegistrationForm;