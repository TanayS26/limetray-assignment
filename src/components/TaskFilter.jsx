import React from "react";
import { useTasks } from "../contexts/TaskContext";

const TaskFilter = () => {
  const { filter, setFilter } = useTasks();

  return (
    <div>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>Completed</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
    </div>
  );
};

export default TaskFilter;
