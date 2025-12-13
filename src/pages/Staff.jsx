import React from 'react';
import { Routes, Route, NavLink, Outlet, Navigate } from 'react-router-dom';
import { UserCog, GraduationCap, Mail, Phone, Award, BookOpen, Users, Briefcase } from 'lucide-react';

// --- Staff Data (Kept the same for functionality) ---
const staffData = {
    administration: [
        { id: 1, name: 'MURERA Eugene', position: 'Headmaster', email: 'headmaster@mutovutss.edu.rw', phone: '+250 788 123 456', department: 'Administration', qualifications: 'M.Ed Educational Management, B.Sc Mathematics', experience: '15 years', imageColor: 'bg-blue-100', icon: <Briefcase className="h-6 w-6 text-blue-600" /> },
        { id: 2, name: 'Isaac', position: 'Deputy Headmaster', email: 'deputy@mutovutss.edu.rw', phone: '+250 788 123 457', department: 'Administration', qualifications: 'M.Ed Administration, B.A Education', experience: '12 years', imageColor: 'bg-purple-100', icon: <Users className="h-6 w-6 text-purple-600" /> },
        { id: 3, name: 'MUYIZERE Janviere', position: 'Academic Registrar', email: 'registrar@mutovutss.edu.rw', phone: '+250 788 123 458', department: 'Administration', qualifications: 'M.Sc Statistics, B.Ed Mathematics', experience: '10 years', imageColor: 'bg-green-100', icon: <BookOpen className="h-6 w-6 text-green-600" /> },
        { id: 4, name: 'MUKAMAZIMPAKA Claire', position: 'Finance Officer', email: 'finance@mutovutss.edu.rw', phone: '+250 788 123 459', department: 'Administration', qualifications: 'MBA Finance, B.Com Accounting', experience: '8 years', imageColor: 'bg-yellow-100', icon: <Award className="h-6 w-6 text-yellow-600" /> },
        { id: 5, name: 'UWITONZE Jean Damascene', position: 'Patron', email: 'finance@mutovutss.edu.rw', phone: '+250 788 123 459', department: 'Administration', qualifications: 'MBA Finance, B.Com Accounting', experience: '8 years', imageColor: 'bg-yellow-100', icon: <Award className="h-6 w-6 text-yellow-600" /> },
        { id: 6, name: 'Joselyne', position: 'Matron', email: 'jojo@mutovutss.edu.rw', phone: '+250 788 123 459', department: 'Administration', qualifications: 'MBA Finance, B.Com Accounting', experience: '8 years', imageColor: 'bg-yellow-100', icon: <Award className="h-6 w-6 text-yellow-600" /> },
    ],
    teaching: [
        { id: 7, name: 'Eng. Ndindiriyimana Athanase', position: 'Software Development Lead', email: 'ndi@mutovutss.edu.rw', phone: '+250 788 123 460', department: 'ICT Department', qualifications: 'PhD Computer Science, M.Sc Software Engineering', experience: '14 years', imageColor: 'bg-indigo-100', icon: <GraduationCap className="h-6 w-6 text-indigo-600" /> },
        { id: 8, name: 'Kayiranga Patrick', position: 'Multimedia Instructor', email: 'pat@mutovutss.edu.rw', phone: '+250 788 123 461', department: 'Multimedia Department', qualifications: 'MFA Digital Arts, B.A Fine Arts', experience: '9 years', imageColor: 'bg-pink-100', icon: <Award className="h-6 w-6 text-pink-600" /> },
        { id: 9, name: 'James Mupenzi', position: 'Building Construction Lead', email: 'james@mutovutss.edu.rw', phone: '+250 788 123 462', department: 'Construction Department', qualifications: 'M.Eng Civil Engineering, B.Tech Construction', experience: '11 years', imageColor: 'bg-orange-100', icon: <Briefcase className="h-6 w-6 text-orange-600" /> },
        { id: 10, name: 'Bizimana Innocent', position: 'Mathematics Teacher', email: 'sarah@mutovutss.edu.rw', phone: '+250 788 123 463', department: 'Mathematics Department', qualifications: 'M.Sc Mathematics, B.Ed Mathematics', experience: '7 years', imageColor: 'bg-teal-100', icon: <BookOpen className="h-6 w-6 text-teal-600" /> },
        { id: 11, name: 'Musengamana Lea', position: 'Physics Teacher', email: 'david@mutovutss.edu.rw', phone: '+250 788 123 464', department: 'Science Department', qualifications: 'M.Sc Physics, B.Ed Science', experience: '6 years', imageColor: 'bg-red-100', icon: <GraduationCap className="h-6 w-6 text-red-600" /> },
        { id: 12, name: 'Jean', position: 'English Teacher', email: 'jean@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 13, name: 'Fabiola', position: 'English Teacher ', email: 'claire@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 14, name: 'Clarisse', position: 'Chemistry Teacher', email: 'claire@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 15, name: 'Ndayize Emmanuel', position: 'CAD Teacher', email: 'emmy@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 16, name: 'EPA', position: 'CAD Teacher', email: 'claire@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 17, name: 'Ildephonse', position: 'RCD Teacher', email: 'ild@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 18, name: 'Pacy', position: 'Multimedia Teacher', email: 'pacy@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 19, name: 'Leonard', position: 'Multimedia Teacher', email: 'claire@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 20, name: 'Eugene', position: 'Business Teacher', email: 'leo@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 21, name: 'Eric', position: 'SOD Teacher', email: 'eric@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 22, name: 'Celestin', position: 'SOD Teacher', email: 'celo@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
        { id: 23, name: 'Olivier', position: 'SOD Teacher', email: 'oli@mutovutss.edu.rw', phone: '+250 788 123 465', department: 'Languages Department', qualifications: 'MA English Literature, BA Education', experience: '8 years', imageColor: 'bg-cyan-100', icon: <BookOpen className="h-6 w-6 text-cyan-600" /> },
    ]
};

// --- Staff Card Component (Enhanced) ---
const StaffCard = ({ staff }) => (
  // Enhanced Card Container: Added hover effects for interaction and lift
  <div className="staff-card bg-white p-6 rounded-xl shadow-lg transition duration-300 transform hover:shadow-2xl hover:scale-[1.03] hover:border-b-4 hover:border-blue-500">
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 border-b border-gray-100 pb-3">
      {/* Icon/Image Placeholder with animation */}
      <div className={`${staff.imageColor} p-4 rounded-full mb-3 sm:mb-0 sm:mr-4 transition duration-500 transform hover:rotate-6 hover:shadow-inner`}>
        {staff.icon}
      </div>
      <div>
        <h3 className="text-xl font-extrabold text-gray-800 transition duration-300 hover:text-blue-700">{staff.name}</h3>
        <p className="text-lg text-blue-600 font-bold">{staff.position}</p>
        <p className="text-gray-500 text-sm">{staff.department}</p>
      </div>
    </div>
    
    <div className="space-y-3">
      {/* Contact Info with subtle hover animation */}
      <a href={`mailto:${staff.email}`} className="flex items-center text-gray-700 hover:text-blue-500 transition duration-200">
        <Mail className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
        <span className="text-sm truncate hover:underline">{staff.email}</span>
      </a>
      <a href={`tel:${staff.phone}`} className="flex items-center text-gray-700 hover:text-blue-500 transition duration-200">
        <Phone className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
        <span className="text-sm hover:underline">{staff.phone}</span>
      </a>
    </div>
    
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="text-sm text-gray-700">
        <span className="font-medium text-gray-600">Qualifications:</span>
        <p className="mt-1 font-light text-sm">{staff.qualifications}</p>
      </div>
      <div className="mt-3 text-sm flex items-center">
        <span className="font-bold text-gray-600 mr-2">Experience:</span>
        <span className="text-blue-600 font-semibold text-lg animate-pulse-slow">{staff.experience}</span>
      </div>
    </div>
  </div>
);

// --- Staff Layout Component (Enhanced) ---
const StaffLayout = () => {
    // NavLink Base Styles
    const navBase = "flex-1 py-3 px-6 rounded-xl text-center font-bold text-lg transition-all duration-300 ease-in-out border-b-4";

    // NavLink Active/Inactive Styles
    const navActive = `${navBase} bg-blue-600 text-white shadow-xl shadow-blue-500/50 transform scale-[1.02] border-yellow-400`;
    const navInactive = `${navBase} bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md`;

    // Statistics Card Style
    const statCardClass = "bg-white rounded-2xl shadow-lg p-6 text-center border-t-4 border-blue-400 transform transition duration-500 hover:scale-[1.05] hover:shadow-2xl cursor-default";
    const statNumberClass = "text-4xl font-extrabold mb-1";

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-2xl shadow-inner">
            <div className="mb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-3 drop-shadow-md">Our Dedicated <span className="text-yellow-500">Staff</span></h1>
                <p className="text-gray-600 text-lg sm:text-xl">Meet our dedicated team of professionals who shape the future of our students</p>
            </div>

            {/* Staff Statistics (Enhanced) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className={`${statCardClass} border-blue-400`}>
                    <div className={`${statNumberClass} text-blue-600`}>{staffData.administration.length + staffData.teaching.length}</div>
                    <p className="text-gray-600 font-semibold">Total Staff Members</p>
                </div>
                <div className={`${statCardClass} border-purple-400`}>
                    <div className={`${statNumberClass} text-purple-600`}>{staffData.administration.length}</div>
                    <p className="text-gray-600 font-semibold">Administration Staff</p>
                </div>
                <div className={`${statCardClass} border-green-400`}>
                    <div className={`${statNumberClass} text-green-600`}>{staffData.teaching.length}</div>
                    <p className="text-gray-600 font-semibold">Teaching Staff</p>
                </div>
                <div className={`${statCardClass} border-red-400`}>
                    <div className={`${statNumberClass} text-red-600`}>3+</div>
                    <p className="text-gray-600 font-semibold">Departments</p>
                </div>
            </div>

            {/* Staff Navigation (Enhanced) */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 mb-10 p-2 bg-white rounded-xl shadow-lg">
                <NavLink
                    to="administration"
                    className={({ isActive }) => (isActive ? navActive : navInactive)}
                >
                    <UserCog className="inline h-5 w-5 mr-3" />
                    Administration Staff
                </NavLink>
                <NavLink
                    to="teaching"
                    className={({ isActive }) => (isActive ? navActive : navInactive)}
                >
                    <GraduationCap className="inline h-5 w-5 mr-3" />
                    Teaching Staff
                </NavLink>
            </div>

            <Outlet />
        </div>
    );
};

// --- Administration Staff List (Minimal Changes) ---
const AdministrationStaff = () => (
    <div>
        <div className="mb-6 border-l-4 border-purple-500 pl-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Administration Staff</h2>
            <p className="text-gray-600">Our administrative team ensures smooth school operations and supports educational excellence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staffData.administration.map((staff) => (
                <StaffCard key={staff.id} staff={staff} />
            ))}
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Administration Office Hours</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-600 font-medium">Monday - Friday: 7:30 AM - 5:00 PM</p>
                    <p className="text-sm text-gray-600">Saturday: 8:00 AM - 12:00 PM</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 font-medium">Location: Main Administration Building</p>
                    <p className="text-sm text-gray-600">Extension: <span className="text-blue-600 font-semibold">101-104</span></p>
                </div>
            </div>
        </div>
    </div>
);

