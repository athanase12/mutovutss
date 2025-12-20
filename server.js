const express = require("express");   
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mutovutssdb"
});

/* Get classrooms */
app.get("/classrooms", (req, res) => {
  db.query("SELECT * FROM classrooms", (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ 
        error: "Failed to fetch classrooms", 
        details: err.message 
      });
    }
    res.json(data);
  });
});

/* Get modules */
app.get("/modules", (req, res) => {
  db.query("SELECT * FROM modules", (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ 
        error: "Failed to fetch modules", 
        details: err.message 
      });
    }
    res.json(data);
  });
});

/* Search marks with competency decision */
app.post("/search-marks", (req, res) => {
  const { studentId, classroomId, moduleId } = req.body;

  // Validate required fields
  if (!studentId || !classroomId || !moduleId) {
    return res.status(400).json({ 
      error: "Missing parameters",
      message: "Please provide studentId, classroomId, and moduleId"
    });
  }

  // Validate that parameters are numbers
  if (isNaN(studentId) || isNaN(classroomId) || isNaN(moduleId)) {
    return res.status(400).json({ 
      error: "Invalid parameters",
      message: "studentId, classroomId, and moduleId must be numbers"
    });
  }

  const sql = `
    SELECT students.name AS student,
           classrooms.name AS classroom,
           modules.name AS module,
           marks.marks
    FROM marks
    JOIN students ON marks.student_id = students.id
    JOIN classrooms ON students.classroom_id = classrooms.id
    JOIN modules ON marks.module_id = modules.id
    WHERE students.id = ?
      AND classrooms.id = ?
      AND modules.id = ?
  `;

  db.query(sql, [studentId, classroomId, moduleId], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ 
        error: "Database query failed", 
        details: err.message 
      });
    }

    // Check if any results were found
    if (result.length === 0) {
      return res.status(404).json({ 
        error: "No data found",
        message: "No marks found for the provided criteria. Please verify the student, classroom, and module IDs."
      });
    }

    // Get the first result (should be only one based on the query criteria)
    const studentData = result[0];
    
    // Check if marks field exists and is a number
    if (studentData.marks === null || studentData.marks === undefined) {
      return res.status(404).json({ 
        error: "Mark not available",
        message: "Mark data is missing for this student in the selected module"
      });
    }

    // Convert marks to number for comparison
    const mark = parseFloat(studentData.marks);
    
    // Determine competency based on mark
    let competency;
    let status;
    
    if (mark >= 42) {
      competency = "Competent";
      status = "PASS";
    } else {
      competency = "NYC (Not Yet Competent)";
      status = "FAIL";
    }

    // Return the result with competency decision
    const response = {
      ...studentData,
      competency: competency,
      status: status,
      decision: `Student is ${competency} with a mark of ${mark}`
    };

    res.json(response);
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    error: "Endpoint not found",
    message: "The requested API endpoint does not exist. Available endpoints: GET /classrooms, GET /modules, POST /search-marks"
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ 
    error: "Internal server error",
    message: "Something went wrong on the server"
  });
});

app.listen(8081, () => {
  console.log("✅ Server running on http://localhost:8081");
});