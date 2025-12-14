import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import MTVImage from '../pages/MTV.PNG'; // Ensure this path is correct

/**
 * Mutovu TSS Home Page Component (Hero Section)
 * Uses Tailwind CSS for a modern, responsive design.
 */
function Comp1() {
  return (
    <div className="min-h-[80vh] bg-gray-50">
      
      {/* 1. HERO SECTION: Full-width, high-impact area */}
      <div 
        className="relative h-[400px] w-full bg-cover bg-center mt-0"
        style={{ backgroundImage: `url(${MTVImage})` }}
      >
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-blue-900 opacity-60"></div>
        
        {/* Text Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tight shadow-text">
            MUTOVU TSS
          </h1>
          
          {/* Subtitle / Location */}
          <p className="text-2xl md:text-3xl font-light text-yellow-400 mb-8">
            Muganza Sector, Nyaruguru District, Southern Province, Rwanda
          </p>
          
          {/* Mission Statement */}
          <blockquote className="max-w-3xl text-xl italic text-gray-200 border-l-4 border-yellow-400 pl-4 mb-10">
            "Empowering the next generation of technical experts for a growing Rwanda."
          </blockquote>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link 
              to="/registration" // Use 'to' prop for routing
              className="px-8 py-3 text-lg font-semibold rounded-full bg-yellow-500 text-blue-900 hover:bg-yellow-400 transition duration-300 shadow-xl"
            >
              Enroll Now
            </Link>
            <Link 
              to="/Courses" // Use 'to' prop for routing
              className="px-8 py-3 text-lg font-semibold rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 transition duration-300"
            >
              Discover Our Programs
            </Link>
          </div>
        </div>
      </div>

      {/* 2. VALUE PROPOSITION SECTION (Below the Hero) */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-5">Why Choose Technical Education?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-blue-500">
            <svg className="w-12 h-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            <h3 className="text-xl font-semibold mb-2">High Employability</h3>
            <p className="text-gray-600">Our TVET graduates are prepared for immediate entry into the Rwandan job market.</p>
          </div>
          
          {/* Value 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-yellow-500">
            <svg className="w-12 h-12 text-yellow-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <h3 className="text-xl font-semibold mb-2">Practical Skills</h3>
            <p className="text-gray-600">Focus on hands-on training in areas like Masonry, Software Development, and more.</p>
          </div>
          
          {/* Value 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-green-500">
            <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.247m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.247"></path></svg>
            <h3 className="text-xl font-semibold mb-2">Modern Facilities</h3>
            <p className="text-gray-600">Learn using the latest equipment and curriculum accredited by the Rwanda TVET Board.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Comp1;
