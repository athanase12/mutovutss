import React from 'react';

function SoftwareDevelopment() {
  const modules = [
    "Programming Fundamentals",
    "Web Development (HTML, CSS, JavaScript)",
    "Database Management",
    "Mobile App Development",
    "Software Engineering",
    "Network Fundamentals",
    "Cybersecurity Basics",
    "Project Management"
  ];

  const technologies = [
    "HTML/CSS", "JavaScript", "Python", "Java", "React", "Node.js", "MySQL", "Git"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Software Development</h2>
        <p className="text-gray-700">
          This program prepares students for careers in software engineering, web development, 
          and mobile app development. Students learn modern programming languages and development 
          methodologies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Technologies Covered</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Details</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-semibold text-gray-800">3 Years</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Certification</div>
              <div className="font-semibold text-gray-800">Advanced Diploma</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Projects</div>
              <div className="font-semibold text-gray-800">5+ Real Projects</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Tuition</div>
              <div className="font-semibold text-gray-800">200,000 RWF/year</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module, index) => (
            <div key={index} className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                <span className="text-green-600 font-bold">{index + 1}</span>
              </div>
              <div>
                <div className="font-medium text-gray-800">{module}</div>
                <div className="text-sm text-gray-600 mt-1">Theory & Practical</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SoftwareDevelopment;