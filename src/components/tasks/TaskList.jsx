import React from "react";
import { Row, Col, Alert, Button } from "react-bootstrap";
import { FaPlus, FaTasks, FaExclamationCircle } from "react-icons/fa";
import TaskItem from "./TaskItem";
import LoadingSpinner from "../common/LoadingSpinner";

const TaskList = ({
  tasks = [],
  loading = false,
  error = null,
  onEdit,
  onDelete,
  onToggleStatus,
  onRetry,
  onAddNew,
  currentFilter = "all",
}) => {
  const getEmptyMessage = () => {
    switch (currentFilter) {
      case "completed":
        return {
          icon: FaPlus,
          title: "No hay tareas completadas",
          message: "Completa algunas tareas para verlas aquí.",
          showAddButton: false,
        };
      case "pending":
        return {
          icon: FaTasks,
          title: "No hay tareas pendientes",
          message: "¡Excelente! Has completado todas tus tareas.",
          showAddButton: true,
        };
      default:
        return {
          icon: FaTasks,
          title: "No hay tareas creadas",
          message:
            "Comienza creando tu primera tarea para organizar tu trabajo.",
          showAddButton: true,
        };
    }
  };

  if (error && !loading) {
    return (
      <Alert variant="danger" className="text-center py-4">
        <FaExclamationCircle size={48} className="mb-3 text-danger" />
        <Alert.Heading>Error al cargar las tareas</Alert.Heading>
        <p className="mb-3">{error}</p>
        {onRetry && (
          <Button variant="outline-danger" onClick={onRetry}>
            Intentar nuevamente
          </Button>
        )}
      </Alert>
    );
  }

  if (loading && tasks.length === 0) {
    return (
      <div className="text-center py-5">
        <LoadingSpinner
          text="Cargando tareas..."
          size="border"
          variant="primary"
        />
      </div>
    );
  }

  if (tasks.length === 0) {
    const emptyState = getEmptyMessage();
    const IconComponent = emptyState.icon;

    return (
      <div className="text-center py-5">
        <IconComponent size={64} className="mb-4 text-muted" />
        <h4 className="text-muted mb-3">{emptyState.title}</h4>
        <p className="text-muted mb-4">{emptyState.message}</p>
        {emptyState.showAddButton && onAddNew && (
          <Button
            variant="primary"
            size="lg"
            onClick={onAddNew}
            className="px-4"
          >
            <FaPlus className="me-2" />
            Crear Primera Tarea
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="position-relative">
      {loading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75"
          style={{ zIndex: 10 }}
        >
          <LoadingSpinner text="Actualizando..." />
        </div>
      )}

      <Row className="g-4">
        {tasks.map((task) => (
          <Col key={task.id} xs={12} md={6} lg={4} xl={3}>
            <TaskItem
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          </Col>
        ))}
      </Row>

      <div className="mt-4 text-center text-muted">
        <small>
          Mostrando {tasks.length} tarea{tasks.length !== 1 ? "s" : ""}
          {currentFilter !== "all" &&
            ` ${currentFilter === "completed" ? "completadas" : "pendientes"}`}
        </small>
      </div>
    </div>
  );
};

export default TaskList;
