import React, { useState } from 'react';
import './CommonTest.css';

const CommonTest = () => {
    const [subject, setSubject] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const subjects = [
        { name: 'Math', icon: '📐' },
        { name: 'Science', icon: '🔬' },
        { name: 'English', icon: '📚' }
    ];

    const questions = [
        // Math Questions
        {
            subject: "Math",
            difficulty: "Easy",
            question: "What is 5 + 3?",
            options: ["6", "7", "8", "9"],
            correctAnswer: "8"
        },
        {
            subject: "Math",
            difficulty: "Easy",
            question: "What is the shape with four equal sides called?",
            options: ["Rectangle", "Triangle", "Square", "Circle"],
            correctAnswer: "Square"
        },
        {
            subject: "Math",
            difficulty: "Easy",
            question: "How many sides does a triangle have?",
            options: ["2", "3", "4", "5"],
            correctAnswer: "3"
        },
        {
            subject: "Math",
            difficulty: "Medium",
            question: "What is 12 × 8?",
            options: ["96", "86", "102", "90"],
            correctAnswer: "96"
        },
        {
            subject: "Math",
            difficulty: "Medium",
            question: "What is the perimeter of a square with sides of 5 cm each?",
            options: ["20 cm", "25 cm", "15 cm", "30 cm"],
            correctAnswer: "20 cm"
        },
        {
            subject: "Math",
            difficulty: "Medium",
            question: "What is the next number in the sequence: 2, 4, 6, 8, ___?",
            options: ["9", "10", "11", "12"],
            correctAnswer: "10"
        },
        {
            subject: "Math",
            difficulty: "Hard",
            question: "If 5x = 20, what is the value of x?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4"
        },
        {
            subject: "Math",
            difficulty: "Hard",
            question: "What is the area of a triangle with a base of 10 cm and a height of 5 cm?",
            options: ["50 cm²", "30 cm²", "25 cm²", "15 cm²"],
            correctAnswer: "25 cm²"
        },
        {
            subject: "Math",
            difficulty: "Hard",
            question: "What is the value of 9³?",
            options: ["729", "81", "243", "512"],
            correctAnswer: "729"
        },

        // Science Questions
        {
            subject: "Science",
            difficulty: "Easy",
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correctAnswer: "Mars"
        },
        {
            subject: "Science",
            difficulty: "Easy",
            question: "What gas do plants produce during photosynthesis?",
            options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
            correctAnswer: "Oxygen"
        },
        {
            subject: "Science",
            difficulty: "Easy",
            question: "How many legs do spiders have?",
            options: ["6", "8", "10", "12"],
            correctAnswer: "8"
        },
        {
            subject: "Science",
            difficulty: "Medium",
            question: "What is the chemical symbol for water?",
            options: ["H₂O", "CO₂", "O₂", "NaCl"],
            correctAnswer: "H₂O"
        },
        {
            subject: "Science",
            difficulty: "Medium",
            question: "Which organ in the human body is primarily responsible for pumping blood?",
            options: ["Brain", "Heart", "Lungs", "Liver"],
            correctAnswer: "Heart"
        },
        {
            subject: "Science",
            difficulty: "Medium",
            question: "What type of rock is formed from volcanic activity?",
            options: ["Igneous", "Sedimentary", "Metamorphic", "Limestone"],
            correctAnswer: "Igneous"
        },
        {
            subject: "Science",
            difficulty: "Hard",
            question: "What is the most abundant gas in Earth’s atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
            correctAnswer: "Nitrogen"
        },
        {
            subject: "Science",
            difficulty: "Hard",
            question: "What is the speed of light in a vacuum?",
            options: ["299,792 km/s", "150,000 km/s", "300,000 km/s", "1,080 km/s"],
            correctAnswer: "299,792 km/s"
        },
        {
            subject: "Science",
            difficulty: "Hard",
            question: "Which part of the cell contains genetic material?",
            options: ["Nucleus", "Mitochondria", "Cytoplasm", "Cell membrane"],
            correctAnswer: "Nucleus"
        },

        // English Questions
        {
            subject: "English",
            difficulty: "Easy",
            question: "What is the opposite of the word 'Hot'?",
            options: ["Warm", "Cold", "Cool", "Dry"],
            correctAnswer: "Cold"
        },
        {
            subject: "English",
            difficulty: "Easy",
            question: "Which word is a noun: 'Run,' 'Beautiful,' 'Dog,' 'Quickly'?",
            options: ["Run", "Beautiful", "Dog", "Quickly"],
            correctAnswer: "Dog"
        },
        {
            subject: "English",
            difficulty: "Easy",
            question: "Fill in the blank: 'I _____ to the store yesterday.'",
            options: ["Go", "Went", "Gone", "Goes"],
            correctAnswer: "Went"
        },
        {
            subject: "English",
            difficulty: "Medium",
            question: "What is the plural form of the word 'Child'?",
            options: ["Childs", "Children", "Childrens", "Childer"],
            correctAnswer: "Children"
        },
        {
            subject: "English",
            difficulty: "Medium",
            question: "Which sentence is grammatically correct?",
            options: [
                "He don’t like pizza",
                "He doesn’t likes pizza",
                "He doesn’t like pizza",
                "He don’t likes pizza"
            ],
            correctAnswer: "He doesn’t like pizza"
        },
        {
            subject: "English",
            difficulty: "Medium",
            question: "What is the past tense of the word 'Run'?",
            options: ["Run", "Runned", "Running", "Ran"],
            correctAnswer: "Ran"
        },
        {
            subject: "English",
            difficulty: "Hard",
            question: "Which of the following is a synonym for the word 'Quick'?",
            options: ["Slow", "Fast", "Deliberate", "Gradual"],
            correctAnswer: "Fast"
        },
        {
            subject: "English",
            difficulty: "Hard",
            question: "Which of the following is an example of an alliteration?",
            options: [
                "The sweet smell of success",
                "The sun sets slowly",
                "She sells seashells",
                "Bright blue sky"
            ],
            correctAnswer: "She sells seashells"
        },
        {
            subject: "English",
            difficulty: "Hard",
            question: "Identify the verb in the sentence: 'The cat jumped over the moon.'",
            options: ["Cat", "Jumped", "Over", "Moon"],
            correctAnswer: "Jumped"
        }
    ];

    // Filter questions based on selected subject and difficulty
    const filteredQuestions = questions.filter(
        q => q.subject === subject && q.difficulty === difficulty
    );

    const handleSubjectSelect = (subject) => {
        setSubject(subject);
        setDifficulty(null);
        setQuestionIndex(0);
        setScore(0);
        setShowResults(false);
    };

    const handleDifficultySelect = (level) => {
        setDifficulty(level);
        setQuestionIndex(0);
        setScore(0);
        setShowResults(false);
    };

    const handleAnswerSelect = (selectedOption) => {
        const currentQuestion = filteredQuestions[questionIndex];
        if (selectedOption === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
        if (questionIndex + 1 < filteredQuestions.length) {
            setQuestionIndex(questionIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleRetry = () => {
        setQuestionIndex(0);
        setScore(0);
        setShowResults(false);
    };

    const renderQuestion = () => {
        if (filteredQuestions.length === 0) return null;

        const currentQuestion = filteredQuestions[questionIndex];
        return (
            <div className='full'>
            <div className="question-container">
                <h2>{currentQuestion.question}</h2>
                <div className="options-container">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            </div>
           
        );
    };

    const renderResults = () => (
        <div className="results-container">
            <h2>Results</h2>
            <p>Your score: {score} / {filteredQuestions.length}</p>
            <button onClick={handleRetry}>Retry</button>
        </div>
    );

    return (
        <div className="full">
        <div className="common-test">
            {!subject ? (
                <div className="subject-selection">
                    <h1>Select Subject</h1>
                    <div className="subject-options">
                        {subjects.map((sub, index) => (
                            <div
                                key={index}
                                className="subject-card"
                                onClick={() => handleSubjectSelect(sub.name)}
                            >
                                <span>{sub.icon}</span>
                                <h2>{sub.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            ) : !difficulty ? (
                <div className="difficulty-selection">
                    <h1>Select Difficulty</h1>
                    <div className="difficulty-options">
                        <button onClick={() => handleDifficultySelect("Easy")}>Easy</button>
                        <button onClick={() => handleDifficultySelect("Medium")}>Medium</button>
                        <button onClick={() => handleDifficultySelect("Hard")}>Hard</button>
                    </div>
                </div>
            ) : showResults ? (
                renderResults()
            ) : (
                renderQuestion()
            )}
        </div>
        </div>
    );
};

export default CommonTest;
