import React from 'react';

const MultimediaNotes = () => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-green-700 border-b pb-2">
        Multimedia Production Notes
      </h3>

      {/* Introduction */}
      <p className="text-gray-700">
        Multimedia production combines visual, audio, and interactive elements to
        communicate messages effectively. These notes focus on core concepts,
        industry-standard tools, and practical workflows used in modern media projects.
      </p>

      {/* Key Focus Areas */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Key Focus Areas</h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>Graphic design principles (layout, color theory, typography)</li>
          <li>Video editing using non-linear editing software</li>
          <li>Audio recording, editing, and sound design</li>
          <li>Storyboarding and pre-production planning</li>
        </ul>
      </div>

      {/* Software & Tools */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Common Tools & Software</h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>Adobe Photoshop & Illustrator (graphics)</li>
          <li>Adobe Premiere Pro & DaVinci Resolve (video editing)</li>
          <li>After Effects (motion graphics & visual effects)</li>
          <li>Audacity & Adobe Audition (audio production)</li>
        </ul>
      </div>

      {/* Lessons */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Lesson Breakdown</h4>
        <ul className="list-decimal list-inside ml-4 text-gray-600 space-y-1">
          <li>Introduction to Visual Storytelling</li>
          <li>Camera Basics and Shot Composition</li>
          <li>Non-Linear Editing Fundamentals</li>
          <li>Audio Mixing and Noise Reduction</li>
          <li>Advanced Color Correction & Grading</li>
        </ul>
      </div>

      {/* Learning Outcomes */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Learning Outcomes</h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>Create visually appealing multimedia content</li>
          <li>Edit videos with professional workflows</li>
          <li>Apply sound design to enhance storytelling</li>
          <li>Deliver complete multimedia projects from concept to final export</li>
        </ul>
      </div>

    </div>
  );
};

export default MultimediaNotes;
