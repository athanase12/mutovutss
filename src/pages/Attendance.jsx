import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  FaUserCheck, FaUserTimes, FaCalendarAlt, FaPrint, FaDownload, 
  FaSearch, FaFilter, FaChartBar, FaSync, FaClipboardCheck, 
  FaCode, FaUsers, FaLaptop, FaBell, FaHistory, FaChevronDown, FaChevronUp,
  FaBars, FaTimes, FaUser, FaMobileAlt, FaTable, FaTh, FaCog,
  FaTrash, FaCheck, FaArrowLeft, FaArrowRight, FaUndo, FaRedo,
  FaCommentAlt, FaExclamationTriangle, FaEye, FaEyeSlash,
  FaSort, FaSortUp, FaSortDown, FaQrcode, FaShareAlt, FaCaretRight,
  FaRegClock, FaRegCalendarCheck, FaTachometerAlt, FaInfoCircle,
  FaVolumeUp, FaVolumeMute, FaPalette, FaExpand, FaCompress,
  FaUserPlus, FaFileExport, FaDatabase, FaMemory, FaMousePointer
} from 'react-icons/fa';
import { IoMdTime, IoMdSettings, IoMdNotifications } from 'react-icons/io';
import { GiTeacher, GiGraduateCap, GiSeatedMouse } from 'react-icons/gi';
import { TbPercentage, TbRefresh } from 'react-icons/tb';
import { MdEmail, MdPhone, MdLocationOn, MdTouchApp, MdDragIndicator } from 'react-icons/md';
import { BiNetworkChart, BiScan } from 'react-icons/bi';