// --- Teaching Staff List (Minimal Changes) ---
const TeachingStaff = () => (
    <div>
        <div className="mb-6 border-l-4 border-green-500 pl-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Teaching Staff</h2>
            <p className="text-gray-600">Our qualified teaching staff provides quality technical education and mentorship</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffData.teaching.map((staff) => (
                <StaffCard key={staff.id} staff={staff} />
            ))}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 rounded-xl shadow-md border-l-4 border-green-400 transition duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Staff Development</h3>
                <ul className="space-y-2 text-sm text-gray-700 list-disc ml-5">
                    <li className="hover:text-green-600 transition">Regular professional development workshops</li>
                    <li className="hover:text-green-600 transition">Industry partnership programs</li>
                    <li className="hover:text-green-600 transition">Research and innovation support</li>
                    <li className="hover:text-green-600 transition">International training opportunities</li>
                </ul>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-xl shadow-md border-l-4 border-purple-400 transition duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Department Contacts</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li className="hover:text-purple-600 transition"><strong className="text-purple-600">ICT Department:</strong> Ext. 201-204</li>
                    <li className="hover:text-purple-600 transition"><strong className="text-purple-600">Construction Department:</strong> Ext. 301-303</li>
                    <li className="hover:text-purple-600 transition"><strong className="text-purple-600">Multimedia Department:</strong> Ext. 401-403</li>
                    <li className="hover:text-purple-600 transition"><strong className="text-purple-600">Academic Departments:</strong> Ext. 501-510</li>
                </ul>
            </div>
        </div>
    </div>
);

// --- Staff Router Wrapper ---
const Staff = () => {
    return (
        <Routes>
            <Route path="/" element={<StaffLayout />}>
                <Route index element={<Navigate to="administration" replace />} />
                <Route path="administration" element={<AdministrationStaff />} />
                <Route path="teaching" element={<TeachingStaff />} />
            </Route>
        </Routes>
    );
};

export default Staff;