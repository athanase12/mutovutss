import React, { useState } from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
// Assuming these components exist
import MultimediaProduction from './MultimediaProduction';
import SoftwareDevelopment from './SoftwareDevelopment';
import BuildingConstruction from './BuildingConstruction';
import pic from '../pages/pic.PNG';

// Import React Icons for better iconography
import { 
  FaPalette, 
  FaLaptopCode, 
  FaHardHat, 
  FaGraduationCap,
  FaArrowRight,
  FaCheckCircle,
  FaBookOpen,
  FaUsers,
  FaCalendarAlt,
  FaCertificate,
  FaChartLine,
  FaLightbulb,
  FaUniversity
} from 'react-icons/fa';
import { GiMaterialsScience } from 'react-icons/gi';

// Sample images (Replace with actual images in your project)
const courseImages = {
  multimedia: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  software: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  construction: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  campus: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
};

// --- Define Tailwind Utility Classes ---
const navBaseClass = 
  "px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out whitespace-nowrap flex items-center gap-2";

const navActiveClass = 
  `${navBaseClass} bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 transform scale-[1.05] ring-2 ring-blue-300 ring-offset-2`;

const navInactiveClass = 
  `${navBaseClass} text-gray-700 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-purple-50 hover:text-blue-800 border-2 border-transparent hover:border-blue-200 transform hover:scale-[1.02] hover:shadow-lg`;

