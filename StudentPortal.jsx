import React, { useState, useEffect } from 'react';
import { studentPortalAPI } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

const StudentPortal = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [modules, setModules] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [searchMethod, setSearchMethod] = useState('select'); // 'select' or 'manual'
  const [marksData, setMarksData] = useState(null);
  const [allMarksData, setAllMarksData] = useState(null);
  const [classroomSummary, setClassroomSummary] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'all'
  const [studentInfo, setStudentInfo] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedClassroom) {
      fetchStudentsByClassroom();
    }
  }, [selectedClassroom]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [classroomsRes, modulesRes, statsRes] = await Promise.all([
        studentPortalAPI.getClassrooms(),
        studentPortalAPI.getModules(),
        studentPortalAPI.getDashboardStats()
      ]);
      
      if (classroomsRes.data.success) setClassrooms(classroomsRes.data.data);
      if (modulesRes.data.success) setModules(modulesRes.data.data);
      if (statsRes.data.success) setDashboardStats(statsRes.data.data);
      
    } catch (error) {
      toast.error('Failed to load initial data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsByClassroom = async () => {
    try {
      setLoading(true);
      const response = await studentPortalAPI.getStudentsByClassroom(selectedClassroom);
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load students');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchStudent = async () => {
    if (!studentId.trim() && !studentRegNo.trim()) {
      toast.error('Please enter Student ID or Registration Number');
      return;
    }

    try {
      setLoading(true);
      const searchParam = studentId.trim() || studentRegNo.trim();
      const response = await studentPortalAPI.searchStudent(searchParam);
      
      if (response.data.success) {
        const student = response.data.data;
        setStudentInfo(student);
        setSelectedClassroom(student.classroom_id);
        setSelectedStudent(student.student_id);
        toast.success(`Found student: ${student.student_name}`);
      }
    } catch (error) {
      toast.error('Student not found');
      setStudentInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarks = async () => {
    if (!selectedClassroom || !selectedModule || !selectedStudent) {
      toast.error('Please select classroom, module, and student');
      return;
    }

    try {
      setLoading(true);
      
      if (viewMode === 'single') {
        const response = await studentPortalAPI.getStudentMarks(
          selectedStudent,
          selectedModule,
          selectedClassroom
        );
        
        if (response.data.success) {
          setMarksData(response.data);
          toast.success('Marks loaded successfully');
        }
        
        // Also fetch classroom summary
        const summaryRes = await studentPortalAPI.getClassroomModuleSummary(
          selectedClassroom,
          selectedModule
        );
        
        if (summaryRes.data.success) {
          setClassroomSummary(summaryRes.data);
        }
      } else {
        const response = await studentPortalAPI.getAllStudentMarks(selectedStudent);
        if (response.data.success) {
          setAllMarksData(response.data);
          toast.success('All marks loaded successfully');
        }
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch marks');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassroomChange = (e) => {
    const classroomId = e.target.value;
    setSelectedClassroom(classroomId);
    setSelectedStudent('');
    setMarksData(null);
    setAllMarksData(null);
  };

  const handleStudentSelect = (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    
    const student = students.find(s => s.student_id == studentId);
    if (student) {
      setStudentInfo(student);
      setStudentId(student.student_id);
      setStudentRegNo(student.student_reg_no);
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setMarksData(null);
    setAllMarksData(null);
  };

  const getGradeColor = (grade) => {
    if (!grade) return '#888888';
    if (grade.includes('A')) return '#10B981'; // Green
    if (grade.includes('B')) return '#3B82F6'; // Blue
    if (grade.includes('C')) return '#F59E0B'; // Yellow
    if (grade.includes('D')) return '#EF4444'; // Red
    return '#6B7280'; // Gray for F
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return '#10B981';
    if (percentage >= 60) return '#3B82F6';
    if (percentage >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const renderSingleMarksView = () => {
    if (!marksData) return null;

    const { data, statistics } = marksData;
    const percentage = ((data.marks_obtained / data.total_marks) * 100).toFixed(2);

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Marks Details</h2>
          <div className="flex items-center text-gray-600">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
              {data.classroom_name}
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
              {data.module_name}
            </span>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
              {data.semester}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Marks Obtained</p>
                <p className="text-2xl font-bold text-gray-900">
                  {data.marks_obtained} / {data.total_marks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Percentage</p>
                <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Grade</p>
                <div className="flex items-center">
                  <span 
                    className="text-2xl font-bold px-3 py-1 rounded-lg"
                    style={{ backgroundColor: getGradeColor(data.grade) + '20', color: getGradeColor(data.grade) }}
                  >
                    {data.grade}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Class Rank</p>
                <p className="text-2xl font-bold text-gray-900">
                  {statistics.studentRank} / {statistics.totalStudents}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Classroom Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <p className="text-sm text-gray-600">Class Average</p>
                  <p className="text-xl font-bold text-blue-600">{statistics.classAverage}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <p className="text-sm text-gray-600">Highest Marks</p>
                  <p className="text-xl font-bold text-green-600">{statistics.classHighest}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <p className="text-sm text-gray-600">Lowest Marks</p>
                  <p className="text-xl font-bold text-red-600">{statistics.classLowest}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-xl font-bold text-purple-600">{statistics.totalStudents}</p>
                </div>
              </div>
            </div>

            {classroomSummary && classroomSummary.gradeDistribution && (
              <div className="mt-6 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={classroomSummary.gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ grade, percent }) => `${grade}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {classroomSummary.gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-gray-50 rounded-xl p-6 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Student Name</p>
                    <p className="font-medium text-gray-900">{data.student_name}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Registration Number</p>
                    <p className="font-medium text-gray-900">{data.student_reg_no}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{data.email}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Exam Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(data.exam_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Performance</p>
                    <span 
                      className="px-3 py-1 text-sm font-medium rounded-full"
                      style={{ 
                        backgroundColor: getPerformanceColor(percentage) + '20', 
                        color: getPerformanceColor(percentage) 
                      }}
                    >
                      {data.performance}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAllMarksView = () => {
    if (!allMarksData) return null;

    const { data, overallStats, moduleSummary } = allMarksData;

    const chartData = data.map(mark => ({
      name: mark.module_name,
      marks: mark.marks_obtained,
      percentage: mark.percentage,
      grade: mark.grade
    }));

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All Marks Summary</h2>
          <p className="text-gray-600">Viewing all marks for {studentInfo?.student_name}</p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
            <p className="text-sm font-medium text-gray-600">Total Modules</p>
            <p className="text-2xl font-bold text-gray-900">{overallStats.totalModules}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
            <p className="text-sm font-medium text-gray-600">Average Percentage</p>
            <p className="text-2xl font-bold text-gray-900">{overallStats.averagePercentage}%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
            <p className="text-sm font-medium text-gray-600">Total Marks Obtained</p>
            <p className="text-2xl font-bold text-gray-900">{overallStats.totalMarksObtained}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200">
            <p className="text-sm font-medium text-gray-600">Total Possible Marks</p>
            <p className="text-2xl font-bold text-gray-900">{overallStats.totalPossibleMarks}</p>
          </div>
        </div>

        {/* Marks Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Chart</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Marks', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" name="Marks Obtained" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Marks Table */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Marks</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Module
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classroom
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((mark) => (
                  <tr key={mark.mark_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{mark.module_name}</div>
                      <div className="text-sm text-gray-500">{mark.module_code}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {mark.classroom_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {mark.marks_obtained} / {mark.total_marks}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        mark.percentage >= 80 ? 'bg-green-100 text-green-800' :
                        mark.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {mark.percentage}%
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span 
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        style={{ 
                          backgroundColor: getGradeColor(mark.grade) + '20', 
                          color: getGradeColor(mark.grade) 
                        }}
                      >
                        {mark.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {mark.semester}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  if (loading && !classrooms.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Student Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Marks Portal</h1>
              <p className="text-gray-600 mt-2">View your marks by selecting classroom, module, and student ID</p>
            </div>
            
            {dashboardStats && (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-xl font-bold text-gray-900">
                    {dashboardStats.overall.total_students}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Classrooms</p>
                  <p className="text-xl font-bold text-gray-900">
                    {dashboardStats.overall.total_classrooms}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selection Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Classroom Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Classroom *
              </label>
              <select
                value={selectedClassroom}
                onChange={handleClassroomChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
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

            {/* Search Method Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Selection Method
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSearchMethod('select')}
                  className={`flex-1 px-4 py-2 rounded-lg ${searchMethod === 'select' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Select from List
                </button>
                <button
                  onClick={() => setSearchMethod('manual')}
                  className={`flex-1 px-4 py-2 rounded-lg ${searchMethod === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Enter Manually
                </button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Mode
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewModeChange('single')}
                  className={`flex-1 px-4 py-2 rounded-lg ${viewMode === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Single Module
                </button>
                <button
                  onClick={() => handleViewModeChange('all')}
                  className={`flex-1 px-4 py-2 rounded-lg ${viewMode === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  All Modules
                </button>
              </div>
            </div>
          </div>

          {/* Student Selection Area */}
          <div className="mb-6">
            {searchMethod === 'select' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student *
                </label>
                <select
                  value={selectedStudent}
                  onChange={handleStudentSelect}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={!selectedClassroom}
                >
                  <option value="">{!selectedClassroom ? 'Select classroom first' : 'Choose Student'}</option>
                  {students.map(student => (
                    <option key={student.student_id} value={student.student_id}>
                      {student.student_reg_no} - {student.student_name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter Student ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OR Registration Number
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={studentRegNo}
                      onChange={(e) => setStudentRegNo(e.target.value)}
                      placeholder="Enter Registration Number"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={searchStudent}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={fetchMarks}
              disabled={loading || !selectedClassroom || !selectedStudent || (viewMode === 'single' && !selectedModule)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {viewMode === 'single' ? 'View Marks' : 'View All Marks'}
                </>
              )}
            </button>
            <button
              onClick={() => {
                setSelectedClassroom('');
                setSelectedModule('');
                setSelectedStudent('');
                setStudentId('');
                setStudentRegNo('');
                setMarksData(null);
                setAllMarksData(null);
                setStudentInfo(null);
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Student Info Card */}
        {studentInfo && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-2xl font-bold">
                    {studentInfo.student_name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{studentInfo.student_name}</h3>
                  <p className="text-gray-600">{studentInfo.student_reg_no}</p>
                  <div className="flex items-center mt-1">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2">
                      {studentInfo.classroom_name}
                    </span>
                    <span className="text-sm text-gray-500">{studentInfo.email}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Modules Completed</p>
                <p className="text-2xl font-bold text-gray-900">{studentInfo.modules_completed || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Marks Display Area */}
        {viewMode === 'single' ? renderSingleMarksView() : renderAllMarksView()}

        {/* Dashboard Stats */}
        {dashboardStats && !marksData && !allMarksData && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">System Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {dashboardStats.classrooms.slice(0, 3).map(classroom => (
                <div key={classroom.classroom_id} className="bg-gray-50 p-5 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{classroom.classroom_name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students</span>
                      <span className="font-medium">{classroom.student_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Marks Records</span>
                      <span className="font-medium">{classroom.marks_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Marks</span>
                      <span className="font-medium">{classroom.average_marks?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {dashboardStats.modules.map(module => (
                  <div key={module.module_id} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                    <h4 className="font-medium text-gray-900">{module.module_name}</h4>
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Students:</span>
                        <span className="font-medium">{module.student_count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average:</span>
                        <span className="font-medium">{module.average_marks?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Student Marks Portal v1.0 | Database: mutovutssdb</p>
          <p className="mt-1">Select your classroom, module, and student ID to view marks</p>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;