import React, { useState } from 'react';
import './Healthy.css';

const HealthyActivitiesPage = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const activities = [
        {
            id: 1,
            name: "Healthy Eating Quiz",
            description: "Test your knowledge about healthy eating habits with this fun quiz.",
            content: (
                <div>
                    <h3>Healthy Eating Quiz</h3>
                    <p>Select the correct answers to the following questions:</p>
                    <ul>
                        <li>What is a balanced diet? (a) Eating only fruits, (b) A mix of different food groups, (c) Only proteins)</li>
                        <li>How many servings of fruits and vegetables should you aim for each day? (a) 1-2, (b) 3-5, (c) 6-8)</li>
                        {/* Add more questions here */}
                    </ul>
                    <button onClick={() => alert('Quiz Started!')}>Start Quiz</button>
                </div>
            )
        },
        {
            id: 2,
            name: "Healthy Recipe Challenge",
            description: "Create a nutritious recipe and share it with your class.",
            content: (
                <div>
                    <h3>Healthy Recipe Challenge</h3>
                    <p>Choose from the following recipe ideas:</p>
                    <ul>
                        <li>Vegetable Stir-Fry</li>
                        <li>Fruit Smoothie</li>
                        <li>Whole Grain Salad</li>
                    </ul>
                    <button onClick={() => alert('Recipe Challenge Started!')}>Start Challenge</button>
                </div>
            )
        },
        {
            id: 3,
            name: "Daily Exercise Routine",
            description: "Follow this exercise routine to stay active and healthy.",
            content: (
                <div>
                    <h3>Daily Exercise Routine</h3>
                    <p>Follow these exercises for a healthy day:</p>
                    <ul>
                        <li>Warm-Up: 5 minutes of stretching</li>
                        <li>Cardio: 15 minutes of jogging or jumping jacks</li>
                        <li>Strength Training: 10 minutes of bodyweight exercises</li>
                        <li>Cool-Down: 5 minutes of stretching</li>
                    </ul>
                    <button onClick={() => alert('Exercise Routine Started!')}>Start Routine</button>
                </div>
            )
        },
        {
            id: 4,
            name: "Mindfulness and Relaxation",
            description: "Practice mindfulness techniques to reduce stress and improve mental well-being.",
            content: (
                <div>
                    <h3>Mindfulness and Relaxation</h3>
                    <p>Try these techniques:</p>
                    <ul>
                        <li>Deep Breathing: Take deep breaths for 5 minutes.</li>
                        <li>Guided Meditation: Follow a guided meditation video or app.</li>
                        <li>Gratitude Journal: Write down three things you are grateful for each day.</li>
                    </ul>
                    <button onClick={() => alert('Mindfulness Started!')}>Start Mindfulness</button>
                </div>
            )
        },
        {
            id: 5,
            name: "Healthy Habits Tracker",
            description: "Track your daily habits to maintain a healthy lifestyle.",
            content: (
                <div>
                    <h3>Healthy Habits Tracker</h3>
                    <p>Use this tracker to log your daily healthy habits:</p>
                    <ul>
                        <li>Drink at least 8 glasses of water</li>
                        <li>Eat 5 servings of fruits and vegetables</li>
                        <li>Exercise for at least 30 minutes</li>
                        <li>Get 8 hours of sleep</li>
                    </ul>
                    <button onClick={() => alert('Tracking Started!')}>Start Tracking</button>
                </div>
            )
        },
        {
            id: 6,
            name: "Healthy Lifestyle Blog",
            description: "Read and write articles about living a healthy lifestyle.",
            content: (
                <div>
                    <h3>Healthy Lifestyle Blog</h3>
                    <p>Explore these blog sections:</p>
                    <ul>
                        <li>Latest Articles on Nutrition</li>
                        <li>Fitness Tips and Tricks</li>
                        <li>Stress Management Techniques</li>
                    </ul>
                    <button onClick={() => alert('Blog Accessed!')}>Explore Blog</button>
                </div>
            )
        },
        {
            id: 7,
            name: "Healthy Living Poster",
            description: "Design a poster that promotes healthy living habits.",
            content: (
                <div>
                    <h3>Healthy Living Poster</h3>
                    <p>Design your own poster using these tips:</p>
                    <ul>
                        <li>Include important health tips</li>
                        <li>Use bright and engaging visuals</li>
                        <li>Share your poster with classmates</li>
                    </ul>
                    <button onClick={() => alert('Poster Design Started!')}>Start Designing</button>
                </div>
            )
        },
        {
            id: 8,
            name: "Hydration Challenge",
            description: "Challenge yourself to drink enough water throughout the day.",
            content: (
                <div>
                    <h3>Hydration Challenge</h3>
                    <p>Track your water intake with these tips:</p>
                    <ul>
                        <li>Set reminders to drink water</li>
                        <li>Use a water bottle with measurements</li>
                        <li>Track your progress daily</li>
                    </ul>
                    <button onClick={() => alert('Challenge Accepted!')}>Start Challenge</button>
                </div>
            )
        },
        {
            id: 9,
            name: "Healthy Snacks Recipe",
            description: "Learn how to prepare healthy snacks that are both delicious and nutritious.",
            content: (
                <div>
                    <h3>Healthy Snacks Recipe</h3>
                    <p>Try these healthy snack ideas:</p>
                    <ul>
                        <li>Homemade Granola Bars</li>
                        <li>Fruit and Nut Mix</li>
                        <li>Veggie Sticks with Hummus</li>
                    </ul>
                    <button onClick={() => alert('Snack Recipe Started!')}>Start Cooking</button>
                </div>
            )
        },
        {
            id: 10,
            name: "Healthy Mind Challenge",
            description: "Engage in activities that boost mental health and well-being.",
            content: (
                <div>
                    <h3>Healthy Mind Challenge</h3>
                    <p>Participate in these activities:</p>
                    <ul>
                        <li>Practice daily affirmations</li>
                        <li>Engage in a creative hobby</li>
                        <li>Connect with friends and family</li>
                    </ul>
                    <button onClick={() => alert('Challenge Engaged!')}>Start Challenge</button>
                </div>
            )
        },
    ];

    const selectActivity = (activity) => {
        setSelectedActivity(activity);
    };

    return (
        <div className="healthy-activities-page-container">
            <h1>Healthy Activities for Students</h1>
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
    );
};

export default HealthyActivitiesPage;
