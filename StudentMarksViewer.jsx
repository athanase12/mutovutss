import React, { useState, useEffect } from 'react';
import { marksAPI } from '../services/api';

const StudentMarksViewer = () => {
    // State for data
    const [classrooms, setClassrooms] = useState([]);
    const [modules, setModules] = useState([]);
    const [students, setStudents] = useState([]);
    
    // State for selections
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [studentIdInput, setStudentIdInput] = useState('');
    const [searchMethod, setSearchMethod] = useState('dropdown'); // 'dropdown' or 'manual'
    
    // State for results
    const [marksData, setMarksData] = useState(null);
    const [allMarksData, setAllMarksData] = useState(null);
    const [classStats, setClassStats] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'

    // Fetch initial data
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
            setError('Failed to load initial data. Please check if the server is running.');
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

    const searchStudent = async () => {
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
                setSearchMethod('dropdown');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Student not found');
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
                // Fetch marks for single module
                const marksResponse = await marksAPI.getStudentMarks(
                    selectedClassroom,
                    selectedModule,
                    selectedStudent
                );
                
                if (marksResponse.data.success) {
                    setMarksData(marksResponse.data);
                    setAllMarksData(null);
                }
                
                // Fetch class statistics
                const statsResponse = await marksAPI.getClassStats(
                    selectedClassroom,
                    selectedModule
                );
                
                if (statsResponse.data.success) {
                    setClassStats(statsResponse.data);
                }
            } else {
                // Fetch all marks for the student
                const response = await marksAPI.getAllStudentMarks(selectedStudent);
                if (response.data.success) {
                    setAllMarksData(response.data);
                    setMarksData(null);
                    setClassStats(null);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch marks');
            setMarksData(null);
            setAllMarksData(null);
            setClassStats(null);
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
        setClassStats(null);
        setStudentInfo(null);
        setError('');
        setSearchMethod('dropdown');
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
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading system data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Student Marks Viewing System
                    </h1>
                    <p className="text-gray-600 text-lg">
                        View your marks by selecting classroom, module, and entering student ID
                    </p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600">DevOps & React Modules</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600">L5 Software Dev A & B</span>
                        </div>
                    </div>
                </div>

                {/* Selection Panel */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {/* Classroom Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Select Classroom
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedClassroom}
                                    onChange={(e) => {
                                        setSelectedClassroom(e.target.value);
                                        setSelectedStudent('');
                                        setStudentIdInput('');
                                        setStudentInfo(null);
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                >
                                    <option value="">Choose Classroom</option>
                                    {classrooms.map(classroom => (
                                        <option key={classroom.classroom_id} value={classroom.classroom_id}>
                                            {classroom.classroom_name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Module Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Select Module
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedModule}
                                    onChange={(e) => setSelectedModule(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                    disabled={viewMode === 'all'}
                                >
                                    <option value="">Choose Module</option>
                                    {modules.map(module => (
                                        <option key={module.module_id} value={module.module_id}>
                                            {module.module_name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                View Mode
                            </label>
                            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => {
                                        setViewMode('single');
                                        setMarksData(null);
                                        setAllMarksData(null);
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${viewMode === 'single' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    Single Module
                                </button>
                                <button
                                    onClick={() => {
                                        setViewMode('all');
                                        setMarksData(null);
                                        setClassStats(null);
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${viewMode === 'all' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    All Modules
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Student Selection */}
                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 md:mb-0">
                                <span className="text-red-500">*</span> Student Selection
                            </label>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSearchMethod('dropdown')}
                                    className={`px-3 py-1 text-sm rounded-lg ${searchMethod === 'dropdown' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    Select from List
                                </button>
                                <button
                                    onClick={() => setSearchMethod('manual')}
                                    className={`px-3 py-1 text-sm rounded-lg ${searchMethod === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    Enter Manually
                                </button>
                            </div>
                        </div>

                        {searchMethod === 'dropdown' ? (
                            <div className="relative">
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                    disabled={!selectedClassroom}
                                >
                                    <option value="">
                                        {!selectedClassroom ? 'Select classroom first' : 'Choose Student'}
                                    </option>
                                    {students.map(student => (
                                        <option key={student.student_id} value={student.student_id}>
                                            {student.student_reg_no} - {student.student_name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={studentIdInput}
                                        onChange={(e) => setStudentIdInput(e.target.value)}
                                        placeholder="Enter Student ID or Registration Number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={searchStudent}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search Student
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-600">
                            {selectedClassroom && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 mr-3">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    {classrooms.find(c => c.classroom_id == selectedClassroom)?.classroom_name}
                                </span>
                            )}
                            {selectedModule && viewMode === 'single' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                    </svg>
                                    {modules.find(m => m.module_id == selectedModule)?.module_name}
                                </span>
                            )}
                        </div>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={fetchMarks}
                                disabled={loading || !selectedClassroom || !selectedStudent || (viewMode === 'single' && !selectedModule)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-md"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View Marks
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                Reset All
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                            <div className="flex">
                                <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="font-medium">Error</p>
                                    <p>{error}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Student Info Card */}
                {studentInfo && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                                    <span className="text-white text-2xl font-bold">
                                        {studentInfo.student_name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{studentInfo.student_name}</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            ID: {studentInfo.student_reg_no}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                            </svg>
                                            Class: {studentInfo.classroom_name}
                                        </span>
                                        {studentInfo.email && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                                {studentInfo.email}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600">Ready to view marks</div>
                                <div className="text-lg font-bold text-blue-600 mt-1">
                                    {viewMode === 'single' ? 'Single Module View' : 'All Modules View'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Single Module Marks Display */}
                {marksData && viewMode === 'single' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Marks Details</h2>
                            <p className="text-gray-600">
                                Showing marks for {marksData.data.student_name} in {marksData.data.module_name}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Marks Card */}
                            <div className="lg:col-span-2">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Marks Information</h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                                    <span className="text-gray-600">Marks Obtained</span>
                                                    <span className="text-2xl font-bold text-blue-600">
                                                        {marksData.data.marks_obtained} / {marksData.data.total_marks}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                                    <span className="text-gray-600">Percentage</span>
                                                    <span className="text-2xl font-bold text-green-600">
                                                        {marksData.data.percentage}%
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                                    <span className="text-gray-600">Grade</span>
                                                    <span className={`px-4 py-2 text-lg font-bold rounded-lg ${getGradeColor(marksData.data.grade)}`}>
                                                        {marksData.data.grade}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                                    <span className="text-gray-600">Performance</span>
                                                    <span className={`px-4 py-2 text-lg font-medium rounded-lg ${getPerformanceColor(marksData.data.percentage)}`}>
                                                        {marksData.data.performance}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                                            <div className="space-y-4">
                                                <div className="bg-white p-4 rounded-lg">
                                                    <div className="text-sm text-gray-600 mb-1">Module Code</div>
                                                    <div className="font-medium">{marksData.data.module_code}</div>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg">
                                                    <div className="text-sm text-gray-600 mb-1">Semester</div>
                                                    <div className="font-medium">{marksData.data.semester}</div>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg">
                                                    <div className="text-sm text-gray-600 mb-1">Academic Year</div>
                                                    <div className="font-medium">{marksData.data.academic_year}</div>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg">
                                                    <div className="text-sm text-gray-600 mb-1">Class Rank</div>
                                                    <div className="text-xl font-bold text-purple-600">
                                                        #{marksData.statistics.studentRank} of {marksData.statistics.total_students}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="mt-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-700">Your Performance Level</span>
                                            <span className="font-medium">{marksData.data.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div 
                                                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500" 
                                                style={{ width: `${marksData.data.percentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                                            <span>0% (Needs Improvement)</span>
                                            <span>50% (Average)</span>
                                            <span>80% (Excellent)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Class Statistics */}
                                {classStats && (
                                    <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Statistics</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                                <div className="text-2xl font-bold text-blue-600">{classStats.data.average_marks?.toFixed(2) || 'N/A'}</div>
                                                <div className="text-sm text-gray-600">Class Average</div>
                                            </div>
                                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                                <div className="text-2xl font-bold text-green-600">{classStats.data.highest_marks?.toFixed(2) || 'N/A'}</div>
                                                <div className="text-sm text-gray-600">Highest Marks</div>
                                            </div>
                                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                                <div className="text-2xl font-bold text-red-600">{classStats.data.lowest_marks?.toFixed(2) || 'N/A'}</div>
                                                <div className="text-sm text-gray-600">Lowest Marks</div>
                                            </div>
                                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                                <div className="text-2xl font-bold text-purple-600">{classStats.data.total_students || 'N/A'}</div>
                                                <div className="text-sm text-gray-600">Total Students</div>
                                            </div>
                                        </div>
                                        
                                        {/* Pass/Fail Statistics */}
                                        <div className="mt-6 grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-green-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-green-700">{classStats.data.passed || 0}</div>
                                                        <div className="text-sm text-green-600">Students Passed</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-red-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-red-700">{classStats.data.failed || 0}</div>
                                                        <div className="text-sm text-red-600">Students Failed</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Quick Info Sidebar */}
                            <div>
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 h-full">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center p-3 bg-white rounded-lg">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Student</div>
                                                <div className="font-medium">{marksData.data.student_name}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-white rounded-lg">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Module</div>
                                                <div className="font-medium">{marksData.data.module_name}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-white rounded-lg">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Classroom</div>
                                                <div className="font-medium">{marksData.data.classroom_name}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-white rounded-lg">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Exam Session</div>
                                                <div className="font-medium">{marksData.data.semester} {marksData.data.academic_year}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="text-sm text-gray-600 mb-2">Performance Summary</div>
                                        <p className="text-gray-700">
                                            {marksData.data.student_name} scored {marksData.data.marks_obtained} marks in {marksData.data.module_name}, 
                                            achieving {marksData.data.percentage}% and grade {marksData.data.grade}. This performance is rated as 
                                            <span className="font-semibold"> {marksData.data.performance.toLowerCase()}</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* All Modules Marks Display */}
                {allMarksData && viewMode === 'all' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">All Modules Summary</h2>
                            <p className="text-gray-600">
                                Showing all marks for {studentInfo?.student_name}
                            </p>
                        </div>

                        {/* Overall Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Modules</p>
                                        <p className="text-2xl font-bold text-gray-900">{allMarksData.overallStats.totalModules}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Average Percentage</p>
                                        <p className="text-2xl font-bold text-gray-900">{allMarksData.overallStats.averagePercentage}%</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Marks</p>
                                        <p className="text-2xl font-bold text-gray-900">{allMarksData.overallStats.totalMarksObtained}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Overall Status</p>
                                        <p className={`text-xl font-bold ${
                                            parseFloat(allMarksData.overallStats.averagePercentage) >= 50 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {parseFloat(allMarksData.overallStats.averagePercentage) >= 50 ? 'PASSING' : 'NEEDS IMPROVEMENT'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Marks Table */}
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {allMarksData.data.map((mark) => (
                                        <tr key={mark.mark_id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                                                        mark.module_name === 'DevOps' ? 'bg-blue-100' : 'bg-green-100'
                                                    }`}>
                                                        <span className={`font-bold ${
                                                            mark.module_name === 'DevOps' ? 'text-blue-600' : 'text-green-600'
                                                        }`}>
                                                            {mark.module_name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{mark.module_name}</div>
                                                        <div className="text-sm text-gray-500">{mark.module_code}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{mark.classroom_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {mark.marks_obtained} / {mark.total_marks}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-3">
                                                        <div 
                                                            className={`h-2.5 rounded-full ${
                                                                mark.percentage >= 80 ? 'bg-green-500' :
                                                                mark.percentage >= 60 ? 'bg-blue-500' :
                                                                mark.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                            style={{ width: `${Math.min(mark.percentage, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className={`text-sm font-medium ${
                                                        mark.percentage >= 80 ? 'text-green-600' :
                                                        mark.percentage >= 60 ? 'text-blue-600' :
                                                        mark.percentage >= 40 ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                        {mark.percentage}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-sm font-bold rounded-full ${getGradeColor(mark.grade)}`}>
                                                    {mark.grade}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {mark.semester}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                                    mark.marks_obtained >= 50 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {mark.marks_obtained >= 50 ? 'PASS' : 'FAIL'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
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
                        
                        {/* Performance Summary */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-700 mb-4">
                                        <span className="font-bold">{studentInfo?.student_name}</span> has completed {allMarksData.overallStats.totalModules} modules 
                                        with an overall average of <span className="font-bold text-blue-600">{allMarksData.overallStats.averagePercentage}%</span>.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total Marks Obtained:</span>
                                            <span className="font-medium">{allMarksData.overallStats.totalMarksObtained}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Total Possible Marks:</span>
                                            <span className="font-medium">{allMarksData.overallStats.totalPossibleMarks}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="relative w-40 h-40">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="10" 
                                                strokeLinecap="round" strokeDasharray={`${allMarksData.overallStats.averagePercentage * 2.83} 283`}
                                                transform="rotate(-90 50 50)"/>
                                            <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="20" fontWeight="bold" fill="#1f2937">
                                                {allMarksData.overallStats.averagePercentage}%
                                            </text>
                                            <text x="50" y="65" textAnchor="middle" fontSize="10" fill="#6b7280">Overall</text>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    <p className="mb-2">Student Marks Viewing System v1.0 | Database: mutovutssdb</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span>DevOps & React Modules</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>L5 Software Development A & B</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                            <span>Spring 2024 Semester</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentMarksViewer;