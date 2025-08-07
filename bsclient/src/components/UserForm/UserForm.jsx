import { useState } from "react";
import { addUser } from "../../services/UserService.js";
import toast from "react-hot-toast";

const UserForm = ({ setUsers }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addUser(data);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success("User added successfully!");
    } catch (error) {
      toast.error("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
      setData({
        name: "",
        email: "",
        password: "",
        role: "ROLE_USER",
      });
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Jhon Doe"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="*********"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  value={data.password}
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
