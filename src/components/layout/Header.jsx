import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaTasks, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="white" className="shadow-sm border-bottom" expand="lg">
      <Container fluid className="px-4">
        <Navbar.Brand className="d-flex align-items-center brand-logo">
          <div className="logo-icon">
            <FaTasks size={20} />
          </div>
          <span className="brand-text">TaskManager</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <div className="user-info d-flex align-items-center me-3">
              <div className="user-avatar">
                <FaUser size={14} />
              </div>
              <span className="user-email">{user?.email}</span>
            </div>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={handleLogout}
              className="logout-btn"
            >
              <FaSignOutAlt size={14} className="me-1" />
              Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;