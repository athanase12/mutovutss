import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
// Assuming all pages components are available
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

function App() {
    // --- Define NavLink Styles for maximum interactivity ---
    const baseNavClass = 
        "flex font-semibold items-center gap-3 py-3 px-4 mx-3 rounded-xl " +
        "transition-all duration-300 ease-in-out cursor-pointer text-xl";

    const activeNavClass = 
        `${baseNavClass} bg-green-500 text-white shadow-lg shadow-green-500/50 ` +
        `transform scale-[1.05] ring-2 ring-yellow-400 font-extrabold`;

    const inactiveNavClass = 
        `${baseNavClass} text-gray-800 hover:bg-blue-200 hover:text-blue-900 ` +
        `transform hover:scale-[1.02] hover:shadow-xl`;
    
    // Custom class for the unique Logout link
    const logoutClass = 
        "text-lg font-bold w-full mx-auto mt-6 py-2 rounded-full flex items-center justify-center gap-2 " +
        "text-white bg-red-600 hover:bg-red-700 transition duration-300 transform hover:scale-105 shadow-xl " +
        "ring-4 ring-red-300/50";


    return (
        <BrowserRouter> 
            <div className="App sticky top-0 z-50"> 
                {/* ScrollingText remains sticky at the top, placed above the main flex container */}
                <ScrollingText />
            </div>
            
            <div className="flex flex-col sm:flex-row min-h-screen">
                {/* Navigation Sidebar */}
                <nav 
                    className="flex flex-col w-full sm:w-72 md:w-80 py-6 
                               bg-gradient-to-br from-purple-800 via-pink-700 to-cyan-500 
                               text-white shadow-2xl z-40 flex-shrink-0 transition-all duration-300"
                >
                    {/* Menu Header with strong visual style */}
                    <h1 className="text-3xl font-extrabold mb-6 px-4 pb-3 
                                   border-b-4 border-yellow-400 text-center flex items-center justify-center gap-3">
                        <RiArrowDropDownFill className="text-4xl animate-pulse" /> Mutovu TSS
                    </h1>
                    
                    {/* Navigation Links (All using the defined interactive styles) */}
                    <div className="space-y-2">
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <CiHome className="text-3xl text-yellow-300" /> Home
                        </NavLink>
                        <NavLink 
                            to="comp2/*" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <FcAbout className="text-3xl" /> About
                        </NavLink>
                        <NavLink 
                            to="contact/*" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <MdContactPhone className="text-3xl text-red-400" /> Contact
                        </NavLink>
                        <NavLink 
                            to="registration/*" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <MdOutlineAppRegistration className="text-3xl animate-spin-slow" /> Registration
                        </NavLink> 
                        <NavLink 
                            to="courses/*" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <MdOutlineCastForEducation className="text-3xl text-green-300" /> Courses
                        </NavLink> 
                        <NavLink 
                            to="staff" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <VscOrganization className="text-3xl text-purple-300" /> Staff
                        </NavLink> 
                        <NavLink 
                            to="schedule/*" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <AiFillSchedule className="text-3xl text-cyan-300" /> Schedule
                        </NavLink> 
                        <NavLink 
                            to="help" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <FaHandsHelping className="text-3xl text-orange-300" /> Help
                        </NavLink> 
                        <NavLink 
                            to="video" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <ImFileVideo className="text-3xl" /> Video
                        </NavLink> 
                        <NavLink 
                            to="form" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <IoSettingsOutline className="text-3xl animate-spin" /> Settings
                        </NavLink> 
                        <NavLink 
                            to="use" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <GiPineapple className="text-3xl text-blue-300" /> App. Count
                        </NavLink>
<NavLink 
                            to="classnotes" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <GrDocumentPdf className="text-3xl text-yellow-300" /> Class Notes
                        </NavLink>
<NavLink 
                            to="result" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <VscRepoFetch className="text-3xl text-green-300" /> Result Check
                        </NavLink>
<NavLink 
                            to="attendance" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <RiPresentationLine  className="text-3xl text-red-300" /> Attendance
                        </NavLink>
<NavLink 
                            to="calendar" 
                            className={({ isActive }) => isActive ? activeNavClass : inactiveNavClass}
                        >
                            <FcCalendar  className="text-3xl text-red-300" /> School Calendar
                        </NavLink>

                    </div>
                    
                    {/* Unique Logout Button with Strong Interaction */}
                    <div className="mt-auto px-4"> 
                        <NavLink 
                            to="/logout-placeholder" 
                            className={logoutClass}
                        >
                            <SlLogout className="w-6 h-6 hover:animate-pulse" /> Logout
                        </NavLink>
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
                            
                            {/* Nested routes definitions, often defined within the parent component's <Routes> */}
                            <Route path="dailyactivities" element={<DailyActivities />} />
                            <Route path="timetable" element={<Timetable />} />
                            
                            <Route path="*" element={<Notfound />} />
                        </Routes>
                    </main>
                </div>
            </div>
            
            {/* Footer with improved styling and responsiveness */}
            <footer className="h-16 flex items-center justify-center text-center bg-gray-800 text-gray-200 
                             text-base sm:text-xl font-medium border-t-4 border-red-600 shadow-inner">
                &copy; Copyright | Mutovu TSS 2025, All Rights Reserved.
            </footer>
        </BrowserRouter>
    );
}

export default App;