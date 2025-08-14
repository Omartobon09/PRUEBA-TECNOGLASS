import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await taskService.getTasks();

      if (result.success) {
        setTasks(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await taskService.createTask(taskData);

      if (result.success) {
        setTasks((prev) => [...prev, result.data]);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = "Error al crear la tarea";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await taskService.updateTask(id, taskData);

      if (result.success) {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? result.data : task))
        );
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = "Error al actualizar la tarea";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const result = await taskService.deleteTask(id);

      if (result.success) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = "Error al eliminar la tarea";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (id, completed) => {
    try {
      const result = await taskService.toggleTaskStatus(id, completed);

      if (result.success) {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? result.data : task))
        );
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = "Error al cambiar estado de la tarea";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    fetchTasks,
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.completed).length,
    pendingTasks: tasks.filter((t) => !t.completed).length,
  };
};

export default useTasks;
