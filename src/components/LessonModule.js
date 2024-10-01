import React, { useState } from 'react';
import './LessonModule.css';
import ReactPlayer from 'react-player';

const LessonModule = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="lesson-container">
            <div className="sidebar">
                <h3>Lesson Modules</h3>
                <ul>
                    <li onClick={() => handleSectionChange('introduction')}>Introduction</li>
                    <li onClick={() => handleSectionChange('images')}>Images</li>
                    <li onClick={() => handleSectionChange('videos')}>Videos</li>
                    <li onClick={() => handleSectionChange('interactive')}>Interactive Activities</li>
                    <li onClick={() => handleSectionChange('summary')}>Summary</li>
                </ul>
            </div>

            <div className="content">
                {activeSection === 'introduction' && (
                    <div>
                        <h2>Introduction</h2>
                        <p>Welcome to this lesson module! Here, you will explore various types of content designed to enhance your learning experience.</p>
                    </div>
                )}

                {activeSection === 'images' && (
                    <div>
                        <h2>Images</h2>
                        <img src="https://via.placeholder.com/600x400" alt="Visual representation of lesson content" className="lesson-image" />
                        <p>Images can help in visualizing concepts and making content more engaging.</p>
                    </div>
                )}

                {activeSection === 'videos' && (
                    <div>
                        <h2>Videos</h2>
                        <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" controls className="lesson-video" />
                        <p>Videos provide dynamic content that can explain complex topics in an understandable manner.</p>
                    </div>
                )}

                {activeSection === 'interactive' && (
                    <div>
                        <h2>Interactive Activities</h2>
                        <div className="interactive-container">
                            <h3>Drag-and-Drop Activity</h3>
                            <p>Drag the items to their corresponding boxes:</p>
                            {/* Insert drag-and-drop functionality here */}
                        </div>
                        <div className="interactive-container">
                            <h3>Clickable Diagram</h3>
                            <p>Click on the different parts of the diagram to learn more:</p>
                            <img src="https://via.placeholder.com/600x400" useMap="#diagram-map" alt="Interactive diagram of lesson content" className="clickable-diagram" />
                            <map name="diagram-map">
                                <area shape="rect" coords="34,44,270,350" alt="Part 1 description" href="#" />
                                <area shape="rect" coords="290,172,333,250" alt="Part 2 description" href="#" />
                                <area shape="rect" coords="337,300,390,320" alt="Part 3 description" href="#" />
                            </map>
                        </div>
                    </div>
                )}

                {activeSection === 'summary' && (
                    <div>
                        <h2>Summary</h2>
                        <p>This module covered various multimedia content and interactive elements to enhance your learning experience. We hope you found it engaging and informative!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonModule;
