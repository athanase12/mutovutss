import React, { useState, useEffect } from 'react';
import { MdMenuBook, MdCloudQueue, MdWbSunny } from 'react-icons/md'; 
import { GiJewelCrown } from "react-icons/gi";
import { MdOutlineCastForEducation } from "react-icons/md";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi";

// --- Utility Classes ---
const interactiveIconClass = 
    "w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg " +
    "transition duration-500 ease-in-out cursor-pointer " +
    "hover:text-yellow-300 hover:scale-125 hover:rotate-6 " +
    "animate-none md:animate-pulse";

const interactiveIconBounceClass = 
    "w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg " +
    "transition duration-500 ease-in-out cursor-pointer " +
    "hover:text-red-300 hover:scale-125 hover:rotate-[-6deg] " +
    "animate-none md:animate-bounce";

const ScrollingText = () => {
    const [time, setTime] = useState(new Date());
    const [spiritCount, setSpiritCount] = useState(0);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = time.toLocaleDateString([], { day: 'numeric', month: 'short' });

    return (
        <div 
            className="flex items-center h-24 sm:h-28 md:h-32 
                       bg-gradient-to-r from-blue-900 via-purple-800 to-green-700 
                       w-full justify-between shadow-2xl transition duration-500 
                       hover:from-blue-800 hover:via-purple-700 hover:to-green-600
                       border-b-4 border-yellow-400 relative overflow-hidden"
        >
            {/* 1. INTERACTIVE INFO PANEL (Weather, Date, Time) */}
            <div className="flex z-10 items-center h-full px-4 bg-black/20 backdrop-blur-md border-r border-white/10 space-x-4 md:space-x-6">
                
                {/* Weather Widget */}
                <div className="hidden lg:flex flex-col items-center text-white transition hover:scale-110 cursor-help">
                    <MdWbSunny className="text-yellow-400 text-2xl animate-spin-slow" style={{ animationDuration: '8s' }} />
                    <span className="text-xs font-bold">24°C</span>
                    <span className="text-[10px] uppercase opacity-70">Kigali</span>
                </div>

                {/* Date/Time Widget */}
                <div className="flex flex-col text-white font-mono border-l border-white/20 pl-4">
                    <div className="flex items-center gap-2 text-sm md:text-lg font-bold text-yellow-300">
                        <HiOutlineClock className="animate-pulse" />
                        {formattedTime}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs opacity-80">
                        <HiOutlineCalendar />
                        {formattedDate}, 2025
                    </div>
                </div>

                {/* Spirit Counter (Interactive Element) */}
               
            </div>

            {/* 2. ICONS: Original icons with enhanced spacing */}
            <div className="flex z-10 space-x-3 md:space-x-6 items-center px-4">
                <MdMenuBook className={interactiveIconClass} title="Library" />
                <GiJewelCrown className={interactiveIconClass + " delay-100"} title="Excellence" />
                <MdOutlineCastForEducation className={interactiveIconBounceClass} title="Education" />
            </div>
            
            {/* 3. SCROLLING TEXT: The Hero Element */}
            <div 
                className="
                    flex-1 flex items-center justify-center whitespace-nowrap
                    text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                    font-serif font-extrabold text-transparent bg-clip-text
                    bg-gradient-to-b from-yellow-100 to-yellow-400 drop-shadow-lg
                    cursor-default transition duration-500 hover:scale-105
                    animate-none md:animate-bounce
                "
            >
                Welcome To Mutovu Technical Secondary School
            </div>

            {/* Subtle Overlay Glow for extra "beauty" */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
    );
};

// Add this to your global CSS for the slow spin
// @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// .animate-spin-slow { animation: spin-slow 8s linear infinite; }

export default ScrollingText;
