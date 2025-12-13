import { Outlet, NavLink, Route, Routes } from "react-router-dom";
// Assuming these components exist for rendering nested content
import StudentParentRegistrationForm from "./StudentParentRegistrationForm";
import StudentRegistrationForm from "./StudentRegistrationForm";

// --- 1. Define Enhanced Tailwind CSS Utility Classes for Interactivity and Design ---

const baseLinkStyle = 
  "py-3 px-6 rounded-xl transition duration-300 ease-in-out cursor-pointer whitespace-nowrap text-lg sm:text-xl font-medium border-b-4";

// Inactive Link Style: Subtle hover effects, uses blue accents
const inactiveLinkStyle = 
  `${baseLinkStyle} text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-600 ` +
  `transform hover:scale-105 hover:shadow-lg`;

// Active Link Style: Strong visual prominence, dynamic interaction
const activeLinkStyle = 
  `${baseLinkStyle} bg-blue-700 text-yellow-300 font-extrabold border-yellow-400 shadow-2xl ` +
  `transform scale-[1.05] hover:bg-blue-800 ring-2 ring-yellow-400/50`; // Scale, strong shadow, and accent ring

// --- 2. Registration Component ---
export default function Registration() {
    return (
        // Enhanced main container with styling, responsiveness, and depth
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-3xl mx-auto my-8 border-t-8 border-blue-600 max-w-7xl animate-slideIn">
            
            {/* Header with improved styling and text alignment */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-6 pb-2 border-b-2 border-gray-200 text-center md:text-left">
                Student <span className="text-yellow-500">& Parent</span> Registration
            </h1>
            
            {/* Sub-Navigation with spacing, interactivity, and responsiveness */}
            <nav className="flex flex-wrap gap-4 sm:space-x-6 mb-8 justify-center sm:justify-start">
                
                {/* NavLink for Student Registration */}
                <NavLink 
                    to="student" 
                    className={({ isActive }) =>
                        isActive ? activeLinkStyle : inactiveLinkStyle
                    }
                >
                    Student Registration
                </NavLink> 

                {/* NavLink for Parent Registration */}
                <NavLink 
                    to="parent" 
                    className={({ isActive }) =>
                        isActive ? activeLinkStyle : inactiveLinkStyle
                    }
                >
                    Parent Registration
                </NavLink>
            </nav>
            
            {/* Content Area: Routes and Outlet */}
            <div className="p-4 sm:p-8 border-4 border-dashed border-blue-200 rounded-xl bg-gray-50 min-h-[400px] transition duration-700 shadow-inner">
                <Routes>
                    {/* Placeholder for Student Registration */}
                    <Route path="student" element={<StudentRegistrationForm/>}/>
                    
                    {/* Placeholder for Parent Registration */}
                    <Route path="parent" element={<StudentParentRegistrationForm/>}/>
                    
                    {/* Index route for when /registration is hit directly */}
                    <Route 
                        index 
                        element={
                            <div className="text-center p-12 text-xl font-medium text-gray-600">
                                <p className="mb-4">
                                    <span className="font-bold text-blue-800">Welcome to the Mutovu TSS Registration Portal!</span>
                                </p>
                                <p className="animate-pulse">
                                    Please select **Student** or **Parent Registration** above to continue.
                                </p>
                            </div>
                        } 
                    />
                </Routes>
                <Outlet /> 
            </div>
        </div>
    );
}

/* // NOTE: Custom Keyframe for Tailwind (must be defined in tailwind.config.js):
module.exports = {
  // ... other configs
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
      },
    },
  },
  // ... other configs
};
*/
