import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../redux/actions/userActions";
import UserModal from "./UserModal";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [view, setView] = useState("list");
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          (user.first_name &&
            user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.last_name &&
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const openModal = (user = null) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const closeModal = (newUser = null) => {
    setShowModal(false);
    setCurrentUser(null);

    if (newUser) {
      if (newUser.id) {
        dispatch(updateUser(newUser));
      } else {
        dispatch(createUser(newUser));
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>User</h1>
        <div style={styles.headerRight}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchBox}
          />
          <button style={styles.createButton} onClick={() => openModal()}>
            Create User
          </button>
        </div>
      </div>
      <div style={styles.viewToggle}>
        <button onClick={() => setView("list")} style={styles.smallViewButton}>
          Table View
        </button>
        <button onClick={() => setView("card")} style={styles.smallViewButton}>
          Card View
        </button>
      </div>
      {view === "list" ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>First Name</th>
                <th style={styles.th}>Last Name</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.first_name}</td>
                  <td style={styles.td}>{user.last_name}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => openModal(user)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.cardContainer}>
          {currentUsers.map((user) => (
            <div key={user.id} style={styles.card}>
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <p>{user.email}</p>
              <div>
                <button
                  onClick={() => openModal(user)}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={styles.pagination}>
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              style={styles.pageButton}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      {showModal && (
        <UserModal
          user={currentUser}
          onClose={(newUser) => closeModal(newUser)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: "auto",
    maxWidth: "800px",
    textAlign: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  searchBox: {
    padding: "8px",
    marginRight: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  createButton: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  viewToggle: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  smallViewButton: {
    margin: "0 10px",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "12px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    border: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    width: "200px",
    textAlign: "left",
  },
  pagination: {
    marginTop: "20px",
  },
  pageButton: {
    margin: "0 5px",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
};

export default UserList;
