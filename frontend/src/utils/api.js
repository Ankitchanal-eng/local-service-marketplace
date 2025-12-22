import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem('user');
      const stored = raw ? JSON.parse(raw) : null;

      // After Login fix, stored = { id, email, username, role, token }
      const token = stored?.token;

      console.log('🔍 API CHECK:', {
        hasToken: !!token,
        storedKeys: stored ? Object.keys(stored) : [],
      });

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 TOKEN SENT');
      } else {
        console.log('❌ NO TOKEN - localStorage sample:', stored);
      }
    } catch (error) {
      console.log('❌ Parse error - continuing without token');
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('🔐 401 - Token invalid/expired');
    }
    return Promise.reject(error);
  },
);

export default api;
