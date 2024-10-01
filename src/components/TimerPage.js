import React, { useState, useEffect, useRef } from 'react';
import './TimerPage.css';

const TimerPage = () => {
    const [time, setTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [inputTime, setInputTime] = useState('');
    const alarmRef = useRef(null);  // Reference for the alarm sound

    useEffect(() => {
        let timer;
        if (timerRunning && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0 && timerRunning) {
            clearInterval(timer);
            setTimerRunning(false);
            alarmRef.current.play();  // Play the alarm when time is up
        }
        return () => clearInterval(timer);
    }, [timerRunning, time]);

    const startTimer = () => {
        if (inputTime && !isNaN(inputTime) && inputTime > 0) {
            setTime(parseInt(inputTime) * 60); // Set time in seconds
            setTimerRunning(true);
        }
    };

    const stopTimer = () => {
        setTimerRunning(false);
    };

    const resetTimer = () => {
        setTimerRunning(false);
        setTime(0);
        setInputTime('');
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0; // Reset the alarm sound
    };

    const handleInputChange = (e) => {
        setInputTime(e.target.value);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="timer-page">
            <h1 className="a1">Task Timer and Reminder</h1>
            <div className="timer-container">
                <input
                    type="number"
                    placeholder="Set timer (minutes)"
                    value={inputTime}
                    onChange={handleInputChange}
                    className="timer-input"
                />
                <div className="timer-display">
                    {formatTime(time)}
                </div>
                <div className="timer-buttons">
                    <button onClick={startTimer} className="start-btn" disabled={timerRunning}>
                        Start
                    </button>
                    <button onClick={stopTimer} className="stop-btn" disabled={!timerRunning}>
                        Stop
                    </button>
                    <button onClick={resetTimer} className="reset-btn">
                        Reset
                    </button>
                </div>
            </div>
            {/* Alarm sound element */}
            <audio ref={alarmRef} src="/song.mp3" />
        </div>
    );
};

export default TimerPage;
