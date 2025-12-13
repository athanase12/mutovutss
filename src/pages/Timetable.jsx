// src/pages/Schedule/Timetable.jsx
import React from 'react';

const TimetableData = [
    { course: 'Software Dev', mon: 'Code Lab (3h)', tue: 'Database Theory (2h)', wed: 'Project Work (4h)', thu: 'Web Tech (3h)', fri: 'Review' },
    { course: 'Building Const.', mon: 'Masonry (3h)', tue: 'Site Safety (2h)', wed: 'Carpentry (4h)', thu: 'Plumbing (3h)', fri: 'Review' },
    { course: 'Multimedia Prod.', mon: 'Graphic Design (3h)', tue: 'Video Editing (2h)', wed: 'Digital Marketing (4h)', thu: 'Photography (3h)', fri: 'Review' },
];

const Timetable = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 pb-2 border-b">Timetable for Courses (Example)</h3>
            <p className="text-gray-600 mb-6">
                This schedule details the practical and theoretical sessions for each technical trade offered at Mutovu TSS.
            </p>
            
            {/* Responsive Table Container (Scrollable on small screens) */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Course</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Monday</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tuesday</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Wednesday</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thursday</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Friday</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {TimetableData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap font-bold text-blue-700">{row.course}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.mon}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.tue}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.wed}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.thu}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.fri}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <p className="mt-8 text-sm text-gray-500">
                <span className="font-semibold text-red-500">Note:</span> This is a sample. The full official timetable can be downloaded from the administration page.
            </p>
        </div>
    );
};

export default Timetable;