const Attendance = () => {
  // L5 Software Dev. B Students
  const l5SoftwareDevB = [
    { id: 1, name: 'AKIMANA LAMBERT', regNumber: 'L5B2024001', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'akimana.lambert@mutovutss.edu.rw', phone: '+250 788 000 001', seat: 'A1', remarks: '', avatarColor: 'from-blue-500 to-cyan-500' },
    { id: 2, name: 'CYUZUZO Florentine', regNumber: 'L5B2024002', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'cyuzuflorentine@mutovutss.edu.rw', phone: '+250 788 000 002', seat: 'A2', remarks: '', avatarColor: 'from-purple-500 to-pink-500' },
    { id: 3, name: 'DUSHIMIMANA CLAUDE', regNumber: 'L5B2024003', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'dushimiclaude@mutovutss.edu.rw', phone: '+250 788 000 003', seat: 'A3', remarks: '', avatarColor: 'from-green-500 to-emerald-500' },
    { id: 4, name: 'IGIRANEZA EL-GIBBOR', regNumber: 'L5B2024004', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'igiraneza.el@mutovutss.edu.rw', phone: '+250 788 000 004', seat: 'A4', remarks: '', avatarColor: 'from-red-500 to-orange-500' },
    { id: 5, name: 'INGABIRE CARINE', regNumber: 'L5B2024005', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'ingabire.carine@mutovutss.edu.rw', phone: '+250 788 000 005', seat: 'A5', remarks: '', avatarColor: 'from-yellow-500 to-amber-500' },
    { id: 6, name: 'IRADUKUNDA DIANE', regNumber: 'L5B2024006', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'iradukunda.diane@mutovutss.edu.rw', phone: '+250 788 000 006', seat: 'A6', remarks: '', avatarColor: 'from-indigo-500 to-blue-500' },
    { id: 7, name: 'ISHIMWE OLIVE', regNumber: 'L5B2024007', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'ishimwe.olive@mutovutss.edu.rw', phone: '+250 788 000 007', seat: 'B1', remarks: '', avatarColor: 'from-pink-500 to-rose-500' },
    { id: 8, name: 'MUCYO SAMUEL', regNumber: 'L5B2024008', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'mucyo.samuel@mutovutss.edu.rw', phone: '+250 788 000 008', seat: 'B2', remarks: '', avatarColor: 'from-teal-500 to-cyan-500' },
    { id: 9, name: 'MURAGIJIMANA CEDRIC', regNumber: 'L5B2024009', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'muragijimana.cedric@mutovutss.edu.rw', phone: '+250 788 000 009', seat: 'B3', remarks: '', avatarColor: 'from-blue-500 to-indigo-500' },
    { id: 10, name: 'MURERESHEJEMANA CHARLOTTE', regNumber: 'L5B2024010', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'murereshejemana.charlotte@mutovutss.edu.rw', phone: '+250 788 000 010', seat: 'B4', remarks: '', avatarColor: 'from-purple-500 to-violet-500' },
    { id: 11, name: 'NDAYAMBAJE DIDIER', regNumber: 'L5B2024011', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'ndayambaje.didier@mutovutss.edu.rw', phone: '+250 788 000 011', seat: 'B5', remarks: '', avatarColor: 'from-green-500 to-lime-500' },
    { id: 12, name: 'NIYOMUHOZA DENYSE', regNumber: 'L5B2024012', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'niyomuhoza.denyse@mutovutss.edu.rw', phone: '+250 788 000 012', seat: 'B6', remarks: '', avatarColor: 'from-red-500 to-pink-500' },
    { id: 13, name: 'NSHIMIYIMANA ERASME', regNumber: 'L5B2024013', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'nshimiyimana.erasme@mutovutss.edu.rw', phone: '+250 788 000 013', seat: 'C1', remarks: '', avatarColor: 'from-yellow-500 to-orange-500' },
    { id: 14, name: 'NTAKIRUTIMANA JEAN DE DIEU', regNumber: 'L5B2024014', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'ntakirutimana.jean@mutovutss.edu.rw', phone: '+250 788 000 014', seat: 'C2', remarks: '', avatarColor: 'from-indigo-500 to-purple-500' },
    { id: 15, name: 'NYIRANDIKUMANA GAUDENCE', regNumber: 'L5B2024015', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'nyirandikumana.gaudence@mutovutss.edu.rw', phone: '+250 788 000 015', seat: 'C3', remarks: '', avatarColor: 'from-pink-500 to-fuchsia-500' },
    { id: 16, name: 'NZABAMWITA Francois Xavier', regNumber: 'L5B2024016', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'nzabamwita.francois@mutovutss.edu.rw', phone: '+250 788 000 016', seat: 'C4', remarks: '', avatarColor: 'from-teal-500 to-emerald-500' },
    { id: 17, name: 'TUYIZERE DENYSE', regNumber: 'L5B2024017', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'tuyizere.denyse@mutovutss.edu.rw', phone: '+250 788 000 017', seat: 'C5', remarks: '', avatarColor: 'from-blue-500 to-cyan-500' },
    { id: 18, name: 'UHIRIWE ZENOBIE', regNumber: 'L5B2024018', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'uhiriwe.zenobie@mutovutss.edu.rw', phone: '+250 788 000 018', seat: 'D1', remarks: '', avatarColor: 'from-purple-500 to-pink-500' },
    { id: 19, name: 'UMUTONI CLAUDINE', regNumber: 'L5B2024019', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'umutoni.claudine@mutovutss.edu.rw', phone: '+250 788 000 019', seat: 'D2', remarks: '', avatarColor: 'from-green-500 to-emerald-500' },
    { id: 20, name: 'UWIMBABAZI DIANE', regNumber: 'L5B2024020', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'uwimbabazi.diane@mutovutss.edu.rw', phone: '+250 788 000 020', seat: 'D3', remarks: '', avatarColor: 'from-red-500 to-orange-500' },
    { id: 21, name: 'UWINGABIRE DIANE', regNumber: 'L5B2024021', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'uwingabire.diane@mutovutss.edu.rw', phone: '+250 788 000 021', seat: 'D4', remarks: '', avatarColor: 'from-yellow-500 to-amber-500' },
    { id: 22, name: 'UWIRINGIRWA FROLENCE', regNumber: 'L5B2024022', class: 'L5 Software Dev. B', present: null, timeIn: null, email: 'uwiringirwa.frolence@mutovutss.edu.rw', phone: '+250 788 000 022', seat: 'D5', remarks: '', avatarColor: 'from-indigo-500 to-blue-500' },
  ];

  // L5 Software Dev. A Students
  const l5SoftwareDevA = [
    { id: 23, name: 'BYUSA Gilbert', regNumber: 'L5A2024001', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'byusa.gilbert@mutovutss.edu.rw', phone: '+250 788 001 001', seat: 'A1', remarks: '', avatarColor: 'from-blue-500 to-cyan-500' },
    { id: 24, name: 'DUFITUMUKIZA IBRAHIM', regNumber: 'L5A2024002', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'dufitumukiza.ibrahim@mutovutss.edu.rw', phone: '+250 788 001 002', seat: 'A2', remarks: '', avatarColor: 'from-purple-500 to-pink-500' },
    { id: 25, name: 'HAGENIMANA CLAUDE', regNumber: 'L5A2024003', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'hagenimana.claude@mutovutss.edu.rw', phone: '+250 788 001 003', seat: 'A3', remarks: '', avatarColor: 'from-green-500 to-emerald-500' },
    { id: 26, name: 'IGIRANEZA CLEMENTINE', regNumber: 'L5A2024004', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'igiraneza.clementine@mutovutss.edu.rw', phone: '+250 788 001 004', seat: 'A4', remarks: '', avatarColor: 'from-red-500 to-orange-500' },
    { id: 27, name: 'IGISUBIZO KEZA Belyse', regNumber: 'L5A2024005', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'igisubizo.keza@mutovutss.edu.rw', phone: '+250 788 001 005', seat: 'A5', remarks: '', avatarColor: 'from-yellow-500 to-amber-500' },
    { id: 28, name: 'ITUZE AIME Rene', regNumber: 'L5A2024006', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'ituze.aime@mutovutss.edu.rw', phone: '+250 788 001 006', seat: 'A6', remarks: '', avatarColor: 'from-indigo-500 to-blue-500' },
    { id: 29, name: 'IYADUHUJE ASAFI', regNumber: 'L5A2024007', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'iyaduhuje.asafi@mutovutss.edu.rw', phone: '+250 788 001 007', seat: 'B1', remarks: '', avatarColor: 'from-pink-500 to-rose-500' },
    { id: 30, name: 'MASENGESHO ODINE', regNumber: 'L5A2024008', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'masengesho.odine@mutovutss.edu.rw', phone: '+250 788 001 008', seat: 'B2', remarks: '', avatarColor: 'from-teal-500 to-cyan-500' },
    { id: 31, name: 'MUHUBIRI NESTA', regNumber: 'L5A2024009', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'muhubiri.nesta@mutovutss.edu.rw', phone: '+250 788 001 009', seat: 'B3', remarks: '', avatarColor: 'from-blue-500 to-indigo-500' },
    { id: 32, name: 'MUKAHIRWA ALINE', regNumber: 'L5A2024010', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'mukahirwa.aline@mutovutss.edu.rw', phone: '+250 788 001 010', seat: 'B4', remarks: '', avatarColor: 'from-purple-500 to-violet-500' },
    { id: 33, name: 'MUKAMURIGO JOSIANE', regNumber: 'L5A2024011', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'mukamurigo.josiane@mutovutss.edu.rw', phone: '+250 788 001 011', seat: 'B5', remarks: '', avatarColor: 'from-green-500 to-lime-500' },
    { id: 34, name: 'NIKUZE SOLANGE', regNumber: 'L5A2024012', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'nikuze.solange@mutovutss.edu.rw', phone: '+250 788 001 012', seat: 'B6', remarks: '', avatarColor: 'from-red-500 to-pink-500' },
    { id: 35, name: 'NIYIGENA FAUSTINE', regNumber: 'L5A2024013', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'niyigena.faustine@mutovutss.edu.rw', phone: '+250 788 001 013', seat: 'C1', remarks: '', avatarColor: 'from-yellow-500 to-orange-500' },
    { id: 36, name: 'NIYOMUGABO MOISE', regNumber: 'L5A2024014', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'niyomugabo.moise@mutovutss.edu.rw', phone: '+250 788 001 014', seat: 'C2', remarks: '', avatarColor: 'from-indigo-500 to-purple-500' },
    { id: 37, name: 'NSHIMIYIMANA EGIDE', regNumber: 'L5A2024015', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'nshimiyimana.egide@mutovutss.edu.rw', phone: '+250 788 001 015', seat: 'C3', remarks: '', avatarColor: 'from-pink-500 to-fuchsia-500' },
    { id: 38, name: 'NYIRAKAMANA MARIE ROSE', regNumber: 'L5A2024016', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'nyirakamana.marie@mutovutss.edu.rw', phone: '+250 788 001 016', seat: 'C4', remarks: '', avatarColor: 'from-teal-500 to-emerald-500' },
    { id: 39, name: 'SHUMBUSHA Emmanuel', regNumber: 'L5A2024017', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'shumbusha.emmanuel@mutovutss.edu.rw', phone: '+250 788 001 017', seat: 'C5', remarks: '', avatarColor: 'from-blue-500 to-cyan-500' },
    { id: 40, name: 'TUYISHIME REBECCAH', regNumber: 'L5A2024018', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'tuyishime.rebeccah@mutovutss.edu.rw', phone: '+250 788 001 018', seat: 'D1', remarks: '', avatarColor: 'from-purple-500 to-pink-500' },
    { id: 41, name: 'TUYISINGIZE SERAPHIN', regNumber: 'L5A2024019', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'tuyisingize.seraphin@mutovutss.edu.rw', phone: '+250 788 001 019', seat: 'D2', remarks: '', avatarColor: 'from-green-500 to-emerald-500' },
    { id: 42, name: 'UMUGWANEZA DONATHILE', regNumber: 'L5A2024020', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'umugwaneza.donathile@mutovutss.edu.rw', phone: '+250 788 001 020', seat: 'D3', remarks: '', avatarColor: 'from-red-500 to-orange-500' },
    { id: 43, name: 'UMWERE INEZA DAUDA', regNumber: 'L5A2024021', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'umwere.ineza@mutovutss.edu.rw', phone: '+250 788 001 021', seat: 'D4', remarks: '', avatarColor: 'from-yellow-500 to-amber-500' },
    { id: 44, name: 'UWAMAHORO SOLANGE', regNumber: 'L5A2024022', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'uwamahoro.solange@mutovutss.edu.rw', phone: '+250 788 001 022', seat: 'D5', remarks: '', avatarColor: 'from-indigo-500 to-blue-500' },
    { id: 45, name: 'UMUTONI Fillette', regNumber: 'L5A2024023', class: 'L5 Software Dev. A', present: null, timeIn: null, email: 'umutoni.fillette@mutovutss.edu.rw', phone: '+250 788 001 023', seat: 'D6', remarks: '', avatarColor: 'from-pink-500 to-rose-500' },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('attendance');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [showTutorial, setShowTutorial] = useState(false);
  const [showScanQR, setShowScanQR] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [dragEnabled, setDragEnabled] = useState(false);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [showQuickStats, setShowQuickStats] = useState(true);
  const [scanMode, setScanMode] = useState(false);
  const [scannedStudent, setScannedStudent] = useState(null);
  const [voiceCommands, setVoiceCommands] = useState(false);
  const [gestureControls, setGestureControls] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [batchMode, setBatchMode] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAttendanceChart, setShowAttendanceChart] = useState(false);
  const [showRealTimeClock, setShowRealTimeClock] = useState(true);
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(false);

  const tableRef = useRef(null);
  const searchInputRef = useRef(null);
  const saveButtonRef = useRef(null);
  const audioRef = useRef(null);

  // Time periods
  const periods = ['Morning (07:30-10:30)', 'Afternoon (10:45-13:45)', 'Evening (14:00-17:00)'];

  // Classes
  const classes = [
    'All Classes',
    'L5 Software Dev. B',
    'L5 Software Dev. A',
    'L4 Software Dev. A',
    'L3 Software Dev. B',
    'L6 Software Dev.',
    'L5 Multimedia Production A',
    'L5 Multimedia Production B',
  ];

  // Subjects
  const subjectsList = [
    'Frontend App Dev. using React.js',
    'Devops Techniques Application',
    'NSql Database',
    'Mobile App Development',
    'Quality Assurance',
    'Blockchain fundamentals',
    'Python Programming',
    'Machine Learning',
  ];

  // Memoized filtered students with sorting
  const filteredStudents = useMemo(() => {
    let result = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
      return matchesSearch && matchesClass;
    });

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'name') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        } else if (sortConfig.key === 'present') {
          aValue = aValue === true ? 1 : aValue === false ? 0 : -1;
          bValue = bValue === true ? 1 : bValue === false ? 0 : -1;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [students, searchTerm, selectedClass, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sort function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  };

  // Enhanced mark attendance with sound and haptic feedback
  const markAttendance = useCallback((id, status) => {
    const now = new Date();
    const timeIn = status ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
    const isLate = status ? checkIfLate(timeIn) : false;
    
    // Save to undo stack
    const currentState = [...students];
    setUndoStack(prev => [...prev, currentState]);
    setRedoStack([]);

    // Play sound if enabled
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }

    // Haptic feedback for mobile
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }

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

    // If in batch mode, add to selection
    if (batchMode) {
      setSelectedStudents(prev => {
        const newSet = new Set(prev);
        if (status !== null) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
        return newSet;
      });
    }
  }, [students, soundEnabled, hapticFeedback, batchMode]);

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

  // Enhanced save attendance with animation
  const saveAttendance = useCallback(() => {
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
    
    // Add save animation
    if (saveButtonRef.current) {
      saveButtonRef.current.classList.add('animate-pulse');
      setTimeout(() => {
        if (saveButtonRef.current) {
          saveButtonRef.current.classList.remove('animate-pulse');
        }
      }, 1000);
    }

    setTimeout(() => setSaved(false), 3000);
  }, [filteredStudents, attendanceDate, currentPeriod, teacherName, subject, selectedClass]);

  // Calculate statistics
  const statistics = useMemo(() => ({
    total: filteredStudents.length,
    present: filteredStudents.filter(s => s.present === true).length,
    absent: filteredStudents.filter(s => s.present === false).length,
    notMarked: filteredStudents.filter(s => s.present === null).length,
    late: filteredStudents.filter(s => s.late === true).length,
    percentage: filteredStudents.length > 0 
      ? Math.round((filteredStudents.filter(s => s.present === true).length / filteredStudents.length) * 100) 
      : 0
  }), [filteredStudents]);

  // Mark all present with progress animation
  const markAllPresent = () => {
    const timeIn = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Save to undo stack
    const currentState = [...students];
    setUndoStack(prev => [...prev, currentState]);
    setRedoStack([]);

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

  // Mark all absent
  const markAllAbsent = () => {
    // Save to undo stack
    const currentState = [...students];
    setUndoStack(prev => [...prev, currentState]);
    setRedoStack([]);

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

  // Clear all marks
  const clearAllMarks = () => {
    // Save to undo stack
    const currentState = [...students];
    setUndoStack(prev => [...prev, currentState]);
    setRedoStack([]);

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

  // Undo function
  const undo = () => {
    if (undoStack.length === 0) return;
    
    const previousState = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, students]);
    setStudents(previousState);
  };

  // Redo function
  const redo = () => {
    if (redoStack.length === 0) return;
    
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    setUndoStack(prev => [...prev, students]);
    setStudents(nextState);
  };

  // Toggle class expansion
  const toggleClassExpansion = (className) => {
    setExpandedClasses(prev => 
      prev.includes(className) 
        ? prev.filter(c => c !== className)
        : [...prev, className]
    );
  };

  // Calculate class stats
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

  // Get today's date
  const getTodayDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Get attendance streak
  const getAttendanceStreak = (regNumber) => {
    const studentRecords = attendanceHistory.filter(record => 
      record.students.some(s => s.regNumber === regNumber && s.status === 'Present')
    );
    return studentRecords.length;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Save (Ctrl + S)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveAttendance();
      }
      // Search (Ctrl + F)
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Undo (Ctrl + Z)
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo (Ctrl + Y or Ctrl + Shift + Z)
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
        e.preventDefault();
        redo();
      }
      // Mark all present (Alt + P)
      if (e.altKey && e.key === 'p') {
        e.preventDefault();
        markAllPresent();
      }
      // Mark all absent (Alt + A)
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        markAllAbsent();
      }
      // Toggle batch mode (Ctrl + B)
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        setBatchMode(!batchMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveAttendance, undo, redo, batchMode]);

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
  }, [students, autoSave, saveAttendance]);

  // Load attendance history
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('mutovu_tss_attendance')) || [];
    setAttendanceHistory(savedHistory);
  }, []);

  // Responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('grid');
        setItemsPerPage(10);
      } else if (window.innerWidth < 1024) {
        setViewMode('list');
        setItemsPerPage(15);
      } else {
        setViewMode('list');
        setItemsPerPage(20);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Student Detail Modal
  const StudentDetailModal = ({ student, onClose }) => {
    if (!student) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-fadeIn">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
                <p className="text-gray-600">{student.regNumber}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl transition-transform hover:rotate-90"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <GiGraduateCap className="text-blue-500 text-xl" />
                <div>
                  <div className="text-sm text-gray-500">Class</div>
                  <div className="font-medium">{student.class}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <MdLocationOn className="text-green-500 text-xl" />
                <div>
                  <div className="text-sm text-gray-500">Seat Number</div>
                  <div className="font-medium">{student.seat}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <MdEmail className="text-purple-500 text-xl" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{student.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                <MdPhone className="text-red-500 text-xl" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{student.phone}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Attendance Streak</div>
                  <div className="font-bold text-blue-600 animate-bounce">{getAttendanceStreak(student.regNumber)} days</div>
                </div>
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCommentAlt className="inline mr-2" />
                  Remarks
                </label>
                <textarea
                  value={student.remarks}
                  onChange={(e) => updateRemarks(student.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  rows="3"
                  placeholder="Add any remarks about this student..."
                />
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  markAttendance(student.id, true);
                  onClose();
                }}
                className={`flex-1 px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 ${
                  student.present === true 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                    : 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 hover:from-green-200 hover:to-green-100'
                }`}
              >
                <FaUserCheck />
                Mark Present
              </button>
              <button
                onClick={() => {
                  markAttendance(student.id, false);
                  onClose();
                }}
                className={`flex-1 px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 ${
                  student.present === false 
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg' 
                    : 'bg-gradient-to-r from-red-100 to-red-50 text-red-700 hover:from-red-200 hover:to-red-100'
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

  // Class Overview Component
  const ClassOverview = ({ className, stats }) => (
    <div className={`bg-gradient-to-r ${className === 'L5 Software Dev. A' ? 'from-purple-50 to-purple-100 border-purple-300' : 'from-blue-50 to-blue-100 border-blue-300'} border rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">{className}</h3>
          <p className="text-gray-600 text-sm">{stats.total} Students</p>
        </div>
        <button
          onClick={() => toggleClassExpansion(className)}
          className="p-2 hover:bg-white/50 rounded-lg transition-transform hover:rotate-180"
        >
          {expandedClasses.includes(className) ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-white/50 rounded-lg">
          <div className="text-xl md:text-2xl font-bold text-green-600">{stats.present}</div>
          <div className="text-xs text-gray-500">Present</div>
        </div>
        <div className="text-center p-3 bg-white/50 rounded-lg">
          <div className="text-xl md:text-2xl font-bold text-red-600">{stats.absent}</div>
          <div className="text-xs text-gray-500">Absent</div>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${stats.percentage}%` }}
          >
            <div className="h-2 rounded-full bg-white/30 animate-pulse"></div>
          </div>
        </div>
        <div className="text-sm text-gray-600 text-center font-medium">
          {stats.percentage}% Attendance
        </div>
      </div>
      
      {expandedClasses.includes(className) && (
        <div className="mt-4 pt-4 border-t border-gray-300/50 animate-fadeIn">
          <button
            onClick={() => setSelectedClass(className)}
            className="w-full px-4 py-3 bg-gradient-to-r from-white to-gray-50 border border-gray-300 rounded-xl hover:from-gray-50 hover:to-gray-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg"
          >
            View {className.split(' ').pop()} Students
          </button>
        </div>
      )}
    </div>
  );

  // Interactive Tutorial Component
  const TutorialModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to Attendance System!</h2>
            <button onClick={() => setShowTutorial(false)} className="text-gray-400 hover:text-gray-600">
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-blue-600">Quick Start Guide</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <FaUserCheck className="text-green-500 mt-1" />
                  <span>Click student cards to mark attendance</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaSearch className="text-blue-500 mt-1" />
                  <span>Use search to find students quickly</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaChartBar className="text-purple-500 mt-1" />
                  <span>View live statistics in dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaSync className="text-green-600 mt-1" />
                  <span>Auto-save keeps your data safe</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-purple-600">Keyboard Shortcuts</h3>
              <ul className="space-y-2">
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + S</kbd> Save</li>
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + F</kbd> Search</li>
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + Z</kbd> Undo</li>
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + Y</kbd> Redo</li>
                <li><kbd className="bg-gray-100 px-2 py-1 rounded">Alt + P</kbd> Mark All Present</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowTutorial(false)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Got it, let's start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Real-time Clock Component
  const RealTimeClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="text-sm opacity-80 mb-1">Current Time</div>
          <div className="text-2xl font-bold font-mono">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-xs opacity-60 mt-1">
            {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    );
  };

  // Quick Actions Panel
  const QuickActions = () => (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 shadow-lg">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <MdTouchApp className="text-indigo-600" />
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={markAllPresent}
          className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
        >
          <FaUserCheck className="text-xl mb-1" />
          <span className="text-xs">All Present</span>
        </button>
        <button
          onClick={markAllAbsent}
          className="p-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
        >
          <FaUserTimes className="text-xl mb-1" />
          <span className="text-xs">All Absent</span>
        </button>
        <button
          onClick={saveAttendance}
          ref={saveButtonRef}
          className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
        >
          <FaSync className={`text-xl mb-1 ${saved ? 'animate-spin' : ''}`} />
          <span className="text-xs">{saved ? 'Saved!' : 'Save'}</span>
        </button>
        <button
          onClick={clearAllMarks}
          className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
        >
          <FaTrash className="text-xl mb-1" />
          <span className="text-xs">Clear All</span>
        </button>
      </div>
    </div>
  );

  // Interactive Seat Map Component
  const SeatMap = () => {
    const seats = [
      ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
      ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
      ['C1', 'C2', 'C3', 'C4', 'C5'],
      ['D1', 'D2', 'D3', 'D4', 'D5', 'D6']
    ];
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <GiSeatedMouse className="text-blue-500" />
            Classroom Seat Map
          </h3>
          <button onClick={() => setShowSeatMap(false)} className="text-gray-400 hover:text-gray-600">
            <FaTimes />
          </button>
        </div>
        
        <div className="relative">
          {/* Teacher's Desk */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-lg">
            <div className="text-center">
              <GiTeacher className="text-2xl mx-auto mb-1" />
              <div className="text-xs font-bold">Teacher</div>
            </div>
          </div>
          
          {/* Whiteboard */}
          <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-6 mt-8"></div>
          
          {/* Seats Grid */}
          <div className="space-y-4">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-2">
                {row.map(seat => {
                  const student = students.find(s => s.seat === seat);
                  const isPresent = student?.present === true;
                  const isAbsent = student?.present === false;
                  
                  return (
                    <div
                      key={seat}
                      className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all transform hover:scale-110 ${
                        isPresent 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                          : isAbsent
                          ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300'
                      }`}
                      onClick={() => {
                        if (student) {
                          setShowStudentDetails(student);
                          setShowSeatMap(false);
                        }
                      }}
                      title={student ? student.name : 'Empty seat'}
                    >
                      <div className="text-xs font-bold">{seat}</div>
                      {student && (
                        <div className="text-[8px] truncate w-10 text-center">
                          {student.name.split(' ')[0]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <span className="text-xs">Present</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-rose-500"></div>
              <span className="text-xs">Absent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300"></div>
              <span className="text-xs">Not Marked</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Get class stats for overview
  const l5BStats = calculateClassStats('L5 Software Dev. B');
  const l5AStats = calculateClassStats('L5 Software Dev. A');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-blue-50'} p-2 md:p-4 lg:p-6`}>
      {/* Audio element for sound effects */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" preload="auto" />
      
      {/* Absent Notification */}
      {showAbsentNotification && (
        <div className="fixed top-4 right-4 z-40 animate-slideIn">
          <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between animate-pulse max-w-md">
            <div className="flex items-center gap-3">
              <FaBell className="text-2xl animate-bounce" />
              <div>
                <div className="font-bold">Attendance Alert! ⚠️</div>
                <div className="text-sm opacity-90">{statistics.absent} student(s) marked absent.</div>
              </div>
            </div>
            <button 
              onClick={() => setShowAbsentNotification(false)}
              className="text-white hover:text-gray-200 transition-transform hover:rotate-90"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
      
      {/* Saved Notification */}
      {saved && (
        <div className="fixed top-4 left-4 z-40 animate-slideIn">
          <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-pulse max-w-md">
            <FaSync className="animate-spin" />
            <div>
              <div className="font-bold">Attendance Saved! ✅</div>
              <div className="text-sm opacity-90">Data has been saved to local storage.</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-30 mb-6 bg-white/80 backdrop-blur-md border-b border-gray-200 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center p-4">
            {/* Left: Logo and Title */}
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg animate-pulse">
                <FaCode className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Smart Attendance System
                </h1>
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <FaLaptop className="text-blue-500" />
                  Mutovu TSS • {getTodayDate()}
                </p>
              </div>
            </div>
            
            {/* Right: Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md flex items-center gap-1 transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white shadow text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FaTable /> <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md flex items-center gap-1 transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FaTh /> <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setShowSeatMap(true)}
                  className={`px-3 py-2 rounded-md flex items-center gap-1 transition-all ${
                    showSeatMap 
                      ? 'bg-white shadow text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <GiSeatedMouse /> <span className="hidden sm:inline">Map</span>
                </button>
              </div>
              
              {/* Quick Stats Toggle */}
              <button
                onClick={() => setShowQuickStats(!showQuickStats)}
                className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all"
                title={showQuickStats ? "Hide Stats" : "Show Stats"}
              >
                {showQuickStats ? <FaEyeSlash /> : <FaEye />}
              </button>
              
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-all ${soundEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
              >
                {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>
              
              {/* Tutorial Button */}
              <button
                onClick={() => setShowTutorial(true)}
                className="p-2 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg hover:from-yellow-100 hover:to-amber-100 transition-all"
                title="Show Tutorial"
              >
                <FaInfoCircle className="text-yellow-600" />
              </button>
              
              {/* Fullscreen Toggle */}
              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                    setIsFullscreen(true);
                  } else {
                    document.exitFullscreen();
                    setIsFullscreen(false);
                  }
                }}
                className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <FaCompress className="text-purple-600" /> : <FaExpand className="text-purple-600" />}
              </button>
              
              {/* Undo/Redo */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  className="px-2 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Undo (Ctrl+Z)"
                >
                  <FaUndo />
                </button>
                <button
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  className="px-2 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Redo (Ctrl+Y)"
                >
                  <FaRedo />
                </button>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="px-4 pb-4">
            <div className="relative group">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="🔍 Search students by name, registration, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-12 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none transition-all shadow-sm group-hover:shadow-md"
              />
              <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Real-time Clock */}
            {showRealTimeClock && <RealTimeClock />}
            
            {/* Class Overview Cards */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <BiNetworkChart className="text-blue-500" />
                Class Overview
              </h2>
              <ClassOverview className="L5 Software Dev. B" stats={l5BStats} />
              <ClassOverview className="L5 Software Dev. A" stats={l5AStats} />
            </div>
            
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Filter Panel */}
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FaFilter className="text-purple-500" />
                Filters & Settings
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                  <select
                    value={currentPeriod}
                    onChange={(e) => setCurrentPeriod(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {periods.map(period => (
                      <option key={period} value={period}>{period}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Late Threshold</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={lateThreshold}
                      onChange={(e) => setLateThreshold(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => setLateThreshold('08:30')}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      title="Reset to default"
                    >
                      <TbRefresh />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="autoSave"
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="autoSave" className="text-sm text-gray-700">
                      Auto-save
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="haptic"
                      checked={hapticFeedback}
                      onChange={(e) => setHapticFeedback(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="haptic" className="text-sm text-gray-700">
                      Haptic
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Statistics Dashboard */}
            {showStatistics && (
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 border border-gray-200 animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaTachometerAlt className="text-blue-500" />
                    Live Dashboard
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowStatistics(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-transform hover:rotate-90"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-green-700 text-center">{statistics.present}</div>
                    <div className="text-sm text-green-600 text-center mt-1">Present</div>
                    <div className="h-1 bg-green-200 rounded-full mt-2">
                      <div 
                        className="h-1 bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${(statistics.present/statistics.total)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-xl border border-red-200 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-red-700 text-center">{statistics.absent}</div>
                    <div className="text-sm text-red-600 text-center mt-1">Absent</div>
                    <div className="h-1 bg-red-200 rounded-full mt-2">
                      <div 
                        className="h-1 bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${(statistics.absent/statistics.total)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-200 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-700 text-center">{statistics.late}</div>
                    <div className="text-sm text-yellow-600 text-center mt-1">Late</div>
                    <div className="h-1 bg-yellow-200 rounded-full mt-2">
                      <div 
                        className="h-1 bg-yellow-500 rounded-full transition-all duration-500"
                        style={{ width: `${(statistics.late/statistics.total)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-blue-700 text-center">{statistics.notMarked}</div>
                    <div className="text-sm text-blue-600 text-center mt-1">Not Marked</div>
                    <div className="h-1 bg-blue-200 rounded-full mt-2">
                      <div 
                        className="h-1 bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${(statistics.notMarked/statistics.total)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-purple-700 text-center flex items-center justify-center gap-1">
                      <TbPercentage />
                      {statistics.percentage}%
                    </div>
                    <div className="text-sm text-purple-600 text-center mt-1">Attendance Rate</div>
                    <div className="h-1 bg-purple-200 rounded-full mt-2">
                      <div 
                        className="h-1 bg-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${statistics.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Overall Attendance Progress</span>
                    <span>{statistics.present}/{statistics.total} students ({statistics.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 h-3 rounded-full transition-all duration-1000 shadow-lg"
                      style={{ width: `${statistics.percentage}%` }}
                    >
                      <div className="h-3 rounded-full bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Batch Mode Indicator */}
            {batchMode && (
              <div className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl shadow-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaMousePointer className="animate-pulse" />
                    <span className="font-bold">Batch Mode Active</span>
                    <span className="text-sm opacity-90">({selectedStudents.size} students selected)</span>
                  </div>
                  <button
                    onClick={() => setBatchMode(false)}
                    className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30"
                  >
                    Exit Batch Mode
                  </button>
                </div>
              </div>
            )}

            {/* Attendance Table/Grid View */}
            {viewMode === 'list' ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('name')}>
                          <div className="flex items-center gap-1">
                            Student Name {getSortIcon('name')}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reg Number</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden sm:table-cell">Seat</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('present')}>
                          <div className="flex items-center gap-1">
                            Status {getSortIcon('present')}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden md:table-cell">Time In</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedStudents.map((student) => (
                        <tr 
                          key={student.id} 
                          className={`hover:bg-gray-50 transition-all duration-200 cursor-pointer group ${
                            selectedStudents.has(student.id) ? 'bg-blue-50' : ''
                          }`}
                          onClick={(e) => {
                            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
                            setShowStudentDetails(student);
                          }}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-r ${student.avatarColor}`}>
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                  {student.name}
                                </div>
                                <div className="text-xs text-gray-500 hidden sm:block">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900 font-mono">{student.regNumber}</div>
                          </td>
                          <td className="px-4 py-4 hidden sm:table-cell">
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              {student.seat}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${
                              student.present === true 
                                ? student.late 
                                  ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200' 
                                  : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
                                : student.present === false 
                                  ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200' 
                                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200'
                            }`}>
                              {student.present === true 
                                ? student.late ? <FaRegClock /> : <FaCheck /> 
                                : student.present === false ? <FaTimes /> : <FaRegCalendarCheck />
                              }
                              <span>
                                {student.present === true 
                                  ? student.late ? 'Late' : 'Present' 
                                  : student.present === false ? 'Absent' : 'Not Marked'
                                }
                              </span>
                            </span>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <div className="text-sm text-gray-500 font-mono flex items-center gap-1">
                              <IoMdTime />
                              {student.timeIn || '--:--'}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => markAttendance(student.id, true)}
                                className={`p-2 rounded-lg flex items-center transition-all transform hover:scale-110 active:scale-95 ${
                                  student.present === true 
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                                    : 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 hover:from-green-200 hover:to-green-100'
                                }`}
                                title="Mark Present"
                              >
                                <FaUserCheck />
                              </button>
                              <button
                                onClick={() => markAttendance(student.id, false)}
                                className={`p-2 rounded-lg flex items-center transition-all transform hover:scale-110 active:scale-95 ${
                                  student.present === false 
                                    ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg' 
                                    : 'bg-gradient-to-r from-red-100 to-red-50 text-red-700 hover:from-red-200 hover:to-red-100'
                                }`}
                                title="Mark Absent"
                              >
                                <FaUserTimes />
                              </button>
                              <button
                                onClick={() => setShowStudentDetails(student)}
                                className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-50 text-blue-700 hover:from-blue-200 hover:to-cyan-100 transition-all transform hover:scale-110 active:scale-95"
                                title="View Details"
                              >
                                <FaEye />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200">
                  <div className="text-sm text-gray-700 mb-2 sm:mb-0">
                    Showing <span className="font-semibold">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredStudents.length)}</span> to{' '}
                    <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> of{' '}
                    <span className="font-semibold">{filteredStudents.length}</span> students
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="p-1 border border-gray-300 rounded text-sm"
                    >
                      {[10, 15, 20, 50].map(size => (
                        <option key={size} value={size}>{size} per page</option>
                      ))}
                    </select>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200"
                    >
                      <FaArrowLeft />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Grid View
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {paginatedStudents.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => setShowStudentDetails(student)}
                    className={`bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 active:translate-y-0 group ${
                      student.present === true 
                        ? student.late 
                          ? 'border-yellow-400 hover:border-yellow-500' 
                          : 'border-green-400 hover:border-green-500'
                        : student.present === false 
                          ? 'border-red-400 hover:border-red-500' 
                          : 'border-gray-300 hover:border-gray-400'
                    } ${selectedStudents.has(student.id) ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-gradient-to-r ${student.avatarColor} group-hover:scale-110 transition-transform`}>
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 truncate max-w-[120px]">{student.name}</div>
                            <div className="text-xs text-gray-500 font-mono">{student.regNumber}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            student.present === true 
                              ? student.late 
                                ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800' 
                                : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                              : student.present === false 
                                ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800' 
                                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                          }`}>
                            {student.present === true 
                              ? student.late ? 'Late' : 'Present' 
                              : student.present === false ? 'Absent' : 'Not Marked'
                            }
                          </span>
                          <span className="text-xs text-gray-500">Seat: {student.seat}</span>
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
                        {student.timeIn && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <IoMdTime className="text-gray-400" />
                            <span>Arrived: {student.timeIn}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Click for details
                        </div>
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => markAttendance(student.id, true)}
                            className="p-2 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-lg hover:from-green-200 hover:to-green-100 transition-all transform hover:scale-110 active:scale-95"
                            title="Mark Present"
                          >
                            <FaUserCheck />
                          </button>
                          <button
                            onClick={() => markAttendance(student.id, false)}
                            className="p-2 bg-gradient-to-r from-red-100 to-red-50 text-red-700 rounded-lg hover:from-red-200 hover:to-red-100 transition-all transform hover:scale-110 active:scale-95"
                            title="Mark Absent"
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

            {/* Export Options */}
            {showExportOptions && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200 animate-fadeIn">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Export Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all flex flex-col items-center justify-center">
                    <FaFileExport className="text-3xl text-blue-600 mb-2" />
                    <span className="font-medium">Export CSV</span>
                  </button>
                  <button className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all flex flex-col items-center justify-center">
                    <FaPrint className="text-3xl text-green-600 mb-2" />
                    <span className="font-medium">Print Report</span>
                  </button>
                  <button className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all flex flex-col items-center justify-center">
                    <FaShareAlt className="text-3xl text-purple-600 mb-2" />
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl p-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h4 className="text-lg font-bold mb-2">Mutovu TSS Smart Attendance</h4>
              <p className="text-gray-300 text-sm">Version 3.0 • Enhanced Interactive System</p>
              <p className="text-gray-400 text-xs mt-2">
                Managing: L5 Software Dev. A (23) • L5 Software Dev. B (22)
              </p>
              <p className="text-gray-400 text-xs mt-1">© {new Date().getFullYear()} Mutovu Technical Secondary School</p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold">{students.length}</div>
                <div className="text-xs text-gray-300">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{statistics.present}</div>
                <div className="text-xs text-gray-300">Present</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{attendanceHistory.length}</div>
                <div className="text-xs text-gray-300">Records</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showStudentDetails && (
        <StudentDetailModal 
          student={showStudentDetails} 
          onClose={() => setShowStudentDetails(null)} 
        />
      )}

      {showTutorial && <TutorialModal />}

      {showSeatMap && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="max-w-4xl w-full">
            <SeatMap />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-2xl">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setViewMode('list')}
            className={`flex flex-col items-center justify-center p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <FaTable className="text-xl" />
            <span className="text-xs mt-1">List</span>
          </button>
          
          <button
            onClick={() => setViewMode('grid')}
            className={`flex flex-col items-center justify-center p-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-500'}`}
          >
            <FaTh className="text-xl" />
            <span className="text-xs mt-1">Grid</span>
          </button>
          
          <button
            onClick={saveAttendance}
            ref={saveButtonRef}
            className="flex flex-col items-center justify-center p-2 text-green-600"
          >
            <FaSync className={`text-xl ${saved ? 'animate-spin' : ''}`} />
            <span className="text-xs mt-1">Save</span>
          </button>
          
          <button
            onClick={() => setShowSeatMap(true)}
            className="flex flex-col items-center justify-center p-2 text-purple-600"
          >
            <GiSeatedMouse className="text-xl" />
            <span className="text-xs mt-1">Map</span>
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center p-2 text-gray-600"
          >
            <FaBars className="text-xl" />
            <span className="text-xs mt-1">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-70 z-50 backdrop-blur-sm">
          <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Quick Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => {
                  markAllPresent();
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl flex items-center gap-2"
              >
                <FaUserCheck />
                All Present
              </button>
              <button
                onClick={() => {
                  markAllAbsent();
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl flex items-center gap-2"
              >
                <FaUserTimes />
                All Absent
              </button>
              <button
                onClick={() => {
                  setShowExportOptions(true);
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl flex items-center gap-2"
              >
                <FaFileExport />
                Export
              </button>
              <button
                onClick={() => {
                  setShowTutorial(true);
                  setIsMobileMenuOpen(false);
                }}
                className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl flex items-center gap-2"
              >
                <FaInfoCircle />
                Help
              </button>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold">Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Sound Effects</span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-6 rounded-full relative transition-all ${soundEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${soundEnabled ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Haptic Feedback</span>
                  <button
                    onClick={() => setHapticFeedback(!hapticFeedback)}
                    className={`w-12 h-6 rounded-full relative transition-all ${hapticFeedback ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${hapticFeedback ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        /* Custom scrollbar */
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
        
        /* Print styles */
        @media print {
          .no-print {
            display: none !important;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .mobile-hide {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Attendance;
