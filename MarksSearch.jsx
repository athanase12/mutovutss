import React, { useState, useEffect } from 'react';
import { 
    getClassrooms, 
    getModules, 
    searchMarks, 
    getAllMarks,
    getClassroomStudents,
    handleApiError 
} from '../services/api';

const MarksSearch = () => {
    // Form state
    const [formData, setFormData] = useState({
        studentId: '',
        moduleId: '',
        classroomId: ''
    });
    
    // UI state
    const [classrooms, setClassrooms] = useState([]);
    const [modules, setModules] = useState([]);
    const [classroomStudents, setClassroomStudents] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [allMarks, setAllMarks] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    // Load initial data
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [classroomsRes, modulesRes] = await Promise.all([
                    getClassrooms(),
                    getModules()
                ]);
                setClassrooms(classroomsRes.data);
                setModules(modulesRes.data);
            } catch (err) {
                setError('Failed to load initial data. Please check server connection.');
            }
        };
        loadInitialData();
    }, []);

    // Load students when classroom changes
    useEffect(() => {
        const loadClassroomStudents = async () => {
            if (formData.classroomId) {
                try {
                    const response = await getClassroomStudents(formData.classroomId);
                    setClassroomStudents(response.data);
                } catch (err) {
                    setClassroomStudents([]);
                }
            } else {
                setClassroomStudents([]);
            }
        };
        loadClassroomStudents();
    }, [formData.classroomId]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear results when form changes
        if (searchResults) {
            setSearchResults(null);
            setAllMarks(null);
            setStudentInfo(null);
        }
        
        // Clear error
        if (error) setError('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSearchResults(null);
        setAllMarks(null);
        setStudentInfo(null);
        setShowDetails(false);

        try {
            // First, verify student exists
            const studentRes = await getStudent(formData.studentId);
            setStudentInfo(studentRes.data);
            
            // Search for marks
            const marksRes = await searchMarks(formData);
            setSearchResults(marksRes.data);
            
            // Load all marks for the student
            const allMarksRes = await getAllMarks(formData.studentId);
            setAllMarks(allMarksRes.data);
            
        } catch (err) {
            const errorData = handleApiError(err);
            setError(errorData.message || errorData.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Reset form
    const handleReset = () => {
        setFormData({
            studentId: '',
            moduleId: '',
            classroomId: ''
        });
        setSearchResults(null);
        setAllMarks(null);
        setStudentInfo(null);
        setError('');
        setShowDetails(false);
    };

    return (
        <div className="marks-search-container">
            <header className="header">
                <h1>📚 Student Marks Search System</h1>
                <p>Search your marks by selecting classroom, module, and entering your student ID</p>
            </header>

            <div className="container">
                {/* Search Form */}
                <div className="search-card">
                    <h2>Search Criteria</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="classroomId">Classroom *</label>
                            <select
                                id="classroomId"
                                name="classroomId"
                                value={formData.classroomId}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                            >
                                <option value="">Select Classroom</option>
                                {classrooms.map(classroom => (
                                    <option key={classroom.id} value={classroom.id}>
                                        {classroom.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="moduleId">Module *</label>
                            <select
                                id="moduleId"
                                name="moduleId"
                                value={formData.moduleId}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                            >
                                <option value="">Select Module</option>
                                {modules.map(module => (
                                    <option key={module.id} value={module.id}>
                                        {module.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="studentId">Student ID *</label>
                            <input
                                type="number"
                                id="studentId"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleInputChange}
                                placeholder="e.g., 1001"
                                required
                                disabled={loading}
                            />
                            {classroomStudents.length > 0 && (
                                <div className="student-suggestions">
                                    <small>Available students in this classroom:</small>
                                    <div className="student-tags">
                                        {classroomStudents.map(student => (
                                            <span 
                                                key={student.id}
                                                className="student-tag"
                                                onClick={() => setFormData(prev => ({
                                                    ...prev,
                                                    studentId: student.id.toString()
                                                }))}
                                            >
                                                {student.name} ({student.id})
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="button-group">
                            <button 
                                type="submit" 
                                className="btn-search"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Searching...
                                    </>
                                ) : '🔍 Search Marks'}
                            </button>
                            <button 
                                type="button" 
                                className="btn-reset"
                                onClick={handleReset}
                                disabled={loading}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-card">
                        <h3>⚠️ Error</h3>
                        <p>{error}</p>
                    </div>
                )}

                {/* Search Results */}
                {searchResults && searchResults.success && (
                    <div className="results-card">
                        <div className="results-header">
                            <h2>Search Results</h2>
                            <span className="badge">{searchResults.count} record(s) found</span>
                        </div>

                        {/* Student Info */}
                        {studentInfo && (
                            <div className="student-info">
                                <h3>Student Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Student ID:</span>
                                        <span className="value">{studentInfo.id}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Name:</span>
                                        <span className="value">{studentInfo.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Classroom:</span>
                                        <span className="value">{studentInfo.classroom_name}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Search Date:</span>
                                        <span className="value">{searchResults.data[0]?.search_date || new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Marks Table */}
                        <div className="marks-table-container">
                            <table className="marks-table">
                                <thead>
                                    <tr>
                                        <th>Module</th>
                                        <th>Classroom</th>
                                        <th>Marks Obtained</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.data.map((result, index) => (
                                        <tr key={index}>
                                            <td>{result.module_name}</td>
                                            <td>{result.classroom_name}</td>
                                            <td>
                                                <span className="marks-value">
                                                    {result.marks_obtained}/100
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${
                                                    result.marks_obtained >= 70 ? 'distinction' :
                                                    result.marks_obtained >= 60 ? 'merit' :
                                                    result.marks_obtained >= 40 ? 'pass' : 'fail'
                                                }`}>
                                                    {result.marks_obtained >= 70 ? 'Distinction' :
                                                     result.marks_obtained >= 60 ? 'Merit' :
                                                     result.marks_obtained >= 40 ? 'Pass' : 'Fail'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* View All Marks Button */}
                        {allMarks && allMarks.success && (
                            <div className="details-section">
                                <button 
                                    className="btn-details"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    {showDetails ? '▲ Hide All Marks' : '▼ View All Marks for This Student'}
                                </button>

                                {showDetails && (
                                    <div className="all-marks">
                                        <h3>All Marks Overview</h3>
                                        <div className="stats">
                                            <div className="stat-card">
                                                <span className="stat-label">Total Modules</span>
                                                <span className="stat-value">{allMarks.totalModules}</span>
                                            </div>
                                            <div className="stat-card">
                                                <span className="stat-label">Average Marks</span>
                                                <span className="stat-value">{allMarks.average}%</span>
                                            </div>
                                        </div>
                                        
                                        <table className="marks-table detailed">
                                            <thead>
                                                <tr>
                                                    <th>Module</th>
                                                    <th>Classroom</th>
                                                    <th>Marks</th>
                                                    <th>Grade</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allMarks.data.map((mark, index) => (
                                                    <tr key={index}>
                                                        <td>{mark.module_name}</td>
                                                        <td>{mark.classroom_name}</td>
                                                        <td>{mark.marks_obtained}/100</td>
                                                        <td>{mark.grade}</td>
                                                        <td>
                                                            <span className={`status-badge ${
                                                                mark.marks_obtained >= 70 ? 'distinction' :
                                                                mark.marks_obtained >= 60 ? 'merit' :
                                                                mark.marks_obtained >= 40 ? 'pass' : 'fail'
                                                            }`}>
                                                                {mark.grade}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Information Card */}
                <div className="info-card">
                    <h3>📋 How to Use</h3>
                    <ol>
                        <li>Select your classroom from the dropdown</li>
                        <li>Choose the module (Devops or React)</li>
                        <li>Enter your student ID (or click on suggested students)</li>
                        <li>Click "Search Marks" to view your results</li>
                        <li>Use "View All Marks" to see complete academic record</li>
                    </ol>
                    <div className="grade-info">
                        <h4>Grading System:</h4>
                        <ul>
                            <li><span className="grade-distinction">Distinction:</span> 70-100 marks</li>
                            <li><span className="grade-merit">Merit:</span> 60-69 marks</li>
                            <li><span className="grade-pass">Pass:</span> 40-59 marks</li>
                            <li><span className="grade-fail">Fail:</span> Below 40 marks</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarksSearch;