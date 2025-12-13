import React from 'react';
// Changed 'Link' to 'NavLink' for proper active styling and accessibility
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
// Assuming these components exist
import Mission from './Mission';
import History2 from './History2';

// --- 1. Define Tailwind CSS Utility Classes for Interactivity and Design ---

// Link Styles (Nested Navigation)
const baseLinkStyle = 
  "px-4 py-2 rounded-full font-semibold transition duration-300 ease-in-out whitespace-nowrap";

const inactiveLinkStyle = 
  `${baseLinkStyle} text-gray-700 hover:bg-blue-100 hover:text-blue-700 shadow-sm ` +
  `transform hover:scale-[1.05]`;

const activeLinkStyle = 
  `${baseLinkStyle} bg-blue-600 text-white shadow-xl ring-2 ring-blue-500/50 ` +
  `transform scale-110 hover:bg-blue-700`; // Dynamic scale and strong shadow for active tab

// --- 2. Main Component (Comp2 renamed to About for clarity) ---
function About() {
  return (
    // Replaced 'page-container' with modern Tailwind structure
    <div className="max-w-7xl mx-auto my-8 p-4 sm:p-6 md:p-10">
      
      {/* Replaced 'card' with dynamic, attractive card styling */}
      <div className="bg-white rounded-3xl shadow-2xl border-t-8 border-yellow-500 p-6 lg:p-10 transform transition duration-500 hover:shadow-3xl">
        
        {/* Replaced 'section-title' with specific styling */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-8 pb-3 border-b-2 border-gray-100 animate-slideInLeft">
          About <span className="text-yellow-500">Mutovu TSS</span>
        </h1>
        
        {/* Nested Navigation with enhanced interactivity */}
        <nav className="flex flex-wrap gap-3 mb-10 p-4 bg-gray-50 rounded-xl shadow-inner border-l-4 border-blue-200">
          
          <NavLink 
            to="" 
            end 
            className={({ isActive }) => 
              `${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            Overview
          </NavLink>
          <NavLink 
            to="history2" 
            className={({ isActive }) => 
              `${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            History
          </NavLink>
          <NavLink 
            to="mission" 
            className={({ isActive }) => 
              `${isActive ? activeLinkStyle : inactiveLinkStyle}`
            }
          >
            Mission & Vision
          </NavLink>
        </nav>
        
        {/* Content Area with subtle animation and defined boundaries */}
        <div className="min-h-[400px] p-4 sm:p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 animate-fade-in transition duration-500">
          <Routes>
            <Route path="history2" element={<History2 />} />
            <Route path="mission" element={<Mission />} />
            <Route path="/" element={<AboutOverview />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// --- 3. Overview Component (Added Interactivity to Sub-Sections) ---
function AboutOverview() {
  return (
    <div className="space-y-8">
      <div className="p-4 rounded-lg transition duration-500 hover:bg-blue-50/50">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">School Overview</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Mutovu Technical Secondary School is a premier institution in Nyaruguru District 
            dedicated to providing quality technical education to Rwandan youth. Established 
            to bridge the skills gap in technical fields, we offer hands-on training combined 
            with academic excellence.
          </p>
          <p className="text-gray-700">
            Our school is committed to producing graduates who are not only technically competent 
            but also ethically grounded and ready to contribute to Rwanda's development goals.
          </p>
        </div>
      </div>
      
      {/* Vision & Values Grid - Added Hover & Transition effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer">
          <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2 text-yellow-600 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            Our Vision
          </h3>
          <p className="text-gray-700">
            To be a center of excellence in technical education, producing skilled professionals 
            who drive innovation and sustainable development in Rwanda.
          </p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer">
          <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
            <svg className="w-6 h-6 mr-2 text-yellow-600 transform hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Our Values
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center group">
              <span className="w-3 h-3 bg-blue-600 rounded-full mr-3 transform transition duration-200 group-hover:scale-150 group-hover:bg-yellow-500"></span>
              Excellence in Education
            </li>
            <li className="flex items-center group">
              <span className="w-3 h-3 bg-blue-600 rounded-full mr-3 transform transition duration-200 group-hover:scale-150 group-hover:bg-yellow-500"></span>
              Innovation & Creativity
            </li>
            <li className="flex items-center group">
              <span className="w-3 h-3 bg-blue-600 rounded-full mr-3 transform transition duration-200 group-hover:scale-150 group-hover:bg-yellow-500"></span>
              Integrity & Ethics
            </li>
            <li className="flex items-center group">
              <span className="w-3 h-3 bg-blue-600 rounded-full mr-3 transform transition duration-200 group-hover:scale-150 group-hover:bg-yellow-500"></span>
              Community Service
            </li>
          </ul>
        </div>
      </div>
      
      {/* Quick Facts - Enhanced with interactivity and visual pop */}
      <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Facts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <FactItem number="2010" label="Established" color="text-red-600" />
          <FactItem number="800+" label="Students" color="text-blue-600" />
          <FactItem number="45+" label="Staff" color="text-green-600" />
          <FactItem number="6" label="Technical Labs" color="text-purple-600" />
          
        </div>
      </div>
    </div>
  );
}

// Helper component for interactive quick facts
const FactItem = ({ number, label, color }) => (
    <div className={`text-center p-3 rounded-lg shadow-md transition duration-300 transform hover:scale-110 hover:bg-white cursor-pointer group`}>
        <div className={`text-3xl font-bold ${color} transition duration-300 group-hover:text-4xl group-hover:tracking-wider`}>{number}</div>
        <div className={`text-sm text-gray-600 transition duration-300 group-hover:text-gray-800`}>{label}</div>
    </div>
);

// NOTE: Custom Keyframes (animate-slideInLeft, animate-spin-slow) 
// must be configured in tailwind.config.js for full effect.
export default About;