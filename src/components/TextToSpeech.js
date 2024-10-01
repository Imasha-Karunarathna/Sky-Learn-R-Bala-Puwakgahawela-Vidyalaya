// src/components/TextToSpeech.js
import React, { useState } from 'react';
import axios from 'axios';
import './TextToSpeech.css';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('en'); // Default to English

    // Text-to-Speech function using Web Speech API
    const handleTextToSpeech = () => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = language;
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, your browser does not support text-to-speech!');
        }
    };

    // Function to translate text (Mock translation for demonstration)
    const handleTranslate = async () => {
        if (text.trim() === '') {
            alert('Please enter some text to translate.');
            return;
        }

        // Simulated translation (replace this with a real translation API request)
        try {
            const response = await axios.get(
                `https://api.mymocktranslator.com/translate`, // Mock URL for example
                {
                    params: {
                        q: text,
                        target: language,
                    },
                }
            );
            setTranslatedText(response.data.translatedText);
        } catch (error) {
            console.error('Translation error:', error);
            alert('Error translating text. Please try again.');
        }
    };

    return (
    <div className="full8">
        <div className="tts-container">
            <h2>Text-to-Speech and Language Translation</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                rows="4"
            ></textarea>
            <div className="controls">
                <button onClick={handleTextToSpeech}>Speak Text</button>
                <button onClick={handleTranslate}>Translate</button>
            </div>

            <div className="language-selector">
                <label htmlFor="language">Select Language: </label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh-CN">Chinese</option>
                    {/* Add more languages as needed */}
                </select>
            </div>

            {translatedText && (
                <div className="translated-text">
                    <h3>Translated Text:</h3>
                    <p>{translatedText}</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default TextToSpeech;
