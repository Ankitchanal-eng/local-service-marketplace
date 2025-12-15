import React, { useState, useEffect } from 'react';
import { fetchProviderRequests } from '../services/bookingService';
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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (requests.length === 0) return <EmptyState message="No incoming requests found." />;

  return (
    <div>
      <h2>Incoming Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Service Title</th>
            <th>Customer Info</th>
            <th>Note</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              {/* Uses populated titles/emails or handles null gracefully */}
              <td>{req.serviceId ? req.serviceId.title : 'Service Deleted/Invalid'}</td>
              <td>{req.customerId ? (req.customerId.name || req.customerId.email) : 'User Deleted/Invalid'}</td>
              <td>{req.note}</td>
              <td>{req.status}</td>
              <td>{new Date(req.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderRequestsPage;
