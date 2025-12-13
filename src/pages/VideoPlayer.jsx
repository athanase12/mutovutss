import React from 'react';
import ReactPlayer from 'react-player';
const VideoPlayer = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO/HEADER SECTION */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-blue-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-6xl">
            Multimedia <span className="text-yellow-400">Showcase</span>
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-blue-200 lg:mx-auto">
            Experience the vibrant life and cutting-edge technical programs at Mutovu TSS through our video gallery.
          </p>
        </div>
      </div>

      {/* 2. VIDEO GALLERY CONTAINER (Responsive Grid) */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* CARD 1: CUSTOMIZED VIDEO (Local File) */}
          <div className="bg-white p-6 rounded-xl shadow-2xl transition duration-300 hover:shadow-blue-300/50">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">VIDEO: Digital Skills Overview</h3>
            <p className="text-gray-600 mb-5 border-b pb-3">
              A look at our specialized Digital Skills curriculum, focusing on practical applications for the local economy.
            </p>
            
            {/* Responsive Video Container */}
            <div className="aspect-video w-full">
              <video 
                // Set width/height to 100% to fill the responsive container
                width="100%" 
                height="100%" 
                controls 
                className="rounded-lg shadow-lg"
              >
                {/* Ensure Digital.mp4 is accessible in the public folder */}
                <source src="Digital.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> 
            </div>
          </div>
          
          {/* CARD 2: YOUTUBE VIDEO (External Link) */}
          <div className="bg-white p-6 rounded-xl shadow-2xl transition duration-300 hover:shadow-yellow-300/50">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">YOUTUBE VIDEO: Global Tech Trends</h3>
            <p className="text-gray-600 mb-5 border-b pb-3">
              A featured external resource demonstrating the global context of the technical skills you will master.
            </p>
            
            {/* Responsive ReactPlayer Container */}
            <div className="aspect-video w-full">
              <ReactPlayer 
                // Set width/height to 100% to fill the responsive container
                height="100%" 
                width="100%"
                url='https://www.youtube.com/embed/27AuyXfHfB8'
                controls={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE TEXT CALLOUT (CTA) */}
      <div className="bg-green-600 text-white mt-6 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold">Interested in our full curriculum?</h2>
            <p className="text-lg mt-1 text-green-200">
              Download our latest program catalog for a detailed breakdown of all courses.
            </p>
          </div>
          
          {/* Interactive Button */}
          <a 
            href="/about" // Link to the About/Mission page
            className="px-8 py-3 text-lg font-semibold rounded-full bg-white text-green-700 hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-xl"
          >
            View Technical Programs
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;