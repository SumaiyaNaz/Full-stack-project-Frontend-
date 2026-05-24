import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../config/service';
import { useAuth } from '../context/AuthContext';






const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/v1/auth/login', formData);
      console.log('Login response:', response.data);
      
      if (response.data.status && response.data.token) {
        // Clear any existing data first
        localStorage.clear();
        
        // Store token
        localStorage.setItem('token', response.data.token);
        
        // Store user data
        const userData = {
          ...response.data.user,
          token: response.data.token
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update auth context
        login(userData);
        
        console.log('Token stored:', response.data.token.substring(0, 30) + '...');
        
        // Redirect based on role
        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/home');
        }
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem', 
      border: '1px solid #ddd', 
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      background: 'white'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2d6a4f', marginBottom: '1.5rem' }}>Login to Flower Paradise</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '12px', 
            background: '#2d6a4f', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#2d6a4f' }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;