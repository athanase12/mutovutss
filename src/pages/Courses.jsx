import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import MultimediaProduction from './MultimediaProduction';
import SoftwareDevelopment from './SoftwareDevelopment';
import BuildingConstruction from './BuildingConstruction';

function Courses() {
  return (
    <div className="page-container">
      <div className="card">
        <h1 className="section-title">Technical Courses</h1>
        
        {/* Nested Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 p-4 bg-gray-50 rounded-lg">
          <Link 
            to="" 
            end 
            className={({ isActive }) => 
              `nested-nav-link ${isActive ? 'active' : 'text-gray-700 hover:bg-blue-400'}`
            }
          >
            All Courses
          </Link>
          <Link 
            to="multimedia" 
            className={({ isActive }) => 
              `nested-nav-link ${isActive ? 'active' : 'text-gray-700'}`
            }
          >
            Multimedia Production
          </Link>
          <Link 
            to="software" 
            className={({ isActive }) => 
              `nested-nav-link ${isActive ? 'active' : 'text-gray-700'}`
            }
          >
            Software Development
          </Link>
          <Link 
            to="construction" 
            className={({ isActive }) => 
              `nested-nav-link ${isActive ? 'active' : 'text-gray-700'}`
            }
          >
            Building Construction
          </Link>
        </div>
        
        {/* Content Area */}
        <div className="min-h-[400px] animate-fade-in">
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

function CoursesOverview() {
  const courses = [
    {
      title: "Multimedia Production",
      description: "Learn graphic design, video editing, animation, and digital media creation",
      duration: "3 Years",
      icon: "🎨",
      color: "bg-blue-100 text-blue-800",
      link: "/courses/multimedia"
    },
    {
      title: "Software Development",
      description: "Master programming, web development, mobile apps, and database management",
      duration: "3 Years",
      icon: "💻",
      color: "bg-green-100 text-green-800",
      link: "/courses/software"
    },
    {
      title: "Building Construction",
      description: "Learn architectural drawing, construction techniques, and project management",
      duration: "3 Years",
      icon: "🏗️",
      color: "bg-orange-100 text-orange-800",
      link: "/courses/construction"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Technical Programs</h2>
        <p className="text-gray-700">
          Mutovu TSS offers comprehensive technical programs designed to equip students with 
          practical skills for today's job market. All programs include hands-on training and 
          industry internships.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Link 
            key={index} 
            to={course.link}
            className="group block"
          >
            <div className="card h-full hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className={`w-12 h-12 rounded-lg ${course.color} flex items-center justify-center mr-4`}>
                  <span className="text-2xl">{course.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-700">
                    {course.title}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">{course.duration}</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="text-primary-600 font-medium flex items-center group-hover:text-primary-700">
                View Course Details
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-primary-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-primary-800 mb-4">Admission Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-primary-700">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Completed O-Level education
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Good grades in Mathematics and Sciences
            </li>
          </ul>
          <ul className="space-y-2 text-primary-700">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Pass entrance examination
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
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