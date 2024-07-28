import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ContainerList from './pages/ContainerList';
import AllContainers from './pages/AllContainers';
import ActiveContainers from './pages/ActiveContainers';
import StoppedContainers from './pages/StoppedContainers';
import ImagesList from './pages/ImagesList';
import Stats from './pages/Stats';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/containers" element={<ContainerList />} />
            <Route path="/containers/all" element={<AllContainers />} />
            <Route path="/containers/active" element={<ActiveContainers />} />
            <Route path="/containers/stopped" element={<StoppedContainers />} />
            <Route path="/images" element={<ImagesList />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
