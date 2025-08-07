import React from "react";
import { assest } from "../../assets/assets.js";
import { CiSearch } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import "./UserList.css";
import { deleteUser } from "../../services/UserService.js";
import toast from "react-hot-toast";

const UserList = ({ users, setUsers }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredUsers = users
  .filter((user) => user.role === "ROLE_USER") // ✅ filter by role
  .filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ filter by name
  );

  const deleteUserId = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 204) {
        const updatedUser = users.filter(
          (user) => user.userId !== userId
        );
        setUsers(updatedUser);
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user");
    }
  };

  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <CiSearch />
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredUsers.map((user, index) => (
          <div key={index} className="col-12">
            <div
              className="card p-3"
              style={{ backgroundColor: "#42B0F5" }}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={assest.avatar}
                    alt="USER"
                    className="user-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{user.name}</h5>
                  <p className="mb-0 text-white">{user.email}</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUserId(user.userId)}
                  >
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
