import { API_URLS } from "../utils/constants";

export const taskService = {
 
  getTasks: async () => {
    try {
      const response = await fetch(API_URLS.TASKS);

      if (!response.ok) {
        throw new Error("Error al obtener las tareas");
      }

      const tasks = await response.json();
      return { success: true, data: tasks };
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      return { success: false, error: error.message };
    }
  },

 
  createTask: async (task) => {
    try {
      const response = await fetch(API_URLS.TASKS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          completed: false,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }

      const newTask = await response.json();
      return { success: true, data: newTask };
    } catch (error) {
      console.error("Error al crear tarea:", error);
      return { success: false, error: error.message };
    }
  },

 
  updateTask: async (id, task) => {
    try {
      const response = await fetch(`${API_URLS.TASKS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
      }

      const updatedTask = await response.json();
      return { success: true, data: updatedTask };
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      return { success: false, error: error.message };
    }
  },

  
  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_URLS.TASKS}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la tarea");
      }

      return { success: true };
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      return { success: false, error: error.message };
    }
  },


  toggleTaskStatus: async (id, completed) => {
    try {
      const response = await fetch(`${API_URLS.TASKS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !completed,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al cambiar el estado de la tarea");
      }

      const updatedTask = await response.json();
      return { success: true, data: updatedTask };
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      return { success: false, error: error.message };
    }
  },
};
