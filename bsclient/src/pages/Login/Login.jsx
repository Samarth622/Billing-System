import toast from "react-hot-toast";
import "./Login.css";
import React, { useContext } from "react";
import { login } from "../../services/AuthService.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";

const Login = () => {

    const navigate = useNavigate();

    const { setAuthData } = useContext(AppContext);

    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState({
        email: "",
        password: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await login(data);
            if(response.status === 202) {
                toast.success("Login successful!");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", response.data.role);
                setAuthData(response.data.token, response.data.role);
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
            setData({ email: "", password: "" });
        }
    }

  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
      <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title">Sign in</h1>
            <p className="card-text text-muted">
              Sign in below to access your account.
            </p>
          </div>
          <div className="mt-4">
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="youremail@example.com"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="***********"
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  value={data.password}
                />
              </div>
              <div className="d-grid">
                <button type="submit" disabled={isLoading} className="btn btn-lg btn-dark">
                    {isLoading ? "Loading..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
