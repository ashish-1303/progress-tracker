import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

export const Login = () => 
{
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    setLoading(true);

    try 
    {
      const res = await API.post("/auth/login", data);
      login(res.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } 
    catch (error) 
    {
      toast.error(
        error.response?.data?.message || "Login failed!"
      );
    } 
    finally 
    {
      setLoading(false);
    }
  };

  
  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1 className="app-name">AcadTracker</h1>
        <p className="tagline">Track your academic journey</p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
};
