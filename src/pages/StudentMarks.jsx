import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FaUserGraduate,
  FaChalkboard,
  FaBook,
  FaSearch,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaCheckCircle,
  FaHistory,
  FaTimesCircle,
  FaChartLine,
  FaInfoCircle,
  FaRedo,
  FaCaretDown,
  FaCaretUp,
  FaSpinner,
  FaPrint,
  FaDownload,
  FaFilePdf,
  FaCalendarAlt,
  FaUser,
  FaGraduationCap
} from "react-icons/fa";

const StudentMarks = () => {
  // State management
  const [classrooms, setClassrooms] = useState([]);
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    classroomId: "",
    moduleId: ""
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState({
    classrooms: true,
    modules: true,
    search: false
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [expandedResult, setExpandedResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  
  // Refs for print content
  const printRef = useRef();

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [classroomsRes, modulesRes] = await Promise.all([
          axios.get("http://localhost:8081/classrooms"),
          axios.get("http://localhost:8081/modules")
        ]);
        
        setClassrooms(classroomsRes.data);
        setModules(modulesRes.data);
        setLoading(prev => ({ ...prev, classrooms: false, modules: false }));
      } catch (err) {
        setError("Failed to load initial data. Please check server connection.");
        setLoading(prev => ({ ...prev, classrooms: false, modules: false }));
      }
    };
    
    fetchInitialData();
    
    // Load search history from localStorage
    const savedHistory = localStorage.getItem("marksSearchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.studentId || !formData.classroomId || !formData.moduleId) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(prev => ({ ...prev, search: true }));
    setError("");
    setSuccess("");
    setResults([]);
    setExpandedResult(null);

    try {
      const response = await axios.post("http://localhost:8081/search-marks", formData);

      if (response.data && response.data.length > 0) {
        setResults(response.data);
        setSuccess(`Found ${response.data.length} record(s)`);
        
        // Add to search history
        const newSearch = {
          ...formData,
          timestamp: new Date().toISOString(),
          resultsCount: response.data.length
        };
        
        const updatedHistory = [newSearch, ...searchHistory.slice(0, 9)];
        setSearchHistory(updatedHistory);
        localStorage.setItem("marksSearchHistory", JSON.stringify(updatedHistory));
      } else {
        setError("No results found");
      }
    } catch (err) {
      if (err.response) {
        // Server responded with error
        const errorData = err.response.data;
        if (errorData.error === "No marks found for the given search criteria") {
          setError("No marks found for the selected criteria. Please check your inputs.");
        } else {
          setError(errorData.error || "An error occurred while searching");
        }
      } else if (err.request) {
        setError("Cannot connect to server. Please ensure the backend is running.");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  // Reset form and clear results
  const handleReset = () => {
    setFormData({
      studentId: "",
      classroomId: "",
      moduleId: ""
    });
    setResults([]);
    setError("");
    setSuccess("");
    setExpandedResult(null);
  };

  // Quick fill form with sample data
  const handleQuickFill = () => {
    setFormData({
      studentId: "1001",
      classroomId: classrooms[0]?.id || "",
      moduleId: modules[0]?.id || ""
    });
  };

  // Load search from history
  const handleLoadFromHistory = (search) => {
    setFormData({
      studentId: search.studentId,
      classroomId: search.classroomId,
      moduleId: search.moduleId
    });
    setShowHistory(false);
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("marksSearchHistory");
  };

  // Get decision badge styling
  const getDecisionBadge = (decision, marks) => {
    if (decision === "Competent") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
          <FaCheckCircle className="mr-1" /> {decision}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
          <FaTimesCircle className="mr-1" /> {decision}
        </span>
      );
    }
  };

  // Get marks color based on value
  const getMarksColor = (marks) => {
    if (marks >= 80) return "text-green-600";
    if (marks >= 60) return "text-blue-600";
    if (marks >= 42) return "text-yellow-600";
    return "text-red-600";
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for printing
  const formatDateForPrint = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle print functionality
  const handlePrint = (result) => {
    if (!result) return;
    
    setIsPrinting(true);
    
    // Create print content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Student Marks Assessment - Print</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
          }
          
          body {
            padding: 40px;
            background: #fff;
            color: #333;
            line-height: 1.6;
          }
          
          .print-container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 40px;
            background: #fff;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .print-title {
            font-size: 28px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 10px;
          }
          
          .print-subtitle {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 20px;
          }
          
          .print-meta {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            font-size: 14px;
            color: #6b7280;
          }
          
          .print-section {
            margin-bottom: 30px;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          
          .info-item {
            margin-bottom: 15px;
          }
          
          .info-label {
            font-weight: 500;
            color: #6b7280;
            margin-bottom: 5px;
            font-size: 14px;
          }
          
          .info-value {
            font-weight: 600;
            color: #111827;
            font-size: 16px;
          }
          
          .marks-display {
            text-align: center;
            margin: 30px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 10px;
            border: 1px solid #e2e8f0;
          }
          
          .marks-score {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 10px;
            color: ${result.decision === "Competent" ? "#059669" : "#dc2626"};
          }
          
          .marks-total {
            font-size: 18px;
            color: #6b7280;
          }
          
          .competency-badge {
            display: inline-block;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 16px;
            margin: 10px 0;
            background-color: ${result.decision === "Competent" ? "#d1fae5" : "#fee2e2"};
            color: ${result.decision === "Competent" ? "#065f46" : "#991b1b"};
            border: 1px solid ${result.decision === "Competent" ? "#a7f3d0" : "#fecaca"};
          }
          
          .progress-bar {
            width: 100%;
            height: 12px;
            background: #e5e7eb;
            border-radius: 6px;
            margin: 20px 0;
            overflow: hidden;
          }
          
          .progress-fill {
            height: 100%;
            background: ${result.decision === "Competent" ? "#10b981" : "#ef4444"};
            width: ${Math.min(result.marks, 100)}%;
            border-radius: 6px;
          }
          
          .progress-labels {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #6b7280;
            margin-top: 5px;
          }
          
          .print-footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
          }
          
          .threshold-info {
            background: #eff6ff;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #3b82f6;
          }
          
          .threshold-title {
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 5px;
          }
          
          .grade-scale {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 20px 0;
          }
          
          .grade-item {
            text-align: center;
            padding: 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .excellent { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
          .good { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
          .competent { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
          .nyc { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
          
          @media print {
            body { padding: 0; }
            .print-container { border: none; }
            .no-print { display: none; }
            .print-btn { display: none; }
          }
          
          @page {
            size: A4;
            margin: 20mm;
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <div class="print-header">
            <h1 class="print-title">Student Marks Assessment</h1>
            <p class="print-subtitle">Official Academic Performance Record</p>
            <div class="print-meta">
              <div>Generated: ${formatDateForPrint()}</div>
              <div>System: mutovutssdb</div>
            </div>
          </div>
          
          <div class="print-section">
            <h2 class="section-title">Student Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Student Name</div>
                <div class="info-value">${result.student}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Student ID</div>
                <div class="info-value">${formData.studentId}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Classroom</div>
                <div class="info-value">${result.classroom}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Module</div>
                <div class="info-value">${result.module}</div>
              </div>
            </div>
          </div>
          
          <div class="print-section">
            <h2 class="section-title">Assessment Results</h2>
            <div class="marks-display">
              <div class="marks-score">${result.marks}</div>
              <div class="marks-total">out of 100 marks</div>
              <div class="competency-badge">${result.decision}</div>
            </div>
            
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
            <div class="progress-labels">
              <span>0</span>
              <span>42 (Competency Threshold)</span>
              <span>100</span>
            </div>
            
            <div class="threshold-info">
              <div class="threshold-title">Competency Assessment</div>
              <p>This student has been assessed as <strong>${result.decision}</strong> based on obtaining ${result.marks} marks against the competency threshold of 42 marks.</p>
            </div>
          </div>
          
          <div class="print-section">
            <h2 class="section-title">Grading Scale Reference</h2>
            <div class="grade-scale">
              <div class="grade-item excellent">Excellent: 80-100</div>
              <div class="grade-item good">Good: 60-79</div>
              <div class="grade-item competent">Competent: 42-59</div>
              <div class="grade-item nyc">NYC: Below 42</div>
            </div>
          </div>
          
          <div class="print-footer">
            <p>This document is an official academic record from the Student Marks System.</p>
            <p>Document ID: ${Date.now()} | Printed on: ${new Date().toLocaleString()}</p>
            <p class="no-print">This is a print preview. Use browser print function (Ctrl+P) to print this document.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      setIsPrinting(false);
    };
    
    // Fallback in case onload doesn't fire
    setTimeout(() => {
      if (printWindow.document.readyState === 'complete') {
        printWindow.focus();
        printWindow.print();
        setIsPrinting(false);
      }
    }, 1000);
  };

  // Export to PDF (placeholder functionality)
  const handleExportPDF = (result) => {
    alert(`PDF export feature would generate a file for: ${result.student} - ${result.marks} marks`);
    // In a real implementation, you would use a library like jsPDF or html2pdf.js
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
              <FaClipboardCheck size={32} />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Student Marks Search System
              </h1>
              <p className="text-gray-600 mt-1">
                Search and evaluate student performance with competency assessment
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <FaSearch size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 ml-3">Search Criteria</h2>
              </div>

              <form onSubmit={handleSearch}>
                <div className="space-y-4">
                  {/* Student ID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUserGraduate className="inline-block mr-2" />
                      Student ID *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        placeholder="Enter student ID (e.g., 1001)"
                        required
                        disabled={loading.search}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 disabled:bg-gray-100"
                      />
                      <FaUserGraduate className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Classroom Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaChalkboard className="inline-block mr-2" />
                      Classroom *
                    </label>
                    {loading.classrooms ? (
                      <div className="flex items-center justify-center py-3 bg-gray-100 rounded-lg">
                        <FaSpinner className="animate-spin text-gray-400 mr-2" />
                        <span className="text-gray-500">Loading classrooms...</span>
                      </div>
                    ) : (
                      <select
                        name="classroomId"
                        value={formData.classroomId}
                        onChange={handleInputChange}
                        required
                        disabled={loading.search}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                      >
                        <option value="">Select a classroom</option>
                        {classrooms.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Module Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaBook className="inline-block mr-2" />
                      Module *
                    </label>
                    {loading.modules ? (
                      <div className="flex items-center justify-center py-3 bg-gray-100 rounded-lg">
                        <FaSpinner className="animate-spin text-gray-400 mr-2" />
                        <span className="text-gray-500">Loading modules...</span>
                      </div>
                    ) : (
                      <select
                        name="moduleId"
                        value={formData.moduleId}
                        onChange={handleInputChange}
                        required
                        disabled={loading.search}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                      >
                        <option value="">Select a module</option>
                        {modules.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading.search}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                      {loading.search ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <FaSearch className="mr-2" />
                          Search Marks
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <FaRedo className="mr-1" />
                      Reset
                    </button>
                  </div>
                </div>
              </form>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Quick Actions</h3>
                  <button
                    onClick={handleQuickFill}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Fill with sample
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, studentId: "1001" }))}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    ID: 1001
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, studentId: "1002" }))}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    ID: 1002
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, studentId: "1003" }))}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    ID: 1003
                  </button>
                </div>
              </div>
            </div>

            {/* Search History Card */}
            {searchHistory.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                      <FaHistory size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">Recent Searches</h3>
                  </div>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {showHistory ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showHistory && (
                  <div className="space-y-3">
                    {searchHistory.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleLoadFromHistory(search)}
                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all duration-200 group"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900 group-hover:text-blue-700">
                            ID: {search.studentId}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(search.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {search.resultsCount} result(s)
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={clearHistory}
                      className="w-full text-sm text-red-600 hover:text-red-800 py-2 text-center"
                    >
                      Clear All History
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <FaInfoCircle size={16} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">Competency Rules</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                  <div>
                    <span className="font-medium text-green-700">Competent:</span>
                    <span className="text-gray-600 ml-2">42 marks or above</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                  <div>
                    <span className="font-medium text-red-700">NYC:</span>
                    <span className="text-gray-600 ml-2">Below 42 marks</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Threshold:</span> 42 marks
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">NYC:</span> Not Yet Competent
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Results & Messages */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-pulse">
                <div className="flex items-start">
                  <FaExclamationTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-red-800 font-semibold">Error</h3>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <FaCheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-green-800 font-semibold">Success!</h3>
                    <p className="text-green-700 mt-1">{success}</p>
                  </div>
                </div>
              </div>
            )}

           
            {/* Results Display */}
            {results.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {results.length} record(s)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Classroom
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Module
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Marks
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Competency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result, index) => (
                        <React.Fragment key={index}>
                          <tr 
                            className={`hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                              expandedResult === result ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => setExpandedResult(expandedResult === result ? null : result)}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-3">
                                  {result.student.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{result.student}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-900">{result.classroom}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-gray-900">{result.module}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className={`text-2xl font-bold ${getMarksColor(result.marks)}`}>
                                {result.marks}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {getDecisionBadge(result.decision, result.marks)}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedResult(expandedResult === result ? null : result);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                {expandedResult === result ? (
                                  <FaCaretUp className="h-5 w-5" />
                                ) : (
                                  <FaCaretDown className="h-5 w-5" />
                                )}
                              </button>
                            </td>
                          </tr>
                          
                          {/* Expanded Details Row with Print Button */}
                          {expandedResult === result && (
                            <tr className="bg-blue-50">
                              <td colSpan="6" className="px-6 py-4">
                                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <FaUser className="mr-2 text-blue-500" />
                                        Student Information
                                      </h4>
                                      <div className="space-y-3">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Student Name:</span>
                                          <span className="font-medium text-gray-900">{result.student}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Classroom:</span>
                                          <span className="font-medium text-gray-900">{result.classroom}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Student ID:</span>
                                          <span className="font-medium text-gray-900">{formData.studentId}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <FaGraduationCap className="mr-2 text-green-500" />
                                        Assessment Details
                                      </h4>
                                      <div className="space-y-3">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Module:</span>
                                          <span className="font-medium text-gray-900">{result.module}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Marks Obtained:</span>
                                          <span className={`font-bold text-lg ${getMarksColor(result.marks)}`}>
                                            {result.marks}/60
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Competency Status:</span>
                                          <span>
                                            {getDecisionBadge(result.decision, result.marks)}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Assessment Date:</span>
                                          <span className="font-medium text-gray-900">{formatDateForPrint()}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Performance Indicator */}
                                  <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Performance Indicator</h5>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                          <div 
                                            className={`h-3 rounded-full ${
                                              result.decision === 'Competent' ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${Math.min(result.marks, 100)}%` }}
                                          ></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                          <span>0</span>
                                          <span className="font-semibold">42 (Threshold)</span>
                                          <span>100</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Print and Export Buttons */}
                                  <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                      <button
                                        onClick={() => handlePrint(result)}
                                        disabled={isPrinting}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        {isPrinting ? (
                                          <>
                                            <FaSpinner className="animate-spin mr-2" />
                                            Preparing Print...
                                          </>
                                        ) : (
                                          <>
                                            <FaPrint className="mr-2" />
                                            Print Assessment
                                          </>
                                        )}
                                      </button>
                                      
                                      <button
                                        onClick={() => handleExportPDF(result)}
                                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                                      >
                                        <FaFilePdf className="mr-2" />
                                        Export as PDF
                                      </button>
                                      
                                      <button
                                        onClick={() => alert(`Downloading assessment for ${result.student}`)}
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                                      >
                                        <FaDownload className="mr-2" />
                                        Download
                                      </button>
                                    </div>
                                    
                                    <div className="mt-4 text-sm text-gray-500 text-center">
                                      <p>Click "Print Assessment" to generate a printable version of this assessment.</p>
                                      <p className="text-xs mt-1">The printout includes all student and assessment details.</p>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // Empty State
              !loading.search && !error && (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
                  <div className="max-w-md mx-auto">
                    <div className="h-24 w-24 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaSearch className="h-12 w-12 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Search</h3>
                    <p className="text-gray-600 mb-6">
                      Enter your search criteria to find student marks. 
                      The system will evaluate competency based on the 42-marks threshold.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="text-2xl font-bold text-green-700">≥42</div>
                        <div className="text-sm text-green-600">Competent</div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                        <div className="text-2xl font-bold text-red-700">&lt;42</div>
                        <div className="text-sm text-red-600">NYC</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-left">
                      <h4 className="font-semibold text-blue-900 mb-2">Quick Tips:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Use quick-fill buttons for faster input</li>
                        <li>• Click on any result row to expand details</li>
                        <li>• Click "Print Assessment" to print student marks</li>
                        <li>• Recent searches are saved for quick access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Loading State */}
            {loading.search && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="h-24 w-24 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaSpinner className="h-12 w-12 text-blue-500 animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Searching...</h3>
                  <p className="text-gray-600">
                    Searching for marks with the provided criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900">Student Marks System</h3>
              <p className="text-gray-600">Database: mutovutssdb</p>
              <p className="text-sm text-gray-500 mt-1">
                Includes print functionality for official assessments
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600">Competency Assessment System</p>
              <p className="text-sm text-gray-500 mt-1">
                Built with React, Express, MySQL & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Hidden div for print content */}
      <div ref={printRef} className="hidden">
        {/* This div is used as a reference for print functionality */}
      </div>
    </div>
  );
};

export default StudentMarks;