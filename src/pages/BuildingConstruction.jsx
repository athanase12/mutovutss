import React from 'react';

function BuildingConstruction() {
  const modules = [
    "Architectural Drawing",
    "Construction Materials",
    "Building Techniques",
    "Structural Design",
    "Project Management",
    "Quantity Surveying",
    "Safety Regulations",
    "Sustainable Construction"
  ];

  const equipment = [
    "Surveying Equipment", "CAD Software", "Concrete Mixers", "Safety Gear", 
    "Measuring Tools", "Power Tools", "Testing Equipment", "Drafting Tables"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Building Construction</h2>
        <p className="text-gray-700">
          This program provides hands-on training in construction techniques, architectural 
          drawing, and project management. Students learn to plan, design, and execute 
          construction projects safely and efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Equipment & Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {equipment.map((item, index) => (
                <div key={index} className="bg-orange-50 p-3 rounded-lg text-center">
                  <div className="text-orange-700 font-medium text-sm">{item}</div>
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
              <div className="text-sm text-gray-500">Workshop Hours</div>
              <div className="font-semibold text-gray-800">600+ Hours</div>
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
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-orange-600 font-bold">{index + 1}</span>
                </div>
                <span className="font-medium text-gray-800">{module}</span>
              </div>
              <div className="text-sm text-gray-500">Year {(index % 3) + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuildingConstruction;