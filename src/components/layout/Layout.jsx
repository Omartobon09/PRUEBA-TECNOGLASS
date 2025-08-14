import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Container fluid className="content-container">
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;