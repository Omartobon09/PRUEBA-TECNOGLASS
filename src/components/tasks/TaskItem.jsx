import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaUndo,
  FaClock,
  FaCalendar,
} from "react-icons/fa";

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  const handleToggleStatus = async () => {
    setIsUpdating(true);
    try {
      await onToggleStatus(task.id, task.completed);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(task.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <>
      <div
        className={`task-card ${task.completed ? "task-card-completed" : ""}`}
      >
        <div className="task-card-header">
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={handleToggleStatus}
              disabled={isUpdating}
              className="me-3 task-checkbox"
            />
            <span
              className={`task-status-badge ${
                task.completed ? "badge-success" : "badge-warning"
              }`}
            >
              {task.completed ? (
                <>
                  <FaCheck className="me-1" size={10} />
                  Completada
                </>
              ) : (
                <>
                  <FaClock className="me-1" size={10} />
                  Pendiente
                </>
              )}
            </span>
          </div>
        </div>

        <div className="task-card-content">
          <h5
            className={`task-card-title ${
              task.completed ? "task-completed-text" : ""
            }`}
          >
            {task.title}
          </h5>

          {task.description && (
            <p
              className={`task-card-description ${
                task.completed ? "text-muted" : ""
              }`}
            >
              {task.description}
            </p>
          )}
        </div>

        <div className="task-card-meta">
          {task.createdAt && (
            <small className="text-muted me-3">
              <FaCalendar className="me-1" size={10} />
              Creada: {formatDate(task.createdAt)}
            </small>
          )}

          {task.updatedAt && task.updatedAt !== task.createdAt && (
            <small className="text-muted">
              <FaEdit className="me-1" size={10} />
              Actualizada: {formatDate(task.updatedAt)}
            </small>
          )}
        </div>

        <div className="task-card-actions">
          <button
            className="btn btn-outline-primary btn-sm task-action-btn"
            onClick={() => onEdit(task)}
          >
            <FaEdit className="me-1" />
            Editar
          </button>

          <button
            className={`btn ${
              task.completed ? "btn-outline-secondary" : "btn-outline-success"
            } btn-sm task-action-btn`}
            onClick={handleToggleStatus}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="spinner-border spinner-border-sm me-1" />
            ) : task.completed ? (
              <FaUndo className="me-1" />
            ) : (
              <FaCheck className="me-1" />
            )}
            {task.completed ? "Reactivar" : "Completar"}
          </button>

          <button
            className="btn btn-outline-danger btn-sm task-action-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content task-modal">
              <div className="modal-header task-modal-header">
                <h5 className="modal-title">
                  <div className="d-flex align-items-center">
                    <div
                      className="modal-icon"
                      style={{ background: "var(--danger-color)" }}
                    >
                      <FaTrash />
                    </div>
                    Confirmar Eliminación
                  </div>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>

              <div className="modal-body task-modal-body">
                <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
                <div className="task-preview-box">
                  <strong>{task.title}</strong>
                  {task.description && (
                    <p className="mb-0 text-muted mt-1">{task.description}</p>
                  )}
                </div>
                <p className="text-danger mt-2 mb-0">
                  <small>Esta acción no se puede deshacer.</small>
                </p>
              </div>

              <div className="modal-footer task-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-save"
                  onClick={handleDelete}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--danger-color), #b02a37)",
                  }}
                >
                  <FaTrash className="me-1" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
