import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../redux/actions/userActions";

const UserModal = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (user) {
        await dispatch(updateUser({ ...formData, id: user.id }));
      } else {
        await dispatch(createUser(formData));
      }

      onClose(true, formData);
    } catch (error) {
      console.error("Error during form submission", error);
      onClose(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <span style={styles.close} onClick={handleCancel}>
          ×
        </span>
        <h2>{user ? "Edit User" : "Create User"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleCancel}
              style={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={styles.submitButton}
            >
              {isLoading
                ? "Submitting..."
                : user
                ? "Update User"
                : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    position: "relative",
  },
  close: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "#f8f9fa",
    color: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    opacity: 0.7,
  },
  submitButton: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    opacity: 0.7,
  },
};

export default UserModal;
