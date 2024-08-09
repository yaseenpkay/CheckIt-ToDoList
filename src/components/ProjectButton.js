// ProjectButton.js

import React, { useState } from "react";
import axios from "axios";

const ProjectButton = ({
  section,
  handleSectionChange,
  handleSectionDelete,
  setSection,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editedSection, setEditedSection] = useState({
    sectionName: section.sectionName, // Initialize with the existing value
  });

  function handleEditSection() {
    setIsEditing(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSection((prevSection) => ({
      ...prevSection,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    handleUpdateSection();
    setIsEditing(false);
  };

  const handleUpdateSection = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/section/${section.id}`,
        editedSection
      );
      console.log("section updated:", response.data);
      // Update your state or UI to reflect the updated section
      setSection((prevSections) =>
        prevSections.map((s) =>
          s.id === section.id
            ? { ...s, sectionName: editedSection.sectionName }
            : s
        )
      );
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };

  return (
    <div className="flex items-center justify-between p-2">
      {!isEditing && (
        <button
          className=" text-midOrange rounded overflow-hidden whitespace-nowrap text-ellipsis"
          onClick={() => handleSectionChange(section.sectionName)}
        >
          {section.sectionName}
        </button>
      )}

      {isEditing && (
        <input
          type="text"
          name="sectionName"
          value={editedSection.sectionName}
          onChange={handleInputChange}
          autoFocus
          className="w-full p-2  border-0 border-b-2 bg-highlightOrange border-midOrange outline-none sm:text-sm "
        />
      )}

      <div className="flex space-x-2 ">
        {!isEditing && (
          <>
            <button onClick={() => handleEditSection(section.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
            </button>
            <button onClick={() => handleSectionDelete(section.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </>
        )}
        {isEditing && (
          <button>
            <button
              className="text-gray-500 hover:text-gray-700 rounded focus:outline-none focus:ring-2"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectButton;
