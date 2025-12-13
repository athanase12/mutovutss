import React from 'react';
import { MdMenuBook } from 'react-icons/md'; 
import { GiJewelCrown } from "react-icons/gi";
import { MdOutlineCastForEducation } from "react-icons/md";

// --- 1. Define Tailwind CSS Utility Class for enhanced hover/interaction effects ---
const interactiveIconClass = 
    "w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg " +
    "transition duration-500 ease-in-out cursor-pointer " +
    "hover:text-yellow-300 hover:scale-125 hover:rotate-6 " +
    "animate-none md:animate-pulse"; // Main icon interactivity styles

const interactiveIconBounceClass = 
    "w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg " +
    "transition duration-500 ease-in-out cursor-pointer " +
    "hover:text-red-300 hover:scale-125 hover:rotate-[-6deg] " +
    "animate-none md:animate-bounce"; // Special style for the bouncing icon

const ScrollingText = () => {
    return (
        // Enhanced container with shadow, hover effect on the entire bar, and fixed height
        <div 
            className="flex items-center h-20 sm:h-24 md:h-28 
                       bg-gradient-to-r from-blue-700 via-purple-600 to-green-500 
                       w-full justify-between shadow-2xl transition duration-500 
                       hover:shadow-4xl hover:from-blue-600 hover:via-purple-500 hover:to-green-400
                       border-b-4 border-yellow-400"
        >
            
            {/* 1. ICONS: Applied new interactive classes */}
            <div className="flex ml-4 sm:ml-10 space-x-4 md:space-x-8">
                
                <MdMenuBook 
                    className={interactiveIconClass} 
                    // No additional animation override needed here
                />
                
                <GiJewelCrown 
                    className={interactiveIconClass + " delay-100"} 
                    // Added a slight delay for staggered pulse
                />
                
                <MdOutlineCastForEducation 
                    className={interactiveIconBounceClass} // Uses the special bounce/rotate class
                />
            </div>
            
            {/* 2. TEXT: Enhanced text style with responsiveness and dynamic effects */}
            <div 
                className="
                    scrolling-text 
                    text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                    font-serif font-extrabold text-yellow-100 drop-shadow-xl 
                    mr-4 sm:mr-10 
                    
                    /* Interactive text effects */
                    cursor-default
                    transition duration-500 hover:text-white hover:drop-shadow-2xl
                    
                    /* Key Changes: Base is animate-none, md:animate-bounce overrides it */
                    animate-none 
                    md:animate-bounce
                "
            >
                Welcome To Mutovu Technical school
            </div>
        </div>
    );
};

export default ScrollingText;