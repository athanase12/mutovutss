// SchoolCalendar.js
import React, { useState, useMemo } from 'react';
import { 
  FaCalendarAlt, 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaClipboardCheck,
  FaBell,
  FaCode,
  FaServer,
  FaDatabase,
  FaMobileAlt,
  FaCheckCircle,
  FaBitcoin,
  FaPython,
  FaRobot
} from 'react-icons/fa';
import { GiTestTubes, GiMedal } from 'react-icons/gi';
import { BsFillCalendarWeekFill, BsCalendarMonth } from 'react-icons/bs';
import { TbBooks } from 'react-icons/tb';
import { MdOutlineEventAvailable } from 'react-icons/md';
import { SiReact, SiDocker, SiMongodb, SiFlutter, SiJest, SiEthereum, SiTensorflow } from 'react-icons/si';

const SchoolCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [viewMode, setViewMode] = useState('monthly');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [reminders, setReminders] = useState([]);

  // School terms for 2025
  const schoolTerms = useMemo(() => [
    {
      name: "Term 1",
      startDate: new Date(2025, 1, 3),
      endDate: new Date(2025, 3, 25),
      color: "bg-blue-100 border-blue-300",
      weeks: 12
    },
    {
      name: "Term 2",
      startDate: new Date(2025, 4, 12),
      endDate: new Date(2025, 7, 22),
      color: "bg-green-100 border-green-300",
      weeks: 15
    },
    {
      name: "Term 3",
      startDate: new Date(2025, 8, 8),
      endDate: new Date(2025, 10, 28),
      color: "bg-purple-100 border-purple-300",
      weeks: 12
    }
  ], []);

  // Subject Definitions
  const subjects = useMemo(() => [
    {
      id: 'frontend',
      name: 'Frontend App Dev. using React.js',
      icon: <SiReact />,
      color: 'bg-blue-500',
      code: 'FAD301',
      lecturer: 'Mr. James Mugisha'
    },
    {
      id: 'devops',
      name: 'Devops Techniques Application',
      icon: <SiDocker />,
      color: 'bg-green-500',
      code: 'DTA302',
      lecturer: 'Ms. Sarah Johnson'
    },
    {
      id: 'nosql',
      name: 'NoSql Database',
      icon: <SiMongodb />,
      color: 'bg-purple-500',
      code: 'NDB303',
      lecturer: 'Dr. Robert Smith'
    },
    {
      id: 'mobile',
      name: 'Mobile App Development',
      icon: <SiFlutter />,
      color: 'bg-yellow-500',
      code: 'MAD304',
      lecturer: 'Ms. Alice Brown'
    },
    {
      id: 'qa',
      name: 'Quality Assurance',
      icon: <SiJest />,
      color: 'bg-pink-500',
      code: 'QAS305',
      lecturer: 'Mr. David Wilson'
    },
    {
      id: 'blockchain',
      name: 'Blockchain Fundamentals',
      icon: <SiEthereum />,
      color: 'bg-indigo-500',
      code: 'BCF306',
      lecturer: 'Dr. Michael Chen'
    },
    {
      id: 'python',
      name: 'Python Programming',
      icon: <FaPython />,
      color: 'bg-red-500',
      code: 'PYP307',
      lecturer: 'Ms. Emily Davis'
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      icon: <SiTensorflow />,
      color: 'bg-teal-500',
      code: 'MLC308',
      lecturer: 'Prof. Richard Taylor'
    }
  ], []);

  // Helper function to get date by adding weeks
  const getDateByWeek = (startDate, weekNumber, dayOfWeek = 1) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + ((weekNumber - 1) * 7) + (dayOfWeek - 1));
    return date;
  };

  // Generate subject assessments for each term
  const generateSubjectAssessments = () => {
    const assessments = [];
    let eventId = 1000; // Start from high ID to avoid conflict with existing events

    schoolTerms.forEach((term, termIndex) => {
      const termNumber = termIndex + 1;
      
      subjects.forEach((subject, subjectIndex) => {
        const subjectOffset = subjectIndex % 3; // Stagger assessments across days
        
        // Formative Assessment 1 (Week 3)
        assessments.push({
          id: eventId++,
          title: `${subject.code} - Formative Assessment 1`,
          description: `Formative assessment for ${subject.name}`,
          date: getDateByWeek(term.startDate, 3, 1 + subjectOffset),
          type: 'formative',
          subject: subject.id,
          subjectName: subject.name,
          term: termNumber,
          icon: subject.icon,
          color: subject.color,
          weight: 10,
          duration: '1 hour',
          venue: 'Computer Lab A'
        });

        // Formative Assessment 2 (Week 6)
        assessments.push({
          id: eventId++,
          title: `${subject.code} - Formative Assessment 2`,
          description: `Second formative assessment for ${subject.name}`,
          date: getDateByWeek(term.startDate, 6, 2 + subjectOffset),
          type: 'formative',
          subject: subject.id,
          subjectName: subject.name,
          term: termNumber,
          icon: subject.icon,
          color: subject.color,
          weight: 10,
          duration: '1 hour',
          venue: 'Computer Lab B'
        });

        // Comprehensive Assessment (Week 9)
        assessments.push({
          id: eventId++,
          title: `${subject.code} - Comprehensive Assessment`,
          description: `Comprehensive mid-term assessment for ${subject.name}`,
          date: getDateByWeek(term.startDate, 9, 3 + subjectOffset),
          endDate: getDateByWeek(term.startDate, 9, 3 + subjectOffset),
          type: 'comprehensive',
          subject: subject.id,
          subjectName: subject.name,
          term: termNumber,
          icon: subject.icon,
          color: subject.color.replace('500', '600'),
          weight: 20,
          duration: '2 hours',
          venue: 'Main Hall',
          priority: 'high'
        });

        // End of Term Exam (Week 12)
        assessments.push({
          id: eventId++,
          title: `${subject.code} - Term ${termNumber} Exam`,
          description: `End of term examination for ${subject.name}`,
          date: getDateByWeek(term.startDate, term.weeks - 1, 4 + subjectOffset),
          type: 'exam',
          subject: subject.id,
          subjectName: subject.name,
          term: termNumber,
          icon: subject.icon,
          color: subject.color.replace('500', '700'),
          weight: 30,
          duration: '3 hours',
          venue: 'Examination Hall',
          priority: 'high'
        });

        // Practical/Project Submission (Week 11)
        if (['frontend', 'mobile', 'devops'].includes(subject.id)) {
          assessments.push({
            id: eventId++,
            title: `${subject.code} - Project Submission`,
            description: `Practical project submission for ${subject.name}`,
            date: getDateByWeek(term.startDate, term.weeks - 2, 5 + subjectOffset),
            type: 'practical',
            subject: subject.id,
            subjectName: subject.name,
            term: termNumber,
            icon: subject.icon,
            color: subject.color.replace('500', '400'),
            weight: 15,
            duration: 'All day',
            venue: 'Submission Portal'
          });
        }
      });

      // Summative Assessments (Final Term - Term 3 only)
      if (termNumber === 3) {
        subjects.forEach((subject, subjectIndex) => {
          const examDay = 10 + subjectIndex; // Spread across 2 weeks
          assessments.push({
            id: eventId++,
            title: `${subject.code} - Final Summative Assessment`,
            description: `Final summative assessment for ${subject.name}`,
            date: getDateByWeek(term.startDate, term.weeks - 2, examDay % 5 || 5),
            type: 'summative',
            subject: subject.id,
            subjectName: subject.name,
            term: termNumber,
            icon: subject.icon,
            color: 'bg-indigo-600',
            weight: 40,
            duration: '3.5 hours',
            venue: 'National Examination Center',
            priority: 'highest'
          });
        });
      }
    });

    return assessments;
  };

  // Calendar events for 2025 - now including subject assessments
  const calendarEvents = useMemo(() => {
    const generalEvents = [
      // Term 1 General Events
      { id: 1, title: "Term 1 Begins", date: new Date(2025, 1, 3), type: "academic", icon: <FaGraduationCap />, color: "bg-blue-500", priority: "high" },
      { id: 2, title: "Mid-Term Break", date: new Date(2025, 2, 10), endDate: new Date(2025, 2, 14), type: "holiday", icon: <FaCalendarAlt />, color: "bg-gray-400" },
      { id: 3, title: "Term 1 Ends", date: new Date(2025, 3, 25), type: "academic", icon: <FaGraduationCap />, color: "bg-blue-500" },
      
      // Term 2 General Events
      { id: 4, title: "Term 2 Begins", date: new Date(2025, 4, 12), type: "academic", icon: <FaGraduationCap />, color: "bg-blue-500", priority: "high" },
      { id: 5, title: "Sports Day", date: new Date(2025, 6, 4), type: "event", icon: <GiMedal />, color: "bg-yellow-500" },
      { id: 6, title: "Term 2 Ends", date: new Date(2025, 7, 22), type: "academic", icon: <FaGraduationCap />, color: "bg-blue-500" },
      
      // Term 3 General Events
      { id: 7, title: "Term 3 Begins", date: new Date(2025, 8, 8), type: "academic", icon: <FaGraduationCap />, color: "bg-blue-500", priority: "high" },
      { id: 8, title: "Cultural Day", date: new Date(2025, 9, 3), type: "event", icon: <FaGraduationCap />, color: "bg-pink-500" },
      { id: 9, title: "Graduation Ceremony", date: new Date(2025, 10, 28), type: "event", icon: <FaGraduationCap />, color: "bg-purple-500", priority: "high" },
      { id: 10, title: "Term 3 Ends", date: new Date(2025, 10, 28), type: "academic", icon: <FaGraduationCap />, color: "bg-blue-500", priority: "high" },
      
      // Holidays
      { id: 11, title: "Labor Day", date: new Date(2025, 4, 1), type: "holiday", icon: <FaCalendarAlt />, color: "bg-gray-400" },
      { id: 12, title: "Liberation Day", date: new Date(2025, 6, 4), type: "holiday", icon: <FaCalendarAlt />, color: "bg-gray-400" }
    ];

    const subjectAssessments = generateSubjectAssessments();
    
    return [...generalEvents, ...subjectAssessments];
  }, []);

  const eventTypes = useMemo(() => [
    { id: 'all', name: 'All Events', color: 'bg-gray-200', icon: <FaCalendarAlt /> },
    { id: 'exam', name: 'Exams', color: 'bg-red-100', icon: <GiTestTubes /> },
    { id: 'formative', name: 'Formative', color: 'bg-green-100', icon: <FaChalkboardTeacher /> },
    { id: 'comprehensive', name: 'Comprehensive', color: 'bg-orange-100', icon: <TbBooks /> },
    { id: 'summative', name: 'Summative', color: 'bg-indigo-100', icon: <FaClipboardCheck /> },
    { id: 'practical', name: 'Practical', color: 'bg-cyan-100', icon: <FaCode /> },
    { id: 'academic', name: 'Academic', color: 'bg-blue-100', icon: <FaGraduationCap /> },
    { id: 'event', name: 'Events', color: 'bg-purple-100', icon: <MdOutlineEventAvailable /> },
    { id: 'holiday', name: 'Holidays', color: 'bg-gray-100', icon: <FaCalendarAlt /> }
  ], []);

  const months = useMemo(() => [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ], []);

  // Filter events based on selections
  const filteredEvents = useMemo(() => {
    return calendarEvents
      .filter(event => {
        // Filter by event type
        if (selectedEventType !== 'all' && event.type !== selectedEventType) return false;
        
        // Filter by subject
        if (selectedSubject !== 'all' && event.subject !== selectedSubject) return false;
        
        // Filter by month for monthly view
        if (viewMode === 'monthly' && event.date.getMonth() !== selectedMonth) return false;
        
        // Filter for exam-focused view
        if (viewMode === 'exam-focused' && !['exam', 'formative', 'comprehensive', 'summative'].includes(event.type)) return false;
        
        return true;
      })
      .sort((a, b) => a.date - b.date);
  }, [calendarEvents, selectedEventType, selectedSubject, viewMode, selectedMonth]);

  // Helper functions
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const addReminder = (event) => {
    const newReminder = {
      id: Date.now(),
      eventId: event.id,
      title: event.title,
      date: event.date,
      type: event.type,
      subject: event.subjectName
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const removeReminder = (reminderId) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = 2025;
    const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(year, selectedMonth, 1).getDay();
    const days = [];

    // Empty days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, events: [] });
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, selectedMonth, day);
      const dayEvents = calendarEvents.filter(event => {
        const eventDate = event.date;
        return eventDate.getDate() === day && 
               eventDate.getMonth() === selectedMonth;
      });
      days.push({ day, date: currentDate, events: dayEvents });
    }

    return days;
  };

  // Calendar view components
  const CalendarView = () => {
    const calendarDays = generateCalendarDays();
    const currentMonthEvents = calendarEvents.filter(e => e.date.getMonth() === selectedMonth);

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BsFillCalendarWeekFill className="text-blue-500" />
            {months[selectedMonth]} 2025
          </h2>
          <div className="flex justify-between items-center mt-1">
            <p className="text-gray-600">
              {currentMonthEvents.length} events this month
            </p>
            <div className="text-sm text-gray-500">
              {subjects.length} subjects • {currentMonthEvents.filter(e => e.subject).length} assessments
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold text-gray-600 py-2">
                {day}
              </div>
            ))}
            
            {calendarDays.map((dayData, index) => (
              <div
                key={index}
                className={`min-h-32 p-2 border border-gray-200 rounded-lg transition-colors ${
                  dayData.day ? 'bg-white hover:bg-blue-50' : 'bg-gray-50'
                } ${dayData.date && isToday(dayData.date) ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
              >
                {dayData.day && (
                  <>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-semibold ${
                        isToday(dayData.date) ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {dayData.day}
                      </span>
                      {dayData.events.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          {dayData.events.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 mt-2">
                      {dayData.events.slice(0, 3).map((event, idx) => (
                        <div
                          key={idx}
                          className={`text-xs p-1 rounded truncate ${event.color} text-white`}
                          title={event.title}
                        >
                          <div className="flex items-center gap-1">
                            <span>{event.icon}</span>
                            <span className="truncate">{event.title}</span>
                          </div>
                        </div>
                      ))}
                      {dayData.events.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{dayData.events.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ListView = () => {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MdOutlineEventAvailable className="text-green-500" />
            School Events ({filteredEvents.length})
          </h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div>Showing {selectedSubject === 'all' ? 'all subjects' : subjects.find(s => s.id === selectedSubject)?.name}</div>
            <div>•</div>
            <div>{selectedEventType === 'all' ? 'all event types' : selectedEventType}</div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
          {filteredEvents.length > 0 ? filteredEvents.map((event) => (
            <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${event.color} text-white w-16 h-16 flex flex-col items-center justify-center flex-shrink-0`}>
                  <div className="text-2xl">{event.icon}</div>
                  <div className="text-xs mt-1">{event.date.getDate()}</div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {event.title}
                        {event.priority === 'highest' && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                            FINAL
                          </span>
                        )}
                        {event.priority === 'high' && (
                          <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                            IMPORTANT
                          </span>
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaCalendarAlt className="flex-shrink-0" />
                          <span>{formatDate(event.date)}</span>
                          {event.endDate && (
                            <>
                              <span className="mx-1">to</span>
                              <span>{formatDate(event.endDate)}</span>
                            </>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          eventTypes.find(t => t.id === event.type)?.color.replace('100', '200')
                        }`}>
                          {eventTypes.find(t => t.id === event.type)?.name}
                        </span>
                        {event.subjectName && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {event.subjectName}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-shrink-0">
                      {event.weight && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                          {event.weight}%
                        </span>
                      )}
                      <button
                        onClick={() => addReminder(event)}
                        className="px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 text-sm flex items-center gap-1 transition-opacity"
                      >
                        <FaBell /> Remind
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    {event.description && (
                      <div>
                        <span className="font-medium">Description:</span>
                        <p className="mt-1">{event.description}</p>
                      </div>
                    )}
                    {event.duration && (
                      <div>
                        <span className="font-medium">Duration:</span>
                        <p className="mt-1">{event.duration}</p>
                      </div>
                    )}
                    {event.venue && (
                      <div>
                        <span className="font-medium">Venue:</span>
                        <p className="mt-1">{event.venue}</p>
                      </div>
                    )}
                  </div>
                  
                  {event.term && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Term {event.term}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="p-8 text-center text-gray-500">
              <FaCalendarAlt className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>No events found for the selected filters</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Statistics
  const stats = useMemo(() => {
    const subjectEvents = calendarEvents.filter(e => e.subject);
    return {
      totalEvents: calendarEvents.length,
      totalAssessments: subjectEvents.length,
      exams: subjectEvents.filter(e => e.type === 'exam').length,
      formative: subjectEvents.filter(e => e.type === 'formative').length,
      comprehensive: subjectEvents.filter(e => e.type === 'comprehensive').length,
      summative: subjectEvents.filter(e => e.type === 'summative').length,
      practical: subjectEvents.filter(e => e.type === 'practical').length,
      bySubject: subjects.reduce((acc, subject) => {
        acc[subject.id] = subjectEvents.filter(e => e.subject === subject.id).length;
        return acc;
      }, {})
    };
  }, [calendarEvents, subjects]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-cyan-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-3">
                <FaCalendarAlt className="text-blue-500" />
                Mutovu TSS Academic Calendar 2025
              </h1>
              <p className="text-gray-600 mt-2">
                Technical Subjects Schedule: Assessments, Exams, and Important Dates
              </p>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg">
              <div className="text-sm">Current Term</div>
              <div className="font-bold">Term 1 (Feb 3 - Apr 25)</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl">
            <div className="text-2xl font-bold">{stats.totalAssessments}</div>
            <div className="text-sm opacity-90">Total Assessments</div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-xl">
            <div className="text-2xl font-bold">{stats.exams}</div>
            <div className="text-sm opacity-90">Term Exams</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl">
            <div className="text-2xl font-bold">{stats.formative}</div>
            <div className="text-sm opacity-90">Formative</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl">
            <div className="text-2xl font-bold">{stats.summative}</div>
            <div className="text-sm opacity-90">Summative</div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow border">
            <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
            <div className="flex gap-2">
              {['monthly', 'list', 'exam-focused'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === mode
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mode === 'monthly' ? 'Monthly' : mode === 'list' ? 'List' : 'Exams'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month} 2025
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {eventTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar/Events Display */}
          <div className="lg:col-span-2">
            {viewMode === 'monthly' ? <CalendarView /> : <ListView />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subjects Overview */}
            <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Subjects Overview</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      selectedSubject === subject.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSubject(selectedSubject === subject.id ? 'all' : subject.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${subject.color} text-white`}>
                        {subject.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 truncate">{subject.name}</div>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-xs text-gray-500">{subject.code}</div>
                          <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {stats.bySubject[subject.id] || 0} assessments
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Types */}
            <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Event Types</h3>
              <div className="grid grid-cols-2 gap-3">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedEventType(type.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                      selectedEventType === type.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${type.color}`}>
                      {type.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{type.name}</div>
                      <div className="text-xs text-gray-500">
                        {calendarEvents.filter(e => e.type === type.id).length}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reminders */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl shadow border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">My Reminders</h3>
              {reminders.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-sm">{reminder.title}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatDate(reminder.date)}
                          </div>
                          {reminder.subject && (
                            <div className="text-xs text-blue-600 mt-1">{reminder.subject}</div>
                          )}
                        </div>
                        <button
                          onClick={() => removeReminder(reminder.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          title="Remove reminder"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <FaBell className="text-3xl mx-auto mb-2 text-gray-300" />
                  <p>No reminders set</p>
                  <p className="text-sm mt-1">Click "Remind" on events to add reminders</p>
                </div>
              )}
            </div>

            {/* Upcoming Important Dates */}
            <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-2xl shadow border border-red-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <GiTestTubes className="text-red-500" />
                Upcoming Assessments
              </h3>
              <div className="space-y-3">
                {calendarEvents
                  .filter(e => ['exam', 'summative', 'comprehensive'].includes(e.type) && e.date >= new Date())
                  .sort((a, b) => a.date - b.date)
                  .slice(0, 4)
                  .map((assessment) => (
                    <div key={assessment.id} className="p-3 bg-white/80 rounded-xl border border-red-100">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-sm">{assessment.title}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatDate(assessment.date)}
                          </div>
                          {assessment.weight && (
                            <div className="text-xs text-red-600 mt-1">Weight: {assessment.weight}%</div>
                          )}
                        </div>
                        <div className={`p-2 rounded-lg ${assessment.color} text-white ml-2`}>
                          {assessment.icon}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Assessment Schedule Summary</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Formative Assessments: Weekly/Monthly - 10% each</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Comprehensive Assessments: Mid-term - 20% each</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Term Exams: End of term - 30% each</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span>Summative Assessment: Final term - 40%</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Important Notes</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• All dates are subject to change - check notice boards regularly</li>
                <li>• Practical assessments require prior registration</li>
                <li>• Late submissions incur penalties (10% per day)</li>
                <li>• Contact academic office for special arrangements</li>
                <li>• Bring student ID to all assessments</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>📅 Mutovu TSS Academic Calendar 2025 • Technical Education Division</p>
            <p className="mt-1">For academic queries: academic@mutovutss.edu.rw | Phone: +250 788 123 456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCalendar;
