import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../api/api";
import "./Register.css";

export const Register = () => 
{
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    setLoading(true);

    try 
    {
      await API.post("/auth/register", data);
      toast.success("Registration successful! Please login");
      navigate("/");
    } 
    catch (error) 
    {
      toast.error(
        error.response?.data?.message || "Registration failed!"
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

        <h1 className="app-name"> AcadTracker </h1>
        <p className="tagline">Track your academic journey </p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={data.email}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 chars.)"
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
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
};
