import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './marks.css';

const Marks = () => {
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({});
    const [studentName, setStudentName] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [subjects, setSubjects] = useState(['Sinhala', 'Mathematics', 'Science', 'English', 'Buddhism', 'History']);
    const [mark, setMark] = useState('');
    const [newSubject, setNewSubject] = useState('');
    const [subjectToRemove, setSubjectToRemove] = useState('');

    // Adding a new student
    const handleAddStudent = () => {
        if (studentName && !students.includes(studentName)) {
            setStudents([...students, studentName]);
            setMarks({ ...marks, [studentName]: {} });
            setStudentName('');
        }
    };

    // Adding or updating marks for a student in a specific subject
    const handleMarksChange = () => {
        if (selectedStudent && selectedSubject && mark) {
            const updatedMarks = {
                ...marks,
                [selectedStudent]: {
                    ...marks[selectedStudent],
                    [selectedSubject]: parseFloat(mark)
                }
            };
            setMarks(updatedMarks);
            console.log('Updated Marks:', updatedMarks);
            setSelectedSubject('');
            setMark('');
        } else {
            console.error('Error: Missing data or invalid input.', { selectedStudent, selectedSubject, mark });
        }
    };

    // Adding a new subject to the list
    const handleAddSubject = () => {
        if (newSubject && !subjects.includes(newSubject)) {
            setSubjects([...subjects, newSubject]);
            setNewSubject('');
        }
    };

    // Removing an existing subject from the list and from each student's marks
    const handleRemoveSubject = () => {
        if (subjectToRemove && subjects.includes(subjectToRemove)) {
            const updatedSubjects = subjects.filter(subject => subject !== subjectToRemove);
            setSubjects(updatedSubjects);

            const updatedMarks = {};
            for (const student in marks) {
                const updatedStudentMarks = { ...marks[student] };
                delete updatedStudentMarks[subjectToRemove];
                updatedMarks[student] = updatedStudentMarks;
            }
            setMarks(updatedMarks);

            setSubjectToRemove('');
        }
    };

    // Clear all data
    const handleClearData = () => {
        setStudents([]);
        setMarks({});
        setStudentName('');
        setSelectedStudent('');
        setSelectedSubject('');
        setMark('');
        setNewSubject('');
        setSubjectToRemove('');
    };

    const calculateRankings = () => {
        return students.map(student => ({
            name: student,
            total: subjects.reduce((acc, subject) => acc + (marks[student][subject] || 0), 0),
        })).sort((a, b) => b.total - a.total);
    };

    const calculateAverages = () => {
        const studentAverages = students.map(student => ({
            name: student,
            average: subjects.reduce((acc, subject) => acc + (marks[student][subject] || 0), 0) / subjects.length,
        }));

        const subjectAverages = subjects.map(subject => ({
            name: subject,
            average: students.reduce((acc, student) => acc + (marks[student][subject] || 0), 0) / students.length,
        }));

        return { studentAverages, subjectAverages };
    };

    const chartData = {
        labels: students,
        datasets: subjects.map(subject => ({
            label: subject,
            data: students.map(student => marks[student][subject] || 0),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
        })),
    };

    const rankings = calculateRankings();
    const { studentAverages, subjectAverages } = calculateAverages();

    const downloadRankingsReport = () => {
        const doc = new jsPDF();
        doc.text('Student Rankings Report', 14, 20);
        const tableData = rankings.map((student, index) => [index + 1, student.name, student.total]);

        doc.autoTable({
            head: [['Position', 'Student Name', 'Total Marks']],
            body: tableData,
            startY: 30,
        });

        doc.save('Student_Rankings_Report.pdf');
    };

    const downloadAveragesReport = () => {
        const doc = new jsPDF();
        doc.text('Average Marks Report', 14, 20);

        doc.autoTable({
            head: [['Student Name', 'Average Marks']],
            body: studentAverages.map(student => [student.name, student.average.toFixed(2)]),
            startY: 30,
        });

        doc.autoTable({
            head: [['Subject Name', 'Average Marks']],
            body: subjectAverages.map(subject => [subject.name, subject.average.toFixed(2)]),
            startY: doc.autoTable.previous.finalY + 10,
        });

        doc.save('Average_Marks_Report.pdf');
    };

    return (
        <div className="full1">
        <div className="marks-container">
            <h2>First, let's gather all the student names and marks! Please type the names and marks of each student , one by one. </h2>

            {/* Always show this input for adding students */}
            <div className="marks-entry">
                <input
                    type="text"
                    placeholder="Add Student Name"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                />
                <button onClick={handleAddStudent}>Add Student</button>
            </div>

            {/* Always show this input for adding marks */}
            <div className="marks-entry">
                <select
                    value={selectedStudent}
                    onChange={e => setSelectedStudent(e.target.value)}
                >
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student} value={student}>
                            {student}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedSubject}
                    onChange={e => setSelectedSubject(e.target.value)}
                >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Enter Marks"
                    value={mark}
                    onChange={e => setMark(e.target.value)}
                />
                <button onClick={handleMarksChange}>Add Marks</button>
            </div>

            {/* Always show the input for adding new subjects */}
            <div className="marks-entry">
                <input
                    type="text"
                    placeholder="Add New Subject"
                    value={newSubject}
                    onChange={e => setNewSubject(e.target.value)}
                />
                <button onClick={handleAddSubject}>Add Subject</button>
            </div>

            {/* Always show the input for removing subjects */}
            <div className="marks-entry">
                <select
                    value={subjectToRemove}
                    onChange={e => setSubjectToRemove(e.target.value)}
                >
                    <option value="">Select Subject to Remove</option>
                    {subjects.map(subject => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
                <button onClick={handleRemoveSubject}>Remove Subject</button>
            </div>

            {/* Display the chart */}
            <h2>Marks Chart</h2>
            <div className="marks-chart">
                <Bar data={chartData} />
            </div>

            {/* Display rankings */}
            <h2>Rankings</h2>
            <div className="rankings">
                <ul>
                    {rankings.map((student, index) => (
                        <li key={index} className="ranking-item">
                            <span className="ranking-position">{index + 1}.</span>
                            <span className="ranking-name">{student.name}</span>
                            <span className="ranking-total">Total Marks: {student.total}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={downloadRankingsReport} className="download-report-btn">
                Download Rankings Report
            </button>

            {/* Display averages */}
            <h2>Average Marks</h2>
            <div className="averages">
                <div className="averages-section">
                    <h3>Per Student</h3>
                    <ul>
                        {studentAverages.map(student => (
                            <li key={student.name} className="average-item">
                                {student.name}: <span className="average-value">{student.average.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="averages-section">
                    <h3>Per Subject</h3>
                    <ul>
                        {subjectAverages.map(subject => (
                            <li key={subject.name} className="average-item">
                                {subject.name}: <span className="average-value">{subject.average.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button onClick={downloadAveragesReport} className="download-report-btn">
                Download Averages Report
            </button>

            <button onClick={handleClearData} className="clear-data-btn">
                Clear Data
            </button>
        </div>
        </div>
    );
};

export default Marks;
