import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import api from '../config/service';

const Profile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setMessage('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.put(`/auth/user/${user._id}`, formData);
      if (response.data.status) {
        const updatedUser = { ...user, name: formData.name, email: formData.email };
        if (user.token) updatedUser.token = user.token;
        login(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f0e7 0%, #e8f0e8 100%)', minHeight: '100vh', padding: '50px 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="profile-card">
              <div style={{ 
                background: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)',
                padding: '30px',
                textAlign: 'center',
                color: 'white'
              }}>
                <div className="display-1">🌸</div>
                <h2 className="mt-3">{user?.name}</h2>
                <p>{user?.role === 'admin' ? 'Administrator' : 'Flower Lover'}</p>
              </div>
              
              <Card.Body className="p-4">
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                {!isEditing ? (
                  <>
                    <div className="mb-4 p-3" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                      <h5 className="text-success">📧 Email</h5>
                      <p>{user?.email}</p>
                    </div>
                    
                    <div className="mb-4 p-3" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                      <h5 className="text-success">👤 Name</h5>
                      <p>{user?.name}</p>
                    </div>

                    <div className="mb-4 p-3" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                      <h5 className="text-success">🎨 Role</h5>
                      <p>{user?.role === 'admin' ? 'Admin' : 'User'}</p>
                    </div>

                    <div className="mb-4 p-3" style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                      <h5 className="text-success">📅 Member Since</h5>
                      <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>

                    <Button 
                      variant="success" 
                      className="w-100"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  </>
                ) : (
                  <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <Button variant="success" type="submit" disabled={loading} className="flex-grow-1">
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ name: user.name, email: user.email });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;