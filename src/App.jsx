// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Directors from './pages/Directors';
import Actors from './pages/Actors';
import ContentTrend from './pages/ContentTrend';
import GenreAnalysis from './pages/GenreAnalysis';
import SentimentAnalysis from './pages/SentimentAnalysis';
import DurationAnalysis from './pages/DurationAnalysis';
import Sidebar from './components/Sidebar';
import Reports from './pages/Reports';
import Map from './pages/Map';
const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex">
          <Sidebar />
        <div className="flex-1">
            <nav className="bg-blue-500 p-4 text-white">
               Netflix Dashboard
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/directors" element={<Directors />} />
                <Route path="/actors" element={<Actors />} />
                <Route path="/content-trend" element={<ContentTrend />} />
                <Route path="/genre-analysis" element={<GenreAnalysis />} />
                <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
                <Route path="/duration-analysis" element={<DurationAnalysis />} />
                <Route path="/reports" element={<Reports />} />
                 <Route path="/map" element={<Map />} />
            </Routes>
          </div>
      </div>
    </Router>
  );
};

export default App;