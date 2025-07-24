import React from "react";
import { Task, ViewMode, Gantt, TaskOrEmpty } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
import { initTasks } from "./helper";
import "gantt-task-react/dist/style.css";

// Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);

  if (view === ViewMode.Year) {

  } else if (view === ViewMode.Month) {

  } else if (view === ViewMode.Week) {

  }

  const handleTaskChange = (task: TaskOrEmpty) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));

    setTasks(newTasks.filter(t => t.type !== "empty") as Task[]);
  };

  const handleTaskDelete = (
    tasksToDelete: readonly TaskOrEmpty[],
  ) => {
    const taskNames = tasksToDelete.map(t => t.name).join(", ");
    const conf = window.confirm("Are you sure about " + taskNames + " ?");
    if (conf) {
      const taskIdsToDelete = new Set(tasksToDelete.map(t => t.id));
      setTasks(tasks.filter(t => !taskIdsToDelete.has(t.id)));
    }
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: TaskOrEmpty) => {
    console.log("On Click event Id:" + task.id);
  };


  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}

        onDateChange={(value) => {
          handleTaskChange(value as Task);
        }}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}

      />
      <h3>Gantt With Limited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
      />
    </div>
  );
};

export default App;
