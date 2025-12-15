import React, { useState } from 'react';
import { Layers, Youtube } from 'lucide-react';

const videoLessons = {
  foundations: {
    title: 'Building Foundations Explained',
    videoId: '4YGfI0Pdpng',
  },
  concrete: {
    title: 'Concrete Mixing & Reinforcement',
    videoId: 'dQw4w9WgXcQ',
  },
  safety: {
    title: 'Construction Site Safety (OHS)',
    videoId: 'e6J1P6Zs2RI',
  },
  site: {
    title: 'Site Layout & Project Scheduling',
    videoId: 'mX0kJzZ9sG4',
  },
};

const BuildingNotes = () => {
  const [views, setViews] = useState({
    foundations: 180,
    concrete: 150,
    safety: 210,
    site: 125,
  });

  const [activeVideo, setActiveVideo] = useState('foundations');

  const totalViews = Object.values(views).reduce((a, b) => a + b, 0);

  const handleSelectVideo = (key) => {
    setActiveVideo(key);
    setViews((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };

  return (
    <div className="p-6 md:p-8 space-y-8">

      {/* Title */}
      <h3 className="text-3xl font-extrabold text-orange-800 border-b-4 border-orange-500 pb-3 flex items-center gap-3">
        <Layers className="w-8 h-8 text-orange-600" />
        Building Construction Video Lessons
      </h3>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-orange-100 p-4 rounded-lg">
          <p className="text-2xl font-bold">{totalViews}</p>
          <p className="text-sm text-gray-600">Total Video Views</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-2xl font-bold">300+</p>
          <p className="text-sm text-gray-600">Active Students</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-2xl font-bold">4</p>
          <p className="text-sm text-gray-600">Video Lessons</p>
        </div>
      </div>

      {/* Video Player */}
      <div className="bg-black rounded-lg overflow-hidden aspect-video shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoLessons[activeVideo].videoId}`}
          title={videoLessons[activeVideo].title}
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <p className="text-center font-semibold text-gray-700">
        ▶ {videoLessons[activeVideo].title}
      </p>

      {/* Lesson List */}
      <div className="space-y-4">
        <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
          <Youtube className="w-6 h-6 text-red-600" />
          Available Lessons
        </h4>

        <ul className="space-y-3">
          {Object.entries(videoLessons).map(([key, lesson]) => (
            <li
              key={key}
              className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition
                ${activeVideo === key ? 'bg-orange-50 border-orange-400' : 'bg-white hover:bg-gray-50'}
              `}
              onClick={() => handleSelectVideo(key)}
            >
              <div>
                <p className="font-semibold">{lesson.title}</p>
                <p className="text-sm text-gray-600">Views: {views[key]}</p>
              </div>
              <span className="text-red-600 font-semibold">Watch ▶</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learning Outcomes */}
      <div className="pt-4">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          🎯 Learning Outcomes
        </h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>Understand foundation types and load behavior</li>
          <li>Apply concrete mixing and reinforcement methods</li>
          <li>Follow construction site safety regulations</li>
          <li>Plan and manage construction projects efficiently</li>
        </ul>
      </div>

    </div>
  );
};

export default BuildingNotes;
