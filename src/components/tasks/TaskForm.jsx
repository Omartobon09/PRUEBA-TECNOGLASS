import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { FaPlus, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const TaskForm = ({ show, onHide, onSubmit, task = null, loading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }
    setErrors({});
    setSubmitError("");
  }, [task, show]);

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

    if (submitError) {
      setSubmitError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "El título no puede exceder 100 caracteres";
    }

    if (formData.description.trim().length > 500) {
      newErrors.description = "La descripción no puede exceder 500 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      const result = await onSubmit(taskData);

      if (result?.success !== false) {
        onHide();

        setFormData({ title: "", description: "" });
        setErrors({});
        setSubmitError("");
      } else {
        setSubmitError(result.error || "Error al procesar la tarea");
      }
    } catch (error) {
      console.error("Error en submit:", error);
      setSubmitError("Error inesperado. Intenta nuevamente.");
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ title: "", description: "" });
      setErrors({});
      setSubmitError("");
      onHide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="task-modal"
      backdrop={loading ? "static" : true}
    >
      <Modal.Header closeButton={!loading} className="task-modal-header">
        <Modal.Title className="d-flex align-items-center modal-title">
          {isEditing ? (
            <>
              <div className="modal-icon edit">
                <FaEdit size={16} />
              </div>
              Editar Tarea
            </>
          ) : (
            <>
              <div className="modal-icon create">
                <FaPlus size={16} />
              </div>
              Nueva Tarea
            </>
          )}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body className="task-modal-body">
          {submitError && (
            <Alert variant="danger" className="error-alert">
              {submitError}
            </Alert>
          )}

          <Form.Group className="form-group-custom">
            <Form.Label className="form-label-custom">Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="¿Qué necesitas hacer?"
              isInvalid={!!errors.title}
              disabled={loading}
              className="form-input-custom"
              autoFocus
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
            <div className="form-hint">
              {formData.title.length}/100 caracteres
            </div>
          </Form.Group>

          <Form.Group className="form-group-custom">
            <Form.Label className="form-label-custom">
              Descripción (opcional)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Agrega más detalles sobre esta tarea..."
              isInvalid={!!errors.description}
              disabled={loading}
              className="form-textarea-custom"
            />
            {errors.description && (
              <div className="form-error">{errors.description}</div>
            )}
            <div className="form-hint">
              {formData.description.length}/500 caracteres
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="task-modal-footer">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            disabled={loading}
            className="btn-cancel"
          >
            <FaTimes size={14} className="me-1" />
            Cancelar
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={loading || !formData.title.trim()}
            className="btn-save"
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                {isEditing ? "Actualizando..." : "Creando..."}
              </>
            ) : (
              <>
                <FaSave size={14} className="me-1" />
                {isEditing ? "Actualizar" : "Crear"} Tarea
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskForm;
