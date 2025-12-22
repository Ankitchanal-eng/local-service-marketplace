import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';

import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';

import MyRequestsPage from './pages/MyRequestsPage';
import Home from './pages/Home';
import BrowseServices from './pages/BrowseServices';
import ServiceDetails from './pages/ServiceDetails';
import CreateService from './pages/CreateService';
import ProviderRequestsPage from './pages/ProviderRequestsPage';
import NotFoundPage from './pages/NotFoundPage';

import Header from './components/Header/Header';

import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse" element={<BrowseServices />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          
          <Route path="/create-service" element={
            <RequireAuth role="provider">
              <CreateService />
            </RequireAuth>
          } />
          
          <Route path="/my-requests" element={
            <RequireAuth role="customer">
              <MyRequestsPage />
            </RequireAuth>
          } />
          
          <Route path="/provider/requests" element={
            <RequireAuth role="provider">
              <ProviderRequestsPage />
            </RequireAuth>
          } />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
