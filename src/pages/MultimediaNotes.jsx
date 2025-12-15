import React, { useState } from 'react';

const MultimediaNotes = () => {
  const [downloads, setDownloads] = useState({
    design: 140,
    video: 110,
    audio: 95,
    motion: 75,
  });

  const totalDownloads = Object.values(downloads).reduce((a, b) => a + b, 0);

  const handleDownload = (key) => {
    setDownloads((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  };

  return (
    <div className="space-y-6 p-5 bg-white rounded-lg shadow-lg">

      {/* Title */}
      <h3 className="text-2xl font-bold text-green-700 border-b pb-2">
        Multimedia Production Notes & Resources
      </h3>

      {/* Introduction */}
      <p className="text-gray-700">
        Multimedia production combines visual, audio, and interactive elements to
        communicate messages effectively. These resources support students with
        professional workflows, creative techniques, and industry tools.
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-green-100 p-3 rounded">
          <p className="text-2xl font-bold">{totalDownloads}</p>
          <p className="text-sm text-gray-600">Total Downloads</p>
        </div>
        <div className="bg-blue-100 p-3 rounded">
          <p className="text-2xl font-bold">280+</p>
          <p className="text-sm text-gray-600">Active Students</p>
        </div>
        <div className="bg-purple-100 p-3 rounded">
          <p className="text-2xl font-bold">8</p>
          <p className="text-sm text-gray-600">Available PDFs</p>
        </div>
      </div>

      {/* PDF Books */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-3">
          📘 Downloadable Multimedia Production Books (PDF)
        </h4>

        <ul className="space-y-3">
          <li className="flex justify-between items-center border p-3 rounded">
            <div>
              <p className="font-semibold">Graphic Design Fundamentals</p>
              <p className="text-sm text-gray-600">
                Downloads: {downloads.design}
              </p>
            </div>
            <a
              href="/pdfs/graphic-design.pdf"
              download
              onClick={() => handleDownload('design')}
              className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download
            </a>
          </li>

          <li className="flex justify-between items-center border p-3 rounded">
            <div>
              <p className="font-semibold">Professional Video Editing Guide</p>
              <p className="text-sm text-gray-600">
                Downloads: {downloads.video}
              </p>
            </div>
            <a
              href="/pdfs/video-editing.pdf"
              download
              onClick={() => handleDownload('video')}
              className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download
            </a>
          </li>

          <li className="flex justify-between items-center border p-3 rounded">
            <div>
              <p className="font-semibold">Audio Production & Sound Design</p>
              <p className="text-sm text-gray-600">
                Downloads: {downloads.audio}
              </p>
            </div>
            <a
              href="/pdfs/audio-production.pdf"
              download
              onClick={() => handleDownload('audio')}
              className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download
            </a>
          </li>

          <li className="flex justify-between items-center border p-3 rounded">
            <div>
              <p className="font-semibold">Motion Graphics & Visual Effects</p>
              <p className="text-sm text-gray-600">
                Downloads: {downloads.motion}
              </p>
            </div>
            <a
              href="/pdfs/motion-graphics.pdf"
              download
              onClick={() => handleDownload('motion')}
              className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download
            </a>
          </li>
        </ul>
      </div>

      {/* Learning Outcomes */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          🎯 Learning Outcomes
        </h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>Design visually compelling multimedia content</li>
          <li>Edit professional-quality videos and audio</li>
          <li>Apply motion graphics and visual effects</li>
          <li>Complete multimedia projects from concept to delivery</li>
        </ul>
      </div>

    </div>
  );
};

export default MultimediaNotes;
