import React, { useState, useEffect } from 'react';
import './Quizzes.css';

const quizData = [
    {
        id: 1,
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Jupiter",
        type: "multiple"
    },
    {
        id: 2,
        question: "Which element has the atomic number 6?",
        options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon",
        type: "multiple"
    },
    {
        id: 3,
        question: "The theory of relativity was proposed by which physicist?",
        options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
        correctAnswer: "Albert Einstein",
        type: "multiple"
    },
    {
        id: 4,
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Thailand", "Vietnam"],
        correctAnswer: "Japan",
        type: "multiple"
    },
    {
        id: 5,
        question: "In computer science, what does 'HTML' stand for?",
        options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Management Language", "HighLevel Text Machine Language"],
        correctAnswer: "HyperText Markup Language",
        type: "multiple"
    },
    {
        id: 6,
        question: "Which organ in the human body is responsible for pumping blood?",
        options: ["Lungs", "Liver", "Kidneys", "Heart"],
        correctAnswer: "Heart",
        type: "multiple"
    },
    {
        id: 7,
        question: "Which Shakespeare play features the characters Rosencrantz and Guildenstern?",
        options: ["Hamlet", "Macbeth", "Othello", "King Lear"],
        correctAnswer: "Hamlet",
        type: "multiple"
    },
    {
        id: 8,
        question: "What is the chemical symbol for the element Gold?",
        options: ["Au", "Ag", "Fe", "Pb"],
        correctAnswer: "Au",
        type: "multiple"
    },
    {
        id: 9,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
        type: "multiple"
    },
    {
        id: 10,
        question: "Which artist painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci",
        type: "multiple"
    },
    {
        id: 11,
        question: "The Great Wall of China was primarily built to protect against which group?",
        options: ["Mongols", "Huns", "Romans", "Persians"],
        correctAnswer: "Mongols",
        type: "multiple"
    },
    {
        id: 12,
        question: "Who wrote the epic poem 'The Odyssey'?",
        options: ["Homer", "Virgil", "Sophocles", "Aristotle"],
        correctAnswer: "Homer",
        type: "multiple"
    },
    {
        id: 13,
        question: "Which is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
        correctAnswer: "Nitrogen",
        type: "multiple"
    },
    {
        id: 14,
        question: "The Pythagorean theorem is applicable in which type of triangle?",
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"],
        correctAnswer: "Right-angled",
        type: "multiple"
    },
    {
        id: 15,
        question: "Which city is known as 'The Big Apple'?",
        options: ["Los Angeles", "Chicago", "San Francisco", "New York City"],
        correctAnswer: "New York City",
        type: "multiple"
    },
    {
        id: 16,
        question: "Which programming language is known as the 'mother of all languages'?",
        options: ["Assembly", "C", "FORTRAN", "COBOL"],
        correctAnswer: "C",
        type: "multiple"
    },
    {
        id: 17,
        question: "Which continent is the largest by land area?",
        options: ["Africa", "Asia", "North America", "Europe"],
        correctAnswer: "Asia",
        type: "multiple"
    },
    {
        id: 18,
        question: "What is the process by which plants make their food?",
        options: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"],
        correctAnswer: "Photosynthesis",
        type: "multiple"
    },
    {
        id: 19,
        question: "In what year did the Titanic sink?",
        options: ["1905", "1912", "1920", "1935"],
        correctAnswer: "1912",
        type: "multiple"
    },
    {
        id: 20,
        question: "Which country is famous for its pyramids and the Sphinx?",
        options: ["Greece", "Mexico", "India", "Egypt"],
        correctAnswer: "Egypt",
        type: "multiple"
    }

];

const QuizManagement = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for each question
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNextQuestion();
        }
    }, [timeLeft]);

    useEffect(() => {
        setProgress(((currentQuestion + 1) / quizData.length) * 100);
    }, [currentQuestion]);

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answer
        });
    };

    const handleNextQuestion = () => {
        const question = quizData[currentQuestion];
        if (selectedAnswers[question.id] === question.correctAnswer) {
            setScore(score + 1);
        }
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(30); // Reset timer for next question
        } else {
            setShowResults(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setScore(0);
        setShowResults(false);
        setTimeLeft(30);
    };

    const renderOptions = (question) => {
        if (question.type === "multiple") {
            return question.options.map(option => (
                <button
                    key={option}
                    onClick={() => handleAnswerSelect(question.id, option)}
                    className={`option-button ${selectedAnswers[question.id] === option ? 'selected' : ''}`}
                >
                    {option}
                </button>
            ));
        } else if (question.type === "truefalse") {
            return question.options.map(option => (
                <button
                    key={option}
                    onClick={() => handleAnswerSelect(question.id, option)}
                    className={`option-button ${selectedAnswers[question.id] === option ? 'selected' : ''}`}
                >
                    {option}
                </button>
            ));
        }
    };

    return (
        <div className="full3">
        <div className="quiz-container">
            {showResults ? (
                <div className="results-section">
                    <h2>Quiz Results</h2>
                    <p>Your Score: {score} / {quizData.length}</p>
                    <button onClick={handleRestartQuiz}>Restart Quiz</button>
                </div>
            ) : (
                <div className="question-section">
                    <h2>Question {currentQuestion + 1} of {quizData.length}</h2>
                    <p>{quizData[currentQuestion].question}</p>
                    <div className="options-container">
                        {renderOptions(quizData[currentQuestion])}
                    </div>
                    <div className="timer-progress-container">
                        <div className="timer">
                            Time Left: {timeLeft} seconds
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                    <button onClick={handleNextQuestion} className="next-button">
                        {currentQuestion < quizData.length - 1 ? 'Next' : 'See Results'}
                    </button>
                </div>
            )}
        </div>
        </div>
    );
};

export default QuizManagement;
