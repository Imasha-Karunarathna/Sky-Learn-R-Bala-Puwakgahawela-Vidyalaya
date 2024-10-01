import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './NoteTaking.css';
import { Tooltip } from 'react-tooltip';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const NoteTaking = () => {
    const [note, setNote] = useState('');
    const [highlights, setHighlights] = useState([]);
    const [annotations, setAnnotations] = useState([]);
    const [imageAnnotation, setImageAnnotation] = useState({ x: 0, y: 0, text: '' });

    // Load saved notes, highlights, and annotations from localStorage
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        const savedHighlights = localStorage.getItem('highlights');
        const savedAnnotations = localStorage.getItem('annotations');
        if (savedNotes) setNote(JSON.parse(savedNotes));
        if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
        if (savedAnnotations) setAnnotations(JSON.parse(savedAnnotations));
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(note));
        localStorage.setItem('highlights', JSON.stringify(highlights));
        localStorage.setItem('annotations', JSON.stringify(annotations));
    }, [note, highlights, annotations]);

    const handleNoteChange = (value) => {
        setNote(value);
    };

    const handleHighlight = (highlightedText) => {
        setHighlights([...highlights, highlightedText]);
    };

    const handleAnnotation = () => {
        setAnnotations([...annotations, imageAnnotation]);
        setImageAnnotation({ x: 0, y: 0, text: '' });
    };

    const handleClearNote = () => {
        setNote('');
        localStorage.removeItem('notes');
    };


    const handleDownloadNote = () => {
        const doc = new jsPDF();
        const margin = 14;
        const pageWidth = doc.internal.pageSize.getWidth();

        // Extract plain text from HTML content
        const extractPlainText = (html) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            return tempDiv.textContent || tempDiv.innerText || '';
        };

        // Get the note content from state and convert to plain text
        const plainText = extractPlainText(note);

        // Add plain text content to the PDF
        doc.text('Your Notes:', margin, 20);
        const lines = doc.splitTextToSize(plainText, pageWidth - 2 * margin);
        doc.text(lines, margin, 30);

        // Save the PDF
        doc.save('Your_Notes.pdf');
    };
    return (
        <div className='full-a'>
        <div className="note-taking-container">
            <h1 className="aa">Note-Taking Tools</h1>

            <div className="editor-section">
                <h2 className='bb'>Notes</h2>
                <ReactQuill
                    value={note}
                    onChange={handleNoteChange}
                    placeholder="Start typing your notes here..."
                />
                <button onClick={handleClearNote}>Clear Note</button>
                <button onClick={handleDownloadNote}>Download Report</button>
            </div>

           

            
                
            
        </div>
        </div>
    );
};

export default NoteTaking;
