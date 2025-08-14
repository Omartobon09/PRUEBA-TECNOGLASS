// src/components/common/ErrorMessage.jsx
import React from 'react';
import { Alert } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorMessage = ({ message, onRetry, className = '' }) => {
  return (
    <Alert variant="danger" className={`d-flex align-items-center ${className}`}>
      <FaExclamationTriangle className="me-2" />
      <div className="flex-grow-1">
        <strong>Error:</strong> {message}
      </div>
      {onRetry && (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={onRetry}
        >
          Reintentar
        </button>
      )}
    </Alert>
  );
};

export default ErrorMessage;