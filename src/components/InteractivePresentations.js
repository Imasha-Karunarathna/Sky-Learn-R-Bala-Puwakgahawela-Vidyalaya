// src/components/InteractivePresentations.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './InteractivePresentations.css';

const InteractivePresentations = () => {
    const [slides, setSlides] = useState([]);
    const [newSlideContent, setNewSlideContent] = useState('');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('default');
    const [editingSlideIndex, setEditingSlideIndex] = useState(null);

    const addOrUpdateSlide = () => {
        if (newSlideContent.trim()) {
            if (editingSlideIndex !== null) {
                // Update existing slide
                const updatedSlides = [...slides];
                updatedSlides[editingSlideIndex] = newSlideContent;
                setSlides(updatedSlides);
                setEditingSlideIndex(null);
            } else {
                // Add new slide
                setSlides([...slides, newSlideContent]);
            }
            setNewSlideContent(''); // Clear the editor after adding or updating
        }
    };

    const editSlide = (index) => {
        setNewSlideContent(slides[index]);
        setEditingSlideIndex(index);
    };

    const deleteSlide = (index) => {
        setSlides(slides.filter((_, i) => i !== index));
    };

    const moveSlide = (fromIndex, toIndex) => {
        const updatedSlides = [...slides];
        const [movedSlide] = updatedSlides.splice(fromIndex, 1);
        updatedSlides.splice(toIndex, 0, movedSlide);
        setSlides(updatedSlides);
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleThemeChange = (e) => {
        setSelectedTheme(e.target.value);
    };

    return (
        <div className={`interactive-presentations ${isFullScreen ? 'full-screen' : ''} theme-${selectedTheme}`}>
            <h2>Interactive Presentations</h2>

            <div className="editor-container">
                <ReactQuill
                    value={newSlideContent}
                    onChange={setNewSlideContent}
                    modules={{
                        toolbar: [
                            [{ 'header': '1' }, { 'header': '2' }],
                            ['bold', 'italic', 'underline'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['link', 'image'],
                            ['clean']
                        ]
                    }}
                    formats={[
                        'header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link', 'image'
                    ]}
                />
                <button onClick={addOrUpdateSlide} className="add-update-slide-btn">
                    {editingSlideIndex !== null ? 'Update Slide' : 'Add Slide'}
                </button>
            </div>

            <div className="theme-selector">
                <label htmlFor="theme">Select Theme:</label>
                <select id="theme" value={selectedTheme} onChange={handleThemeChange}>
                    <option value="default">Default</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
            </div>

            <button onClick={toggleFullScreen} className="full-screen-toggle-btn">
                {isFullScreen ? 'Exit Full Screen' : 'Full Screen Mode'}
            </button>

            <div className="slides-container">
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        <div dangerouslySetInnerHTML={{ __html: slide }} className="slide-content"></div>
                        <div className="slide-controls">
                            <button onClick={() => editSlide(index)} className="edit-slide-btn">Edit</button>
                            <button onClick={() => deleteSlide(index)} className="delete-slide-btn">Delete</button>
                            <button
                                onClick={() => moveSlide(index, index - 1)}
                                disabled={index === 0}
                                className="move-up-btn"
                            >
                                ↑
                            </button>
                            <button
                                onClick={() => moveSlide(index, index + 1)}
                                disabled={index === slides.length - 1}
                                className="move-down-btn"
                            >
                                ↓
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InteractivePresentations;
