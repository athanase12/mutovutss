// src/pages/Schedule/DailyActivities.jsx
import React from 'react';

const DailyActivities = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 pb-2 border-b">Standard Daily Schedule</h3>
            <p className="text-gray-600 mb-6">
                This timetable outlines the typical daily flow for students, ensuring a balance between theory, practical training, and essential activities.
            </p>
            
            <div className="space-y-4">
                <ActivityItem time="7:00 AM - 7:45 AM" title="Morning Assembly & Flag Ceremony" details="Attendance, announcements, and brief motivational session." color="bg-green-100" />
                <ActivityItem time="7:45 AM - 12:00 PM" title="Morning Session: Theory & Practical Training" details="Core course modules (Classes 1-3) focusing on technical instruction." color="bg-blue-100" />
                <ActivityItem time="12:00 PM - 1:00 PM" title="Lunch Break" details="Dedicated time for meal and socializing." color="bg-yellow-100" />
                <ActivityItem time="1:00 PM - 4:00 PM" title="Afternoon Session: Workshop Practice" details="Hands-on skills application in workshops and labs (Classes 4-5)." color="bg-purple-100" />
                <ActivityItem time="4:00 PM - 5:00 PM" title="Sports & Clubs" details="Extracurricular activities and physical education." color="bg-red-100" />
                <ActivityItem time="7:00 PM - 9:00 PM" title="Evening Study (Boarding Students)" details="Supervised study hall for homework and revision." color="bg-gray-200" />
            </div>
        </div>
    );
};

// Helper component for styling
const ActivityItem = ({ time, title, details, color }) => (
    <div className={`p-4 rounded-lg flex items-start space-x-4 ${color}`}>
        <div className="flex-shrink-0 w-24 sm:w-32 font-bold text-blue-900 border-r pr-3">
            {time}
        </div>
        <div>
            <p className="font-semibold text-gray-900">{title}</p>
            <p className="text-sm text-gray-700">{details}</p>
        </div>
    </div>
);

export default DailyActivities;