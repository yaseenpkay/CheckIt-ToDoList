import React, { useState } from "react";
import axios from "axios";

function InviteMembers({ teamId, onMembersUpdated }) {
  const [email, setEmail] = useState("");

  const handleInviteMember = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/teams/${teamId}/members`,
        {
          email,
        }
      );
      onMembersUpdated(response.data);
      setEmail("");
    } catch (error) {
      console.error("Error inviting member:", error);
    }
  };

  return (
    <div className="invite-members">
      <h2>Invite Members</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter member's email"
        className="input"
      />
      <button onClick={handleInviteMember} className="button">
        Invite Member
      </button>
    </div>
  );
}

export default InviteMembers;
