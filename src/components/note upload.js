import React, { useState } from 'react';
import axios from 'axios';
import './note upload.css';

const NoteUpload = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !description) {
            setMessage('Please select a file and provide a description.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);

        try {
            const token = localStorage.getItem('access_token'); // Retrieve token

            if (!token) {
                setMessage('Authentication token is missing.');
                return;
            }

            // Make the POST request with the token in the Authorization header
            await axios.post('http://127.0.0.1:8000/api/upload-notes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setMessage('File uploaded successfully!');
            setFile(null);
            setDescription('');
        } catch (error) {
            console.error('File upload failed:', error);
            setMessage('Failed to upload file. Please try again.');
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Student Notes</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="input-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="file">Select File</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="upload-btn">Upload</button>
            </form>
            {message && <p className="upload-message">{message}</p>}
        </div>
    );
};

export default NoteUpload;
