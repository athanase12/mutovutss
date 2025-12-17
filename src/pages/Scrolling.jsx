import React, { useState, useEffect } from 'react';
import { MdMenuBook, MdCloudQueue, MdWbSunny, MdOutlineUmbrella } from 'react-icons/md'; 
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
    
    // Changing Weather Logic
    const weatherCycles = [
        { type: 'Sunny', temp: '28°C', icon: <MdWbSunny className="text-yellow-400 animate-spin-slow" />, color: 'shadow-yellow-500/50' },
        { type: 'Cloudy', temp: '22°C', icon: <MdCloudQueue className="text-blue-200 animate-bounce" />, color: 'shadow-blue-300/50' },
        { type: 'Rainy', temp: '19°C', icon: <MdOutlineUmbrella className="text-indigo-300 animate-pulse" />, color: 'shadow-indigo-500/50' }
    ];
    const [weatherIndex, setWeatherIndex] = useState(0);

    useEffect(() => {
        // Clock Interval
        const clockTimer = setInterval(() => setTime(new Date()), 1000);
        
        // Weather Change Interval (Cycles every 10 seconds)
        const weatherTimer = setInterval(() => {
            setWeatherIndex((prev) => (prev + 1) % weatherCycles.length);
        }, 10000);

        return () => {
            clearInterval(clockTimer);
            clearInterval(weatherTimer);
        };
    }, []);

    const currentWeather = weatherCycles[weatherIndex];
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = time.toLocaleDateString([], { day: 'numeric', month: 'short' });

    return (
        <div 
            className="flex items-center h-24 sm:h-28 md:h-32 
                       bg-gradient-to-r from-blue-900 via-purple-800 to-green-700 
                       w-full justify-between shadow-2xl transition-all duration-1000 
                       border-b-4 border-yellow-400 relative overflow-hidden"
        >
            {/* 1. INTERACTIVE INFO PANEL */}
            <div className="flex z-10 items-center h-full px-4 bg-black/30 backdrop-blur-lg border-r border-white/10 space-x-4 md:space-x-6">
                
                {/* DYNAMIC CHANGING WEATHER */}
                <div 
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-1000 shadow-lg ${currentWeather.color} bg-white/5 group relative cursor-help`}
                >
                    <div className="text-2xl md:text-3xl transition-transform duration-500 group-hover:scale-110">
                        {currentWeather.icon}
                    </div>
                    <span className="text-xs font-black text-white mt-1">{currentWeather.temp}</span>
                    <span className="text-[8px] uppercase font-bold text-white/60 tracking-tighter">Kigali</span>
                    
                    {/* Floating Tooltip */}
                    <div className="absolute -top-10 left-0 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/20">
                        Current Sky: {currentWeather.type}
                    </div>
                </div>

                {/* Date/Time Widget */}
                <div className="flex flex-col text-white font-mono border-l border-white/20 pl-4">
                    <div className="flex items-center gap-2 text-sm md:text-xl font-black text-yellow-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                        <HiOutlineClock className="animate-pulse text-white/70" />
                        {formattedTime}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-100/80">
                        <HiOutlineCalendar className="text-yellow-400" />
                        {formattedDate}, 2025
                    </div>
                </div>

                {/* SPIRIT BUTTON (Interactive Element) */}
                <button 
                    onClick={() => setSpiritCount(prev => prev + 1)}
                    className="flex flex-col items-center bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 p-2 rounded-lg transition-all active:scale-90 group"
                >
                    <span className="text-[10px] font-bold text-yellow-400 uppercase leading-none mb-1">Spirit</span>
                    <span className="text-lg font-black text-white group-hover:animate-bounce">{spiritCount}</span>
                </button>
            </div>

            {/* 2. ICONS SECTION */}
            <div className="flex z-10 space-x-3 md:space-x-8 items-center px-4">
                <div className="group relative">
                    <MdMenuBook className={interactiveIconClass} />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black/80 text-[10px] text-white px-2 py-0.5 rounded">Library</div>
                </div>
                <div className="group relative">
                    <GiJewelCrown className={interactiveIconClass + " delay-100"} />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black/80 text-[10px] text-white px-2 py-0.5 rounded">Excellence</div>
                </div>
                <div className="group relative">
                    <MdOutlineCastForEducation className={interactiveIconBounceClass} />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black/80 text-[10px] text-white px-2 py-0.5 rounded">Education</div>
                </div>
            </div>
            
            {/* 3. SCROLLING TEXT */}
            <div 
                className="
                    flex-1 flex items-center justify-center
                    text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                    font-serif font-extrabold text-transparent bg-clip-text
                    bg-gradient-to-b from-yellow-100 to-yellow-500 drop-shadow-xl
                    transition duration-500 hover:scale-105 select-none
                    animate-none md:animate-bounce
                "
            >
                Welcome To Mutovu Technical Secondary School
            </div>

            {/* Aesthetic Flare */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse"></div>
        </div>
    );
};

export default ScrollingText;