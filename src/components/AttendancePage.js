// src/components/AttendancePage.js
import React, { useState, useEffect, useRef } from 'react';
import './AttendancePage.css';
import { useReactToPrint } from 'react-to-print';

const AttendancePage = () => {
    const [students, setStudents] = useState(() => {
        // Load students from local storage or initialize with an empty list
        const savedStudents = localStorage.getItem('students');
        return savedStudents ? JSON.parse(savedStudents) : [];
    });
    const [newStudent, setNewStudent] = useState('');
    const attendanceTableRef = useRef();

    useEffect(() => {
        // Save students to local storage whenever the list changes
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    // Function to toggle attendance status
    const toggleAttendance = (id) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === id
                    ? { ...student, attendance: student.attendance === 'Present' ? 'Absent' : 'Present' }
                    : student
            )
        );
    };

    // Function to reset all attendances to Absent
    const resetAttendance = () => {
        setStudents(prevStudents =>
            prevStudents.map(student => ({ ...student, attendance: 'Absent' }))
        );
    };

    // Function to add a new student
    const addStudent = () => {
        if (newStudent.trim()) {
            setStudents(prevStudents => [
                ...prevStudents,
                { id: prevStudents.length + 1, name: newStudent.trim(), attendance: 'Absent' }
            ]);
            setNewStudent('');
        }
    };

    // Function to clear all students
    const clearAttendanceSheet = () => {
        setStudents([]);
        localStorage.removeItem('students');
    };

    // PDF generation function
    const handlePrint = useReactToPrint({
        content: () => attendanceTableRef.current,
        documentTitle: 'Attendance Report',
    });

    return (
        <div className="attendance-page">
            <h1 className="a2">Virtual Attendance Tracker</h1>
            <div className="add-student-form">
                <input
                    type="text"
                    value={newStudent}
                    onChange={(e) => setNewStudent(e.target.value)}
                    placeholder="Enter student name"
                    className="student-input"
                />
                <button onClick={addStudent} className="add-student-btn">
                    Add Student
                </button>
            </div>
            <div ref={attendanceTableRef}>
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Attendance Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td className={`status ${student.attendance.toLowerCase()}`}>
                                    {student.attendance}
                                </td>
                                <td>
                                    <button
                                        className={`toggle-btn ${student.attendance === 'Present' ? 'present' : 'absent'}`}
                                        onClick={() => toggleAttendance(student.id)}
                                    >
                                        Mark {student.attendance === 'Present' ? 'Absent' : 'Present'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="action-buttons">
                <button className="reset-btn" onClick={resetAttendance}>
                    Reset Attendance
                </button>
                <button className="clear-btn" onClick={clearAttendanceSheet}>
                    Clear Attendance Sheet
                </button>
                <button className="download-btn" onClick={handlePrint}>
                    Download Attendance PDF
                </button>
            </div>
        </div>
    );
};

export default AttendancePage;
