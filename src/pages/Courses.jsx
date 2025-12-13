import React from 'react';
// Changed 'Link' to 'NavLink' for proper active state styling
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
// Assuming these components exist
import MultimediaProduction from './MultimediaProduction';
import SoftwareDevelopment from './SoftwareDevelopment';
import BuildingConstruction from './BuildingConstruction';

// --- Define Tailwind Utility Classes ---
// Base styles for the nested navigation links
const navBaseClass = 
  "px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out whitespace-nowrap";

// Style for the active NavLink
const navActiveClass = 
  `${navBaseClass} bg-blue-600 text-white shadow-lg shadow-blue-500/50 ` +
  `transform scale-[1.05] ring-2 ring-blue-300`;

// Style for the inactive NavLink
const navInactiveClass = 
  `${navBaseClass} text-gray-700 bg-gray-200 hover:bg-blue-100 hover:text-blue-800 ` +
  `transform hover:scale-[1.02] hover:shadow-md`;

// --- Courses Component ---
function Courses() {
  return (
    // Enhanced outer container
    <div className="p-4 sm:p-8 md:p-12 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 border-t-8 border-blue-600">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 border-b-4 border-yellow-400 pb-3 text-center">
          Technical <span className="text-blue-600">Courses</span>
        </h1>
        
        {/* Nested Navigation with enhanced styles */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 p-4 bg-gray-100 rounded-xl shadow-inner">
          <NavLink 
            to="" 
            end 
            className={({ isActive }) => 
              isActive ? navActiveClass : navInactiveClass
            }
          >
            All Courses Overview
          </NavLink>
          <NavLink 
            to="multimedia" 
            className={({ isActive }) => 
              isActive ? navActiveClass : navInactiveClass
            }
          >
            Multimedia Production
          </NavLink>
          <NavLink 
            to="software" 
            className={({ isActive }) => 
              isActive ? navActiveClass : navInactiveClass
            }
          >
            Software Development
          </NavLink>
          <NavLink 
            to="construction" 
            className={({ isActive }) => 
              isActive ? navActiveClass : navInactiveClass
            }
          >
            Building Construction
          </NavLink>
        </div>
        
        {/* Content Area with transition */}
        <div className="min-h-[400px]">
          <Routes>
            <Route path="multimedia" element={<MultimediaProduction />} />
            <Route path="software" element={<SoftwareDevelopment />} />
            <Route path="construction" element={<BuildingConstruction />} />
            <Route path="/" element={<CoursesOverview />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// --- Courses Overview Component (Enhanced) ---
function CoursesOverview() {
  const courses = [
    {
      title: "Multimedia Production",
      description: "Learn graphic design, video editing, animation, and digital media creation, focusing on industry-standard tools.",
      duration: "3 Years",
      icon: "🎨",
      color: "bg-blue-100 text-blue-800",
      link: "/courses/multimedia"
    },
    {
      title: "Software Development",
      description: "Master programming, web development, mobile apps, and database management using modern coding languages.",
      duration: "3 Years",
      icon: "💻",
      color: "bg-green-100 text-green-800",
      link: "/courses/software"
    },
    {
      title: "Building Construction",
      description: "Learn architectural drawing (CAD), construction techniques, civil works, and professional project management.",
      duration: "3 Years",
      icon: "🏗️",
      color: "bg-orange-100 text-orange-800",
      link: "/courses/construction"
    }
  ];

  return (
    <div className="space-y-10">
      <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fadeIn">Our Core Technical Programs</h2>
        <p className="text-gray-700 text-lg">
          Mutovu TSS offers comprehensive technical programs designed to equip students with 
          practical skills for today's job market. All programs emphasize hands-on training, 
          real-world projects, and industry internships to ensure job readiness.
        </p>
      </div>
      
      {/* Course Cards Grid - High Interaction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          // Card link with interactive group effects
          <NavLink 
            key={index} 
            to={course.link}
            className="group block transition-all duration-300 transform hover:scale-[1.03]"
          >
            <div 
              className="h-full p-6 bg-white rounded-xl shadow-lg border-b-4 border-transparent 
              transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-500 group-hover:ring-4 group-hover:ring-blue-100"
            >
              <div className="flex items-start mb-4">
                {/* Icon with hover rotation */}
                <div className={`w-14 h-14 rounded-full ${course.color} flex items-center justify-center mr-4 
                  transition-transform duration-500 transform group-hover:rotate-6 shadow-md`}>
                  <span className="text-3xl">{course.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-800 group-hover:text-blue-700 transition duration-300">
                    {course.title}
                  </h3>
                  <div className="text-md font-medium text-gray-500 mt-1">{course.duration}</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              {/* Call-to-action link with arrow animation */}
              <div className="text-blue-600 font-bold flex items-center group-hover:text-blue-800">
                View Course Details
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      
      {/* Admission Requirements Section - Styled for prominence */}
      <div className="bg-yellow-50 p-6 rounded-xl border-l-8 border-yellow-500 shadow-lg mt-10">
        <h3 className="text-2xl font-extrabold text-yellow-800 mb-4 border-b pb-2">Admission Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center text-lg transition hover:text-yellow-600">
              <svg className="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Completed O-Level education
            </li>
            <li className="flex items-center text-lg transition hover:text-yellow-600">
              <svg className="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Good grades in Mathematics and Sciences
            </li>
          </ul>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center text-lg transition hover:text-yellow-600">
              <svg className="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Pass entrance examination
            </li>
            <li className="flex items-center text-lg transition hover:text-yellow-600">
              <svg className="w-6 h-6 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Medical certificate
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Courses;