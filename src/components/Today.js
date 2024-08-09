import React, { useState } from "react";
import TaskItem from "./TaskItem";
import AddItem from "./AddItem";

function Today({ isPopupVisible, toggleAddItem, sections }) {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      name: "task name 1",
      description: "task decription1 ",
      priority: "1",
      completed: false,
      //date: "20-07-2024",
    },
  ]);

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  console.log(tasks);

  return (
    <div className="w-full">
      <h1>Today</h1>
      {/* Render AddItem component conditionally */}
      {isPopupVisible && (
        <AddItem
          onClose={toggleAddItem}
          addTask={addTask}
          sections={sections}
        />
      )}
      {/* Other content */}
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} /> // Render each task item
        ))}
      </div>
    </div>
  );
}

export default Today;
