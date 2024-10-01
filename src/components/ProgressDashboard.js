// src/components/ProgressDashboard.js
import React, { useState } from 'react';
import './ProgressDashboard.css';

const ProgressDashboard = () => {
    const [progressData, setProgressData] = useState([
        { name: 'Ex1', quizzesCompleted: 5, activitiesCompleted: 3 }
    ]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [newStudent, setNewStudent] = useState({ name: '', quizzesCompleted: '', activitiesCompleted: '' });

    const sortedData = [...progressData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const order = sortConfig.direction === 'asc' ? 1 : -1;
        if (a[sortConfig.key] < b[sortConfig.key]) return -order;
        if (a[sortConfig.key] > b[sortConfig.key]) return order;
        return 0;
    });

    const filteredData = sortedData.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const exportToCSV = () => {
        const csvContent =
            'data:text/csv;charset=utf-8,' +
            ['Student Name,Quizzes Completed,Activities Completed', ...progressData.map((student) => `${student.name},${student.quizzesCompleted},${student.activitiesCompleted}`)].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'student_progress.csv');
        document.body.appendChild(link);
        link.click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addStudent = (e) => {
        e.preventDefault();
        if (newStudent.name && newStudent.quizzesCompleted && newStudent.activitiesCompleted) {
            setProgressData((prev) => [
                ...prev,
                {
                    name: newStudent.name,
                    quizzesCompleted: parseInt(newStudent.quizzesCompleted),
                    activitiesCompleted: parseInt(newStudent.activitiesCompleted),
                },
            ]);
            setNewStudent({ name: '', quizzesCompleted: '', activitiesCompleted: '' }); // Clear form fields
        } else {
            alert('Please fill out all fields.');
        }
    };

    const removeStudent = (index) => {
        const updatedProgressData = progressData.filter((_, i) => i !== index);
        setProgressData(updatedProgressData);
    };

    return (
        <div className="progress-dashboard">
            <h2>Student Progress Dashboard</h2>
            <div className="toolbar">
                <input
                    type="text"
                    placeholder="Search by student name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="export-btn" onClick={exportToCSV}>Export to CSV</button>
            </div>
            <form className="add-student-form" onSubmit={addStudent}>
                <input
                    type="text"
                    name="name"
                    placeholder="Student Name"
                    value={newStudent.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="quizzesCompleted"
                    placeholder="Quizzes Completed"
                    value={newStudent.quizzesCompleted}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="activitiesCompleted"
                    placeholder="Activities Completed"
                    value={newStudent.activitiesCompleted}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="add-btn2">Add Student</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('name')}>
                            Student Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => requestSort('quizzesCompleted')}>
                            Quizzes Completed {sortConfig.key === 'quizzesCompleted' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th onClick={() => requestSort('activitiesCompleted')}>
                            Activities Completed {sortConfig.key === 'activitiesCompleted' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>
                                {student.quizzesCompleted}
                                <div className="progress-bar">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${(student.quizzesCompleted / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </td>
                            <td>
                                {student.activitiesCompleted}
                                <div className="progress-bar">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${(student.activitiesCompleted / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </td>
                            <td>
                                <button className="remove-btn" onClick={() => removeStudent(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProgressDashboard;
