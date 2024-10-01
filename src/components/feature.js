import React from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import './feature.css';

const Feature = () => {
    const navigate = useNavigate();

    const handleFeatureClick = (feature) => {
        if (feature === 'B') {
            navigate('/marks');
        } else if (feature === 'C') {
            navigate('/Activity');
        } else if (feature === 'D') {
            navigate('/FlashCard');
        } else if (feature === 'E') {
            navigate('/NoteTaking');
        } else if (feature === 'F') {
            navigate('/StudyPlanner');
        } else if (feature === 'G') {
            navigate('/TimerPage');
        } else if (feature === 'H') {
            navigate('/AttendancePage');
        } else if (feature === 'I') {  // Changed to 'I' for Teaching Tools
            navigate('/TeachingToolsPage');
        } else if (feature === 'J') {
            navigate('/Feedback');
        } else if (feature === 'K') {
            navigate('/TextToSpeech');
        } else if (feature === 'L') {
            navigate('/TextAnalyzer');
        } else {
            alert(`Feature ${feature} clicked!`);
        }
    };

    return (
        <div className="feature-page-container">
            <header className="feature-page-header">
                <h1>Feature Management</h1>
                <p>Manage and explore all available features from here.</p>
            </header>
            <main className="feature-page-content">
                <div className="feature-button-group">
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('B')}
                    >
                        Marks
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('C')}
                    >
                        Activity
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('D')}
                    >
                        FlashCard
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('E')}
                    >
                        NoteTaking
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('F')}
                    >
                        Study Plan
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('G')}
                    >
                        Timer
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('H')}
                    >
                        Attendance
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('I')} // Changed to 'I' for Teaching Tools
                    >
                        Teaching Tools
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('J')}
                    >
                        Feedback
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('K')}
                    >
                        Text-Speech
                    </button>
                    <button
                        className="feature-button"
                        onClick={() => handleFeatureClick('L')}
                    >
                        Text Analyze
                    </button>
                </div>
            </main>
            <div><Link to="/" className="homebtn">Return to HomePage</Link></div>
            
            <footer className="feature-page-footer">
                <p>&copy; 2024 IH. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Feature;
