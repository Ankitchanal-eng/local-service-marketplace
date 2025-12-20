import React, { useState, useEffect } from 'react';
import { fetchMyRequests } from '../services/bookingService';

import Loading from '../components/LoadingState'; 
import Error from '../components/ErrorState';   
import EmptyState from '../components/EmptyState'; 
import StatusBadge from '../components/StatusBadge';

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await fetchMyRequests();
        setRequests(data);
      } catch (err) {
        setError('Failed to load your requests. Please try again');
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, []);

  if (loading) return <Loading />;
  if (error) {
      return (
        <Error message={error} onRetry={() => window.location.reload()} 
      />
    );
  }

  if (requests.length === 0) {
     return (
      <EmptyState 
        message="You have no booking requests yet."
        actionText="Browse Services"
        onAction={() => (window.location.href = '/browse')}
        />
     );
    }

  return (
    <div className="page-container">
      <h2>My Requests</h2>

      <table>
        <thead>
          <tr>
            <th>Service Title</th>
            <th>Note</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              {/* Uses populated title or handles null gracefully */}
              <td>{req.serviceId ? req.serviceId.title : 'Service removed'}</td>
              <td>{req.note}</td>
              <td><StatusBadge status={req.status} /></td>
              <td>{new Date(req.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequestsPage;
