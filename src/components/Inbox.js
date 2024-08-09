import React from "react";
import AddItem from "./AddItem";

const Inbox = ({ isPopupVisible, toggleAddItem }) => {
  return (
    <div className="inbox">
      <h1>Inbox</h1>
      {/* Render AddItem component conditionally */}
      {isPopupVisible && <AddItem onClose={toggleAddItem} />}
      {/* Other content */}
    </div>
  );
};

export default Inbox;
