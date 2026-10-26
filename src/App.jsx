import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Directors from './pages/Directors';
import Actors from './pages/Actors';
import ContentTrend from './pages/ContentTrend';
import GenreAnalysis from './pages/GenreAnalysis';
import SentimentAnalysis from './pages/SentimentAnalysis';
import DurationAnalysis from './pages/DurationAnalysis';
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
      </div>
    </Router>
  );
};

export default App;
