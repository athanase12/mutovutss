import React from "react";

export default function ContactEmail() {
    return  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Contact</h2>
      <p className="text-gray-700">
        For specific inquiries, please use the appropriate email address below. 
        We strive to respond to all emails within 24 hours during school days.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-start mb-4">
          <div className="bg-primary-100 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">General Inquiries</h3>
            <p className="text-primary-600 mt-1">info@mutovutss.rw</p>
            <p className="text-sm text-gray-600 mt-2">For general questions about the school</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-start mb-4">
          <div className="bg-primary-100 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Admissions Office</h3>
            <p className="text-primary-600 mt-1">admissions@mutovutss.rw</p>
            <p className="text-sm text-gray-600 mt-2">For application and enrollment questions</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-start mb-4">
          <div className="bg-primary-100 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Academic Affairs</h3>
            <p className="text-primary-600 mt-1">academics@mutovutss.rw</p>
            <p className="text-sm text-gray-600 mt-2">For course and curriculum questions</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-start mb-4">
          <div className="bg-primary-100 p-3 rounded-lg mr-4">
            <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Technical Support</h3>
            <p className="text-primary-600 mt-1">support@mutovutss.rw</p>
            <p className="text-sm text-gray-600 mt-2">For website and portal issues</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="card mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Email
            </label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input 
            type="text" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            placeholder="What is your message about?"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea 
            rows="5" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            placeholder="Type your message here..."
          ></textarea>
        </div>
        
        <div>
          <button type="submit" className="btn btn-primary px-6">
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
  }
  