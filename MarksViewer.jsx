import React, { useState, useEffect } from 'react';
import { marksAPI } from '../services/api';

const MarksViewer = () => {
    // State for dropdown selections
    const [classrooms, setClassrooms] = useState([]);
    const [modules, setModules] = useState([]);
    const [students, setStudents] = useState([]);
    
    // State for selections
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [studentIdInput, setStudentIdInput] = useState('');
    
    // State for search results
    const [marksData, setMarksData] = useState(null);
    const [allMarksData, setAllMarksData] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'

    // Fetch classrooms and modules on component mount
    useEffect(() => {
        fetchInitialData();
    }, []);

    // Fetch students when classroom changes
    useEffect(() => {
        if (selectedClassroom) {
            fetchStudentsByClassroom();
        } else {
            setStudents([]);
            setSelectedStudent('');
        }
    }, [selectedClassroom]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [classroomsRes, modulesRes] = await Promise.all([
                marksAPI.getClassrooms(),
                marksAPI.getModules()
            ]);
            
            if (classroomsRes.data.success) setClassrooms(classroomsRes.data.data);
            if (modulesRes.data.success) setModules(modulesRes.data.data);
        } catch (err) {
            setError('Failed to load initial data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudentsByClassroom = async () => {
        try {
            setLoading(true);
            const response = await marksAPI.getStudentsByClassroom(selectedClassroom);
            if (response.data.success) {
                setStudents(response.data.data);
            }
        } catch (err) {
            setError('Failed to load students');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const searchStudentById = async () => {
        if (!studentIdInput.trim()) {
            setError('Please enter Student ID or Registration Number');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const response = await marksAPI.searchStudent(studentIdInput.trim());
            
            if (response.data.success) {
                const student = response.data.data;
                setStudentInfo(student);
                setSelectedClassroom(student.classroom_id);
                setSelectedStudent(student.student_id);
            }
        } catch (err) {
            setError('Student not found');
            setStudentInfo(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchMarks = async () => {
        // Validate inputs
        if (!selectedClassroom || !selectedStudent) {
            setError('Please select classroom and student');
            return;
        }

        if (viewMode === 'single' && !selectedModule) {
            setError('Please select a module');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            if (viewMode === 'single') {
                const response = await marksAPI.getStudentMarks(
                    selectedClassroom,
                    selectedModule,
                    selectedStudent
                );
                
                if (response.data.success) {
                    setMarksData(response.data);
                    setAllMarksData(null);
                }
            } else {
                const response = await marksAPI.getAllStudentMarks(selectedStudent);
                if (response.data.success) {
                    setAllMarksData(response.data);
                    setMarksData(null);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch marks');
            setMarksData(null);
            setAllMarksData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedClassroom('');
        setSelectedModule('');
        setSelectedStudent('');
        setStudentIdInput('');
        setMarksData(null);
        setAllMarksData(null);
        setStudentInfo(null);
        setError('');
    };

    const getGradeColor = (grade) => {
        if (!grade) return 'bg-gray-100 text-gray-800';
        if (grade.includes('A+')) return 'bg-green-100 text-green-800';
        if (grade.includes('A')) return 'bg-green-50 text-green-700';
        if (grade.includes('B')) return 'bg-blue-100 text-blue-800';
        if (grade.includes('C')) return 'bg-yellow-100 text-yellow-800';
        if (grade.includes('D')) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    };

    const getPerformanceColor = (percentage) => {
        if (percentage >= 80) return 'text-green-600 bg-green-50';
        if (percentage >= 60) return 'text-blue-600 bg-blue-50';
        if (percentage >= 40) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    if (loading && !classrooms.length) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Student Marks Viewing System
                    </h1>
                    <p className="text-gray-600">
                        View your marks by selecting classroom, module, and entering your student ID
                    </p>
                </div>

                {/* Selection Panel */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {/* Classroom Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Classroom *
                            </label>
                            <select
                                value={selectedClassroom}
                                onChange={(e) => {
                                    setSelectedClassroom(e.target.value);
                                    setSelectedStudent('');
                                    setStudentIdInput('');
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Choose Classroom</option>
                                {classrooms.map(classroom => (
                                    <option key={classroom.classroom_id} value={classroom.classroom_id}>
                                        {classroom.classroom_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Module Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Module *
                            </label>
                            <select
                                value={selectedModule}
                                onChange={(e) => setSelectedModule(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={viewMode === 'all'}
                            >
                                <option value="">Choose Module</option>
                                {modules.map(module => (
                                    <option key={module.module_id} value={module.module_id}>
                                        {module.module_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Student Selection Method */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Student Selection
                            </label>
                            <div className="space-y-2">
                                <select
                                    value={selectedStudent}
                                    onChange={(e) => {
                                        const studentId = e.target.value;
                                        setSelectedStudent(studentId);
                                        const student = students.find(s => s.student_id == studentId);
                                        if (student) {
                                            setStudentInfo(student);
                                            setStudentIdInput(student.student_reg_no);
                                        }
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    disabled={!selectedClassroom}
                                >
                                    <option value="">Select Student</option>
                                    {students.map(student => (
                                        <option key={student.student_id} value={student.student_id}>
                                            {student.student_reg_no} - {student.student_name}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={studentIdInput}
                                        onChange={(e) => setStudentIdInput(e.target.value)}
                                        placeholder="Or enter Student ID/Reg No"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                        onClick={searchStudentById}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View Mode and Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setViewMode('single')}
                                className={`px-4 py-2 rounded-lg ${viewMode === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Single Module View
                            </button>
                            <button
                                onClick={() => setViewMode('all')}
                                className={`px-4 py-2 rounded-lg ${viewMode === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                All Modules View
                            </button>
                        </div>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={fetchMarks}
                                disabled={loading || !selectedClassroom || !selectedStudent || (viewMode === 'single' && !selectedModule)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Loading...
                                    </>
                                ) : (
                                    'View Marks'
                                )}
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                </div>

                {/* Student Info Card */}
                {studentInfo && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-blue-600 text-xl font-bold">
                                        {studentInfo.student_name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{studentInfo.student_name}</h3>
                                    <p className="text-gray-600">ID: {studentInfo.student_reg_no}</p>
                                    <p className="text-gray-600">Class: {studentInfo.classroom_name}</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                <p>Email: {studentInfo.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Single Module Marks Display */}
                {marksData && viewMode === 'single' && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Marks Details</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Marks Information */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Marks Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Student:</span>
                                            <span className="font-medium">{marksData.data.student_name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Module:</span>
                                            <span className="font-medium">{marksData.data.module_name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Classroom:</span>
                                            <span className="font-medium">{marksData.data.classroom_name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Marks Obtained:</span>
                                            <span className="text-xl font-bold text-blue-600">
                                                {marksData.data.marks_obtained} / {marksData.data.total_marks}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Percentage:</span>
                                            <span className="text-xl font-bold text-green-600">
                                                {marksData.data.percentage}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Grade:</span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(marksData.data.grade)}`}>
                                                {marksData.data.grade}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Performance:</span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(marksData.data.percentage)}`}>
                                                {marksData.data.performance}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Semester:</span>
                                            <span className="font-medium">{marksData.data.semester}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Class Statistics */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Statistics</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-white rounded">
                                        <span className="text-gray-600">Class Average:</span>
                                        <span className="font-bold text-blue-600">
                                            {marksData.statistics.class_average?.toFixed(2) || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white rounded">
                                        <span className="text-gray-600">Highest Marks:</span>
                                        <span className="font-bold text-green-600">
                                            {marksData.statistics.highest_marks?.toFixed(2) || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white rounded">
                                        <span className="text-gray-600">Lowest Marks:</span>
                                        <span className="font-bold text-red-600">
                                            {marksData.statistics.lowest_marks?.toFixed(2) || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white rounded">
                                        <span className="text-gray-600">Total Students:</span>
                                        <span className="font-bold text-purple-600">
                                            {marksData.statistics.total_students || 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600">Your Performance</span>
                                        <span className="font-medium">{marksData.data.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-blue-600 h-2.5 rounded-full" 
                                            style={{ width: `${marksData.data.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                                        <span>0%</span>
                                        <span>50%</span>
                                        <span>100%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* All Modules Marks Display */}
                {allMarksData && viewMode === 'all' && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Modules Marks Summary</h2>
                        
                        {/* Overall Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Modules</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {allMarksData.overallStats.totalModules}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-green-50 p-6 rounded-xl">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Average Percentage</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {allMarksData.overallStats.averagePercentage}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-purple-50 p-6 rounded-xl">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Marks</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {allMarksData.overallStats.totalMarks}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Marks Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Module
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Classroom
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Marks
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Percentage
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Grade
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Semester
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {allMarksData.data.map((mark) => (
                                        <tr key={mark.mark_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {mark.module_name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {mark.module_code}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {mark.classroom_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {mark.marks_obtained} / {mark.total_marks}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                                    mark.percentage >= 80 ? 'bg-green-100 text-green-800' :
                                                    mark.percentage >= 60 ? 'bg-blue-100 text-blue-800' :
                                                    mark.percentage >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {mark.percentage}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getGradeColor(mark.grade)}`}>
                                                    {mark.grade}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {mark.semester}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {allMarksData.data.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No Marks Found</h3>
                                <p className="text-gray-600">This student has no marks recorded yet.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="text-center text-sm text-gray-600 mt-8">
                    <p>Student Marks Viewing System | Database: mutovutssdb</p>
                    <p className="mt-1">Modules: DevOps & React | Classrooms: L5 Software Dev. A & B</p>
                </div>
            </div>
        </div>
    );
};

export default MarksViewer;