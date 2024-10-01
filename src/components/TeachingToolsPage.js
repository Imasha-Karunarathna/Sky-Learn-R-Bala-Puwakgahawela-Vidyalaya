// src/components/TeachingToolsPage.js
import React, { useState } from 'react';
import './TeachingToolsPage.css';
import LessonPlanner from './LessonPlanner';
import Whiteboard from './WhiteBoard';
import ProgressDashboard from './ProgressDashboard';
import ClassroomManagement from './ClassroomManagement';
import ResourceSharing from './ResourceSharing';
import PollsSurveys from './PollsSurveys';
import InteractivePresentations from './InteractivePresentations';

const TeachingToolsPage = () => {
    const [activeTab, setActiveTab] = useState('lesson');

    const renderContent = () => {
        switch (activeTab) {
            case 'lesson':
                return <LessonPlanner />;
            case 'whiteboard':
                return <Whiteboard />;
            case 'progress':
                return <ProgressDashboard />;
            case 'classroom':
                return <ClassroomManagement />;
            case 'resources':
                return <ResourceSharing />;
            case 'polls':
                return <PollsSurveys />;
            case 'presentations':
                return <InteractivePresentations />;
            default:
                return <LessonPlanner />;
        }
    };

    return (
        <div className="teaching-tools-page">
            <h1>Teaching Tools</h1>
            <nav className="tab-navigation">
                <button onClick={() => setActiveTab('lesson')}>Lesson Planning</button>
                <button onClick={() => setActiveTab('whiteboard')}>Interactive Whiteboard</button>
                <button onClick={() => setActiveTab('progress')}>Progress Dashboard</button>
                <button onClick={() => setActiveTab('classroom')}>Classroom Management</button>
                <button onClick={() => setActiveTab('resources')}>Resource Sharing</button>
                <button onClick={() => setActiveTab('polls')}>Polls & Surveys</button>
                <button onClick={() => setActiveTab('presentations')}>Interactive Presentations</button>
            </nav>
            <div className="content-area">
                {renderContent()}
            </div>
        </div>
    );
};

export default TeachingToolsPage;
