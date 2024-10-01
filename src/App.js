// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
//import Login from './components/login';
import Feature from './components/feature';
import NoteUpload from './components/note upload';
import Marks from './components/marks';
//import SignUp from './components/signup';
import Activity from './components/Activity';
import Activities from './components/Activities';
import Healthy from './components/Healthy';
import Sports from './components/Sports';
import Quizzes from './components/Quizzes';
import CommonTest from './components/CommonTest';
import Flashcards from './components/FlashCard';
import LessonModule from './components/LessonModule';
import NoteTaking from './components/NoteTaking';
import StudyPlanner from './components/StudyPlanner';
import TimerPage from './components/TimerPage';
import AttendancePage from './components/AttendancePage';
import TeachingToolsPage from './components/TeachingToolsPage';
import Feedback from './components/Feedback';
import TextToSpeech from './components/TextToSpeech';
import TextAnalyzer from './components/TextAnalyzer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/note upload" element={<NoteUpload />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/Activity" element={<Activity />} />
          <Route path="/Activities" element={<Activities />} />
          <Route path="/Healthy" element={<Healthy />} />
          <Route path="/Sports" element={<Sports />} />
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/CommonTest" element={<CommonTest />} />
          <Route path="/FlashCard" element={<Flashcards />} />
          <Route path="/LessonModule" element={<LessonModule />} />
          <Route path="/NoteTaking" element={<NoteTaking />} />
          <Route path="/StudyPlanner" element={<StudyPlanner />} />
          <Route path="/TimerPage" element={<TimerPage />} />
          <Route path="/AttendancePage" element={<AttendancePage />} />
          <Route path="/TeachingToolsPage" element={<TeachingToolsPage />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/TextToSpeech" element={<TextToSpeech />} />
          <Route path="/TextAnalyzer" element={<TextAnalyzer />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
