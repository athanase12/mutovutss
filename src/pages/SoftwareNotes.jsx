import React from 'react';

const SoftwareNotes = () => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">

      {/* Title */}
      <h3 className="text-2xl font-bold text-blue-700 border-b pb-2">
        Software Development Notes
      </h3>

      {/* Overview */}
      <p className="text-gray-700">
        Software development involves designing, building, testing, and maintaining
        applications. These notes cover modern front-end and back-end technologies,
        databases, and best practices used in professional software engineering.
      </p>

      {/* Core Areas */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Core Development Areas</h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>Front-end development with HTML, CSS, JavaScript, and ReactJS</li>
          <li>Back-end development using Node.js and Express</li>
          <li>Database design and management using SQL and MySQL</li>
          <li>Version control and collaboration using Git and GitHub</li>
        </ul>
      </div>

      {/* Modules */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Module Breakdown</h4>
        <ul className="list-decimal list-inside ml-4 text-gray-600 space-y-1">
          <li>JavaScript ES6+ Features (arrow functions, async/await, modules)</li>
          <li>React Components, Props, State, and Lifecycle</li>
          <li>Routing and State Management</li>
          <li>RESTful API Design and Integration</li>
          <li>Authentication and Authorization Basics</li>
        </ul>
      </div>

      {/* Tools & Technologies */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Tools & Technologies</h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>ReactJS, Vite, Tailwind CSS</li>
          <li>Node.js, Express, Postman</li>
          <li>MySQL, MongoDB</li>
          <li>VS Code, Git, GitHub</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Best Practices</h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>Writing clean, reusable, and maintainable code</li>
          <li>Following component-based architecture</li>
          <li>Proper error handling and validation</li>
          <li>Securing APIs and sensitive data</li>
        </ul>
      </div>

      {/* Learning Outcomes */}
      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">Learning Outcomes</h4>
        <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
          <li>Build full-stack web applications</li>
          <li>Create and consume RESTful APIs</li>
          <li>Design relational databases efficiently</li>
          <li>Deploy and maintain software projects</li>
        </ul>
      </div>

    </div>
  );
};

export default SoftwareNotes;
