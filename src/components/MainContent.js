import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import AddItem from "./AddItem";
import TaskItem from "./TaskItem";
import axios from "axios";
import InviteMembers from "./InviteMembers";

function MainContent() {
  const [selectedSection, setSelectedSection] = useState("Today");
  const [isPopupVisible, setPopupVisible] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [sections, setSection] = useState([]);
  const [teams, setTeams] = useState([]);

  const [isTeamSelected, setTeamSelected] = useState(false);

  const handleTaskDrop = async (taskId, newSection) => {
    try {
      // Update task section locally
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, section: newSection } : task
        )
      );

      // Optionally, make an API call here to persist the changes to your backend
      await axios.put(`http://localhost:5000/tasks/${taskId}/sections`, {
        newSection,
      });
    } catch (error) {
      console.error("Error updating task section:", error);
      // Optionally, revert the local update if the API call fails
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data); // Assuming setTasks updates the state with tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchTasks, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date().setHours(0, 0, 0, 0); // Current date with time set to midnight

  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date).setHours(0, 0, 0, 0); // Task date with time set to midnight

    if (selectedSection === "Today") {
      return taskDate === currentDate; // Only tasks with today's date
    } else if (selectedSection === "Upcoming") {
      return taskDate > currentDate; // Only tasks with a date greater than today
    } else {
      return task.section === selectedSection; // For other sections, filter by section
    }
  });

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sections");
        setSection(response.data);
      } catch (error) {
        console.error("Error fetching sections: ", error);
      }
    };

    fetchSections();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5000/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching Teams: ", error);
      }
    };

    fetchTeams();
  }, []);

  const handleSectionDelete = async (sectionId) => {
    try {
      await axios.delete(`http://localhost:5000/sections/${sectionId}`);
      console.log("Section deleted");
      // Update your state or UI to remove the task
    } catch (error) {
      console.error(
        "Error deleting section:",
        error.response ? error.response.data : error.message
      );
    }

    setSection((prevSection) =>
      prevSection.filter((section) => section.id !== sectionId)
    );
  };

  const beepSound = new Audio(process.env.PUBLIC_URL + "/Beep.wav");

  const handleCheckboxChange = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      console.log("Task deleted");
      // Update your state or UI to remove the task
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response ? error.response.data : error.message
      );
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    beepSound.play();
  };

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  const toggleAddItem = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSectionChange = (sectionName) => {
    setTeamSelected(false);
    setSelectedSection(sectionName);
  };
  const handleTeamChange = (teamName) => {
    setTeamSelected(true);
    setSelectedSection(teamName);
  };
  console.log(tasks);

  return (
    <div className="flex w-full h-screen overflow-y-auto">
      <SideBar
        toggleAddItem={toggleAddItem}
        sections={sections}
        setSection={setSection}
        teams={teams}
        setTeams={setTeams}
        handleSectionChange={handleSectionChange}
        handleTeamChange={handleTeamChange}
        handleSectionDelete={handleSectionDelete}
        handleTaskDrop={handleTaskDrop}
      />

      {isPopupVisible && (
        <AddItem
          onClose={toggleAddItem}
          addTask={addTask}
          sections={sections}
        />
      )}

      <div className="w-full flex flex-col items-center">
        <div className="w-4/6 flex justify-left mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mt-10 ">
            {selectedSection}
          </h1>
        </div>

        <div className="w-full flex flex-col items-center">
          {!isTeamSelected && (
            <>
              <button
                onClick={toggleAddItem}
                sections={sections}
                className=" m-1 rounded w-4/6 text-midOrange text-left p-2 border-t-2"
              >
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6  mr-1 justify-end"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add Task
                </div>
              </button>

              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  handleCheckboxChange={handleCheckboxChange}
                  setTasks={setTasks}
                  sections={sections}
                />
              ))}
            </>
          )}

          {isTeamSelected && <InviteMembers />}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
