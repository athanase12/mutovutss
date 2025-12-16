import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  return (
    // Outer container with full-page styling and fade-in effect
    <div className="bg-gray-100 min-h-screen animate-fade-in">
      
      {/* 1. HERO/HEADER SECTION (Enhanced) */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-900 text-white shadow-2xl border-b-4 border-yellow-500">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter transition duration-500 hover:text-white/90">
            Multimedia <span className="text-yellow-400 drop-shadow-lg">Showcase</span>
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-blue-200 lg:mx-auto">
            Experience the **vibrant life** and cutting-edge technical programs at Mutovu TSS through our dynamic video gallery.
          </p>
        </div>
      </div>

      {/* 2. VIDEO GALLERY CONTAINER (Highly Interactive Cards) */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          
          {/* CARD 1: CUSTOMIZED VIDEO (Local File) - Group Hover Effects */}
          <div className="bg-white p-7 rounded-2xl shadow-xl transition duration-500 transform 
                hover:shadow-3xl hover:shadow-blue-300/60 hover:scale-[1.02] border-t-4 border-transparent hover:border-blue-600 group">
            <h3 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition duration-300">VIDEO: Digital Skills Overview</h3>
            <p className="text-gray-600 mb-5 border-b border-gray-200 pb-3">
              A look at our specialized Digital Skills curriculum, focusing on practical applications for the local economy.
            </p>
            
            {/* Responsive Video Container - Applies effects to the video itself */}
            <div className="aspect-video w-full overflow-hidden">
              <video 
                width="100%" 
                height="100%" 
                controls 
                className="rounded-lg shadow-2xl transition duration-500 transform group-hover:rotate-1 group-hover:shadow-blue-500/50"
              >
                <source src="Digital.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> 
            </div>
          </div>
          
          {/* CARD 2: YOUTUBE VIDEO (External Link) - Group Hover Effects */}
          <div className="bg-white p-7 rounded-2xl shadow-xl transition duration-500 transform 
                hover:shadow-3xl hover:shadow-yellow-300/60 hover:scale-[1.02] border-t-4 border-transparent hover:border-yellow-600 group">
            <h3 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-yellow-700 transition duration-300">YOUTUBE VIDEO: Global Tech Trends</h3>
            <p className="text-gray-600 mb-5 border-b border-gray-200 pb-3">
              A featured external resource demonstrating the global context of the technical skills you will master.
            </p>
            
            {/* Responsive ReactPlayer Container - Note: ReactPlayer itself handles internal styling, so we style the container. */}
            <div className="aspect-video w-full rounded-lg shadow-2xl transition duration-500 transform group-hover:rotate-[-1deg] group-hover:shadow-yellow-500/50 overflow-hidden">
              <ReactPlayer 
                height="100%" 
                width="100%"
                url='https://www.youtube.com/embed/27AuyXfHfB8'
                controls={true}
              />
            </div>

          </div>
{/* CARD 3: YOUTUBE VIDEO (External Link) - Group Hover Effects */}
          <div className="bg-white p-7 rounded-2xl shadow-xl transition duration-500 transform 
                hover:shadow-3xl hover:shadow-yellow-300/60 hover:scale-[1.02] border-t-4 border-transparent hover:border-yellow-600 group">
            <h3 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-yellow-700 transition duration-300">YOUTUBE VIDEO: Global Tech Trends One</h3>
            <p className="text-gray-600 mb-5 border-b border-gray-200 pb-3">
              A featured external resource demonstrating the global community.
            </p>
            
            {/* Responsive ReactPlayer Container - Note: ReactPlayer itself handles internal styling, so we style the container. */}
            <div className="aspect-video w-full rounded-lg shadow-2xl transition duration-500 transform group-hover:rotate-[-1deg] group-hover:shadow-yellow-500/50 overflow-hidden">
              <ReactPlayer 
                height="100%" 
                width="100%"
                url='https://www.youtube.com/embed/ixnQhfOtIj0'
                controls={true}
              />
            </div>

          </div>
 {/* CARD 2: YOUTUBE VIDEO (External Link) - Group Hover Effects */}
           <div className="bg-white p-7 rounded-2xl shadow-xl transition duration-500 transform 
                hover:shadow-3xl hover:shadow-yellow-300/60 hover:scale-[1.02] border-t-4 border-transparent hover:border-yellow-600 group">
            <h3 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-yellow-700 transition duration-300">YOUTUBE VIDEO: Global Tech Trends two</h3>
            <p className="text-gray-600 mb-5 border-b border-gray-200 pb-3">
              A featured external resource demonstrating the global community.
            </p>
            
            {/* Responsive ReactPlayer Container - Note: ReactPlayer itself handles internal styling, so we style the container. */}
            <div className="aspect-video w-full rounded-lg shadow-2xl transition duration-500 transform group-hover:rotate-[-1deg] group-hover:shadow-yellow-500/50 overflow-hidden">
              <ReactPlayer 
                height="100%" 
                width="100%"
                url='https://www.youtube.com/embed/_2n7Vklv24g'
                controls={true}
              />
            </div>

          </div>
{/* CARD 2: YOUTUBE VIDEO (External Link) - Group Hover Effects */}
          <div className="bg-white p-7 rounded-2xl shadow-xl transition duration-500 transform 
                hover:shadow-3xl hover:shadow-yellow-300/60 hover:scale-[1.02] border-t-4 border-transparent hover:border-yellow-600 group">
            <h3 className="text-2xl font-bold text-blue-900 mb-2 group-hover:text-yellow-700 transition duration-300">YOUTUBE VIDEO: Global Tech Trends Three</h3>
            <p className="text-gray-600 mb-5 border-b border-gray-200 pb-3">
              A featured external resource demonstrating the global community.
            </p>
            
            {/* Responsive ReactPlayer Container - Note: ReactPlayer itself handles internal styling, so we style the container. */}
            <div className="aspect-video w-full rounded-lg shadow-2xl transition duration-500 transform group-hover:rotate-[-1deg] group-hover:shadow-yellow-500/50 overflow-hidden">
              <ReactPlayer 
                height="100%" 
                width="100%"
                url='https://www.youtube.com/embed/haWppsokv_o'
                controls={true}
              />
            </div>

          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE TEXT CALLOUT (CTA) - Stronger Focus */}
      <div className="bg-green-700 text-white mt-12 py-12 px-4 sm:px-6 lg:px-8 shadow-inner shadow-green-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold transition duration-300 hover:text-yellow-300">Interested in our full curriculum?</h2>
            <p className="text-lg mt-1 text-green-200">
              Download our latest program catalog for a detailed breakdown of all courses.
            </p>
          </div>
          
          {/* Interactive Button with hover scale, shadow, and ring */}
          <a 
            href="/about" 
            className="px-10 py-4 text-xl font-bold rounded-full bg-white text-green-700 
                transition duration-300 transform hover:scale-110 hover:bg-green-50 
                shadow-2xl hover:shadow-green-900/70 
                ring-4 ring-transparent hover:ring-green-300 active:scale-95"
          >
            View Technical Programs
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;