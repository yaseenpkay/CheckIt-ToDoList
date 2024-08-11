import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";

function TaskItem({ task, handleCheckboxChange, setTasks, sections }) {
  const [isEditing, setIsEditing] = useState(false);
  const currentDate = new Date();

  const [editedTaskDate, setEditedTaskDate] = useState({
    startDate: currentDate,
    endDate: currentDate,
  });
  const [editedTask, setEditedTask] = useState({ ...task });

  const getDotColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-600";
      case "Medium":
        return "bg-yellow-300";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSaveClick = () => {
    handleUpdateTask();
    setIsEditing(false);
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${task.id}`,
        editedTask
      );
      console.log("Task updated:", response.data);
      // Update your state or UI to reflect the updated task
      setTasks((prevTasks) =>
        // prevTasks.map((task) =>
        //   task.id === response.data.id ? response.data : task
        // )
        prevTasks.map((t) => (t.id === editedTask.id ? editedTask : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditedDateChange = (selectedDate) => {
    setEditedTaskDate(selectedDate);
    const date = selectedDate.startDate; // Get the selected date
    setEditedTask({ ...editedTask, date: date }); // Update editedTask's date
  };

  return (
    <div
      className="relative w-4/6 p-2 rounded-s border-t-2 mt-2 border-darkOrange border-opacity-20"
      draggable
      onDragStart={handleDragStart}
    >
      <div
        className={`absolute -top-1 left-0 w-3 h-3 ${getDotColor(
          task.priority
        )} rounded-full -mt-1 -ml-1`}
      ></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {!isEditing && (
            <input
              type="checkbox"
              className="mr-2 h-5 w-5 text-midOrange rounded border-gray-300 focus:ring-midOrange"
              onChange={() => handleCheckboxChange(task.id)}
            />
          )}

          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedTask.name}
              onChange={handleInputChange}
              autoFocus
              className="w-full p-2  border-0 border-b-2 border-midOrange outline-none sm:text-sm "
            />
          ) : (
            <p className="text-base text-gray-800">{task.name}</p>
          )}
        </div>

        {isEditing ? (
          <button
            className="text-gray-500 hover:text-gray-700 rounded focus:outline-none focus:ring-2"
            onClick={handleSaveClick}
          >
            Save
          </button>
        ) : (
          <button
            className="text-gray-500 hover:text-gray-700 rounded focus:outline-none focus:ring-2 "
            onClick={handleEditClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        )}
      </div>

      {isEditing ? (
        <input
          name="description"
          value={editedTask.description}
          onChange={handleInputChange}
          className="w-full p-2  mb-2 border-0 border-b-2 border-midOrange outline-none sm:text-sm"
        />
      ) : (
        <p className="ml-7 text-sm text-gray-600 overflow-hidden text-ellipsis">
          {task.description}
        </p>
      )}

      {isEditing && (
        <div className="flex ">
          <select
            id="priority"
            name="priority"
            onChange={handleInputChange}
            value={editedTask.priority}
            className="mt-1 mr-2 block w-2/6 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            id="section"
            name="section"
            onChange={handleInputChange}
            value={editedTask.section}
            className="mt-1 mr-2 block w-2/6 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="Inbox">Inbox</option>
            <option value="Today">Today</option>
            {sections.map((section) => (
              <option key={section.id} value={section.editedSectionName}>
                {section.sectionName}
              </option>
            ))}
          </select>
          <div className={"w-1/2"}>
            <Datepicker
              asSingle={true}
              useRange={false}
              value={editedTaskDate}
              minDate={new Date()}
              displayFormat={"DD/MM/YYYY"}
              onChange={handleEditedDateChange}
              required
              primaryColor={"orange"}
            />
          </div>
        </div>
      )}

      {!isEditing && (
        <p className="ml-7 text-sm text-gray-600">
          {new Date(task.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </div>
  );
}

export default TaskItem;
