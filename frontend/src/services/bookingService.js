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

// Provider: Accept / Reject booking
export const updateBookingStatus = async (id, status) => {
  const res = await api.patch(`/bookings/${id}/status`, { status });
  return res.data;
};

export const completeBooking = async (bookingId) => {
  const res = await api.patch(`/bookings/${bookingId}/complete`);
  return res.data;
};

export const createService = async (serviceData) => {
  const res = await api.post('/services', serviceData);
  return res.data;
};
