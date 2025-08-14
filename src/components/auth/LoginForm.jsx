import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        onSuccess?.();
      } else {
        setLoginError(result.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en submit:", error);
      setLoginError("Error inesperado. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <Card className="login-card">
        <Card.Body>
          <div className="login-header">
            <FaSignInAlt className="login-icon" size={48} />
            <h2 className="login-title">Iniciar Sesión</h2>
            <p className="login-subtitle">
              Accede a tu cuenta para gestionar tus tareas
            </p>
          </div>
          {loginError && (
            <Alert variant="danger" className="mb-3">
              <strong>Error:</strong> {loginError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate className="login-form">
            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope />
                Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                isInvalid={!!errors.email}
                disabled={isLoading}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>
                <FaLock />
                Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                isInvalid={!!errors.password}
                disabled={isLoading}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              size="lg"
              className="w-100 login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <FaSignInAlt className="me-2" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;
