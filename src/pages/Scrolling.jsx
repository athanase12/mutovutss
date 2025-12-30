import React, { useState, useEffect } from "react";
import { MdMenuBook, MdWbSunny, MdCloudQueue, MdNightlight } from "react-icons/md";
import { GiJewelCrown } from "react-icons/gi";
import { MdOutlineCastForEducation } from "react-icons/md";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi";

/* ICON STYLES */
const interactiveIconClass =
  "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg " +
  "transition duration-500 ease-in-out cursor-pointer " +
  "hover:text-yellow-300 hover:scale-110 md:hover:scale-125";

const interactiveIconBounceClass =
  "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg " +
  "transition duration-500 ease-in-out cursor-pointer " +
  "hover:text-red-300 hover:scale-110 md:hover:scale-125 md:animate-bounce";

const ScrollingText = () => {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("Kigali");
  const [weather, setWeather] = useState({
    icon: <MdWbSunny />,
    label: "Sunny",
    temp: 24
  });

  /* CLOCK */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* GEOLOCATION */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      () => setLocation("Your Area"),
      () => setLocation("Kigali")
    );
  }, []);

  /* WEATHER LOGIC */
  useEffect(() => {
    const hour = time.getHours();

    if (hour >= 5 && hour < 11) {
      setWeather({
        icon: <MdWbSunny className="text-yellow-400" />,
        label: "Sunny",
        temp: 23
      });
    } else if (hour >= 11 && hour < 16) {
      setWeather({
        icon: <MdCloudQueue className="text-gray-200" />,
        label: "Partly Cloudy",
        temp: 26
      });
    } else if (hour >= 16 && hour < 19) {
      setWeather({
        icon: <MdCloudQueue className="text-gray-400" />,
        label: "Cloudy",
        temp: 22
      });
    } else {
      setWeather({
        icon: <MdNightlight className="text-indigo-300" />,
        label: "Night",
        temp: 19
      });
    }
  }, [time]);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const formattedDate = time.toLocaleDateString([], {
    day: "numeric",
    month: "short"
  });

  return (
    <div className="flex flex-col md:flex-row items-center min-h-[120px] md:h-32
      bg-gradient-to-r from-blue-900 via-purple-800 to-green-700
      w-full justify-between shadow-2xl border-b-4 border-yellow-400
      relative overflow-hidden p-2 md:p-0">

      {/* LEFT / TOP PANEL */}
      <div className="flex items-center w-full md:w-auto h-full px-4
        bg-black/20 backdrop-blur-md border-b md:border-r border-white/10
        justify-between gap-4">

        {/* WEATHER */}
        <div className="hidden sm:flex flex-col items-center text-white">
          <div className="text-2xl md:text-3xl animate-spin-slow">
            {weather.icon}
          </div>
          <span className="text-xs font-bold">{weather.temp}°C</span>
          <span className="text-[10px] uppercase opacity-70">
            {weather.label} • {location}
          </span>
        </div>

        {/* TIME & DATE */}
        <div className="flex flex-col text-white font-mono">
          <div className="flex items-center gap-2 text-sm md:text-lg font-bold text-yellow-300">
            <HiOutlineClock />
            {formattedTime}
          </div>
          <div className="flex items-center gap-2 text-[10px] md:text-xs opacity-80">
            <HiOutlineCalendar />
            {formattedDate}, 2025
          </div>
        </div>

        {/* ICONS */}
        <div className="flex gap-2 md:gap-4">
          <MdMenuBook className={interactiveIconClass} />
          <GiJewelCrown className={interactiveIconClass} />
          <MdOutlineCastForEducation className={interactiveIconBounceClass} />
        </div>
      </div>

      {/* HERO TEXT */}
      <div className="flex-1 flex items-center justify-center py-3 md:py-0">
        <div className="
          text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl
          font-serif font-extrabold text-transparent bg-clip-text
          bg-gradient-to-b from-yellow-100 to-yellow-400
          drop-shadow-lg md:animate-bounce">
          Welcome To Mutovu Technical Secondary School.
        </div>
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default ScrollingText;

