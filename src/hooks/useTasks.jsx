import { useState, useEffect } from 'react';

const useTasks = () => {
  // hook personalizado de tareas
  const [tasks, setTasks] = useState([]);

  return {
    tasks,
    setTasks,
  };
};

export default useTasks;