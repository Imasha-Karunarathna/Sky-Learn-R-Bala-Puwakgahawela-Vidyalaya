// src/components/PollsSurveys.js
import React, { useState } from 'react';
import './PollsSurveys.css';

const PollsSurveys = () => {
    const [polls, setPolls] = useState([]);
    const [newPoll, setNewPoll] = useState({
        question: '',
        options: [],
        newOption: '',
        expirationDate: '',
    });

    // Add a new poll to the list
    const addPoll = () => {
        if (newPoll.question.trim() && newPoll.options.length > 0) {
            setPolls([...polls, { ...newPoll, responses: Array(newPoll.options.length).fill(0) }]);
            setNewPoll({ question: '', options: [], newOption: '', expirationDate: '' });
        }
    };

    // Add a new option to the poll
    const addOption = () => {
        if (newPoll.newOption.trim()) {
            setNewPoll({ ...newPoll, options: [...newPoll.options, newPoll.newOption], newOption: '' });
        }
    };

    // Voting function with feedback
    const handleVote = (pollIndex, optionIndex) => {
        if (polls[pollIndex].expirationDate && new Date(polls[pollIndex].expirationDate) < new Date()) {
            alert("This poll has expired. You can't vote anymore.");
            return;
        }

        const updatedPolls = polls.map((poll, index) =>
            index === pollIndex
                ? {
                    ...poll,
                    responses: poll.responses.map((response, i) =>
                        i === optionIndex ? response + 1 : response
                    ),
                }
                : poll
        );

        setPolls(updatedPolls);
        alert(`Thank you for voting for "${polls[pollIndex].options[optionIndex]}"!`);
    };


    // Export poll results as a CSV file
    const exportResults = (poll) => {
        const data = poll.options.map((option, index) => ({
            option,
            votes: poll.responses[index],
        }));
        const csvContent =
            'data:text/csv;charset=utf-8,' +
            ['Option,Votes', ...data.map((d) => `${d.option},${d.votes}`)].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${poll.question.replace(/\s+/g, '_')}_results.csv`);
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
    };

    // Delete a poll
    const deletePoll = (index) => {
        const updatedPolls = polls.filter((_, i) => i !== index);
        setPolls(updatedPolls);
    };

    // Edit a poll
    const editPoll = (index) => {
        const pollToEdit = polls[index];
        deletePoll(index); // Remove the poll from the list
        setNewPoll({
            question: pollToEdit.question,
            options: pollToEdit.options,
            newOption: '',
            expirationDate: pollToEdit.expirationDate,
        });
    };

    return (
        <div classname="full7">
        <div className="polls-surveys">
            <h2>Polls and Surveys</h2>
            <div className="poll-form">
                <input
                    type="text"
                    value={newPoll.question}
                    onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                    placeholder="Enter poll question"
                    className="input-field"
                />
                <input
                    type="text"
                    value={newPoll.newOption}
                    onChange={(e) => setNewPoll({ ...newPoll, newOption: e.target.value })}
                    placeholder="Enter option"
                    className="input-field"
                />
                <button onClick={addOption} className="add-option-btn">Add Option</button>
                <input
                    type="date"
                    value={newPoll.expirationDate}
                    onChange={(e) => setNewPoll({ ...newPoll, expirationDate: e.target.value })}
                    className="input-field"
                />
                <button onClick={addPoll} className="create-btn">Create Poll</button>
            </div>

            <div className="polls-list">
                {polls.map((poll, index) => (
                    <div key={index} className="poll-card">
                        <h3>{poll.question}</h3>
                        <ul className="options-list">
                            {poll.options.map((option, optionIndex) => (
                                <li key={optionIndex} className="option-item">
                                    <button
                                        onClick={() => handleVote(index, optionIndex)}
                                        className="vote-btn"
                                        disabled={poll.expirationDate && new Date(poll.expirationDate) < new Date()}
                                    >
                                        {option}
                                    </button>
                                    <span className="vote-count">{poll.responses[optionIndex]} votes</span>
                                </li>
                            ))}
                        </ul>
                        <div className="poll-footer">
                            <p>Expiration: {poll.expirationDate || 'No Expiration'}</p>
                            <button onClick={() => exportResults(poll)} className="export-btn">
                                Export Results
                            </button>
                            <button onClick={() => editPoll(index)} className="edit-btn">
                                Edit Poll
                            </button>
                            <button onClick={() => deletePoll(index)} className="delete-btn">
                                Delete Poll
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default PollsSurveys;
