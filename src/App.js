import React from 'react';
import '../src/styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/about';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import InformationBar from './components/InformationBar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeWithInformationBar />} />
          <Route path="/about" element={<About />} />
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />
        </Routes>
      </Router>
    </div>
  );
}

function HomeWithInformationBar() {
  return (
    <div>
      {/* Render the InformationBar */}
      <InformationBar />

      {/* Render the Home component */}
      <Home />
    </div>
  );
}

export default App;
