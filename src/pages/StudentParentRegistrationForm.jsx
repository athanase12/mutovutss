import React, { useState } from 'react';
import { TfiSave } from "react-icons/tfi";
const StudentParentRegistrationForm = () => {
    const [parentName, setParentName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [studentName, setStudentName] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            parentName,
            email,
            phone,
            address,
            studentName,
            grade,
        };
        console.log('Form Data Submitted:', formData);
        // You can send formData to your server here
    };

    return (
        <div className="max-w-md mx-left p-6 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Student Parent Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">Parent/Guardian Name:</label>
                    <input
                        type="text"
                        id="parentName"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
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
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Trade:</label>
                    <select
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
                    >
                        <option value="">Select Trade</option>
                       
                        <option value="3">MMP</option>
                        <option value="4">SWD</option>
                        <option value="5">BDC</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Level:</label>
                    <select
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
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
                    className="flex  justify-center  w-full bg-green-500 items-center text-white font-semibold py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                ><TfiSave className=''/>
                    Register
                </button>
            </form>
        </div>
    );
};

export default StudentParentRegistrationForm;