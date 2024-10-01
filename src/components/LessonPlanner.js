// src/components/LessonPlanner.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { jsPDF } from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import jsPDF autotable for structured content if needed
import './LessonPlanner.css';

const LessonPlanner = () => {
    const [plans, setPlans] = useState([]);
    const [newPlan, setNewPlan] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [planCategory, setPlanCategory] = useState('');
    const [categories, setCategories] = useState(['General', 'Math', 'Science', 'Literature']); // Example categories

    const addOrUpdatePlan = () => {
        if (newPlan.trim()) {
            if (editingIndex !== null) {
                // Update existing plan
                const updatedPlans = [...plans];
                updatedPlans[editingIndex] = { content: newPlan, category: planCategory };
                setPlans(updatedPlans);
                setEditingIndex(null);
            } else {
                // Add new plan
                setPlans([...plans, { content: newPlan, category: planCategory }]);
            }
            setNewPlan('');
            setPlanCategory('');
        }
    };

    const editPlan = (index) => {
        setNewPlan(plans[index].content);
        setPlanCategory(plans[index].category);
        setEditingIndex(index);
    };

    const deletePlan = (index) => {
        setPlans(plans.filter((_, i) => i !== index));
    };

    const filteredPlans = plans.filter(plan =>
        plan.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (planCategory ? plan.category === planCategory : true)
    );

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Lesson Plans', 10, 10);

        filteredPlans.forEach((plan, index) => {
            doc.setFontSize(12);
            doc.text(`Plan ${index + 1}:`, 10, 20 + index * 30);
            doc.text(`Category: ${plan.category}`, 10, 30 + index * 30);
            doc.text(plan.content.replace(/(<([^>]+)>)/gi, ""), 10, 40 + index * 30); // Remove HTML tags
        });

        doc.save('lesson-plans.pdf');
    };

    return (
        <div className="lesson-planner">
            <h2>Lesson Planning and Management</h2>

            <div className="input-container">
                <ReactQuill
                    value={newPlan}
                    onChange={setNewPlan}
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
                <div className="form-controls">
                    <select value={planCategory} onChange={(e) => setPlanCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <button onClick={addOrUpdatePlan}>
                        {editingIndex !== null ? 'Update Plan' : 'Add Plan'}
                    </button>
                </div>
            </div>

            <div className="search-filter">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search plans"
                />
            </div>

            <ul className="plans-list">
                {filteredPlans.map((plan, index) => (
                    <li key={index} className="plan-item">
                        <div dangerouslySetInnerHTML={{ __html: plan.content }} className="plan-content"></div>
                        <div className="plan-controls">
                            <button onClick={() => editPlan(index)} className="edit-btn1">Edit</button>
                            <button onClick={() => deletePlan(index)} className="delete-btn1">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <button onClick={downloadPDF} className="download-btn1">Download as PDF</button>
        </div>
    );
};

export default LessonPlanner;
