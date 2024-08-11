import React, { useState } from "react";
import AddSection from "./AddSection";
import AddTeam from "./AddTeam";
import ProjectButton from "./ProjectButton";
import TeamButton from "./TeamButton";

function SideBar({
  teams,
  setTeams,
  sections,
  setSection,
  toggleAddItem,
  handleSectionChange,
  handleTeamChange,
  handleSectionDelete,
  handleTaskDrop,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropDown, setDropDown] = useState(true);
  const [isTeamDropDown, setTeamDropDown] = useState(true);
  const [isSectionVisible, setSectionVisible] = useState(false);
  const [isTeamVisible, setTeamVisible] = useState(false);

  function addSection(newSection) {
    setSection([...sections, newSection]);
  }

  function addTeam(newTeam) {
    setTeams([...teams, newTeam]);
  }

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropDown = () => {
    setDropDown(!isDropDown);
  };
  const toggleTeamDropDown = () => {
    setTeamDropDown(!isTeamDropDown);
  };

  const toggleAddSection = () => {
    setSectionVisible(!isSectionVisible);
  };

  const toggleAddTeam = () => {
    setTeamVisible(!isTeamVisible);
  };

  console.log(sections);

  return (
    <div className="flex">
      <div
        className={`bg-lightOrange text-midOrange h-screen  transition-all   duration-300 overflow-y-auto ${
          isOpen ? "w-72" : "w-0"
        }`}
      >
        <button
          onClick={toggleSideBar}
          className={`p-1  rounded mt-3 ml-4 ${
            !isOpen ? "absolute   hover:bg-lightOrange" : " hover:bg-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
            />
          </svg>
        </button>
        <div className={`flex-1 p-4 ${isOpen ? "block" : "hidden"}`}>
          <ul>
            <li>
              <div>
                <button
                  onClick={toggleAddItem}
                  sections={sections}
                  className="bg-midOrange rounded w-full text-white flex p-2"
                >
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
                </button>
              </div>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("Today")}
                className="bg-lightOrange m-1 rounded w-full p-2 text-left"
              >
                Today
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("Inbox")}
                className="bg-lightOrange m-1 rounded w-full p-2 text-left"
              >
                Inbox
              </button>
              <button
                onClick={() => handleSectionChange("Upcoming")}
                className="bg-lightOrange m-1 rounded w-full p-2 text-left"
              >
                Upcoming
              </button>
            </li>
            <div className="bg-midOrange h-0.5 m-2 opacity-20"></div>
            <li>
              <div className="flex   rounded align-middle p-2  items-center justify-between ">
                My Projects
                <div className="flex space-x-2">
                  <button onClick={toggleAddSection}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6  justify-end"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <button onClick={toggleDropDown}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`size-6 justify-end transition-transform duration-300 ${
                        isDropDown ? "-rotate-180" : ""
                      } `}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {isSectionVisible && (
                <AddSection
                  onClose={toggleAddSection}
                  addSection={addSection}
                />
              )}

              {isDropDown && (
                <div className="  transition-all duration-800 rounded overflow-hidden">
                  <ul>
                    {sections.map((section) => (
                      <li>
                        <ProjectButton
                          key={section.id}
                          label={section.sectionName}
                          section={section}
                          handleSectionChange={handleSectionChange}
                          handleSectionDelete={handleSectionDelete}
                          setSection={setSection}
                          handleTaskDrop={handleTaskDrop}
                          onDelete={() =>
                            handleSectionDelete(section.sectionName)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <div className="bg-midOrange h-0.5 m-2 opacity-20 "></div>

            <li>
              <div className="flex   rounded align-middle p-2  mt-4 items-center justify-between ">
                My Teams
                <div className="flex space-x-2">
                  <button onClick={toggleAddTeam}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6  justify-end"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <button onClick={toggleTeamDropDown}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`size-6 justify-end transition-transform duration-300 ${
                        isTeamDropDown ? "-rotate-180" : ""
                      } `}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {isTeamVisible && (
                <AddTeam onClose={toggleAddTeam} addTeam={addTeam} />
              )}

              {isTeamDropDown && (
                <div className="  transition-all duration-800 rounded overflow-hidden">
                  <ul>
                    {teams.map((team) => (
                      <li key={team.id}>
                        <TeamButton
                          team={team}
                          handleTeamChange={handleTeamChange}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
