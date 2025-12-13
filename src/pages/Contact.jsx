import React from 'react';
// Changed 'Link' to 'NavLink' for proper active styling and interactivity
import { Outlet, NavLink, Route, Routes } from "react-router-dom";
// Assuming these components exist for rendering nested content
import ContactPhone from "./ContactPhone";
import ContactEmail from "./ContactEmail";

// --- 1. Define Enhanced Tailwind CSS Utility Classes for Interactivity and Design ---

const baseLinkStyle = 
  "px-6 py-3 text-xl sm:text-2xl font-bold rounded-xl transition duration-300 ease-in-out whitespace-nowrap border-b-4";

// Inactive Link Style: Subtle hover effects, uses smooth transition and scale
const inactiveLinkStyle = 
  `${baseLinkStyle} text-gray-700 bg-gray-200 border-transparent hover:bg-blue-100 hover:text-blue-800 ` +
  `transform hover:scale-105 hover:shadow-lg`;

// Active Link Style: Strong visual prominence, dynamic interaction
const activeLinkStyle = 
  `${baseLinkStyle} bg-blue-700 text-yellow-300 border-yellow-400 shadow-2xl ` +
  `transform scale-[1.08] hover:bg-blue-800 ring-2 ring-blue-500/50`; // Scale, strong shadow, and accent ring for active tab

// --- 2. Contact Component ---
function Contact() {
  return (
    // Enhanced main container with styling and responsiveness
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-2xl border-t-8 border-blue-700 animate-slideIn">
      
      {/* Header with improved styling */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-8 pb-3 border-b-2 border-gray-100 text-center">
        Contact <span className="text-yellow-500">Mutovu TSS</span>
      </h1>
      
      {/* Navigation using NavLink for active state */}
      <nav className="flex flex-wrap justify-center gap-4 mb-10">
        
        {/* Email Link */}
        <NavLink 
          to="contactemail" 
          className={({ isActive }) => 
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          Email
        </NavLink>
        
        {/* Separator (Styled as a vertical divider for modern feel) */}
        <span className="hidden sm:block text-4xl font-light text-gray-400 select-none">|</span>
        
        {/* Phone Link */}
        <NavLink 
          to="contactphone" 
          className={({ isActive }) => 
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          Phone
        </NavLink>
      </nav>
      
      {/* Content Area: Routes and Outlet */}
      <div className="p-4 sm:p-6 border-4 border-dashed border-gray-300 rounded-xl bg-gray-50/70 min-h-[300px] shadow-inner transition duration-500">
        <Routes>
          <Route path="contactemail" element={<ContactEmail />} />
          <Route path="contactphone" element={<ContactPhone/>} />
          
          {/* Index route guidance */}
          <Route 
            index 
            element={
              <div className="text-center p-10 text-xl font-medium text-gray-600 animate-pulse">
                Please select **Email** or **Phone** contact method above.
              </div>
            }
          />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}

export default Contact;