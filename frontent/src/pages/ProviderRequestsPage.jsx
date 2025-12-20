import React, { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';
import { fetchProviderRequests, updateBookingStatus, completeBooking } from '../services/bookingService';

import Loading from '../components/LoadingState'; 
import Error from '../components/ErrorState';   
import EmptyState from '../components/EmptyState'; 

const ProviderRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await fetchProviderRequests();
        setRequests(data);
      } catch {
        setError('Failed to load incoming requests. Please try again.');
      } finally {
        setLoading(flase);
      }
    };

    getRequests();
  }, []);

  const updateStatus = async (id, status) => {
    const previousState = [...requests];

    setRequests(prev =>
      prev.map(r => (r._id === id ? { ...r, status} : r))
    );

    try {
      await updateBookingStatus(id, status);
    } catch (err) {
      setRequests(previousState);
      alert("Failed to update status. Please try again.")
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

if (loading) return <LoadingState />;

if (error) {
  return (
    <ErrorState message={error} onRetry={() => window.location.reload()} />
  );
}

if (requests.length === 0) {
  return (
    <EmptyState message={'No customers have requested your services yet,'} />
  );
}

  return (
    <div className="page-container provider-requests-container">
      <h2>Incoming Requests</h2>

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Customer</th>
            <th>Note</th>
            <th>Status</th>
            <th>Requested On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              {/* Uses populated titles/emails or handles null gracefully */}
              <td>{req.serviceId ? req.serviceId.title : 'Service removed'}</td>
              <td>{req.customerId ? (req.customerId.name || req.customerId.email) : 'User removed'}</td>
              <td>{req.note}</td>
              <td>
                <StatusBadge status={req.status} />
              </td>
              <td>{new Date(req.createdAt).toLocaleDateString()}</td>
              <td>
                {req.status === 'pending' && (
                  <div className="action-buttons">
                  <>
                  <button onClick={() => updateStatus(req._id, 'accepted')}>
                    Accept
                  </button>
                  <button onClick={() => updateStatus(req._id, 'rejected')}>
                    Reject
                  </button>
                  </>
                  </div>
                )}
                {req.status === 'accepted' && (
                  <button onClick={() => handleComplete(req._id)}>
                  Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderRequestsPage;
