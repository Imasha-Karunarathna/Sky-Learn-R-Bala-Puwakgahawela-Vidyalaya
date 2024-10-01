import React from 'react';
import { Link } from 'react-router-dom';
import './Activity.css';

const Activity = () => {
    return (
        <div className="full2">
        <div className="activity-container">
            <h1 className="activity-title">Welcome to the Activity Center</h1>
            <p className="activity-description">
                Choose an activity from the options below to enhance your learning experience. Whether you're in the mood for quizzes, activities, health tips, sports challenges, or common tests, we've got you covered. Engage, learn, and enjoy!
            </p>
            <div className="activity-buttons">
                <Link to="/quizzes" className="activity-btn">Quizzes</Link>
                
                <Link to="/sports" className="activity-btn">Sports</Link>
                <Link to="/commontest" className="activity-btn">CommonTest</Link>
            </div>
        </div>
        </div>
    );
};

export default Activity;
