import React from 'react';

function MultimediaProduction() {
  const modules = [
    "Graphic Design Fundamentals",
    "Digital Photography",
    "Video Production & Editing",
    "2D & 3D Animation",
    "Web Design & Development",
    "Audio Production",
    "Digital Marketing",
    "Portfolio Development"
  ];

  const careerPaths = [
    "Graphic Designer",
    "Video Editor",
    "Animator",
    "Web Designer",
    "Social Media Manager",
    "Photographer"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Multimedia Production</h2>
        <p className="text-gray-700">
          This comprehensive program equips students with skills in digital media creation, 
          graphic design, video production, and animation. Students learn to create engaging 
          multimedia content for various platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {modules.map((module, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{module}</span>
                </div>
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
              <div className="text-sm text-gray-500">Internship</div>
              <div className="font-semibold text-gray-800">6 Months</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Tuition</div>
              <div className="font-semibold text-gray-800">200,000 RWF/year</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Opportunities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {careerPaths.map((career, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-blue-600 font-semibold">{career}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultimediaProduction;