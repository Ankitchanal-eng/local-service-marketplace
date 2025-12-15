import api from '../utils/api'; 

// Fetches bookings for the logged-in customer
export const fetchMyRequests = async () => {
  const response = await api.get('/bookings/my');
  return response.data; 
};

// Fetches incoming requests for the logged-in provider
export const fetchProviderRequests = async () => {
  const response = await api.get('/bookings/provider');
  return response.data;
};
