import React, { useState } from 'react';
import './Activities.css';

const ActivitiesPage = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const activities = [
        {
            id: 1,
            name: "Quiz",
            description: "Test your knowledge on various subjects with our interactive quizzes.",
            content: (
                <div>
                    <h3>Start a Quiz</h3>
                    <p>Select a subject to begin:</p>
                    <ul>
                        <li>Science</li>
                        <li>Math</li>
                        <li>History</li>
                        <li>Language</li>
                    </ul>
                    <button onClick={() => alert('Quiz Started!')}>Start Quiz</button>
                </div>
            )
        },
        {
            id: 2,
            name: "Puzzle",
            description: "Solve challenging puzzles to sharpen your mind and boost your problem-solving skills.",
            content: (
                <div>
                    <h3>Puzzle Challenge</h3>
                    <p>Select a puzzle type:</p>
                    <ul>
                        <li>Sudoku</li>
                        <li>Crossword</li>
                        <li>Logic Puzzles</li>
                    </ul>
                    <button onClick={() => alert('Puzzle Started!')}>Start Puzzle</button>
                </div>
            )
        },
        {
            id: 3,
            name: "Reading Corner",
            description: "Explore interesting articles and stories to expand your knowledge and imagination.",
            content: (
                <div>
                    <h3>Reading Corner</h3>
                    <p>Select a category to explore:</p>
                    <ul>
                        <li>Fiction</li>
                        <li>Science Articles</li>
                        <li>Biographies</li>
                    </ul>
                    <button onClick={() => alert('Start Reading!')}>Start Reading</button>
                </div>
            )
        },
        {
            id: 4,
            name: "Creative Writing",
            description: "Unleash your creativity by writing stories, poems, or essays on given prompts.",
            content: (
                <div>
                    <h3>Creative Writing</h3>
                    <p>Choose a writing prompt:</p>
                    <ul>
                        <li>Write a short story about a magical forest.</li>
                        <li>Create a poem about the changing seasons.</li>
                        <li>Describe your favorite place in the world.</li>
                    </ul>
                    <button onClick={() => alert('Start Writing!')}>Start Writing</button>
                </div>
            )
        },
        {
            id: 5,
            name: "Math Challenges",
            description: "Enhance your mathematical skills with a variety of challenging math problems.",
            content: (
                <div>
                    <h3>Math Challenges</h3>
                    <p>Choose a challenge:</p>
                    <ul>
                        <li>Algebra</li>
                        <li>Geometry</li>
                        <li>Probability</li>
                    </ul>
                    <button onClick={() => alert('Start Challenge!')}>Start Challenge</button>
                </div>
            )
        },
        {
            id: 6,
            name: "Science Experiments",
            description: "Learn by doing with simple at-home science experiments.",
            content: (
                <div>
                    <h3>Science Experiments</h3>
                    <p>Select an experiment to perform:</p>
                    <ul>
                        <li>Volcano Eruption</li>
                        <li>Electric Circuit</li>
                        <li>Plant Growth Observation</li>
                    </ul>
                    <button onClick={() => alert('Start Experiment!')}>Start Experiment</button>
                </div>
            )
        },
        {
            id: 7,
            name: "Art and Craft",
            description: "Engage in fun art and craft activities to boost your creativity.",
            content: (
                <div>
                    <h3>Art and Craft</h3>
                    <p>Choose an art project:</p>
                    <ul>
                        <li>Painting</li>
                        <li>Paper Mache</li>
                        <li>Origami</li>
                    </ul>
                    <button onClick={() => alert('Start Crafting!')}>Start Crafting</button>
                </div>
            )
        },
        {
            id: 8,
            name: "Language Games",
            description: "Play word games and language puzzles to improve your vocabulary and language skills.",
            content: (
                <div>
                    <h3>Language Games</h3>
                    <p>Select a game:</p>
                    <ul>
                        <li>Word Search</li>
                        <li>Scrabble</li>
                        <li>Crossword</li>
                    </ul>
                    <button onClick={() => alert('Start Game!')}>Start Game</button>
                </div>
            )
        },
        {
            id: 9,
            name: "History Exploration",
            description: "Dive into history with interactive timelines and fun historical facts.",
            content: (
                <div>
                    <h3>History Exploration</h3>
                    <p>Select a topic:</p>
                    <ul>
                        <li>Ancient Civilizations</li>
                        <li>World Wars</li>
                        <li>Important Inventions</li>
                    </ul>
                    <button onClick={() => alert('Start Exploring!')}>Start Exploring</button>
                </div>
            )
        },
        {
            id: 10,
            name: "Geography Trivia",
            description: "Explore the world with exciting geography trivia and map challenges.",
            content: (
                <div>
                    <h3>Geography Trivia</h3>
                    <p>Test your knowledge:</p>
                    <ul>
                        <li>World Capitals</li>
                        <li>Continents and Oceans</li>
                        <li>Landmarks and Monuments</li>
                    </ul>
                    <button onClick={() => alert('Start Trivia!')}>Start Trivia</button>
                </div>
            )
        },
    ];

    const selectActivity = (activity) => {
        setSelectedActivity(activity);
    };

    return (
        <div className='full'>
        <div className="activities-page-container">
            <h1>Student Activities</h1>
            {selectedActivity ? (
                <div className="activity-detail">
                    <h2>{selectedActivity.name}</h2>
                    <p>{selectedActivity.description}</p>
                    {selectedActivity.content}
                    <button onClick={() => setSelectedActivity(null)}>Back to Activities</button>
                </div>
            ) : (
                <div className="activities-list">
                    {activities.map(activity => (
                        <div
                            key={activity.id}
                            className="activity-card"
                            onClick={() => selectActivity(activity)}
                        >
                            <h2>{activity.name}</h2>
                            <p>{activity.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
};

export default ActivitiesPage;
