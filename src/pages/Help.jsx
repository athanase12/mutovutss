import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import FAQs from './FAQs';
import Support from './Support';
function Help() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Help Center</h1>
        
        {/* Nested Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 p-4 bg-gray-50 rounded-lg">
          <Link 
            to="" 
            end 
            className={({ isActive }) => 
              `nested-nav-link ${isActive ? 'active' : 'text-gray-700'}`
            }
          >
            Overview
          </Link>
          <Link 
            to="faqs" 
            className={({ isActive }) => 
              `nested-nav-link ${isActive ? 'active' : 'text-gray-700'}`
            }
          >
            FAQs
          </Link>
          <Link 
            to="support" 
            className={({ isActive }) => 
              `nested-nav-link ${isActive ? 'active' : 'text-gray-700'}`
            }
          >
            Support
          </Link>
        </div>
        
        {/* Content Area */}
        <div className="min-h-[400px]">
          <Routes>
            <Route path="faqs" element={<FAQs />} />
            <Route path="support" element={<Support />} />
            <Route path="/" element={<HelpOverview />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function HelpOverview() {
  const helpCategories = [
    {
      title: 'Admissions',
      icon: '📚',
      description: 'Questions about applications, requirements, and deadlines',
      link: '/help/faqs#admissions'
    },
    {
      title: 'Academics',
      icon: '🎓',
      description: 'Course information, schedules, and academic policies',
      link: '/help/faqs#academics'
    },
    {
      title: 'Technical Support',
      icon: '💻',
      description: 'Help with school portal and online resources',
      link: '/help/support'
    },
    {
      title: 'Fees & Payments',
      icon: '💰',
      description: 'Information about tuition and payment methods',
      link: '/help/faqs#fees'
    },
    {
      title: 'Student Life',
      icon: '🏫',
      description: 'Activities, facilities, and campus information',
      link: '/help/faqs#student-life'
    },
    {
      title: 'Parents',
      icon: '👨‍👩‍👧‍👦',
      description: 'Information for parents and guardians',
      link: '/help/faqs#parents'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How Can We Help You?</h2>
        <p className="text-gray-700 mb-6">
          Browse through our help sections to find answers to common questions or get in touch 
          with our support team for personalized assistance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpCategories.map((category, index) => (
          <Link 
            key={index} 
            to={category.link}
            className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
          >
            <div className="text-3xl mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-700">
              {category.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{category.description}</p>
            <div className="text-primary-600 text-sm font-medium flex items-center">
              Get Help
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-primary-50 rounded-xl p-8 mt-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-2/3 mb-6 lg:mb-0 lg:pr-8">
            <h3 className="text-2xl font-bold text-primary-800 mb-4">Need Immediate Assistance?</h3>
            <p className="text-primary-700 mb-6">
              Our support team is available during school hours to help you with any questions 
              or issues you might have.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact/phone" 
                className="btn btn-primary flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Support
              </Link>
              <Link 
                to="/contact/email" 
                className="btn bg-white text-primary-700 border border-primary-300 hover:bg-primary-50 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Support
              </Link>
            </div>
          </div>
          <div className="lg:w-1/3 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full">
              <svg className="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;