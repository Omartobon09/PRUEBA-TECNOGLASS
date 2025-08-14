
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = 'border', variant = 'primary', text = 'Cargando...' }) => {
  return (
    <div className="text-center">
      <Spinner animation={size} variant={variant} className="mb-2" />
      {text && <div className="text-muted">{text}</div>}
    </div>
  );
};

export default LoadingSpinner;