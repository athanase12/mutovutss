import React, { useState } from 'react';
import { Download, BookOpen, BarChart3 } from 'lucide-react';

const SoftwareNotes = () => {

  // 📊 Download statistics (local state – can later be replaced by backend)
  const [downloads, setDownloads] = useState({
    javascript: 0,
    react: 0,
    node: 0,
  });

  const [message, setMessage] = useState("");

  const handleDownload = (bookKey, bookName) => {
    setDownloads(prev => ({
      ...prev,
      [bookKey]: prev[bookKey] + 1
    }));

    setMessage(`✅ "${bookName}" downloaded successfully`);

    setTimeout(() => setMessage(""), 3000);
  };

  const totalDownloads =
    downloads.javascript + downloads.react + downloads.node;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">

      {/* Title */}
      <h3 className="text-2xl font-bold text-blue-700 border-b pb-2">
        Software Development Notes
      </h3>

      {/* Overview */}
      <p className="text-gray-700">
        Software development involves designing, building, testing, and maintaining
        applications. These notes cover front-end, back-end, databases, and best
        practices used in modern software engineering.
      </p>

      {/* 📊 STATISTICS PANEL */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="text-blue-700" />
          <h4 className="text-lg font-bold text-blue-800">
            Download Statistics
          </h4>
        </div>

        <ul className="text-gray-700 space-y-1 text-sm">
          <li>📘 JavaScript Book Downloads: <strong>{downloads.javascript}</strong></li>
          <li>📕 React Book Downloads: <strong>{downloads.react}</strong></li>
          <li>📗 Node.js Book Downloads: <strong>{downloads.node}</strong></li>
          <li className="mt-2">
            🔢 <strong>Total Downloads:</strong> {totalDownloads}
          </li>
        </ul>
      </div>

      {/* Feedback Message */}
      {message && (
        <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
          {message}
        </div>
      )}

      {/* Core Areas */}
      <details className="group border rounded-md p-4">
        <summary className="font-semibold cursor-pointer text-gray-800">
          📌 Core Development Areas
        </summary>
        <ul className="list-disc list-inside ml-4 mt-3 text-gray-600 space-y-1">
          <li>Front-end: HTML, CSS, JavaScript, React</li>
          <li>Back-end: Node.js & Express</li>
          <li>Databases: MySQL, MongoDB</li>
          <li>Version Control: Git & GitHub</li>
        </ul>
      </details>

      {/* Modules */}
      <details className="group border rounded-md p-4">
        <summary className="font-semibold cursor-pointer text-gray-800">
          📚 Module Breakdown
        </summary>
        <ul className="list-decimal list-inside ml-4 mt-3 text-gray-600 space-y-1">
          <li>JavaScript ES6+</li>
          <li>React Components & Hooks</li>
          <li>Routing & State Management</li>
          <li>RESTful APIs</li>
          <li>Authentication Basics</li>
        </ul>
      </details>

      {/* 📥 DOWNLOADABLE PDF BOOKS */}
      <div className="p-4 bg-gray-50 rounded-lg border">
        <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <BookOpen /> Download PDF Books
        </h4>

        <ul className="space-y-3">

          {/* JavaScript */}
          <li className="flex items-center justify-between">
            <span className="text-gray-700">
              Understanding JavaScript
            </span>
            <a
              href="/JavaScript.pdf"
              download
              onClick={() => handleDownload("javascript", "JavaScript Guide")}
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Download size={18} /> Download
            </a>
          </li>

          {/* React */}
          <li className="flex items-center justify-between">
            <span className="text-gray-700">
              React for Beginners
            </span>
            <a
              href="/React.pdf"
              download
              onClick={() => handleDownload("react", "React Guide")}
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Download size={18} /> Download
            </a>
          </li>

          {/* Node.js */}
          <li className="flex items-center justify-between">
            <span className="text-gray-700">
              Node.js Design Patterns
            </span>
            <a
              href="/NodeJS.pdf"
              download
              onClick={() => handleDownload("node", "Node.js Book")}
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Download size={18} /> Download
            </a>
          </li>

        </ul>
      </div>

    </div>
  );
};

export default SoftwareNotes;
