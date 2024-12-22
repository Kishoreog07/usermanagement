import React, { useState } from "react";
import UserModal from "./UserModal";

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const openModal = (user = null) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleClose = (success, formData) => {
    setIsModalOpen(false);
    if (success) {
      console.log("User successfully created/updated:", formData);
    } else {
      console.log("User creation/update canceled.");
    }
  };

  return (
    <div>
      <button onClick={() => openModal()}>Create User</button>
      <button
        onClick={() =>
          openModal({
            id: 1,
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
          })
        }
      >
        Edit User
      </button>

      {isModalOpen && <UserModal user={currentUser} onClose={handleClose} />}
    </div>
  );
};

export default ParentComponent;
