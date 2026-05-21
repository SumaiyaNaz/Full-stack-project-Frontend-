import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/service';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching users...');
      const response = await api.get('/auth/getuser');
      console.log('Users response:', response.data);
      
      if (response.data.status) {
        setUsers(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await api.delete(`/auth/user/${userId}`);
        if (response.data.status) {
          setUsers(users.filter(u => u._id !== userId));
          alert('User deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setUpdating(userId);
    try {
      const response = await api.put(`/auth/user/${userId}`, { role: newRole });
      if (response.data.status) {
        setUsers(users.map(u => 
          u._id === userId ? { ...u, role: newRole } : u
        ));
        alert('User role updated successfully');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update user role');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="success" />
        <span className="ms-3">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
          <Button variant="danger" onClick={fetchAllUsers}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #f5f0e7 0%, #e8f0e8 100%)', minHeight: '100vh', padding: '30px 0' }}>
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body className="text-center" style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #40916c 100%)', color: 'white' }}>
                <h1 className="display-5 fw-bold">📊 Admin Dashboard</h1>
                <p className="lead mb-0">Welcome, {user?.name} (Administrator)</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="g-4 mb-5">
          <Col xs={12} sm={6} md={4}>
            <Card className="text-center shadow-sm h-100 border-0">
              <Card.Body>
                <div className="display-1">👥</div>
                <h3>Total Users</h3>
                <h2 className="text-success">{users.length}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="text-center shadow-sm h-100 border-0">
              <Card.Body>
                <div className="display-1">👑</div>
                <h3>Admin Users</h3>
                <h2 className="text-primary">{users.filter(u => u.role === 'admin').length}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="text-center shadow-sm h-100 border-0">
              <Card.Body>
                <div className="display-1">🌺</div>
                <h3>Regular Users</h3>
                <h2 className="text-info">{users.filter(u => u.role === 'user').length}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Users Table */}
        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header style={{ background: '#2d6a4f', color: 'white' }} className="fw-bold fs-5">
                👥 All Users List
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table striped hover className="mb-0">
                    <thead style={{ background: '#e8f0e8' }}>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-5">
                            <p className="text-muted mb-0">No users found</p>
                          </td>
                        </tr>
                      ) : (
                        users.map((userItem, index) => (
                          <tr key={userItem._id}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{userItem.name}</strong>
                              {userItem.role === 'admin' && (
                                <Badge bg="primary" className="ms-2">Admin</Badge>
                              )}
                            </td>
                            <td>{userItem.email}</td>
                            <td style={{ minWidth: '120px' }}>
                              <select 
                                value={userItem.role} 
                                onChange={(e) => handleRoleChange(userItem._id, e.target.value)}
                                className="form-select form-select-sm"
                                disabled={updating === userItem._id}
                                style={{ width: 'auto', display: 'inline-block' }}
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                              {updating === userItem._id && (
                                <Spinner animation="border" size="sm" className="ms-2" />
                              )}
                            </td>
                            <td style={{ minWidth: '100px' }}>
                              {new Date(userItem.createdAt).toLocaleDateString()}
                            </td>
                            <td style={{ minWidth: '100px' }}>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDeleteUser(userItem._id)}
                                disabled={userItem._id === user?._id}
                              >
                                {userItem._id === user?._id ? 'Cannot Delete Self' : 'Delete'}
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                Total Users: {users.length} | Last updated: {new Date().toLocaleString()}
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        {/* Refresh Button */}
        <Row className="mt-4">
          <Col className="text-center">
            <Button 
              variant="success" 
              onClick={fetchAllUsers}
              className="px-4"
            >
              🔄 Refresh Users List
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;