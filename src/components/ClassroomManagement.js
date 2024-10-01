// src/components/ClassroomManagement.js
import React, { useState } from 'react';
import './ClassroomManagement.css';

const ClassroomManagement = () => {
    const [students, setStudents] = useState([
        { name: 'John Doe', attendance: 90, performance: 'B', notes: '' },
        { name: 'Jane Smith', attendance: 95, performance: 'A', notes: '' },
    ]);
    const [newStudent, setNewStudent] = useState({ name: '', attendance: 100, performance: '', notes: '' });

    const addStudent = () => {
        if (newStudent.name.trim()) {
            setStudents([...students, newStudent]);
            setNewStudent({ name: '', attendance: 100, performance: '', notes: '' });
        }
    };

    const updateStudent = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index][field] = value;
        setStudents(updatedStudents);
    };

    const removeStudent = (index) => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
    };

    const downloadReport = () => {
        // Create CSV headers
        const headers = ['Name', 'Attendance (%)', 'Performance', 'Notes'];
        // Create CSV rows
        const rows = students.map(student => [
            student.name,
            student.attendance,
            student.performance,
            student.notes,
        ]);

        // Combine headers and rows into CSV format
        const csvContent = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');

        // Create a blob and a URL for the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create a link element, set its href and download attributes, and click it
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'student_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="classroom-management">
            <h2>Classroom Management Tools</h2>
            <div className="dashboard">
                <h3>Dashboard</h3>
                <p>Total Students: {students.length}</p>
                <p>Average Attendance: {Math.round(students.reduce((acc, student) => acc + student.attendance, 0) / students.length)}%</p>
            </div>
            <input
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                placeholder="Add student name"
                className="input-field"
            />
            <button onClick={addStudent} className="add-btn">Add Student</button>

            <button onClick={downloadReport} className="download-btn">Download Report</button>

            <table className="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Attendance (%)</th>
                        <th>Performance</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>
                                <input
                                    type="number"
                                    value={student.attendance}
                                    onChange={(e) => updateStudent(index, 'attendance', e.target.value)}
                                    className="input-field"
                                />
                            </td>
                            <td>
                                <select
                                    value={student.performance}
                                    onChange={(e) => updateStudent(index, 'performance', e.target.value)}
                                    className="input-field"
                                >
                                    <option value="">Select</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={student.notes}
                                    onChange={(e) => updateStudent(index, 'notes', e.target.value)}
                                    className="input-field"
                                />
                            </td>
                            <td>
                                <button onClick={() => removeStudent(index)} className="remove-btn">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClassroomManagement;
