import api from './service';

export const fetchUser = async () => {
  try {
    console.log('Fetching user profile...');
    const response = await api.get('/api/v1/auth/user-profile');
    console.log('fetchUser response:', response.data);
    if (response.data.status) {
      return response.data.user;
    }
    return null;
  } catch (error) {
    console.error('Fetch user error:', error.response?.data || error.message);
    return null;
  }
};

export const loginUser = async (email, password) => {
  const response = await api.post('/api/v1/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/api/v1/auth/user', userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.get('/api/v1/auth/logout');
  return response.data;
};