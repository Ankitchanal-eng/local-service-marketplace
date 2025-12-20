import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyRequestsPage from './pages/MyRequestsPage';
import Home from './pages/Home';
import BrowseServices from './pages/BrowseServices';
import ServiceDetails from './pages/ServiceDetails';
import CreateService from './pages/CreateService';
import ProviderRequestsPage from './pages/ProviderRequestsPage';
import NotFoundPage from './pages/NotFoundPage';

import Header from './components/Header/Header';
// import LoginPage from './pages/LoginPage'; 
// import SignupPage from './pages/SignupPage'; 

import './App.css';
import './index.css';

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
