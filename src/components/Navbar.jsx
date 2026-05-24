import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import api from '../config/service';

const NavigationBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await api.get('api/v1/auth/logout');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      navigate('/login');
    }
  };

  // Don't show navbar on login and signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <Navbar 
      expand="lg" 
      sticky="top"
      style={{
        backgroundColor: scrolled ? '#1b4332' : '#2d6a4f',
        transition: 'all 0.3s ease',
        padding: scrolled ? '10px 0' : '15px 0',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold" style={{ color: 'white', fontSize: '1.5rem' }}>
          🌸 Flower Paradise
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'white' }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/home" style={{ color: 'white', margin: '0 10px' }}>🏠 Home</Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: 'white', margin: '0 10px' }}>🌸 About</Nav.Link>
            <Nav.Link as={Link} to="/profile" style={{ color: 'white', margin: '0 10px' }}>👤 Profile</Nav.Link>
            {user?.role === 'admin' && (
              <Nav.Link as={Link} to="/admin/dashboard" style={{ color: 'white', margin: '0 10px' }}>📊 Admin Panel</Nav.Link>
            )}
            {isAuthenticated ? (
              <>
                <Navbar.Text style={{ color: 'white', margin: '0 10px' }}>
                  🌺 {user?.name}
                </Navbar.Text>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#d62828',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '25px',
                    marginLeft: '10px'
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: 'white', margin: '0 10px' }}>Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ color: 'white', margin: '0 10px' }}>Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;