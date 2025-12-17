// src/pages/Schedule/Schedule.jsx
import React from 'react';
// Assuming DailyActivities and Timetable are imported/defined elsewhere
import DailyActivities from './DailyActivities';
import Timetable from './Timetable'; 
// Corrected imports to use NavLink for active state functionality
import { Routes, Route, Outlet, NavLink } from 'react-router-dom'; 

// --- 1. Define Tailwind CSS Utility Classes for Interactivity and Design ---

const baseLinkStyle = 
  "px-5 py-3 text-base sm:text-lg font-semibold rounded-lg transition duration-300 ease-in-out cursor-pointer whitespace-nowrap";

const activeLinkStyle = 
  `${baseLinkStyle} bg-blue-600 text-yellow-300 shadow-xl border-b-4 border-yellow-400 ` +
  `transform scale-[1.03] hover:bg-blue-700 ring-2 ring-yellow-400/50`; // Scale, strong shadow, and accent ring for active tab
  
const inactiveLinkStyle = 
  `${baseLinkStyle} text-gray-700 hover:bg-gray-100 hover:text-blue-600 border-b-4 border-transparent ` +
  `hover:shadow-md transform hover:scale-105 hover:border-blue-300`; // Subtle scale, color change, and bottom border hover effect

// --- 2. Schedule Component ---
export default function Schedule() {
    return (
        // Enhanced main container with styling, responsiveness, and sticky header prevention
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl mx-auto my-8 border-t-4 border-blue-500 max-w-7xl animate-fadeIn">
            
            {/* Header with improved styling and text alignment */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-6 pb-2 border-b border-gray-200 text-center md:text-left">
                Schedule <span className="text-yellow-500">Overview</span>
            </h1>
            
            {/* Sub-Navigation with spacing, interactivity, and responsiveness */}
            <nav className="flex flex-wrap gap-4 sm:space-x-4 mb-8 justify-center sm:justify-start">
                
                {/* Daily Activities Link (Using NavLink for correct functionality) */}
                <NavLink 
                    to="dailyactivities" 
                    className={({ isActive }) =>
                        isActive ? activeLinkStyle : inactiveLinkStyle
                    }
                >
                    Daily Activities
                </NavLink> 
    
                {/* Timetable Link (Using NavLink for correct functionality) */}
                <NavLink 
                    to="timetable" 
                    className={({ isActive }) =>
                        isActive ? activeLinkStyle : inactiveLinkStyle
                    }
                >
                    Timetable
                </NavLink>
            </nav>
            
            {/* Content Area: Routes and Outlet */}
            <div className="p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 min-h-[300px] transition duration-500 shadow-inner">
                <Routes>
                    <Route path="dailyactivities" element={<DailyActivities/>}/>
                    <Route path="timetable" element={<Timetable/>}/>
                    
                    {/* Index route for when /schedule is hit directly */}
                    <Route 
                        index 
                        element={
                            <div className="text-center p-10 text-xl font-medium text-gray-600 animate-pulse">
                                Please select **Daily Activities** or **Timetable** above.
                            </div>
                        } 
                    />
                </Routes>
                <Outlet /> 
            </div>
        </div>
    );
}