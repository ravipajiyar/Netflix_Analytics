<<<<<<< HEAD
// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
=======
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
import Home from './pages/Home';
import Directors from './pages/Directors';
import Actors from './pages/Actors';
import ContentTrend from './pages/ContentTrend';
import GenreAnalysis from './pages/GenreAnalysis';
import SentimentAnalysis from './pages/SentimentAnalysis';
import DurationAnalysis from './pages/DurationAnalysis';
<<<<<<< HEAD
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
=======
import Reports from './pages/Reports';
import Map from './pages/Map';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="lg:pl-[272px]">
          <Topbar onMenu={() => setSidebarOpen(true)} />

          <main className="relative mx-auto w-full max-w-[1560px] px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pt-8">
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
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
      </div>
    </Router>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 7eb8cdf (ui enhanced and design upgraded)
