// src/components/ResourceSharing.js
import React, { useState } from 'react';
import './ResourceSharing.css';

const ResourceSharing = () => {
    const [resources, setResources] = useState([]);
    const [newResource, setNewResource] = useState({ link: '', description: '', category: '', tags: '' });
    const [file, setFile] = useState(null);

    const addResource = () => {
        if (newResource.link.trim() || file) {
            setResources([...resources, { ...newResource, file }]);
            setNewResource({ link: '', description: '', category: '', tags: '' });
            setFile(null);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="resource-sharing">
            <h2>Resource Sharing</h2>
            <div className="resource-form">
                <input
                    type="text"
                    value={newResource.link}
                    onChange={(e) => setNewResource({ ...newResource, link: e.target.value })}
                    placeholder="Enter resource link"
                    className="input-field"
                />
                <input
                    type="text"
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    placeholder="Enter description"
                    className="input-field"
                />
                <select
                    value={newResource.category}
                    onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                    className="input-field"
                >
                    <option value="">Select Category</option>
                    <option value="Link">Link</option>
                    <option value="Document">Document</option>
                    <option value="Video">Video</option>
                </select>
                <input
                    type="text"
                    value={newResource.tags}
                    onChange={(e) => setNewResource({ ...newResource, tags: e.target.value })}
                    placeholder="Add tags (comma-separated)"
                    className="input-field"
                />
                <input type="file" onChange={handleFileChange} className="input-file" />
                <button onClick={addResource} className="share-btn">Share Resource</button>
            </div>

            <table className="resource-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Resource</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map((resource, index) => (
                        <tr key={index}>
                            <td>{resource.category}</td>
                            <td>
                                {resource.link ? (
                                    <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
                                ) : (
                                    resource.file && <a href={URL.createObjectURL(resource.file)} download>{resource.file.name}</a>
                                )}
                            </td>
                            <td>{resource.description}</td>
                            <td>{resource.tags}</td>
                            <td>
                                <button className="remove-btn" onClick={() => setResources(resources.filter((_, i) => i !== index))}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResourceSharing;
