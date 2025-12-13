import React from 'react';
import { Routes, Route, NavLink, Outlet, Navigate, Link } from 'react-router-dom';
import { UserCog, GraduationCap, Mail, Phone, Award, BookOpen, Users, Briefcase } from 'lucide-react';

// Staff data - Focused on Teaching and Administration Staff
const staffData = {
  administration: [
    {
      id: 1,
      name: 'MURERA Eugene',
      position: 'Headmaster',
      email: 'headmaster@mutovutss.edu.rw',
      phone: '+250 788 123 456',
      department: 'Administration',
      qualifications: 'M.Ed Educational Management, B.Sc Mathematics',
      experience: '15 years',
      imageColor: 'bg-blue-100',
      icon: <Briefcase className="h-6 w-6 text-blue-600" />
    },
    {
      id: 2,
      name: 'Isaac',
      position: 'Deputy Headmaster',
      email: 'deputy@mutovutss.edu.rw',
      phone: '+250 788 123 457',
      department: 'Administration',
      qualifications: 'M.Ed Administration, B.A Education',
      experience: '12 years',
      imageColor: 'bg-purple-100',
      icon: <Users className="h-6 w-6 text-purple-600" />
    },
    {
      id: 3,
      name: 'MUYIZERE Janviere',
      position: 'Academic Registrar',
      email: 'registrar@mutovutss.edu.rw',
      phone: '+250 788 123 458',
      department: 'Administration',
      qualifications: 'M.Sc Statistics, B.Ed Mathematics',
      experience: '10 years',
      imageColor: 'bg-green-100',
      icon: <BookOpen className="h-6 w-6 text-green-600" />
    },
    {
      id: 4,
      name: 'MUKAMAZIMPAKA Claire',
      position: 'Finance Officer',
      email: 'finance@mutovutss.edu.rw',
      phone: '+250 788 123 459',
      department: 'Administration',
      qualifications: 'MBA Finance, B.Com Accounting',
      experience: '8 years',
      imageColor: 'bg-yellow-100',
      icon: <Award className="h-6 w-6 text-yellow-600" />
    },
    {
        id: 5,
        name: 'UWITONZE Jean Damascene',
        position: 'Patron',
        email: 'finance@mutovutss.edu.rw',
        phone: '+250 788 123 459',
        department: 'Administration',
        qualifications: 'MBA Finance, B.Com Accounting',
        experience: '8 years',
        imageColor: 'bg-yellow-100',
        icon: <Award className="h-6 w-6 text-yellow-600" />
      },
      {
        id: 6,
        name: 'Joselyne',
        position: 'Matron',
        email: 'finance@mutovutss.edu.rw',
        phone: '+250 788 123 459',
        department: 'Administration',
        qualifications: 'MBA Finance, B.Com Accounting',
        experience: '8 years',
        imageColor: 'bg-yellow-100',
        icon: <Award className="h-6 w-6 text-yellow-600" />
      },
  ],
  teaching: [
    {
      id: 7,
      name: 'Eng. Ndindiriyimana Athanase',
      position: 'Software Development Lead',
      email: 'athanase.ndi@mutovutss.edu.rw',
      phone: '+250 788 123 460',
      department: 'ICT Department',
      qualifications: 'PhD Computer Science, M.Sc Software Engineering',
      experience: '14 years',
      imageColor: 'bg-indigo-100',
      icon: <GraduationCap className="h-6 w-6 text-indigo-600" />
    },
    {
      id: 8,
      name: 'Kayiranga Patrick',
      position: 'Multimedia Instructor',
      email: 'grace@mutovutss.edu.rw',
      phone: '+250 788 123 461',
      department: 'Multimedia Department',
      qualifications: 'MFA Digital Arts, B.A Fine Arts',
      experience: '9 years',
      imageColor: 'bg-pink-100',
      icon: <Award className="h-6 w-6 text-pink-600" />
    },
    {
      id: 9,
      name: 'James Mupenzi',
      position: 'Building Construction Lead',
      email: 'james@mutovutss.edu.rw',
      phone: '+250 788 123 462',
      department: 'Construction Department',
      qualifications: 'M.Eng Civil Engineering, B.Tech Construction',
      experience: '11 years',
      imageColor: 'bg-orange-100',
      icon: <Briefcase className="h-6 w-6 text-orange-600" />
    },
    {
      id: 10,
      name: 'Bizimana Innocent',
      position: 'Mathematics Teacher',
      email: 'sarah@mutovutss.edu.rw',
      phone: '+250 788 123 463',
      department: 'Mathematics Department',
      qualifications: 'M.Sc Mathematics, B.Ed Mathematics',
      experience: '7 years',
      imageColor: 'bg-teal-100',
      icon: <BookOpen className="h-6 w-6 text-teal-600" />
    },
    {
      id: 11,
      name: 'Musengamana Lea',
      position: 'Physics Teacher',
      email: 'david@mutovutss.edu.rw',
      phone: '+250 788 123 464',
      department: 'Science Department',
      qualifications: 'M.Sc Physics, B.Ed Science',
      experience: '6 years',
      imageColor: 'bg-red-100',
      icon: <GraduationCap className="h-6 w-6 text-red-600" />
    },
    {
      id: 12,
      name: 'Jean',
      position: 'English Teacher',
      email: 'claire@mutovutss.edu.rw',
      phone: '+250 788 123 465',
      department: 'Languages Department',
      qualifications: 'MA English Literature, BA Education',
      experience: '8 years',
      imageColor: 'bg-cyan-100',
      icon: <BookOpen className="h-6 w-6 text-cyan-600" />
    },
    {
        id: 13,
        name: 'Jean',
        position: 'English Fabiola',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Clarisse',
        position: 'Chemistry Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Ndayize Emmanuel',
        position: 'CAD Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'EPA',
        position: 'CAD Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Ildephonse',
        position: 'RCD Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Pacy',
        position: 'Multimedia Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Leonard',
        position: 'Multimedia Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Eugene',
        position: 'Business Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Eric',
        position: 'SOD Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Celestin',
        position: 'SOD Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
      {
        id: 12,
        name: 'Olivier',
        position: 'SOD Teacher',
        email: 'claire@mutovutss.edu.rw',
        phone: '+250 788 123 465',
        department: 'Languages Department',
        qualifications: 'MA English Literature, BA Education',
        experience: '8 years',
        imageColor: 'bg-cyan-100',
        icon: <BookOpen className="h-6 w-6 text-cyan-600" />
      },
  ]
};

const StaffLayout = () => {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Staff</h1>
        <p className="text-gray-600 text-lg">Meet our dedicated team of professionals who shape the future of our students</p>
      </div>

      {/* Staff Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-primary mb-2">{staffData.administration.length + staffData.teaching.length}</div>
          <p className="text-gray-600">Total Staff Members</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-2">{staffData.administration.length}</div>
          <p className="text-gray-600">Administration Staff</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-secondary mb-2">{staffData.teaching.length}</div>
          <p className="text-gray-600">Teaching Staff</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
          <p className="text-gray-600">Departments</p>
        </div>
      </div>

      {/* Staff Navigation */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
        <NavLink
          to="administration"
          className={({ isActive }) =>
            `flex-1 py-3 px-6 rounded-lg text-center font-medium transition-all duration-300 ${
              isActive 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white text-gray-700 shadow hover:shadow-md'
            }`
          }
        >
          <UserCog className="inline h-5 w-5 mr-2" />
          Administration Staff
        </NavLink>
        <NavLink
          to="teaching"
          className={({ isActive }) =>
            `flex-1 py-3 px-6 rounded-lg text-center font-medium transition-all duration-300 ${
              isActive 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white text-gray-700 shadow hover:shadow-md'
            }`
          }
        >
          <GraduationCap className="inline h-5 w-5 mr-2" />
          Teaching Staff
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

const StaffCard = ({ staff }) => (
  <div className="staff-card">
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
      <div className={`${staff.imageColor} p-4 rounded-lg mb-3 sm:mb-0 sm:mr-4`}>
        {staff.icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{staff.name}</h3>
        <p className="text-primary font-semibold">{staff.position}</p>
        <p className="text-gray-600 text-sm">{staff.department}</p>
      </div>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center text-gray-700">
        <Mail className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm truncate">{staff.email}</span>
      </div>
      <div className="flex items-center text-gray-700">
        <Phone className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm">{staff.phone}</span>
      </div>
    </div>
    
    <div className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex justify-between text-sm text-gray-600">
        <div>
          <span className="font-medium">Qualifications:</span>
          <p className="mt-1">{staff.qualifications}</p>
        </div>
      </div>
      <div className="mt-3 text-sm">
        <span className="font-medium text-gray-600">Experience: </span>
        <span className="text-primary">{staff.experience}</span>
      </div>
    </div>
  </div>
);

const AdministrationStaff = () => (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Administration Staff</h2>
      <p className="text-gray-600">Our administrative team ensures smooth school operations and supports educational excellence</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {staffData.administration.map((staff) => (
        <StaffCard key={staff.id} staff={staff} />
      ))}
    </div>
    
    <div className="mt-8 p-6 bg-blue-50 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Administration Office Hours</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Monday - Friday: 7:30 AM - 5:00 PM</p>
          <p className="text-sm text-gray-600">Saturday: 8:00 AM - 12:00 PM</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Location: Main Administration Building</p>
          <p className="text-sm text-gray-600">Extension: 101-104</p>
        </div>
      </div>
    </div>
  </div>
);

const TeachingStaff = () => (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Teaching Staff</h2>
      <p className="text-gray-600">Our qualified teaching staff provides quality technical education and mentorship</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staffData.teaching.map((staff) => (
        <StaffCard key={staff.id} staff={staff} />
      ))}
    </div>
    
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-green-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Staff Development</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Regular professional development workshops</li>
          <li>• Industry partnership programs</li>
          <li>• Research and innovation support</li>
          <li>• International training opportunities</li>
        </ul>
      </div>
      
      <div className="p-6 bg-purple-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Department Contacts</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><strong>ICT Department:</strong> Ext. 201-204</li>
          <li><strong>Construction Department:</strong> Ext. 301-303</li>
          <li><strong>Multimedia Department:</strong> Ext. 401-403</li>
          <li><strong>Academic Departments:</strong> Ext. 501-510</li>
        </ul>
      </div>
    </div>
  </div>
);

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