import React from 'react';

function Mission() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mission & Vision</h2>
        <p className="text-gray-700">
          Our mission and vision guide everything we do at Mutovu TSS, from curriculum development 
          to student support services.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white p-8 rounded-xl">
          
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="mb-4">
            To provide quality technical education that equips students with practical skills, 
            theoretical knowledge, and ethical values necessary for personal growth and 
            contribution to Rwanda's socio-economic development.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Provide hands-on technical training
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Foster innovation and creativity
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Develop ethical and responsible citizens
            </li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-br from-secondary-600 to-secondary-800 text-white p-8 rounded-xl">
          <div className="text-4xl mb-4">👁️</div>
          <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
          <p className="mb-4">
            To be a leading center of excellence in technical education in Rwanda, producing 
            skilled professionals who drive innovation, entrepreneurship, and sustainable 
            development.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-secondary-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              National recognition for technical excellence
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-secondary-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Industry partnerships and collaborations
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-secondary-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Global competitiveness in technical skills
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="text-3xl mb-3">💡</div>
            <h4 className="font-bold text-gray-800 mb-2">Innovation</h4>
            <p className="text-gray-600 text-sm">Embracing new technologies and teaching methods</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-bold text-gray-800 mb-2">Excellence</h4>
            <p className="text-gray-600 text-sm">Striving for the highest standards in education</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="text-3xl mb-3">🤝</div>
            <h4 className="font-bold text-gray-800 mb-2">Integrity</h4>
            <p className="text-gray-600 text-sm">Maintaining honesty and ethical standards</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="text-3xl mb-3">🌍</div>
            <h4 className="font-bold text-gray-800 mb-2">Community</h4>
            <p className="text-gray-600 text-sm">Serving and contributing to society</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;