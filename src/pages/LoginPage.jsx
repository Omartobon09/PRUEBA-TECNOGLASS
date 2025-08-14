
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/tasks';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);


  const handleLoginSuccess = () => {
    const from = location.state?.from?.pathname || '/tasks';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={5} xl={4}>
            <div className="text-center mb-4">
            </div>
            <LoginForm onSuccess={handleLoginSuccess} />
           
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;