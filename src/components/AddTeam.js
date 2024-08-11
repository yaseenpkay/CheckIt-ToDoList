import React, { useState } from "react";
import axios from "axios";

function AddTeam({ addTeam, onClose, teams }) {
  const [teamName, setTeamName] = useState("");
  //const [error, setError] = useState(""); // For showing validation error

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    const newTeam = {
      name: teamName,
    };
    try {
      const response = await axios.post("http://localhost:5000/teams", newTeam);
      addTeam(response.data);
      setTeamName("");
      onClose();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-3/6 bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleCreateTeam} className="space-y-4">
          <h2>Create Team</h2>
          <input
            type="text"
            name="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focu"
          />
          <div className="flex mt-2 justify-end space-x-4">
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
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeam;
