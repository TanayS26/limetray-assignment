import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Task title cannot be empty.");
      return;
    }
    addTask(title.trim());
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        placeholder="Enter task title"
      />
      <button type="submit">Add Task</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default TaskForm;
