const ProtectedRoute = ({ children }) => {
  return (
    <div>
      {/*protección de rutas */}
      {children}
    </div>
  );
};

export default ProtectedRoute;