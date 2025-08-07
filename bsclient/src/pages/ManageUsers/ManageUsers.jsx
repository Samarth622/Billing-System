import { useEffect, useState } from "react";
import UserForm from "../../components/UserForm/UserForm.jsx";
import UserList from "../../components/UserList/UserList.jsx";
import "./ManageUsers.css";
import { fetchUsers } from "../../services/UserService.js";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Unable to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="user-container text-light">
      <div className="left-column">
        <UserForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UserList users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
