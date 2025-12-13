import React from 'react';

function ContactPhone() {
  const phoneContacts = [
    {
      title: 'School Main Line',
      number: '+250 788 123 456',
      hours: '7:00 AM - 5:00 PM, Monday-Friday',
      extension: 'Press 1 for general inquiries'
    },
    {
      title: 'Admissions Office',
      number: '+250 788 123 457',
      hours: '8:00 AM - 4:00 PM, Monday-Friday',
      extension: 'Direct line'
    },
    {
      title: 'Principal\'s Office',
      number: '+250 788 123 458',
      hours: 'By appointment only',
      extension: 'Press 2 after main line'
    },
    {
      title: 'Accounts Department',
      number: '+250 788 123 459',
      hours: '8:00 AM - 3:00 PM, Monday-Friday',
      extension: 'Press 3 after main line'
    },
    {
      title: 'Emergency Contact',
      number: '+250 788 123 460',
      hours: 'Available 24/7',
      extension: 'For emergencies only'
    },
    {
      title: 'Technical Department',
      number: '+250 788 123 461',
      hours: '8:00 AM - 4:00 PM, Monday-Friday',
      extension: 'Press 4 after main line'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Phone Contact</h2>
        <p className="text-gray-700">
          Contact us by phone during our office hours. For after-hours emergencies, 
          please use the emergency contact number.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phoneContacts.map((contact, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 transition-colors">
            <div className="flex items-start mb-4">
              <div className="bg-primary-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{contact.title}</h3>
                <p className="text-primary-600 font-medium mt-1">{contact.number}</p>
                <p className="text-sm text-gray-600 mt-2">{contact.hours}</p>
                {contact.extension && (
                  <p className="text-xs text-gray-500 mt-1">{contact.extension}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Calling Instructions</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-700">Our offices are open Monday to Friday, 7:00 AM to 5:00 PM</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-700">Saturday hours: 8:00 AM to 12:00 PM</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-700">For after-hours emergencies, use the emergency contact number</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-700">Please have your student ID ready when calling about specific student matters</p>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-700">For general inquiries, press 1 when the automated system answers</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Important Notice</h4>
            <p className="text-blue-700">
              During peak periods (admission season, examination periods), phone lines may be busy. 
              We recommend using email for non-urgent inquiries or visiting our offices in person 
              for complex matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPhone;