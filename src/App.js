import "./App.css";
import { useTasks } from "./contexts/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

const App = () => {
  const { theme, toggleTheme } = useTasks();
  return (
    <div className={`app-container ${theme}`}>
      <h1 style={{ textAlign: "center" }}>Task Manager</h1>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div style={{margin: "10px 0"}}>

      <TaskForm />
      </div>
      <div style={{ margin: "20px 0" }}>
        <TaskFilter />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
