import { useState, useEffect } from 'react';

const useAuth = () => {
  //hook personalizado de auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return {
    isAuthenticated,
    setIsAuthenticated,
  };
};

export default useAuth;