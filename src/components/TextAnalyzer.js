// src/components/TextAnalyzer.js
import React, { useState } from 'react';
import axios from 'axios';
import './TextAnalyzer.css';

const TextAnalyzer = () => {
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [errors, setErrors] = useState([]);
    const [correctedText, setCorrectedText] = useState('');

    // Function to count words
    const countWords = (inputText) => {
        return inputText.trim().split(/\s+/).length;
    };

    // Function to check grammar using LanguageTool API
    const checkGrammar = async () => {
        try {
            const response = await axios.post(
                'https://api.languagetool.org/v2/check',
                new URLSearchParams({
                    text: text,
                    language: 'en-US',
                })
            );

            const matches = response.data.matches;
            setErrors(matches);

            // Apply corrections to the text
            let newText = text;
            matches.forEach((match) => {
                const replacement = match.replacements[0]?.value || '';
                newText = newText.replace(
                    match.context.text.slice(
                        match.context.offset,
                        match.context.offset + match.context.length
                    ),
                    replacement
                );
            });
            setCorrectedText(newText);

        } catch (error) {
            console.error('Error checking grammar:', error);
            alert('Error checking grammar. Please try again later.');
        }
    };

    // Handle text input change
    const handleTextChange = (e) => {
        const inputText = e.target.value;
        setText(inputText);
        setWordCount(countWords(inputText));
    };

    // Function to copy corrected text to clipboard
    const copyToClipboard = () => {
        if (correctedText) {
            navigator.clipboard.writeText(correctedText)
                .then(() => {
                    alert('Corrected text copied to clipboard!');
                })
                .catch((err) => {
                    console.error('Failed to copy text: ', err);
                });
        }
    };

    return (
        <div className='full9'>
        <div className="text-analyzer-container">
            <h2>Text Analyzer</h2>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your text here..."
                rows="6"
            ></textarea>
            <div className="stats">
                <p>Word Count: {wordCount}</p>
                <p>Error Points: {errors.length}</p>
            </div>
            <button onClick={checkGrammar}>Check Grammar</button>

            {errors.length > 0 && (
                <div className="errors-list">
                    <h3>Detected Errors:</h3>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>
                                {error.message} (Suggestion: {error.replacements.map(rep => rep.value).join(', ')})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {correctedText && (
                <div className="corrected-text">
                    <h3>Corrected Text:</h3>
                    <p>{correctedText}</p>
                    <button className="copy-button" onClick={copyToClipboard}>
                        Copy Corrected Text
                    </button>
                </div>
            )}
        </div>
        </div>
    );
};

export default TextAnalyzer;
