import React from 'react';
import { Outlet, NavLink, Route,Routes } from 'react-router-dom';
import { Film, Code, Building } from 'lucide-react';
import SoftwareNotes from './SoftwareNotes';
import BuildingNotes from './BuildingNotes';
import MultimediaNotes from './MultimediaNotes';
const getSubNavLinkClass = ({isActive}) => 
    `px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2 text-sm md:text-base ${
        isActive ? 'bg-purple-700 text-yellow-400 font-semibold shadow-lg' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    }`;

const ClassNotes = () => {
  return (
    <div className="p-4 border-4 border-purple-300 rounded-xl bg-purple-50 shadow-inner">
      <h2 className="text-4xl font-extrabold mb-8 text-purple-900 border-b-4 border-purple-500 pb-3">
        📚 Technical Class Notes
      </h2>
      
      {/* Sub-Navigation for Nested Routes */}
      <nav className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-lg shadow-md justify-center">
          <NavLink to="multimedianotes" className={getSubNavLinkClass}>
            <Film className="w-5 h-5" /> Multimedia Production Notes
          </NavLink>
          <NavLink to="softwarenotes" className={getSubNavLinkClass}>
            <Code className="w-5 h-5" /> Software Development Notes
          </NavLink>
          <NavLink to="buildingnotes" className={getSubNavLinkClass}>
            <Building className="w-5 h-5" /> Building Construction Notes
          </NavLink>
      </nav>
      <Routes>
        <Route path='softwarenotes' element={<SoftwareNotes/>}/>
        <Route path='buildingnotes' element={<BuildingNotes/>}/>
        <Route path='multimedianotes' element={<MultimediaNotes/>}/>
      </Routes>
      
      {/* Render Nested Route Content */}
      <div className="p-4 md:p-8 bg-white rounded-xl shadow-lg min-h-[400px]">
        <Outlet />
      </div>
    </div>
  );
};

export default ClassNotes;
