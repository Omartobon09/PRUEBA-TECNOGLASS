const ErrorMessage = ({ message }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message || 'Ha ocurrido un error'}
    </div>
  );
};

export default ErrorMessage;