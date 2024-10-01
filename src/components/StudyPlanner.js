import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './StudyPlanner.css';

const localizer = momentLocalizer(moment);

const StudyPlanner = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        // Load events and tasks from localStorage
        const savedEvents = localStorage.getItem('events');
        const savedTasks = localStorage.getItem('tasks');
        if (savedEvents) setEvents(JSON.parse(savedEvents));
        if (savedTasks) setTaskList(JSON.parse(savedTasks));
    }, []);

    useEffect(() => {
        // Save events and tasks to localStorage
        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }, [events, taskList]);

    const handleAddEvent = () => {
        setEvents([...events, newEvent]);
        setNewEvent({ title: '', start: '', end: '' });
    };

    const handleAddTask = () => {
        setTaskList([...taskList, { task, completed: false }]);
        setTask('');
    };

    const handleTaskComplete = (index) => {
        const updatedTasks = [...taskList];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTaskList(updatedTasks);
    };

    const handleDeleteEvent = (event) => {
        setEvents(events.filter(e => e !== event));
    };

    return (
        <div className="full6">
        <div className="study-planner-container">
            <h1>Study Planner and Timetable Scheduler</h1>

            <div className="calendar-section">
                <h2>Calendar</h2>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <input
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                />
                <input
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                />
                <button onClick={handleAddEvent}>Add Event</button>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, marginTop: '20px' }}
                    onSelectEvent={(event) => handleDeleteEvent(event)}
                />
            </div>

            <div className="task-list-section">
                <h2>Task List</h2>
                <input
                    type="text"
                    placeholder="New Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
                <ul>
                    {taskList.map((item, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleTaskComplete(index)}
                            />
                            {item.task}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
};

export default StudyPlanner;
