import React, { useState } from 'react';

function Support() {
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    issueType: '',
    description: '',
    attachments: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Support ticket created successfully! Ticket ID: MTS-' + Date.now());
    setSupportForm({
      name: '',
      email: '',
      issueType: '',
      description: '',
      attachments: []
    });
  };

  const issueTypes = [
    'Technical Issues (Website/Portal)',
    'Academic Support',
    'Admissions Query',
    'Fee Payment Issues',
    'Student Portal Access',
    'Other'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Support</h2>
        <p className="text-gray-700">
          Get assistance with technical issues, website problems, portal access, or any other 
          technical challenges you're facing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Support Form */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Submit Support Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Your Name *</label>
              <input 
                type="text" 
                name="name"
                value={supportForm.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div>
              <label className="form-label">Your Email *</label>
              <input 
                type="email" 
                name="email"
                value={supportForm.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div>
              <label className="form-label">Issue Type *</label>
              <select 
                name="issueType"
                value={supportForm.issueType}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Issue Type</option>
                {issueTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">Issue Description *</label>
              <textarea 
                rows="6" 
                name="description"
                value={supportForm.description}
                onChange={handleChange}
                className="form-input"
                placeholder="Please describe your issue in detail..."
                required
              ></textarea>
              <p className="text-gray-600 text-sm mt-2">
                Include any error messages, steps to reproduce, and what you were trying to do.
              </p>
            </div>
            
            <div>
              <label className="form-label">Attachments (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600">Drop files here or click to upload</p>
                <p className="text-gray-500 text-sm mt-1">Screenshots, documents, or error logs (Max 10MB)</p>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary w-full py-3">
              Submit Support Ticket
            </button>
          </form>
        </div>
        
        {/* Support Resources */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Solutions</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Password Reset</h4>
                  <p className="text-gray-600 text-sm">Forgot your password? Reset it instantly via email.</p>
                  <button className="text-primary-600 text-sm font-medium mt-1 hover:text-primary-700">
                    Reset Password →
                  </button>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Browser Issues</h4>
                  <p className="text-gray-600 text-sm">Clear your browser cache or try a different browser.</p>
                  <button className="text-primary-600 text-sm font-medium mt-1 hover:text-primary-700">
                    Troubleshooting Guide →
                  </button>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Live Chat</h4>
                  <p className="text-gray-600 text-sm">Chat with our support team during office hours.</p>
                  <button className="text-primary-600 text-sm font-medium mt-1 hover:text-primary-700">
                    Start Live Chat →
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Support Hours</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Monday - Friday</span>
                <span className="font-semibold text-gray-800">7:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Saturday</span>
                <span className="font-semibold text-gray-800">8:00 AM - 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Sunday</span>
                <span className="font-semibold text-gray-800">Closed</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <span className="font-semibold">Note:</span> Response time for support tickets is 
                typically 24-48 hours during business days.
              </p>
            </div>
          </div>
          
          <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <h3 className="text-xl font-bold mb-4">Emergency Support</h3>
            <p className="mb-4 text-primary-100">
              For urgent technical issues affecting your ability to access critical school 
              services, please contact our emergency technical support line.
            </p>
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <div>
                <div className="text-2xl font-bold">+250 788 123 460</div>
                <div className="text-primary-200 text-sm">Available for urgent issues only</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;