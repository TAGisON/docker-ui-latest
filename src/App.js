import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AllContainers from './pages/AllContainers';
import ActiveContainers from './pages/ActiveContainers';
import StoppedContainers from './pages/StoppedContainers';
import Images from './pages/ImagesList';
import Stats from './pages/Stats';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <div className="header">
            <div><h1>Container Management System</h1></div>
            <div><h3>Edge Computing Platform</h3></div>
          </div>
          <Routes>
            <Route path="/containers/all" element={<AllContainers />} />
            <Route path="/containers/active" element={<ActiveContainers />} />
            <Route path="/containers/stopped" element={<StoppedContainers />} />
            <Route path="/images" element={<Images />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
