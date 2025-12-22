import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProviderRequestsPage.css'; 

import StatusBadge from '../components/StatusBadge';
import {
  fetchProviderRequests,
  updateBookingStatus,
  completeBooking,
} from '../services/bookingService';

import Loading from '../components/LoadingState';
import Error from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

const ProviderRequestsPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  const role = user?.role;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔐 Guard: only providers allowed
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (role !== 'provider') {
      navigate('/');
      return;
    }

    const getRequests = async () => {
      try {
        const data = await fetchProviderRequests();
        setRequests(data);
      } catch {
        setError('Failed to load incoming requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, [isLoggedIn, role, navigate]);

  const updateStatus = async (id, status) => {
    const previousState = [...requests];

    setRequests((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );

    try {
      await updateBookingStatus(id, status);
    } catch (err) {
      setRequests(previousState);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeBooking(id);
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: 'completed' } : req
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to complete booking');
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <Error
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (requests.length === 0) {
    return (
      <EmptyState
        message="No customers have requested your services yet."
        actionText="Create a Service"
        onAction={() => navigate('/create-service')}
      />
    );
  }

  return (
    <div className="provider-requests-page">
      <div className="page-hero">
        <div className="hero-content">
          <h1 className="page-title">Provider Dashboard</h1>
          <p className="page-subtitle">{requests.length} incoming requests</p>
        </div>
      </div>

      <div className="provider-dashboard">
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">Manage Requests</h2>
            <span className="requests-count">{requests.length} total</span>
          </div>
          <div className="header-right">
            <button className="refresh-btn" onClick={() => window.location.reload()}>
              <span className="icon">🔄</span>
              Refresh
            </button>
          </div>
        </div>

        <div className="requests-table-container">
          <div className="table-wrapper">
            <table className="provider-requests-table">
              <thead>
                <tr>
                  <th className="service-col">
                    <span>Service</span>
                  </th>
                  <th className="customer-col">
                    <span>Customer</span>
                  </th>
                  <th className="note-col">
                    <span>Notes</span>
                  </th>
                  <th className="status-col">
                    <span>Status</span>
                  </th>
                  <th className="date-col">
                    <span>Requested</span>
                  </th>
                  <th className="actions-col">
                    <span>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="request-row">
                    <td className="service-cell">
                      <div className="service-info">
                        <div className="service-icon">🛠️</div>
                        <div className="service-details">
                          <div className="service-title">
                            {req.serviceId ? req.serviceId.title : 'Service removed'}
                          </div>
                          <div className="service-category">
                            {req.serviceId ? req.serviceId.category : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="customer-cell">
                      <div className="customer-info">
                        <div className="customer-avatar">👤</div>
                        <div className="customer-details">
                          <div className="customer-name">
                            {req.customerId
                              ? req.customerId.username || req.customerId.email
                              : 'User removed'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="note-cell">
                      <div className="note-content">
                        {req.note || 'No additional notes'}
                      </div>
                    </td>
                    <td className="status-cell">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="date-cell">
                      <div className="date-info">
                        <div className="date">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </div>
                        <div className="time">
                          {new Date(req.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        {req.status === 'pending' && (
                          <>
                            <button 
                              className="action-btn accept-btn"
                              onClick={() => updateStatus(req._id, 'accepted')}
                            >
                              <span className="btn-icon">✅</span>
                              Accept
                            </button>
                            <button 
                              className="action-btn reject-btn"
                              onClick={() => updateStatus(req._id, 'rejected')}
                            >
                              <span className="btn-icon">❌</span>
                              Reject
                            </button>
                          </>
                        )}

                        {req.status === 'accepted' && (
                          <button 
                            className="action-btn complete-btn"
                            onClick={() => handleComplete(req._id)}
                          >
                            <span className="btn-icon">⭐</span>
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRequestsPage;
