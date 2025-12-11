import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import BrowseServices from './BrowseServices';
import ServiceDetails from './ServiceDetails';
import CreateService from './CreateService';

import './App.css';
import './Header.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseServices />} />
          <Route path="/services/id:" element={<ServiceDetails />} />
          <Route path="/create-service" element={<CreateService />} />

          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