// --- Courses Component ---
function Courses() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="p-4 sm:p-8 md:p-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border-t-8 border-blue-600 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100 rounded-full translate-y-24 -translate-x-24 opacity-20"></div>
        
        <div className="relative z-10">
          {/* Header with Logo and Title */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                <FaUniversity className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Courses</span>
                </h1>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <FaLightbulb className="text-yellow-500" />
                  Empowering Future Innovators
                </p>
              </div>
            </div>
            
            {/* Stats Badge */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border-2 border-blue-100 shadow-sm">
              <div className="flex items-center gap-3">
                <FaGraduationCap className="text-2xl text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Specialized Programs</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nested Navigation with enhanced styles */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-inner border-2 border-gray-100">
            {[
              { to: "", end: true, label: "All Courses Overview", icon: <FaBookOpen /> },
              { to: "multimedia", label: "Multimedia Production", icon: <FaPalette /> },
              { to: "software", label: "Software Development", icon: <FaLaptopCode /> },
              { to: "construction", label: "Building Construction", icon: <FaHardHat /> }
            ].map((item) => (
              <NavLink 
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => 
                  isActive ? navActiveClass : navInactiveClass
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
          
          {/* Content Area with transition */}
          <div className="min-h-[500px] animate-fadeIn">
            <Routes>
              <Route path="multimedia" element={<MultimediaProduction />} />
              <Route path="software" element={<SoftwareDevelopment />} />
              <Route path="construction" element={<BuildingConstruction />} />
              <Route path="/" element={<CoursesOverview hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />} />
            </Routes>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Courses Overview Component (Enhanced) ---
function CoursesOverview({ hoveredCard, setHoveredCard }) {
  const courses = [
    {
      id: 1,
      title: "Multimedia Production",
      description: "Master graphic design, video editing, 3D animation, and digital media creation using industry-standard tools like Adobe Creative Suite.",
      duration: "3 Years",
      icon: <FaPalette className="text-2xl" />,
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      textColor: "text-blue-800",
      link: "/courses/multimedia",
      image: courseImages.multimedia,
      stats: {
        projects: "50+",
        tools: "10+",
        certification: "Adobe Certified"
      },
      features: ["Graphic Design", "Video Production", "3D Animation", "UI/UX Design"]
    },
    {
      id: 2,
      title: "Software Development",
      description: "Become a full-stack developer mastering Python, JavaScript, React, Node.js, databases, and cloud deployment.",
      duration: "3 Years",
      icon: <FaLaptopCode className="text-2xl" />,
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      textColor: "text-green-800",
      link: "/courses/software",
      image: courseImages.software,
      stats: {
        projects: "100+",
        languages: "8+",
        certification: "AWS Certified"
      },
      features: ["Web Development", "Mobile Apps", "Database Design", "DevOps"]
    },
    {
      id: 3,
      title: "Building Construction",
      description: "Learn architectural CAD, construction management, civil engineering principles, and sustainable building practices.",
      duration: "3 Years",
      icon: <FaHardHat className="text-2xl" />,
      color: "from-orange-500 to-amber-400",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      textColor: "text-orange-800",
      link: "/courses/construction",
      image: courseImages.construction,
      stats: {
        projects: "30+",
        software: "AutoCAD",
        certification: "OSHA Safety"
      },
      features: ["Architectural CAD", "Project Management", "Civil Works", "Safety Standards"]
    }
  ];

  const admissionRequirements = [
    {
      title: "Academic Requirements",
      icon: <FaBookOpen className="text-xl" />,
      items: ["Completed O-Level education", "Good grades in Mathematics", "Science subjects proficiency"]
    },
    {
      title: "Technical Skills",
      icon: <GiMaterialsScience className="text-xl" />,
      items: ["Basic computer literacy", "Analytical thinking", "Creative problem-solving"]
    },
    {
      title: "Documents",
      icon: <FaCertificate className="text-xl" />,
      items: ["Medical certificate", "Birth certificate", "4 passport photos", "Recommendation letter"]
    }
  ];

  const stats = [
    { value: "95%", label: "Graduate Employment", icon: <FaChartLine />, color: "text-green-600" },
    { value: "200+", label: "Industry Partners", icon: <FaUsers />, color: "text-blue-600" },
    { value: "2024", label: "Intake Open", icon: <FaCalendarAlt />, color: "text-purple-600" },
    { value: "100%", label: "Practical Training", icon: <FaCheckCircle />, color: "text-orange-600" }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <FaGraduationCap className="text-4xl" />
            <h2 className="text-3xl font-bold">Transform Your Future with Hands-On Learning</h2>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl">
            Mutovu TSS offers state-of-the-art technical programs combining theoretical knowledge with 
            practical experience. Our industry-aligned curriculum ensures graduates are job-ready.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden md:block">
          <img 
            src={pic} 
            alt="Campus" 
            className="w-full h-full object-cover opacity-20 rounded-l-3xl"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`${stat.color} mb-2`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Course Cards Grid - Enhanced with Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            onMouseEnter={() => setHoveredCard(course.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative group"
          >
            <NavLink to={course.link}>
              <div className={`h-full ${course.bgColor} rounded-2xl shadow-xl overflow-hidden border-2 border-transparent group-hover:border-blue-300 transition-all duration-500 transform group-hover:-translate-y-2`}>
                
                {/* Course Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-20`}></div>
                  <div className="absolute top-4 right-4">
                    <div className={`p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg ${course.textColor}`}>
                      {course.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${course.textColor} ${course.bgColor} border border-white/30`}>
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-white rounded-full border border-gray-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="flex justify-between text-sm mb-6">
                    {Object.entries(course.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-gray-900">{value}</div>
                        <div className="text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button with Animation */}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center font-bold ${course.textColor} group-hover:${course.textColor.replace('800', '700')} transition-colors duration-300`}>
                      Explore Course
                      <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                    <div className="text-sm text-gray-500">
                      Click to learn more
                    </div>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                {hoveredCard === course.id && (
                  <div className="absolute inset-0 border-4 border-blue-400 rounded-2xl pointer-events-none animate-pulse"></div>
                )}
              </div>
            </NavLink>
          </div>
        ))}
      </div>

      {/* Admission Requirements - Enhanced */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg border-2 border-yellow-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-100 rounded-xl">
            <FaGraduationCap className="text-2xl text-yellow-600" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">Admission Requirements</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {admissionRequirements.map((section, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <div className="text-blue-600">
                    {section.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-800">{section.title}</h4>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <FaCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white text-center">
          <h4 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h4>
          <p className="mb-4 text-blue-100">Applications for 2024 intake are now open!</p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Courses;
