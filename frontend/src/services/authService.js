import api from '../utils/api';

export const loginUser = async (data) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};
