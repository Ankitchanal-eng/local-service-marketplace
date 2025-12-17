import React, { useState, useEffect } from 'react';
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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (requests.length === 0) return <EmptyState message="No incoming requests found." />;

  const handleComplete = async (id) => {
  try {
    await completeBooking(id);
    setRequests(prev =>
      prev.map(req =>
        req._id === id ? { ...req, status: 'completed' } : req
      )
    );
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to complete booking');
  }
};

  return (
    <div className="provider-requests-container">
      <h2>Incoming Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Service Title</th>
            <th>Customer Info</th>
            <th>Note</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              {/* Uses populated titles/emails or handles null gracefully */}
              <td>{req.serviceId ? req.serviceId.title : 'Service Deleted/Invalid'}</td>
              <td>{req.customerId ? (req.customerId.name || req.customerId.email) : 'User Deleted/Invalid'}</td>
              <td>{req.note}</td>
              <td>
                <span className={`badge ${req.status}`}>
                  {req.status}
                </span>
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
