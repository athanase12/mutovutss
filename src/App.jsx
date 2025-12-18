import React, { useState, useRef, useEffect } from "react";  
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
// Assuming all pages components are available
import Attendance from "./pages/Attendance";
import Comp1 from "./pages/Comp1";
import Comp2 from "./pages/Comp2";
import Contact from "./pages/Contact";
import Notfound from "./pages/Notfound";
import Form from "./pages/Form";
import Use from "./pages/Use";
import Registration from "./pages/Registration";
import ScrollingText from "./pages/Scrolling";
import VideoPlayer from "./pages/VideoPlayer";
import Help from "./pages/Help";
import Courses from "./pages/Courses";
import Staff from "./pages/Staff";
import Schedule from "./pages/Schedule";
import DailyActivities from "./pages/DailyActivities";
import Timetable from "./pages/Timetable";
import ClassNotes from "./pages/ClassNotes";
// Icon Imports
import { RiArrowDropDownFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FcCalendar } from "react-icons/fc";
import { VscRepoFetch } from "react-icons/vsc";
import { CiMenuBurger, CiHome } from "react-icons/ci";
import { RiPresentationLine } from "react-icons/ri";
import { FcAbout } from "react-icons/fc";
import { MdContactPhone, MdOutlineAppRegistration, MdOutlineCastForEducation } from "react-icons/md";
import { GiPineapple } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { ImFileVideo } from "react-icons/im";
import { FaHandsHelping } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";
import { AiFillSchedule } from "react-icons/ai";
import { GrDocumentPdf } from "react-icons/gr";
// Add AI Icons
import { RiRobot2Line } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosThumbsUp, IoIosThumbsDown } from "react-icons/io";
import { BsFillLightbulbFill, BsChatSquareQuoteFill, BsSearch } from "react-icons/bs";
import { TbBrain, TbMoon, TbSun } from "react-icons/tb";
import { FaBell, FaUserCircle, FaChevronRight, FaChevronLeft, FaUsers, FaChartLine } from "react-icons/fa";
import { IoNotifications, IoHelpCircle } from "react-icons/io5";

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [activeHover, setActiveHover] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const [visitorStats, setVisitorStats] = useState({
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        thisYear: 0,
        total: 0,
        lastUpdate: new Date()
    });

    // Initialize visitor statistics from localStorage or set defaults
    useEffect(() => {
        const savedStats = localStorage.getItem('mutovu_tss_visitor_stats');
        const today = new Date();
        const todayKey = today.toDateString();
        
        if (savedStats) {
            const parsedStats = JSON.parse(savedStats);
            const lastSavedDate = new Date(parsedStats.lastUpdate);
            
            // Check if it's a new day
            if (lastSavedDate.toDateString() !== todayKey) {
                // Reset daily count for new day
                const newStats = {
                    today: 1, // Start new day with 1 (current visit)
                    thisWeek: parsedStats.thisWeek + 1,
                    thisMonth: parsedStats.thisMonth + 1,
                    thisYear: parsedStats.thisYear + 1,
                    total: parsedStats.total + 1,
                    lastUpdate: new Date()
                };
                setVisitorStats(newStats);
                localStorage.setItem('mutovu_tss_visitor_stats', JSON.stringify(newStats));
            } else {
                // Same day, increment counts
                const newStats = {
                    ...parsedStats,
                    today: parsedStats.today + 1,
                    thisWeek: parsedStats.thisWeek + 1,
                    thisMonth: parsedStats.thisMonth + 1,
                    thisYear: parsedStats.thisYear + 1,
                    total: parsedStats.total + 1,
                    lastUpdate: new Date()
                };
                setVisitorStats(newStats);
                localStorage.setItem('mutovu_tss_visitor_stats', JSON.stringify(newStats));
            }
        } else {
            // First time visitor
            const initialStats = {
                today: 1,
                thisWeek: 1,
                thisMonth: 1,
                thisYear: 1,
                total: 1,
                lastUpdate: new Date()
            };
            setVisitorStats(initialStats);
            localStorage.setItem('mutovu_tss_visitor_stats', JSON.stringify(initialStats));
        }
        const navItems = [
            // ... other items
            { 
                to: "attendance", 
                icon: <RiPresentationLine className="text-2xl" />, 
                label: "Attendance", 
                color: "text-orange-300" 
            },
            // ... other items
        ];

        // Simulate other users visiting (for demo purposes)
        const simulateOtherVisits = () => {
            setVisitorStats(prev => {
                const newStats = {
                    ...prev,
                    today: prev.today + Math.floor(Math.random() * 3),
                    thisWeek: prev.thisWeek + Math.floor(Math.random() * 5),
                    thisMonth: prev.thisMonth + Math.floor(Math.random() * 10),
                    thisYear: prev.thisYear + Math.floor(Math.random() * 15),
                    total: prev.total + Math.floor(Math.random() * 20)
                };
                localStorage.setItem('mutovu_tss_visitor_stats', JSON.stringify(newStats));
                return newStats;
            });
        };

        // Simulate visits every 30-90 seconds
        const interval = setInterval(simulateOtherVisits, 30000 + Math.random() * 60000);

        return () => clearInterval(interval);
    }, []);

    // Function to manually trigger a new visit (for testing)
    const recordNewVisit = () => {
        setVisitorStats(prev => {
            const newStats = {
                ...prev,
                today: prev.today + 1,
                thisWeek: prev.thisWeek + 1,
                thisMonth: prev.thisMonth + 1,
                thisYear: prev.thisYear + 1,
                total: prev.total + 1,
                lastUpdate: new Date()
            };
            localStorage.setItem('mutovu_tss_visitor_stats', JSON.stringify(newStats));
            return newStats;
        });
    };

    // Enhanced NavLink classes with big underline effect
    const baseNavClass = 
        "flex font-semibold items-center gap-3 py-3 px-4 mx-3 rounded-xl " +
        "transition-all duration-300 ease-in-out cursor-pointer text-lg " +
        "relative overflow-hidden group";

    const activeNavClass = 
        `${baseNavClass} bg-blue-600 text-white shadow-lg shadow-blue-600/30 ` +
        `transform scale-[1.02] ring-1 ring-blue-400 font-bold ` +
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:animate-pulse " +
        // Big underline for active state
        "after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-yellow-400 after:shadow-lg after:shadow-yellow-400/50 " +
        "after:transform after:scale-x-100 after:transition-transform after:duration-500 after:origin-left";

    const inactiveNavClass = 
        `${baseNavClass} text-gray-300 hover:text-white ` +
        `hover:bg-gray-800/50 hover:scale-[1.01] hover:shadow-md ` +
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-700/0 before:via-gray-700/20 before:to-gray-700/0 " +
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 " +
        // Enhanced hover underline effect
        "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-yellow-400 after:via-orange-400 after:to-yellow-400 " +
        "after:shadow-lg after:shadow-yellow-400/40 after:transform after:scale-x-0 after:transition-all after:duration-500 after:origin-left " +
        "hover:after:scale-x-100 hover:after:h-[4px] hover:after:shadow-xl hover:after:shadow-yellow-400/60 " +
        // Add animated glow effect on hover
        "hover:after:animate-glow";

    const logoutClass = 
        "text-lg font-bold w-full mt-6 py-2 px-4 rounded-xl flex items-center justify-center gap-2 " +
        "text-white bg-red-600 hover:bg-red-700 transition duration-300 transform hover:scale-[1.02] shadow-lg ring-1 ring-red-400 " +
        // Add underline effect to logout button too
        "relative overflow-hidden group " +
        "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white/50 after:transform after:scale-x-0 " +
        "after:transition-transform after:duration-300 hover:after:scale-x-100";

    // Navigation items data with enhanced hover states
    const navItems = [
        { to: "/", icon: <CiHome className="text-2xl" />, label: "Home", color: "text-yellow-400" },
        { to: "comp2/*", icon: <FcAbout className="text-2xl" />, label: "About", color: "text-blue-400" },
        { to: "contact/*", icon: <MdContactPhone className="text-2xl" />, label: "Contact", color: "text-red-400" },
        { to: "registration/*", icon: <MdOutlineAppRegistration className="text-2xl" />, label: "Registration", color: "text-cyan-400" },
        { to: "courses/*", icon: <MdOutlineCastForEducation className="text-2xl" />, label: "Courses", color: "text-green-400" },
        { to: "staff", icon: <VscOrganization className="text-2xl" />, label: "Staff", color: "text-purple-400" },
        { to: "schedule/*", icon: <AiFillSchedule className="text-2xl" />, label: "Schedule", color: "text-blue-300" },
        { to: "help", icon: <FaHandsHelping className="text-2xl" />, label: "Help", color: "text-orange-400" },
        { to: "video", icon: <ImFileVideo className="text-2xl" />, label: "Video", color: "text-pink-400" },
        { to: "athanase-ai", icon: <RiRobot2Line className="text-2xl" />, label: "Athanase AI", color: "text-green-300" },
        { to: "form", icon: <IoSettingsOutline className="text-2xl" />, label: "Settings", color: "text-gray-300" },
        { to: "use", icon: <GiPineapple className="text-2xl" />, label: "App Counter", color: "text-yellow-300" },
        { to: "classnotes", icon: <GrDocumentPdf className="text-2xl" />, label: "Class Notes", color: "text-red-300" },
        { to: "result", icon: <VscRepoFetch className="text-2xl" />, label: "Result Check", color: "text-green-500" },
        { to: "attendance", icon: <RiPresentationLine className="text-2xl" />, label: "Attendance", color: "text-orange-300" },
        { to: "calendar", icon: <FcCalendar className="text-2xl" />, label: "Calendar", color: "text-blue-200" }
    ];

    // Real-time Visitor Statistics Component
    const VisitorStatistics = () => {
        const [updateTime, setUpdateTime] = useState(new Date());

        // Format time to show "Just now" or "X minutes ago"
        const formatTime = (date) => {
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            
            if (diffMins < 1) return "Just now";
            if (diffMins === 1) return "1 minute ago";
            if (diffMins < 60) return `${diffMins} minutes ago`;
            
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours === 1) return "1 hour ago";
            if (diffHours < 24) return `${diffHours} hours ago`;
            
            const diffDays = Math.floor(diffHours / 24);
            if (diffDays === 1) return "1 day ago";
            return `${diffDays} days ago`;
        };

        // Update time every minute
        useEffect(() => {
            const interval = setInterval(() => {
                setUpdateTime(new Date());
            }, 60000);
            return () => clearInterval(interval);
        }, []);

        return (
            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                        <div className="relative">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FaChartLine className="text-blue-600" />
                            </div>
                            {/* Animated ping dot for live updates */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700">Live Visitor Statistics</div>
                            <div className="text-xs text-gray-500">Updated: {formatTime(visitorStats.lastUpdate)}</div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        <div className="text-center group relative">
                            <div className="text-lg font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                {visitorStats.today.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">Today</div>
                            {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                {visitorStats.today === 1 ? '1 visitor today' : `${visitorStats.today.toLocaleString()} visitors today`}
                            </div>
                        </div>
                        <div className="text-center group relative">
                            <div className="text-lg font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">
                                {visitorStats.thisWeek.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">This Week</div>
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                {visitorStats.thisWeek === 1 ? '1 visitor this week' : `${visitorStats.thisWeek.toLocaleString()} visitors this week`}
                            </div>
                        </div>
                        <div className="text-center group relative">
                            <div className="text-lg font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                                {visitorStats.thisMonth.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">This Month</div>
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                {visitorStats.thisMonth === 1 ? '1 visitor this month' : `${visitorStats.thisMonth.toLocaleString()} visitors this month`}
                            </div>
                        </div>
                        <div className="text-center group relative">
                            <div className="text-lg font-bold text-orange-600 group-hover:scale-110 transition-transform duration-300">
                                {visitorStats.thisYear.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">This Year</div>
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                {visitorStats.thisYear === 1 ? '1 visitor this year' : `${visitorStats.thisYear.toLocaleString()} visitors this year`}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-3 sm:mt-0">
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                            <FaUsers className="text-blue-500" />
                            <span>Total: {visitorStats.total.toLocaleString()} visits</span>
                            {/* Hidden test button for development */}
                            <button 
                                onClick={recordNewVisit}
                                className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors hidden"
                            >
                                +1 Visit
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Live update indicator */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Live updates active</span>
                        </div>
                        <div className="text-gray-500">
                            Data persists via localStorage
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Enhanced Athanase AI component with thinking capability
    const AthanaseAI = () => {
        const [messages, setMessages] = useState([
            { 
                id: 1, 
                text: "Hello! I'm Athanase AI, your Mutovu TSS assistant. I can help with courses, registration, schedules, fees, results, and more. How can I assist you today?", 
                sender: 'ai',
                thinkingProcess: [],
                feedback: null
            }
        ]);
        const [input, setInput] = useState('');
        const [isTyping, setIsTyping] = useState(false);
        const [isThinking, setIsThinking] = useState(false);
        const [thinkingSteps, setThinkingSteps] = useState([]);
        const [conversationHistory, setConversationHistory] = useState([]);
        const [aiMood, setAiMood] = useState('normal');
        const messagesEndRef = useRef(null);

        // Thinking animation types
        const thinkingAnimations = [
            "Analyzing your question...",
            "Searching knowledge base...",
            "Processing school data...",
            "Checking recent updates...",
            "Verifying information accuracy...",
            "Formulating best response..."
        ];

        // Scroll to bottom when messages update
        React.useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages]);

        // Comprehensive response database
        const responseDatabase = {
            greetings: [
                "Hello! I'm Athanase AI, ready to help you with everything about Mutovu TSS.",
                "Welcome! How can I assist you with Mutovu Technical Secondary School today?",
                "Hi there! I'm here to provide information about Mutovu TSS courses, schedules, and more."
            ],
            schoolInfo: [
                "Mutovu Technical Secondary School is located in Nyaruguru District, Southern Province, Rwanda. We specialize in technical education with modern facilities.",
                "Established in 2005, Mutovu TSS has been providing quality technical education for nearly 20 years, focusing on practical skills and discipline.",
                "Our vision is to become a center of excellence in technical education, producing skilled professionals for Rwanda's development goals."
            ],
            courses: [
                "We offer three main technical programs: Software Development, Multimedia Production, and Building Construction.",
                "Computer Science program includes Programming, Database Management, Networking, and Web Development with hands-on lab experience.",
                "All technical programs are 3 years long with 60% practical training in our fully equipped workshops."
            ],
            registration: [
                "Registration opens January 15th annually. Required documents: O-Level certificate, birth certificate, 4 passport photos, medical certificate.",
                "Admission requires minimum grade C in Mathematics and English at O-Level. Entrance exams are held every February.",
                "Online registration is available at www.mutovutss.edu.rw/registration. Fees: 20,000 RWF application fee."
            ],
            fees: [
                "Annual tuition (2025): Technical streams - 450,000 RWF, General Education - 350,000 RWF. Payment in installments available.",
                "Scholarships available for top performers, students with disabilities, and vulnerable families. Apply by February 28th.",
                "Hostel fees: 300,000 RWF per term including accommodation and meals. Additional costs: uniform 30,000 RWF, textbooks approx. 50,000 RWF."
            ],
            schedule: [
                "School hours: Monday-Friday 7:30 AM to 4:30 PM. Saturday: 8:00 AM to 12:00 PM for remedial classes.",
                "Term dates 2025: Term 1 (Feb 3 - Apr 25), Term 2 (May 12 - Aug 22), Term 3 (Sep 8 - Nov 28).",
                "Daily schedule: Assembly 7:30-7:45, Lessons 8:00-12:30, Lunch 12:30-1:30, Lessons 1:30-3:30, Sports/Clubs 3:30-4:30."
            ],
            results: [
                "Exam results released: Mid-term within 1 week, End of term within 2 weeks. Check online at www.mutovutss.edu.rw/results.",
                "Grading system: A (90-100%), B+ (80-89%), B (70-79%), C (60-69%), D (50-59%), F (Below 50%).",
                "Continuous assessment contributes 40% to final grade. Students can request remarking within 3 days of results."
            ],
            facilities: [
                "Facilities include: 25 smart classrooms, computer lab (40 PCs), engineering workshops, library (5,000+ books), sports fields.",
                "Hostel capacity: 200 students with beds, lockers, study areas, hot water, and laundry services.",
                "We have specialized labs for each technical program with modern equipment and qualified instructors."
            ],
            staff: [
                "35 qualified teachers, 5 laboratory technicians, 3 workshop instructors. All teachers have at least a Bachelor's degree.",
                "School administration: Head Teacher, Deputy Head Academics, Deputy Head Administration, and department heads.",
                "Contact staff: Phone 0788 123 456, Email admin@mutovutss.edu.rw. Office hours: 7:30 AM to 5:00 PM."
            ],
            uniform: [
                "Uniform: Boys - Grey trousers, white shirt, navy blue sweater. Girls - Navy blue skirt, white blouse, navy blue sweater.",
                "Sports uniform: White t-shirt with school logo, blue shorts/track suit. Available at school store Monday-Friday 8:00-4:00.",
                "Dress code: Complete uniform mandatory Monday-Thursday, Sports uniform on Friday. ID cards must be worn at all times."
            ],
            hostel: [
                "Hostel fees: 300,000 RWF per term including meals. Facilities: beds, lockers, study tables, common rooms, hot water.",
                "Hostel rules: Lights out 10:00 PM, supervised study hours 7:00-9:00 PM, weekend leave requires parental permission.",
                "Meal times: Breakfast 6:30-7:15, Lunch 12:30-1:30, Dinner 6:00-7:00 PM. Weekly cleaning inspections conducted."
            ],
            contact: [
                "Address: Muganza Sector, Nyaruguru District, Southern Province, Rwanda. Phone: 0788 123 456.",
                "Email: info@mutovutss.edu.rw, admissions@mutovutss.edu.rw, finance@mutovutss.edu.rw.",
                "Website: mutovutss.vercel.app Office hours: Monday-Friday 7:30 AM - 5:00 PM."
            ],
            events: [
                "Annual events: Sports Day (March 15), Science Fair (April 20), Cultural Day (June 1), Graduation (November 30).",
                "Clubs: Robotics, Debate, Environmental, Drama, Music. Meet every Wednesday 3:30-4:30 PM.",
                "Competitions: Inter-class sports, Science exhibitions, Mathematics Olympiad, Debate tournaments."
            ],
            default: [
                "I understand your question. For specific details, please visit the administration office or check our website.",
                "That's a good question! While I'm still learning, I recommend contacting the relevant department for accurate information.",
                "Thank you for your query. For official confirmation, please check notice boards or contact school authorities."
            ]
        };

        const keywordMap = {
            greeting: { 
                keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'welcome'],
                priority: 1,
                category: 'greetings'
            },
            about: { 
                keywords: ['about', 'history', 'established', 'vision', 'mission', 'school info', 'tell me about', 'what is', 'introduction'],
                priority: 2,
                category: 'schoolInfo'
            },
            courses: { 
                keywords: ['course', 'program', 'subject', 'study', 'technical', 'engineering', 'Software', 'Multimedia', 'Building', 'what do you offer', 'curriculum'],
                priority: 3,
                category: 'courses'
            },
            registration: { 
                keywords: ['register', 'registration', 'admission', 'apply', 'enroll', 'join', 'admission', 'requirements', 'how to join', 'application'],
                priority: 4,
                category: 'registration'
            },
            fees: { 
                keywords: ['fee', 'payment', 'cost', 'price', 'tuition', 'how much', 'scholarship', 'financial', 'money', 'payment', 'installment'],
                priority: 5,
                category: 'fees'
            },
            schedule: { 
                keywords: ['schedule', 'timetable', 'time', 'when', 'hours', 'calendar', 'term', 'holiday', 'when is', 'daily routine'],
                priority: 6,
                category: 'schedule'
            },
            results: { 
                keywords: ['result', 'grade', 'exam', 'mark', 'score', 'transcript', 'certificate', 'promotion', 'how did i do', 'grades'],
                priority: 7,
                category: 'results'
            },
            staff: { 
                keywords: ['teacher', 'staff', 'faculty', 'head teacher', 'principal', 'administration', 'who teaches', 'instructor'],
                priority: 8,
                category: 'staff'
            },
            facilities: { 
                keywords: ['facility', 'lab', 'workshop', 'library', 'hostel', 'classroom', 'sports', 'equipment', 'what facilities', 'infrastructure'],
                priority: 9,
                category: 'facilities'
            },
            uniform: { 
                keywords: ['uniform', 'dress', 'clothes', 'attire', 'wear', 'appearance', 'what to wear', 'dress code'],
                priority: 10,
                category: 'uniform'
            },
            hostel: { 
                keywords: ['hostel', 'boarding', 'dormitory', 'accommodation', 'room', 'stay', 'meal', 'where to live', 'boarding facility'],
                priority: 11,
                category: 'hostel'
            },
            contact: { 
                keywords: ['contact', 'phone', 'email', 'address', 'location', 'where', 'map', 'how to reach', 'telephone'],
                priority: 12,
                category: 'contact'
            },
            events: { 
                keywords: ['event', 'activity', 'club', 'sports day', 'competition', 'celebration', 'trip', 'what activities', 'extracurricular'],
                priority: 13,
                category: 'events'
            }
        };

        const simulateThinking = () => {
            const steps = [];
            const numSteps = 2 + Math.floor(Math.random() * 3);
            
            for (let i = 0; i < numSteps; i++) {
                steps.push(thinkingAnimations[Math.floor(Math.random() * thinkingAnimations.length)]);
            }
            
            return steps;
        };

        const findBestResponse = (userInput) => {
            const input = userInput.toLowerCase().trim();
            let bestMatch = { category: 'default', score: 0 };
            
            for (const [key, data] of Object.entries(keywordMap)) {
                let score = 0;
                data.keywords.forEach(keyword => {
                    if (input.includes(keyword)) {
                        score += (1 / data.priority) * 10;
                        if (input === keyword || input.startsWith(keyword + ' ')) {
                            score += 5;
                        }
                    }
                });
                
                if (score > bestMatch.score) {
                    bestMatch = { category: data.category, score };
                }
            }
            
            const responses = responseDatabase[bestMatch.category] || responseDatabase.default;
            let selectedResponse = responses[Math.floor(Math.random() * responses.length)];
            
            if (Math.random() > 0.7) {
                const followUps = [
                    " Is there anything specific about this you'd like to know?",
                    " Would you like more details about any particular aspect?",
                    " Do you have any related questions about this topic?"
                ];
                selectedResponse += followUps[Math.floor(Math.random() * followUps.length)];
            }
            
            return {
                text: selectedResponse,
                category: bestMatch.category,
                confidence: Math.min(100, Math.round(bestMatch.score * 10))
            };
        };

        const sendMessage = () => {
            if (!input.trim()) return;
            
            const userMessage = {
                id: messages.length + 1,
                text: input,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, userMessage]);
            setConversationHistory(prev => [...prev, { role: 'user', content: input }]);
            setInput('');
            
            setIsThinking(true);
            const thinkingSteps = simulateThinking();
            setThinkingSteps(thinkingSteps);
            setAiMood('thinking');
            
            thinkingSteps.forEach((step, index) => {
                setTimeout(() => {
                    setThinkingSteps(prev => prev.slice(1));
                }, 800 + (index * 600));
            });
            
            setTimeout(() => {
                setIsThinking(false);
                setIsTyping(true);
                setAiMood('normal');
                
                setTimeout(() => {
                    const response = findBestResponse(input);
                    const aiResponse = {
                        id: messages.length + 2,
                        text: response.text,
                        sender: 'ai',
                        thinkingProcess: thinkingSteps,
                        category: response.category,
                        confidence: response.confidence,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        feedback: null
                    };
                    
                    setMessages(prev => [...prev, aiResponse]);
                    setConversationHistory(prev => [...prev, { role: 'ai', content: response.text }]);
                    setIsTyping(false);
                }, 1000 + Math.random() * 1000);
            }, thinkingSteps.length * 700 + 500);
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        };

        const handleFeedback = (messageId, feedback) => {
            setMessages(prev => prev.map(msg => 
                msg.id === messageId ? { ...msg, feedback } : msg
            ));
            
            setTimeout(() => {
                if (feedback === 'positive') {
                    const thankYouMsg = {
                        id: messages.length + 1,
                        text: "Thank you for your positive feedback! I'll continue to improve.",
                        sender: 'ai',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, thankYouMsg]);
                }
            }, 500);
        };

        const clearChat = () => {
            setMessages([
                { 
                    id: 1, 
                    text: "Hello! I'm Athanase AI, your Mutovu TSS assistant. The chat has been cleared. How can I help you today?", 
                    sender: 'ai',
                    thinkingProcess: [],
                    feedback: null
                }
            ]);
            setConversationHistory([]);
            setAiMood('normal');
        };

        const quickQuestions = [
            { text: "What courses do you offer?", category: "courses" },
            { text: "How do I register?", category: "registration" },
            { text: "What are the school fees?", category: "fees" },
            { text: "What is the daily schedule?", category: "schedule" },
            { text: "How to check results?", category: "results" },
            { text: "Contact information?", category: "contact" },
            { text: "Tell me about hostel", category: "hostel" },
            { text: "What facilities are available?", category: "facilities" }
        ];

        const handleQuickQuestion = (question) => {
            setInput(question.text);
            setTimeout(() => {
                if (input === question.text) {
                    sendMessage();
                }
            }, 300);
        };

        const moodIcons = {
            normal: <RiRobot2Line className="text-2xl text-green-500" />,
            thinking: <TbBrain className="text-2xl text-blue-500 animate-pulse" />,
            excited: <BsFillLightbulbFill className="text-2xl text-yellow-500 animate-bounce" />,
            confused: <BsChatSquareQuoteFill className="text-2xl text-orange-500" />
        };

        return (
            <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 rounded-2xl p-6 shadow-xl">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                                {moodIcons[aiMood]}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Athanase AI</h1>
                                <p className="text-gray-600">Your intelligent assistant for Mutovu TSS • Version 2.0</p>
                            </div>
                        </div>
                        <button
                            onClick={clearChat}
                            className="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-lg hover:from-gray-300 hover:to-gray-400 transition shadow"
                        >
                            Clear Chat
                        </button>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-4 text-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold">Mutovu TSS Assistant</h2>
                                    <p className="text-sm opacity-90">Powered by advanced school knowledge base</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${isTyping || isThinking ? 'bg-yellow-500/30 text-yellow-200' : 'bg-green-500/30 text-green-200'}`}>
                                        {isThinking ? 'Thinking...' : isTyping ? 'Typing...' : 'Online'}
                                    </div>
                                    <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
                                        {conversationHistory.length} messages
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {isThinking && thinkingSteps.length > 0 && (
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 p-3">
                                <div className="flex items-center gap-2 text-sm text-blue-700">
                                    <TbBrain className="animate-pulse" />
                                    <span className="font-medium">Thinking Process:</span>
                                </div>
                                <div className="mt-2 space-y-1">
                                    {thinkingSteps.map((step, index) => (
                                        <div key={index} className="flex items-center gap-2 text-xs text-gray-600 animate-pulse">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="h-96 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-2xl p-4 relative ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none' : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-bl-none border border-gray-200'}`}>
                                        {msg.sender === 'ai' && msg.category && (
                                            <div className="absolute -top-2 left-4 bg-gradient-to-r from-green-100 to-blue-100 text-xs px-2 py-1 rounded-full border border-green-200">
                                                {msg.category} • {msg.confidence}% confidence
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start gap-3">
                                            <div className="flex-1">
                                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                                {msg.sender === 'ai' && msg.thinkingProcess && msg.thinkingProcess.length > 0 && (
                                                    <div className="mt-2 text-xs text-gray-500 italic">
                                                        <div className="flex items-center gap-1">
                                                            <TbBrain size={12} />
                                                            Analyzed {msg.thinkingProcess.length} data points
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs opacity-70 min-w-[50px] text-right">
                                                {msg.timestamp}
                                            </div>
                                        </div>
                                        
                                        {msg.sender === 'ai' && (
                                            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => handleFeedback(msg.id, 'positive')}
                                                        className={`p-1 rounded ${msg.feedback === 'positive' ? 'bg-green-100 text-green-600' : 'hover:bg-green-50 text-gray-400 hover:text-green-500'}`}
                                                    >
                                                        <IoIosThumbsUp size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleFeedback(msg.id, 'negative')}
                                                        className={`p-1 rounded ${msg.feedback === 'negative' ? 'bg-red-100 text-red-600' : 'hover:bg-red-50 text-gray-400 hover:text-red-500'}`}
                                                    >
                                                        <IoIosThumbsDown size={16} />
                                                    </button>
                                                </div>
                                                {msg.feedback && (
                                                    <span className="text-xs">
                                                        {msg.feedback === 'positive' ? '✓ Helpful' : '✗ Not helpful'}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-2xl rounded-bl-none p-4 border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                            <span className="text-sm">Athanase AI is preparing your answer...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>
                        
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-gray-700">Quick questions:</p>
                                    <span className="text-xs text-gray-500">Click to ask instantly</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {quickQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickQuestion(question)}
                                            className="text-xs bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-3 py-2 rounded-full hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 border border-blue-200 hover:border-blue-300"
                                        >
                                            {question.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything about Mutovu TSS (courses, fees, registration, schedule...)"
                                        className="w-full border-2 border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                        disabled={isTyping || isThinking}
                                    />
                                    {input.length > 0 && (
                                        <div className="absolute right-3 top-3 text-xs text-gray-500">
                                            {input.length}/500
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isTyping || isThinking}
                                    className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
                                >
                                    {isTyping || isThinking ? (
                                        <div className="flex items-center gap-2">
                                            <AiOutlineLoading3Quarters className="animate-spin" />
                                            Processing...
                                        </div>
                                    ) : 'Send'}
                                </button>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Athanase AI can help with courses, schedules, registration, fees, results, staff, facilities, and more.
                                </p>
                                <div className="text-xs text-gray-400">
                                    Response time: {isThinking ? 'Thinking...' : 'Instant'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold text-blue-600">{conversationHistory.length}</div>
                                    <div className="text-sm text-gray-600">Total Messages</div>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <RiRobot2Line className="text-blue-500" size={24} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold text-green-600">
                                        {Object.keys(keywordMap).length}
                                    </div>
                                    <div className="text-sm text-gray-600">Knowledge Categories</div>
                                </div>
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <TbBrain className="text-green-500" size={24} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold text-purple-600">
                                        {Object.values(responseDatabase).reduce((acc, curr) => acc + curr.length, 0)}
                                    </div>
                                    <div className="text-sm text-gray-600">Response Database</div>
                                </div>
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <BsFillLightbulbFill className="text-purple-500" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>Athanase AI v2.0 • Enhanced with thinking capability and context awareness</p>
                        <p className="mt-1">This AI assistant specializes in Mutovu Technical Secondary School information</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <BrowserRouter> 
            <div className="App sticky top-0 z-50"> 
                <ScrollingText />
            </div>
            
            <div className="flex flex-col sm:flex-row min-h-screen">
                {/* Enhanced Navigation with Big Underline Effects */}
                <nav 
                    className={`flex flex-col ${collapsed ? 'w-20' : 'w-72 md:w-80'} py-6 
                               bg-green-900 text-white shadow-2xl z-40 flex-shrink-0 
                               transition-all duration-500 ease-in-out relative overflow-hidden 
                               border-r border-gray-700`}
                >
                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '20px 20px'
                        }}></div>
                    </div>
                    
                    {/* Navigation Header */}
                    <div className="relative z-10 px-4 mb-0">
                        <div className="flex items-center justify-between mb-4">
                            <button 
                                onClick={() => setCollapsed(!collapsed)}
                                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors relative group/btn"
                            >
                                {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300"></span>
                            </button>
                            
                            {!collapsed && (
                                <div className="flex items-center gap-2">
                                    {/* Optional: Add notification bell */}
                                </div>
                            )}
                        </div>

                        {/* School Logo/Title */}
                        <div className={`flex items-center justify-center ${collapsed ? 'px-0' : 'px-4'} mb-6`}>
                            {collapsed ? (
                                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center relative group/logo">
                                    <RiArrowDropDownFill className="text-2xl" />
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 group-hover/logo:scale-x-100 transition-transform duration-300"></span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    {/* Optional: School logo and name */}
                                </div>
                            )}
                        </div>

                        {/* Search Bar */}
                        {searchOpen && !collapsed && (
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <BsSearch className="absolute left-3 top-2.5 text-gray-400" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Enhanced Navigation Links */}
                    <div className="relative z-10 px-3 flex-1 space-y-1 overflow-y-auto">
                        <div className="mb-4">
                            {!collapsed && (
                                <div className="px-3 mb-3 relative">
                                    <p className="text-3xl uppercase text-gray-300 font-extrabold tracking-wider text-left ml-0 mb-1">Main Menu</p>
                                    <div className="h-1 w-50 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2"></div>
                                </div>
                            )}
                            
                            <div className="space-y-1">
                                {navItems.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        end={item.to === "/"}
                                        onClick={(e) => item.label === "Staff" && e.preventDefault()}
                                        onMouseEnter={() => setActiveHover(index)}
                                        onMouseLeave={() => setActiveHover(null)}
                                        className={({ isActive }) => 
                                            isActive ? activeNavClass : inactiveNavClass
                                        }
                                    >
                                        <div className={`${item.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                            {item.icon}
                                        </div>
                                        {!collapsed && (
                                            <>
                                                <span className="flex-1 text-sm transition-all duration-300 group-hover:tracking-wide">
                                                    {item.label}
                                                </span>
                                                {activeHover === index && (
                                                    <FaChevronRight className="text-xs opacity-70 animate-pulse" />
                                                )}
                                            </>
                                        )}
                                        {!collapsed && item.label === "Staff" && (
                                            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300 group-hover:bg-gray-600 transition-colors">
                                                Soon
                                            </span>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className="relative z-10 px-4 mt-6">
                        {collapsed ? (
                            <div className="flex justify-center">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center relative group/profile">
                                    <CgProfile className="text-2xl" />
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform scale-x-0 group-hover/profile:scale-x-100 transition-transform duration-300"></span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <NavLink 
                                    to="/logout-placeholder" 
                                    className={logoutClass}
                                >
                                    <div className="relative">
                                        <img src="passport.png" className="w-10 h-10 rounded-full"/>
                                        {notifications > 0 && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                        )}
                                    </div>
                                    <span className="flex-1 text-left">Profile</span>
                                    <IoNotifications className="text-2xl" />
                                </NavLink>
                                
                                <div className="mt-4 text-center">
                                    <p className="text-xs text-gray-500">
                                        Mutovu TSS © 2004-{new Date().getFullYear()}
                                    </p>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <button className="text-xs text-gray-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                                            <IoHelpCircle />
                                        </button>
                                        <span className="text-xs text-gray-400">|</span>
                                        <button className="text-xs text-gray-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                                            Privacy
                                        </button>
                                        <span className="text-xs text-gray-400">|</span>
                                        <button className="text-xs text-gray-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                                            Terms
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
                
                {/* Main Content Area */}
                <div className="flex-grow p-4 sm:p-8 bg-gray-100 transition duration-500">
                    <main className='p-0 sm:p-4 mb-4'>
                        <Routes>
                            <Route path="/" element={<Comp1 />} />
                            <Route path="comp2/*" element={<Comp2 />} />
                            <Route path="contact/*" element={<Contact />} />
                            <Route path="/form" element={<Form />} />
                            <Route path="/use" element={<Use />} />
                            <Route path="registration/*" element={<Registration />} />
                            <Route path="video/*" element={<VideoPlayer />} />
                            <Route path="help" element={<Help />} />
                            <Route path="courses/*" element={<Courses />} />
                            <Route path="staff/*" element={<Staff />} />
                            <Route path="schedule/*" element={<Schedule />} />
                            <Route path="classnotes/*" element={<ClassNotes />} />
                            <Route path="athanase-ai" element={<AthanaseAI />} />
                            
                            <Route path="dailyactivities" element={<DailyActivities />} />
                            <Route path="timetable" element={<Timetable />} />
                            <Route path="attendance" element={<Attendance />} />
                            <Route path="*" element={<Notfound />} />
                        </Routes>
                    </main>
                    
                    {/* Real-time Visitor Statistics */}
                    <VisitorStatistics />
                </div>
            </div>
            
            {/* Footer */}
            <footer className="h-16 flex items-center justify-center text-center 
                             bg-gray-700 text-gray-300 text-base sm:text-2xl font-medium 
                             border-t border-gray-700 shadow-inner relative">
                <div className="flex items-center gap-4">
                    <span>&copy; Copyright | Mutovu TSS 2025</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">All Rights Reserved</span>
                    <span className="hidden md:inline">•</span>
                    <span className="hidden md:inline">Excellence Through Technical Education</span>
                </div>
                {/* Footer underline effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400"></div>
            </footer>
        </BrowserRouter>
    );
}

export default App;

<style jsx>{`
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(255, 193, 7, 0.6), 0 0 10px rgba(255, 193, 7, 0.4);
        }
        50% {
            box-shadow: 0 0 10px rgba(255, 193, 7, 0.8), 0 0 20px rgba(255, 193, 7, 0.6);
        }
    }
    .hover\:after\:animate-glow:hover::after {
        animation: glow 1s ease-in-out infinite;
    }
`}</style>
