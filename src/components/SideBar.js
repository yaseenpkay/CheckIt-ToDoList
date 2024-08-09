import React, { useState } from "react";
import AddSection from "./AddSection";
import ProjectButton from "./ProjectButton";

function SideBar({
  sections,
  setSection,
  toggleAddItem,
  handleSectionChange,
  handleSectionDelete,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropDown, setDropDown] = useState(true);
  const [isSectionVisible, setSectionVisible] = useState(false);

  function addSection(newSection) {
    setSection([...sections, newSection]);
  }

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropDown = () => {
    setDropDown(!isDropDown);
  };

  const toggleAddSection = () => {
    setSectionVisible(!isSectionVisible);
  };

  console.log(sections);

  return (
    <div className="flex">
      <div
        className={`bg-lightOrange text-midOrange h-screen p-4 transition-all  duration-300 ${
          isOpen ? "w-64" : "w-0"
        }`}
      >
        <button
          onClick={toggleSideBar}
          className="bg-gray-700 p-2 rounded-md mb-4 focus:outline-none"
        >
          {isOpen ? "-" : "+"}
        </button>
        {isOpen && (
          <ul>
            <li>
              <div>
                <button
                  onClick={toggleAddItem}
                  sections={sections}
                  className="bg-midOrange m-1 rounded w-full text-white flex p-2"
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
            <li>
              <div className="flex bg-highlightOrange rounded align-middle p-2  items-center justify-between ">
                <button className="w-1/2 -ml-2">My Projects</button>
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
                      className="size-6 justify-end"
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
                <div className=" bg-highlightOrange transition-all duration-800 rounded overflow-hidden">
                  <ul>
                    {sections.map((section) => (
                      <li>
                        <ProjectButton
                          key={section.id}
                          section={section}
                          handleSectionChange={handleSectionChange}
                          handleSectionDelete={handleSectionDelete}
                          setSection={setSection}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SideBar;
