import React from 'react';
import { MdOutlineWorkOutline, MdTerminal, MdWeb, MdMobileFriendly, MdSecurity } from 'react-icons/md';

function SoftwareDevelopment() {
  const careerOpportunities = [
    {
      title: "Full-Stack Developer",
      description: "Build both front-end and back-end web applications using modern frameworks.",
      icon: <MdWeb className="text-blue-600 w-6 h-6" />
    },
    {
      title: "Mobile App Developer",
      description: "Create native or cross-platform applications for Android and iOS devices.",
      icon: <MdMobileFriendly className="text-purple-600 w-6 h-6" />
    },
    {
      title: "Database Administrator",
      description: "Design and manage complex data systems and ensure data integrity and security.",
      icon: <MdTerminal className="text-green-600 w-6 h-6" />
    },
    {
      title: "Cybersecurity Analyst",
      description: "Protect organizational software systems from cyber threats and vulnerabilities.",
      icon: <MdSecurity className="text-red-600 w-6 h-6" />
    }
  ];

  const technologies = [
    "HTML/CSS", "JavaScript", "Python", "Java", "React", "Node.js", "MySQL", 
    "Git", "Docker", "REST APIs", "TypeScript", "Tailwind CSS"
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="border-l-4 border-green-500 pl-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Software Development</h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl">
          The software development program at Mutovu TSS is designed to transform students into 
          industry-ready professionals. We bridge the gap between academic theory and real-world 
          application, ensuring our graduates are prepared for the rapidly evolving global tech landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Technologies Section */}
        <div className="lg:col-span-2">
          <div className="card h-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <MdTerminal className="text-green-500" />
              Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-green-500 hover:text-white hover:border-green-500 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Growth Card */}
        <div className="card bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="text-xl font-semibold mb-4">Industry Outlook</h3>
          <p className="text-green-50 opacity-90 text-sm leading-loose">
            The demand for software developers in East Africa is projected to grow by 25% over the 
            next decade. Our curriculum is updated annually to match the needs of tech hubs in 
            Kigali and beyond.
          </p>
          <div className="mt-6 pt-6 border-t border-green-500/30">
            <div className="text-2xl font-bold italic">"Code Your Future"</div>
          </div>
        </div>
      </div>

      {/* Career Opportunities Section */}
      <div className="card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
          <MdOutlineWorkOutline className="text-green-500" />
          Career Pathways
        </h3>
        
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careerOpportunities.map((career, index) => (
            <div 
              key={index} 
              className="group p-5 border border-gray-50 rounded-xl hover:bg-gray-50 hover:border-green-100 transition-all"
            >
              <div className="flex items-center mb-3">
                <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow mr-4">
                  {career.icon}
                </div>
                <h4 className="font-bold text-gray-800 text-lg">{career.title}</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {career.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">
          Want to learn more about our placement program? 
          <span className="text-green-600 font-bold cursor-pointer hover:underline ml-1"> Contact Admissions</span>
        </p>
      </div>
    </div>
  );
}

export default SoftwareDevelopment;