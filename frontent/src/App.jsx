import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyRequestsPage from './pages/MyRequestsPage';
import ProviderRequestsPage from './pages/ProviderRequestsPage';
import Header from './components/Header/Header';
import Home from './pages/Home';
import BrowseServices from './components/BrowseServices';
import ServiceDetails from './pages/ServiceDetails';
import CreateService from './components/CreateService';
import NotFoundPage from './pages/NotFoundPage';
// import LoginPage from './pages/LoginPage'; 
// import SignupPage from './pages/SignupPage'; 

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseServices />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/my-requests" element={<MyRequestsPage />} />
          <Route path="/provider/requests" element={<ProviderRequestsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
