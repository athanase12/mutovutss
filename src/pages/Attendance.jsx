import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUserCheck, FaUserTimes, FaCalendarAlt, FaPrint, FaDownload, 
  FaSearch, FaFilter, FaChartBar, FaSync, FaClipboardCheck, 
  FaCode, FaUsers, FaLaptop, FaBell, FaHistory, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { IoMdTime, IoMdSettings } from 'react-icons/io';
import { GiTeacher, GiGraduateCap } from 'react-icons/gi';
import { TbPercentage } from 'react-icons/tb';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Attendance = () => {
  // L5 Software Dev. B Students
  const l5SoftwareDevB = [
    { id: 1, name: 'AKIMANA LAMBERT', regNumber: 'L5B2024001', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'akimana.lambert@mutovutss.edu.rw', phone: '+250 788 000 001', seat: 'A1', remarks: '' },
    { id: 2, name: 'CYUZUZO Florentine', regNumber: 'L5B2024002', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'cyuzuflorentine@mutovutss.edu.rw', phone: '+250 788 000 002', seat: 'A2', remarks: '' },
    { id: 3, name: 'DUSHIMIMANA CLAUDE', regNumber: 'L5B2024003', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'dushimiclaude@mutovutss.edu.rw', phone: '+250 788 000 003', seat: 'A3', remarks: '' },
    { id: 4, name: 'IGIRANEZA EL-GIBBOR', regNumber: 'L5B2024004', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'igiraneza.el@mutovutss.edu.rw', phone: '+250 788 000 004', seat: 'A4', remarks: '' },
    { id: 5, name: 'INGABIRE CARINE', regNumber: 'L5B2024005', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'ingabire.carine@mutovutss.edu.rw', phone: '+250 788 000 005', seat: 'A5', remarks: '' },
    { id: 6, name: 'IRADUKUNDA DIANE', regNumber: 'L5B2024006', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'iradukunda.diane@mutovutss.edu.rw', phone: '+250 788 000 006', seat: 'A6', remarks: '' },
    { id: 7, name: 'ISHIMWE OLIVE', regNumber: 'L5B2024007', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'ishimwe.olive@mutovutss.edu.rw', phone: '+250 788 000 007', seat: 'B1', remarks: '' },
    { id: 8, name: 'MUCYO SAMUEL', regNumber: 'L5B2024008', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'mucyo.samuel@mutovutss.edu.rw', phone: '+250 788 000 008', seat: 'B2', remarks: '' },
    { id: 9, name: 'MURAGIJIMANA CEDRIC', regNumber: 'L5B2024009', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'muragijimana.cedric@mutovutss.edu.rw', phone: '+250 788 000 009', seat: 'B3', remarks: '' },
    { id: 10, name: 'MURERESHEJEMANA CHARLOTTE', regNumber: 'L5B2024010', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'murereshejemana.charlotte@mutovutss.edu.rw', phone: '+250 788 000 010', seat: 'B4', remarks: '' },
    { id: 11, name: 'NDAYAMBAJE DIDIER', regNumber: 'L5B2024011', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'ndayambaje.didier@mutovutss.edu.rw', phone: '+250 788 000 011', seat: 'B5', remarks: '' },
    { id: 12, name: 'NIYOMUHOZA DENYSE', regNumber: 'L5B2024012', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'niyomuhoza.denyse@mutovutss.edu.rw', phone: '+250 788 000 012', seat: 'B6', remarks: '' },
    { id: 13, name: 'NSHIMIYIMANA ERASME', regNumber: 'L5B2024013', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'nshimiyimana.erasme@mutovutss.edu.rw', phone: '+250 788 000 013', seat: 'C1', remarks: '' },
    { id: 14, name: 'NTAKIRUTIMANA JEAN DE DIEU', regNumber: 'L5B2024014', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'ntakirutimana.jean@mutovutss.edu.rw', phone: '+250 788 000 014', seat: 'C2', remarks: '' },
    { id: 15, name: 'NYIRANDIKUMANA GAUDENCE', regNumber: 'L5B2024015', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'nyirandikumana.gaudence@mutovutss.edu.rw', phone: '+250 788 000 015', seat: 'C3', remarks: '' },
    { id: 16, name: 'NZABAMWITA Francois Xavier', regNumber: 'L5B2024016', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'nzabamwita.francois@mutovutss.edu.rw', phone: '+250 788 000 016', seat: 'C4', remarks: '' },
    { id: 17, name: 'TUYIZERE DENYSE', regNumber: 'L5B2024017', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'tuyizere.denyse@mutovutss.edu.rw', phone: '+250 788 000 017', seat: 'C5', remarks: '' },
    { id: 18, name: 'UHIRIWE ZENOBIE', regNumber: 'L5B2024018', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'uhiriwe.zenobie@mutovutss.edu.rw', phone: '+250 788 000 018', seat: 'D1', remarks: '' },
    { id: 19, name: 'UMUTONI CLAUDINE', regNumber: 'L5B2024019', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'umutoni.claudine@mutovutss.edu.rw', phone: '+250 788 000 019', seat: 'D2', remarks: '' },
    { id: 20, name: 'UWIMBABAZI DIANE', regNumber: 'L5B2024020', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'uwimbabazi.diane@mutovutss.edu.rw', phone: '+250 788 000 020', seat: 'D3', remarks: '' },
    { id: 21, name: 'UWINGABIRE DIANE', regNumber: 'L5B2024021', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'uwingabire.diane@mutovutss.edu.rw', phone: '+250 788 000 021', seat: 'D4', remarks: '' },
    { id: 22, name: 'UWIRINGIRWA FROLENCE', regNumber: 'L5B2024022', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'uwiringirwa.frolence@mutovutss.edu.rw', phone: '+250 788 000 022', seat: 'D5', remarks: '' },
  ];

  // L5 Software Dev. A Students
  const l5SoftwareDevA = [
    { id: 23, name: 'BYUSA Gilbert', regNumber: 'L5A2024001', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'byusa.gilbert@mutovutss.edu.rw', phone: '+250 788 001 001', seat: 'A1', remarks: '' },
    { id: 24, name: 'DUFITUMUKIZA IBRAHIM', regNumber: 'L5A2024002', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'dufitumukiza.ibrahim@mutovutss.edu.rw', phone: '+250 788 001 002', seat: 'A2', remarks: '' },
    { id: 25, name: 'HAGENIMANA CLAUDE', regNumber: 'L5A2024003', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'hagenimana.claude@mutovutss.edu.rw', phone: '+250 788 001 003', seat: 'A3', remarks: '' },
    { id: 26, name: 'IGIRANEZA CLEMENTINE', regNumber: 'L5A2024004', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'igiraneza.clementine@mutovutss.edu.rw', phone: '+250 788 001 004', seat: 'A4', remarks: '' },
    { id: 27, name: 'IGISUBIZO KEZA Belyse', regNumber: 'L5A2024005', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'igisubizo.keza@mutovutss.edu.rw', phone: '+250 788 001 005', seat: 'A5', remarks: '' },
    { id: 28, name: 'ITUZE AIME Rene', regNumber: 'L5A2024006', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'ituze.aime@mutovutss.edu.rw', phone: '+250 788 001 006', seat: 'A6', remarks: '' },
    { id: 29, name: 'IYADUHUJE ASAFI', regNumber: 'L5A2024007', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'iyaduhuje.asafi@mutovutss.edu.rw', phone: '+250 788 001 007', seat: 'B1', remarks: '' },
    { id: 30, name: 'MASENGESHO ODINE', regNumber: 'L5A2024008', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'masengesho.odine@mutovutss.edu.rw', phone: '+250 788 001 008', seat: 'B2', remarks: '' },
    { id: 31, name: 'MUHUBIRI NESTA', regNumber: 'L5A2024009', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'muhubiri.nesta@mutovutss.edu.rw', phone: '+250 788 001 009', seat: 'B3', remarks: '' },
    { id: 32, name: 'MUKAHIRWA ALINE', regNumber: 'L5A2024010', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'mukahirwa.aline@mutovutss.edu.rw', phone: '+250 788 001 010', seat: 'B4', remarks: '' },
    { id: 33, name: 'MUKAMURIGO JOSIANE', regNumber: 'L5A2024011', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'mukamurigo.josiane@mutovutss.edu.rw', phone: '+250 788 001 011', seat: 'B5', remarks: '' },
    { id: 34, name: 'NIKUZE SOLANGE', regNumber: 'L5A2024012', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'nikuze.solange@mutovutss.edu.rw', phone: '+250 788 001 012', seat: 'B6', remarks: '' },
    { id: 35, name: 'NIYIGENA FAUSTINE', regNumber: 'L5A2024013', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'niyigena.faustine@mutovutss.edu.rw', phone: '+250 788 001 013', seat: 'C1', remarks: '' },
    { id: 36, name: 'NIYOMUGABO MOISE', regNumber: 'L5A2024014', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'niyomugabo.moise@mutovutss.edu.rw', phone: '+250 788 001 014', seat: 'C2', remarks: '' },
    { id: 37, name: 'NSHIMIYIMANA EGIDE', regNumber: 'L5A2024015', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'nshimiyimana.egide@mutovutss.edu.rw', phone: '+250 788 001 015', seat: 'C3', remarks: '' },
    { id: 38, name: 'NYIRAKAMANA MARIE ROSE', regNumber: 'L5A2024016', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'nyirakamana.marie@mutovutss.edu.rw', phone: '+250 788 001 016', seat: 'C4', remarks: '' },
    { id: 39, name: 'SHUMBUSHA Emmanuel', regNumber: 'L5A2024017', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'shumbusha.emmanuel@mutovutss.edu.rw', phone: '+250 788 001 017', seat: 'C5', remarks: '' },
    { id: 40, name: 'TUYISHIME REBECCAH', regNumber: 'L5A2024018', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'tuyishime.rebeccah@mutovutss.edu.rw', phone: '+250 788 001 018', seat: 'D1', remarks: '' },
    { id: 41, name: 'TUYISINGIZE SERAPHIN', regNumber: 'L5A2024019', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'tuyisingize.seraphin@mutovutss.edu.rw', phone: '+250 788 001 019', seat: 'D2', remarks: '' },
    { id: 42, name: 'UMUGWANEZA DONATHILE', regNumber: 'L5A2024020', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'umugwaneza.donathile@mutovutss.edu.rw', phone: '+250 788 001 020', seat: 'D3', remarks: '' },
    { id: 43, name: 'UMWERE INEZA DAUDA', regNumber: 'L5A2024021', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'umwere.ineza@mutovutss.edu.rw', phone: '+250 788 001 021', seat: 'D4', remarks: '' },
    { id: 44, name: 'UWAMAHORO SOLANGE', regNumber: 'L5A2024022', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'uwamahoro.solange@mutovutss.edu.rw', phone: '+250 788 001 022', seat: 'D5', remarks: '' },
    { id: 45, name: 'UMUTONI Fillette', regNumber: 'L5A2024023', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'umutoni.fillette@mutovutss.edu.rw', phone: '+250 788 001 023', seat: 'D6', remarks: '' },
  ];

  const initialStudents = [...l5SoftwareDevB, ...l5SoftwareDevA];

  const [students, setStudents] = useState(initialStudents);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('L5 Software Dev. B');
  const [searchTerm, setSearchTerm] = useState('');
  const [showStatistics, setShowStatistics] = useState(true);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState('Morning');
  const [teacherName, setTeacherName] = useState('Mr. Athanase');
  const [subject, setSubject] = useState('Advanced Programming');
  const [autoSave, setAutoSave] = useState(true);
  const [saved, setSaved] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [lateThreshold, setLateThreshold] = useState('08:30');
  const [showAbsentNotification, setShowAbsentNotification] = useState(false);
  const [expandedClasses, setExpandedClasses] = useState(['L5 Software Dev. B', 'L5 Software Dev. A']);
  const tableRef = useRef(null);

  // Time periods
  const periods = ['Morning (07:30-10:30)', 'Afternoon (10:45-13:45)', 'Evening (14:00-17:00)'];

  // Classes - Updated to include both L5 classes prominently
  const classes = [
    'All Classes',
    'L5 Software Dev. B',
    'L5 Software Dev. A',
    'L4 Software Dev. A',
    'L3 Software Dev. B',
    'L6 Software Dev.',
    'L5 Multimedia Production A',
    'L5 Multimedia Production B',
    'L4 Multimedia Production',
    'L3 Multimedia Production',
    'L5 Building Construction',
    'L4 Building Construction',
    'L3 Building Construction',
  ];

  // Subjects - Software Development Focus
  const subjects = [
    'Frontend App DEv. using React.js',
    'Devops Techniques Application',
    'NSql Database',
    'Mobile App Development',
    'Quality Assurence',
    'Blockchain fundamentals',
    'Python Programming',
    'Machine Learning',
  ];

  // Filter students based on search and class
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Mark attendance
  const markAttendance = (id, status) => {
    const now = new Date();
    const timeIn = status ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
    const isLate = status ? checkIfLate(timeIn) : false;
    
    setStudents(students.map(student => 
      student.id === id 
        ? { 
            ...student, 
            present: status, 
            timeIn: timeIn,
            late: isLate,
            remarks: isLate ? 'Late Arrival' : student.remarks
          }
        : student
    ));
  };

  // Check if student is late
  const checkIfLate = (timeIn) => {
    if (!timeIn) return false;
    const [hours, minutes] = lateThreshold.split(':').map(Number);
    const [inputHours, inputMinutes] = timeIn.split(':').map(Number);
    
    const thresholdTime = new Date();
    thresholdTime.setHours(hours, minutes, 0);
    
    const inputTime = new Date();
    inputTime.setHours(inputHours, inputMinutes, 0);
    
    return inputTime > thresholdTime;
  };

  // Update remarks
  const updateRemarks = (id, remarks) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, remarks } : student
    ));
  };

  // Save attendance
  const saveAttendance = () => {
    const todayAttendance = {
      date: attendanceDate,
      period: currentPeriod,
      teacher: teacherName,
      subject: subject,
      class: selectedClass,
      totalStudents: filteredStudents.length,
      present: filteredStudents.filter(s => s.present === true).length,
      absent: filteredStudents.filter(s => s.present === false).length,
      notMarked: filteredStudents.filter(s => s.present === null).length,
      late: filteredStudents.filter(s => s.late === true).length,
      timestamp: new Date().toISOString(),
      students: filteredStudents.map(s => ({
        name: s.name,
        regNumber: s.regNumber,
        class: s.class,
        status: s.present === true ? (s.late ? 'Late' : 'Present') : 
                s.present === false ? 'Absent' : 'Not Marked',
        timeIn: s.timeIn,
        seat: s.seat,
        remarks: s.remarks
      }))
    };

    const existingHistory = JSON.parse(localStorage.getItem('mutovu_tss_attendance')) || [];
    const updatedHistory = [...existingHistory, todayAttendance];
    localStorage.setItem('mutovu_tss_attendance', JSON.stringify(updatedHistory));
    setAttendanceHistory(updatedHistory);
    
    setSaved(true);
    
    const absentCount = filteredStudents.filter(s => s.present === false).length;
    if (absentCount > 0) {
      setShowAbsentNotification(true);
      setTimeout(() => setShowAbsentNotification(false), 5000);
    }
    
    setTimeout(() => setSaved(false), 3000);
  };

  // Calculate statistics for a specific class
  const calculateClassStats = (className) => {
    const classStudents = students.filter(s => s.class === className);
    const total = classStudents.length;
    const present = classStudents.filter(s => s.present === true).length;
    const absent = classStudents.filter(s => s.present === false).length;
    const notMarked = classStudents.filter(s => s.present === null).length;
    const late = classStudents.filter(s => s.late === true).length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent, notMarked, late, percentage };
  };

  // Overall statistics
  const statistics = {
    total: filteredStudents.length,
    present: filteredStudents.filter(s => s.present === true).length,
    absent: filteredStudents.filter(s => s.present === false).length,
    notMarked: filteredStudents.filter(s => s.present === null).length,
    late: filteredStudents.filter(s => s.late === true).length,
    percentage: filteredStudents.length > 0 
      ? Math.round((filteredStudents.filter(s => s.present === true).length / filteredStudents.length) * 100) 
      : 0
  };

  // Mark all present for selected class
  const markAllPresent = () => {
    const timeIn = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStudents(students.map(student => {
      if (selectedClass === 'All Classes' || student.class === selectedClass) {
        return {
          ...student,
          present: true,
          timeIn: timeIn,
          late: checkIfLate(timeIn)
        };
      }
      return student;
    }));
  };

  // Mark all absent for selected class
  const markAllAbsent = () => {
    setStudents(students.map(student => {
      if (selectedClass === 'All Classes' || student.class === selectedClass) {
        return {
          ...student,
          present: false,
          timeIn: null,
          late: false
        };
      }
      return student;
    }));
  };

  // Clear all marks for selected class
  const clearAllMarks = () => {
    setStudents(students.map(student => {
      if (selectedClass === 'All Classes' || student.class === selectedClass) {
        return {
          ...student,
          present: null,
          timeIn: null,
          late: false,
          remarks: ''
        };
      }
      return student;
    }));
  };

  // Toggle class expansion
  const toggleClassExpansion = (className) => {
    setExpandedClasses(prev => 
      prev.includes(className) 
        ? prev.filter(c => c !== className)
        : [...prev, className]
    );
  };

  // Auto-save effect
  useEffect(() => {
    if (autoSave) {
      const timer = setTimeout(() => {
        if (filteredStudents.some(s => s.present !== null)) {
          saveAttendance();
        }
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [students, autoSave]);

  // Load attendance history
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('mutovu_tss_attendance')) || [];
    setAttendanceHistory(savedHistory);
  }, []);

  // Print attendance sheet
  const printAttendance = () => {
    const printContent = `
      <html>
        <head>
          <title>Mutovu TSS - Attendance Sheet</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .header h1 { color: #2d3748; margin: 0; }
            .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }
            .info-box { background: #f7fafc; padding: 10px; border-radius: 5px; border: 1px solid #e2e8f0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #4a5568; color: white; padding: 10px; text-align: left; }
            td { padding: 8px; border: 1px solid #e2e8f0; }
            .present { background: #c6f6d5; }
            .absent { background: #fed7d7; }
            .late { background: #feebc8; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #718096; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Mutovu Technical Secondary School</h1>
            <h2>Attendance Sheet - ${selectedClass}</h2>
            <p>Date: ${attendanceDate} | Period: ${currentPeriod}</p>
          </div>
          
          <div class="info-grid">
            <div class="info-box"><strong>Teacher:</strong> ${teacherName}</div>
            <div class="info-box"><strong>Subject:</strong> ${subject}</div>
            <div class="info-box"><strong>Total Students:</strong> ${filteredStudents.length}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Reg Number</th>
                <th>Seat</th>
                <th>Status</th>
                <th>Time In</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${filteredStudents.map((student, index) => `
                <tr class="${student.present === true ? (student.late ? 'late' : 'present') : student.present === false ? 'absent' : ''}">
                  <td>${index + 1}</td>
                  <td>${student.name}</td>
                  <td>${student.regNumber}</td>
                  <td>${student.seat}</td>
                  <td>${student.present === true ? (student.late ? 'Late' : 'Present') : student.present === false ? 'Absent' : 'Not Marked'}</td>
                  <td>${student.timeIn || '--:--'}</td>
                  <td>${student.remarks || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>Generated on ${new Date().toLocaleString()} | Mutovu TSS Attendance System v2.0</p>
            <p>© ${new Date().getFullYear()} Mutovu Technical Secondary School. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Period', 'Teacher', 'Subject', 'Class', 'Student Name', 'Registration Number', 'Seat', 'Status', 'Time In', 'Late', 'Remarks'],
      ...filteredStudents.map(student => [
        attendanceDate,
        currentPeriod,
        teacherName,
        subject,
        student.class,
        student.name,
        student.regNumber,
        student.seat,
        student.present === true ? (student.late ? 'Late' : 'Present') : student.present === false ? 'Absent' : 'Not Marked',
        student.timeIn || 'N/A',
        student.late ? 'Yes' : 'No',
        student.remarks
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mutovu_attendance_${attendanceDate}_${currentPeriod.replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Get attendance streak for a student
  const getAttendanceStreak = (regNumber) => {
    const studentRecords = attendanceHistory.filter(record => 
      record.students.some(s => s.regNumber === regNumber && s.status === 'Present')
    );
    return studentRecords.length;
  };

  // Get today's date in readable format
  const getTodayDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Student detail modal
  const StudentDetailModal = ({ student, onClose }) => {
    if (!student) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
                <p className="text-gray-600">{student.regNumber}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GiGraduateCap className="text-blue-500 text-xl" />
                <div>
                  <div className="text-sm text-gray-500">Class</div>
                  <div className="font-medium">{student.class}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MdLocationOn className="text-green-500 text-xl" />
                <div>
                  <div className="text-sm text-gray-500">Seat Number</div>
                  <div className="font-medium">{student.seat}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MdEmail className="text-purple-500 text-xl" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{student.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MdPhone className="text-red-500 text-xl" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{student.phone}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Attendance Streak</div>
                  <div className="font-bold text-blue-600">{getAttendanceStreak(student.regNumber)} days</div>
                </div>
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                <textarea
                  value={student.remarks}
                  onChange={(e) => updateRemarks(student.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Add any remarks about this student..."
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => markAttendance(student.id, true)}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  student.present === true 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                <FaUserCheck />
                Mark Present
              </button>
              <button
                onClick={() => markAttendance(student.id, false)}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  student.present === false 
                    ? 'bg-red-600 text-white' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                <FaUserTimes />
                Mark Absent
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Class overview cards
  const ClassOverview = ({ className, stats }) => (
    <div className={`bg-gradient-to-r ${className === 'L5 Software Dev. A' ? 'from-purple-50 to-purple-100 border-purple-300' : 'from-blue-50 to-blue-100 border-blue-300'} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{className}</h3>
          <p className="text-gray-600">{stats.total} Students</p>
        </div>
        <button
          onClick={() => toggleClassExpansion(className)}
          className="p-2 hover:bg-white/50 rounded-lg"
        >
          {expandedClasses.includes(className) ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          <div className="text-xs text-gray-500">Present</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          <div className="text-xs text-gray-500">Absent</div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${stats.percentage}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-600 text-center">{stats.percentage}% Attendance</div>
      
      {expandedClasses.includes(className) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setSelectedClass(className)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View {className} Students
          </button>
        </div>
      )}
    </div>
  );

  // Get class stats for overview
  const l5BStats = calculateClassStats('L5 Software Dev. B');
  const l5AStats = calculateClassStats('L5 Software Dev. A');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Absent Notification */}
        {showAbsentNotification && (
          <div className="mb-6 bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <FaBell className="text-2xl" />
              <div>
                <div className="font-bold">Attendance Alert!</div>
                <div className="text-sm opacity-90">{statistics.absent} student(s) marked absent. Consider notifying parents.</div>
              </div>
            </div>
            <button onClick={() => setShowAbsentNotification(false)} className="text-white hover:text-gray-200">
              ×
            </button>
          </div>
        )}
        
        {/* Saved Notification */}
        {saved && (
          <div className="mb-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaSync className="animate-spin" />
              <div>
                <div className="font-bold">Attendance Saved!</div>
                <div className="text-sm opacity-90">Data has been saved to local storage.</div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                  <FaCode className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Software Development Attendance System
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaLaptop className="text-blue-500" />
                    Mutovu Technical Secondary School • {getTodayDate()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Real-time</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>

          {/* Class Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ClassOverview className="L5 Software Dev. B" stats={l5BStats} />
            <ClassOverview className="L5 Software Dev. A" stats={l5AStats} />
          </div>

          {/* Class Info Card */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedClass}</h2>
                <p className="text-blue-100">Advanced Programming Track • {selectedClass === 'All Classes' ? students.length : students.filter(s => s.class === selectedClass).length} Students • {selectedClass.includes('A') ? 'Room: Lab 2' : 'Room: Lab 3'}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-blue-200" />
                    <span>Total: {statistics.total} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GiTeacher className="text-blue-200" />
                    <span>Class Teacher: {teacherName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCode className="text-blue-200" />
                    <span>Specialization: Full-Stack Development</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-3xl font-bold">{statistics.percentage}%</div>
                <div className="text-sm text-blue-200">Today's Attendance Rate</div>
              </div>
            </div>
          </div>

          {/* Statistics Panel */}
          {showStatistics && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaChartBar className="text-blue-500" />
                  Live Attendance Dashboard
                </h2>
                <button
                  onClick={() => setShowStatistics(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-green-700">{statistics.present}</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <FaUserCheck />
                    Present
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-red-700">{statistics.absent}</div>
                  <div className="text-sm text-red-600 flex items-center gap-1">
                    <FaUserTimes />
                    Absent
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-yellow-700">{statistics.late}</div>
                  <div className="text-sm text-yellow-600">Late Arrivals</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-blue-700">{statistics.notMarked}</div>
                  <div className="text-sm text-blue-600">Not Marked</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold text-purple-700 flex items-center gap-1">
                    <TbPercentage />
                    {statistics.percentage}%
                  </div>
                  <div className="text-sm text-purple-600">Attendance Rate</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Attendance Progress</span>
                  <span>{statistics.present}/{statistics.total} students</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${statistics.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Control Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2 text-blue-500" />
                  Date
                </label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <IoMdTime className="inline mr-2 text-purple-500" />
                  Class Period
                </label>
                <select
                  value={currentPeriod}
                  onChange={(e) => setCurrentPeriod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {periods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GiTeacher className="inline mr-2 text-green-500" />
                  Instructor
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter teacher name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCode className="inline mr-2 text-red-500" />
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {subjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaSearch className="inline mr-2 text-gray-500" />
                  Search Student
                </label>
                <input
                  type="text"
                  placeholder="Search by name, registration, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaFilter className="inline mr-2 text-gray-500" />
                  Filter by Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Late Threshold
                  </label>
                  <input
                    type="time"
                    value={lateThreshold}
                    onChange={(e) => setLateThreshold(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={saveAttendance}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <FaSync className={saved ? 'animate-spin' : ''} />
                {saved ? 'Saved!' : 'Save Attendance'}
              </button>
              
              <button
                onClick={markAllPresent}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition flex items-center gap-2"
              >
                <FaUserCheck />
                Mark All Present
              </button>
              
              <button
                onClick={markAllAbsent}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition flex items-center gap-2"
              >
                <FaUserTimes />
                Mark All Absent
              </button>
              
              <button
                onClick={clearAllMarks}
                className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition flex items-center gap-2"
              >
                Clear All
              </button>
              
              <button
                onClick={printAttendance}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition flex items-center gap-2"
              >
                <FaPrint />
                Print Sheet
              </button>
              
              <button
                onClick={exportToCSV}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition flex items-center gap-2"
              >
                <FaDownload />
                Export CSV
              </button>
              
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setShowStatistics(!showStatistics)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                >
                  <FaChartBar />
                  {showStatistics ? 'Hide Stats' : 'Show Stats'}
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                >
                  <FaHistory />
                  Refresh
                </button>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="autoSave"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="autoSave" className="text-sm text-gray-600">
                    Auto-save
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table (List View) */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200" ref={tableRef}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reg Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Seat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Time In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Remarks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <tr 
                      key={student.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setShowStudentDetails(student)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            student.class === 'L5 Software Dev. A' 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          }`}>
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{student.regNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          student.class === 'L5 Software Dev. A' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {student.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {student.seat}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          student.present === true 
                            ? student.late 
                              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                              : 'bg-green-100 text-green-800 border border-green-200'
                            : student.present === false 
                              ? 'bg-red-100 text-red-800 border border-red-200' 
                              : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {student.present === true 
                            ? student.late ? 'Late' : 'Present' 
                            : student.present === false ? 'Absent' : 'Not Marked'
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {student.timeIn || '--:--'}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={student.remarks}
                          onChange={(e) => updateRemarks(student.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Add remarks..."
                          className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => markAttendance(student.id, true)}
                            className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
                              student.present === true 
                                ? 'bg-green-100 text-green-700 border border-green-300' 
                                : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            <FaUserCheck />
                            Present
                          </button>
                          <button
                            onClick={() => markAttendance(student.id, false)}
                            className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
                              student.present === false 
                                ? 'bg-red-100 text-red-700 border border-red-300' 
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <FaUserTimes />
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredStudents.map((student) => (
              <div 
                key={student.id}
                onClick={() => setShowStudentDetails(student)}
                className={`bg-white rounded-xl shadow-md border-2 hover:shadow-lg transition-all cursor-pointer ${
                  student.present === true 
                    ? student.late 
                      ? 'border-yellow-300 hover:border-yellow-400' 
                      : 'border-green-300 hover:border-green-400'
                    : student.present === false 
                      ? 'border-red-300 hover:border-red-400' 
                      : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-lg font-bold text-gray-800 truncate">{student.name}</div>
                      <div className="text-sm text-gray-500 font-mono">{student.regNumber}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        student.class === 'L5 Software Dev. A' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {student.class.split(' ').pop()}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        student.present === true 
                          ? student.late ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          : student.present === false ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.present === true 
                          ? student.late ? 'Late' : 'Present' 
                          : student.present === false ? 'Absent' : 'Not Marked'
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MdEmail className="text-gray-400" />
                      <span className="truncate">{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MdPhone className="text-gray-400" />
                      <span>{student.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MdLocationOn className="text-gray-400" />
                      <span>Seat: {student.seat}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Time: {student.timeIn || '--:--'}
                    </div>
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => markAttendance(student.id, true)}
                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                      >
                        <FaUserCheck />
                      </button>
                      <button
                        onClick={() => markAttendance(student.id, false)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <FaUserTimes />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaClipboardCheck className="text-blue-500" />
            Session Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                Date & Period
              </div>
              <div className="font-semibold text-gray-800">{attendanceDate} • {currentPeriod}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <GiTeacher className="text-green-500" />
                Instructor & Subject
              </div>
              <div className="font-semibold text-gray-800">{teacherName} • {subject}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <FaUsers className="text-purple-500" />
                Class & Attendance
              </div>
              <div className="font-semibold text-gray-800">
                {selectedClass} • {statistics.present}/{statistics.total} present ({statistics.percentage}%)
              </div>
            </div>
          </div>
        </div>

        {/* Recent Attendance History */}
        {attendanceHistory.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaHistory className="text-blue-500" />
              Recent Attendance History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {attendanceHistory.slice(-6).reverse().map((record, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-gray-800">{record.date}</div>
                      <div className="text-sm text-gray-600">{record.period} • {record.subject}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.present / record.totalStudents >= 0.8 
                        ? 'bg-green-100 text-green-800' 
                        : record.present / record.totalStudents >= 0.6
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {Math.round((record.present / record.totalStudents) * 100)}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">Class: {record.class}</div>
                  <div className="flex justify-between text-sm">
                    <div className="text-green-600">
                      <FaUserCheck className="inline mr-1" />
                      {record.present} present
                    </div>
                    <div className="text-red-600">
                      <FaUserTimes className="inline mr-1" />
                      {record.absent} absent
                    </div>
                  </div>
                  {record.late > 0 && (
                    <div className="mt-2 text-xs text-yellow-600">
                      {record.late} late arrival(s)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h4 className="text-lg font-bold mb-2">Mutovu TSS Attendance System</h4>
              <p className="text-gray-300 text-sm">Version 2.0 • Software Development Department</p>
              <p className="text-gray-400 text-xs mt-2">
                Managing: L5 Software Dev. A (23 students) • L5 Software Dev. B (22 students)
              </p>
              <p className="text-gray-400 text-xs mt-2">© {new Date().getFullYear()} Mutovu Technical Secondary School. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{students.length}</div>
                <div className="text-xs text-gray-300">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{statistics.present}</div>
                <div className="text-xs text-gray-300">Present Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{attendanceHistory.length}</div>
                <div className="text-xs text-gray-300">Records</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal 
        student={showStudentDetails} 
        onClose={() => setShowStudentDetails(null)} 
      />

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            background: white !important;
          }
          
          .print-table {
            font-size: 12px;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 20px;
          }
        }
        
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Attendance;