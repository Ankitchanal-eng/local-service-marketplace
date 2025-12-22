import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyRequests } from '../services/bookingService';
import '../styles/MyRequestsPage.css'; 

import Loading from '../components/LoadingState'; 
import Error from '../components/ErrorState';   
import EmptyState from '../components/EmptyState'; 
import StatusBadge from '../components/StatusBadge';

const MyRequestsPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!user;
  const role = user?.role;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔐 Guard: only customers allowed
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (role !== 'customer') {
      navigate('/');
      return;
    }

    const getRequests = async () => {
      try {
        const data = await fetchMyRequests();
        setRequests(data);
      } catch (err) {
        setError('Failed to load your requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, [isLoggedIn, role, navigate]);

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
        message="You have no booking requests yet."
        actionText="Browse Services"
        onAction={() => navigate('/browse')}
      />
    );
  }

  return (
    <div className="my-requests-page">
      <div className="page-hero">
        <div className="hero-content">
          <h1 className="page-title">My Requests</h1>
          <p className="page-subtitle">{requests.length} active requests</p>
        </div>
      </div>

      <div className="requests-dashboard">
        <div className="dashboard-header">
          <div className="header-left">
            <h2 className="dashboard-title">Booking History</h2>
          </div>
          <div className="header-right">
            <button className="refresh-btn">
              <span className="icon">🔄</span>
              Refresh
            </button>
          </div>
        </div>

        <div className="requests-table-container">
          <div className="table-wrapper">
            <table className="requests-table">
              <thead>
                <tr>
                  <th className="service-col">
                    <span>Service</span>
                  </th>
                  <th className="note-col">
                    <span>Note</span>
                  </th>
                  <th className="status-col">
                    <span>Status</span>
                  </th>
                  <th className="date-col">
                    <span>Date</span>
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
                          <div className="service-meta">
                            {req.serviceId ? req.serviceId.category : 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="note-cell">
                      <div className="note-content">
                        {req.note || 'No notes provided'}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {requests.length > 5 && (
            <div className="table-footer">
              <button className="load-more-btn">
                Load More Requests
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequestsPage;
