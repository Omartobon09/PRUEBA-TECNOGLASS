import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus, FaSync } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../components/layout/Layout";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilters from "../components/tasks/TaskFilters";
import useTasks from "../hooks/useTasks";
import "react-toastify/dist/ReactToastify.css";

const TasksPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    fetchTasks,
    totalTasks,
    completedTasks,
    pendingTasks,
  } = useTasks();

  const taskStats = {
    totalTasks,
    completedTasks,
    pendingTasks,
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleFormSubmit = async (taskData) => {
    setFormLoading(true);

    try {
      let result;

      if (selectedTask) {
        result = await updateTask(selectedTask.id, taskData);

        if (result.success) {
          toast.success("Tarea actualizada exitosamente", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        result = await createTask(taskData);

        if (result.success) {
          toast.success("Tarea creada exitosamente", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }

      if (!result.success) {
        toast.error(result.error || "Error al procesar la tarea", {
          position: "top-right",
          autoClose: 5000,
        });
      }

      return result;
    } catch (error) {
      console.error("Error en form submit:", error);
      toast.error("Error inesperado", {
        position: "top-right",
        autoClose: 5000,
      });
      return { success: false, error: "Error inesperado" };
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await deleteTask(taskId);

      if (result.success) {
        toast.success("Tarea eliminada exitosamente", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(result.error || "Error al eliminar la tarea", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error inesperado al eliminar", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    try {
      const result = await toggleTaskStatus(taskId, currentStatus);

      if (result.success) {
        const message = currentStatus
          ? "Tarea marcada como pendiente"
          : "Tarea completada";

        toast.success(message, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error(result.error || "Error al cambiar estado", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      toast.error("Error inesperado", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleRetry = () => {
    fetchTasks();
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  return (
    <Layout taskStats={taskStats}>
      <div className="tasks-page">
        <Container fluid className="px-4">
          <div className="page-header">
            <div className="header-content">
              <div className="header-info">
                <h1 className="page-title">Mis Tareas</h1>
                <p className="page-subtitle">
                  {totalTasks === 0
                    ? "Comienza organizando tu día"
                    : `${completedTasks} de ${totalTasks} completadas`}
                </p>
              </div>

              <div className="header-actions">
                <Button
                  variant="outline-secondary"
                  onClick={handleRetry}
                  disabled={loading}
                  className="me-3"
                  size="sm"
                >
                  <FaSync className={`me-2 ${loading ? "fa-spin" : ""}`} />
                  Actualizar
                </Button>

                <Button
                  variant="primary"
                  onClick={handleCreateTask}
                  className="btn-new-task"
                >
                  <FaPlus className="me-2" />
                  Nueva Tarea
                </Button>
              </div>
            </div>
          </div>

          <TaskFilters
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
          />

          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
            onRetry={handleRetry}
            onAddNew={handleCreateTask}
            currentFilter={filter}
          />

          <TaskForm
            show={showTaskForm}
            onHide={handleCloseForm}
            onSubmit={handleFormSubmit}
            task={selectedTask}
            loading={formLoading}
          />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Container>
      </div>
    </Layout>
  );
};

export default TasksPage;
