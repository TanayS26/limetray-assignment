import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light"); 

  const addTask = useCallback(
    (title) => {
      if (title.trim() !== "") {
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: uuidv4(), title, completed: false },
        ]);
      }
    },
    [setTasks]
  );

  const completeTask = useCallback(
    (id) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    tasks: filteredTasks,
    addTask,
    completeTask,
    deleteTask,
    filter,
    setFilter,
    theme,
    toggleTheme,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
