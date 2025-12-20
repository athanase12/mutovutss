const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Routes

// 1. Get all classrooms
app.get('/api/classrooms', (req, res) => {
    const query = 'SELECT * FROM classrooms ORDER BY name';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching classrooms:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// 2. Get all modules
app.get('/api/modules', (req, res) => {
    const query = 'SELECT * FROM modules ORDER BY name';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching modules:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// 3. Get student by ID
app.get('/api/student/:id', (req, res) => {
    const studentId = req.params.id;
    const query = `
        SELECT s.*, c.name as classroom_name 
        FROM students s
        LEFT JOIN classrooms c ON s.classroom_id = c.id
        WHERE s.id = ?
    `;
    
    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching student:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json(results[0]);
    });
});

// 4. Search marks with filters
app.post('/api/search-marks', (req, res) => {
    const { studentId, moduleId, classroomId } = req.body;
    
    // Validate required fields
    if (!studentId || !moduleId || !classroomId) {
        return res.status(400).json({ 
            error: 'All fields are required: studentId, moduleId, classroomId' 
        });
    }

    const query = `
        SELECT 
            s.id as student_id,
            s.name as student_name,
            m.name as module_name,
            c.name as classroom_name,
            mk.marks_obtained,
            DATE_FORMAT(NOW(), '%Y-%m-%d') as search_date
        FROM marks mk
        INNER JOIN students s ON mk.student_id = s.id
        INNER JOIN modules m ON mk.module_id = m.id
        INNER JOIN classrooms c ON mk.classroom_id = c.id
        WHERE mk.student_id = ? 
        AND mk.module_id = ? 
        AND mk.classroom_id = ?
    `;
    
    db.query(query, [studentId, moduleId, classroomId], (err, results) => {
        if (err) {
            console.error('Error searching marks:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ 
                message: 'No marks found for the given criteria',
                suggestions: [
                    'Check if student ID is correct',
                    'Verify classroom selection',
                    'Confirm module selection'
                ]
            });
        }
        
        res.json({
            success: true,
            data: results,
            count: results.length
        });
    });
});

// 5. Get all marks for a student (for detailed view)
app.get('/api/student/:id/all-marks', (req, res) => {
    const studentId = req.params.id;
    
    const query = `
        SELECT 
            m.name as module_name,
            c.name as classroom_name,
            mk.marks_obtained,
            CASE 
                WHEN mk.marks_obtained >= 70 THEN 'Distinction'
                WHEN mk.marks_obtained >= 60 THEN 'Merit'
                WHEN mk.marks_obtained >= 40 THEN 'Pass'
                ELSE 'Fail'
            END as grade,
            DATE_FORMAT(NOW(), '%d-%m-%Y') as result_date
        FROM marks mk
        INNER JOIN modules m ON mk.module_id = m.id
        INNER JOIN classrooms c ON mk.classroom_id = c.id
        WHERE mk.student_id = ?
        ORDER BY m.name
    `;
    
    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching all marks:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.json({ 
                message: 'No marks recorded for this student',
                data: []
            });
        }
        
        res.json({
            success: true,
            data: results,
            totalModules: results.length,
            average: (results.reduce((sum, item) => sum + parseFloat(item.marks_obtained), 0) / results.length).toFixed(2)
        });
    });
});

// 6. Get available students for a classroom
app.get('/api/classroom/:id/students', (req, res) => {
    const classroomId = req.params.id;
    
    const query = `
        SELECT id, name 
        FROM students 
        WHERE classroom_id = ?
        ORDER BY name
    `;
    
    db.query(query, [classroomId], (err, results) => {
        if (err) {
            console.error('Error fetching classroom students:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        res.json(results);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});