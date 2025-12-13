import React from 'react';

function History2() {
  const timeline = [
    {
      year: '2008',
      title: 'Inception',
      description: 'The idea for Mutovu Technical Secondary School was conceived by the Ministry of Education in collaboration with Nyaruguru District to address the growing need for technical skills in the region.'
    },
    {
      year: '2010',
      title: 'Establishment',
      description: 'Mutovu TSS officially opened its doors with an initial enrollment of 120 students and three technical departments: Construction, MMP, and Software Development.'
    },
    {
      year: '2013',
      title: 'Expansion',
      description: 'The school expanded to include the Information and Communication Technology (ICT) department and constructed two additional workshop buildings.'
    },
    {
      year: '2016',
      title: 'Accreditation',
      description: 'Received full accreditation from the Rwanda Education Board (REB) and established partnerships with local industries for student internships.'
    },
    {
      year: '2020',
      title: 'Modernization',
      description: 'Implemented digital learning platforms, upgraded all technical workshops with modern equipment, and introduced the Automotive Technology program.'
    },
    {
      year: 'Present',
      title: 'Today',
      description: 'Mutovu TSS now serves over 280 students with 16 teaching staff members, maintaining a reputation as one of the leading technical schools in Southern Province.'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">School History</h2>
        <p className="text-gray-700">
          Since our establishment, Mutovu TSS has been committed to providing quality technical 
          education in Nyaruguru District. Our journey reflects our dedication to innovation and 
          excellence in education.
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-200"></div>
        
        {/* Timeline items */}
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}>
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full border-4 border-white z-10"></div>
              
              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                  <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold mb-3">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-primary-50 rounded-xl p-6 mt-8">
        <h3 className="text-xl font-bold text-primary-800 mb-4">Our Legacy Continues</h3>
        <p className="text-primary-700 mb-4">
          Today, Mutovu TSS continues to build on its rich history, adapting to new technologies 
          and educational methodologies while maintaining our commitment to practical, hands-on 
          learning.
        </p>
        <p className="text-primary-700">
          We are proud of our alumni who are now contributing to Rwanda's development across 
          various technical fields, from construction and engineering to information technology 
          and hospitality management.
        </p>
      </div>
    </div>
  );
}

export default History2;