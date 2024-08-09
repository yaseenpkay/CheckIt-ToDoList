import React, { useState } from "react";
import axios from "axios";

function AddSection({ onClose, addSection }) {
  const [sectionName, setSectionName] = useState("");

  async function handleAdd(e) {
    e.preventDefault();

    const newSection = {
      // id: String(Date.now()),
      sectionName: sectionName,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/section",
        newSection
      );
      console.log("Section added :", response.data);
    } catch (error) {
      console.error("error adding section :", error);
    }

    addSection(newSection);
    setSectionName("");
    onClose();
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-3/6 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <input
              type="text"
              id="sectionName"
              name="sectionName"
              placeholder="Project Name"
              onChange={(e) => setSectionName(e.target.value)}
              value={sectionName}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-4">
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
        </form>
      </div>
    </div>
  );
}

export default AddSection;
