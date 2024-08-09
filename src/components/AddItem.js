import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";

function AddItem({ addTask, onClose, sections }) {
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskSection, setTaskSection] = useState("Inbox");

  const currentDate = new Date();

  const [taskDate, setTaskDate] = useState({
    startDate: currentDate,
    endDate: currentDate,
  });

  // Determine if the date picker should be disabled
  const isDateDisabled = taskSection === "Today";

  const handleDateChange = (newDate) => {
    console.log("newDate:", newDate);
    setTaskDate(newDate); // Set the date directly
  };

  async function handleAdd(e) {
    e.preventDefault();

    // Use currentDate if the date picker is disabled
    const dateToUse = isDateDisabled ? currentDate : taskDate.startDate;

    const newTask = {
      id: String(Date.now()),
      name: taskName,
      description: taskDescription,
      completed: false,
      priority: taskPriority,
      section: taskSection,
      date: dateToUse, // Use the determined date
    };

    try {
      const response = await axios.post("http://localhost:5000/tasks", newTask);
      console.log("Task added:", response.data);
      // Update your state or UI to reflect the new task
    } catch (error) {
      console.error("Error adding task:", error);
    }

    addTask(newTask);
    setTaskName("");
    setTaskPriority("Low");
    setTaskDescription("");
    setTaskSection("Inbox");
    setTaskDate({ startDate: currentDate, endDate: currentDate }); // Reset date
    onClose();
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
      <div className="relative w-3/6 bg-white rounded-lg p-6 shadow-md ">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <input
              type="text"
              id="taskName"
              name="taskName"
              autoFocus
              placeholder="Task Name"
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              required
            />
          </div>
          <div>
            <textarea
              id="taskDescription"
              name="taskDescription"
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-xs"
            ></textarea>
          </div>
          <div className="flex ">
            <select
              id="priority"
              name="priority"
              onChange={(e) => setTaskPriority(e.target.value)}
              value={taskPriority}
              className="mt-1 mr-2 block w-2/6 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select
              id="section"
              name="section"
              onChange={(e) => setTaskSection(e.target.value)}
              value={taskSection}
              className="mt-1 mr-2 block w-2/6 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="Inbox">Inbox</option>
              <option value="Today">Today</option>
              {sections.map((section) => (
                <option key={section.id} value={section.sectionName}>
                  {section.sectionName}
                </option>
              ))}
            </select>
            <div className={"w-1/2"}>
              <Datepicker
                asSingle={true}
                useRange={false}
                value={taskDate}
                minDate={currentDate}
                displayFormat={"DD/MM/YYYY"}
                onChange={handleDateChange}
                disabled={isDateDisabled} // Conditionally disable the date picker
                required
                primaryColor={"orange"}
              />
            </div>
            <div className="flex w-full justify-end space-x-4 ">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 bg-gray-300 text-white rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-midOrange text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
