import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import API from "../api/api";
import { AddWork } from "./AddWork";
import { WorkList } from "./WorkList";
import { Marks } from "./Marks";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

export const Dashboard = () => 
{
  const { logout } = useContext(AuthContext);

  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWork = async () => 
  {
    try 
    {
      setLoading(true);
      const res = await API.get("/work");
      setWork(res.data);
    } 
    catch (error) 
    {
      alert("Failed to load work items!");
    } 
    finally 
    {
      setLoading(false);
    }
  };

 // Loading data on component mount... 

  useEffect(() => {
    fetchWork();
  }, []);


  return (
    <div className="dashboard">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h2>Student Dashboard</h2>

          <div className="dashboard-actions">
            <Link to="/progress" className="progress-btn">
              View Progress
            </Link>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>


        <div className="dashboard-section">
          <AddWork onWorkAdded={fetchWork} />
        </div>


        <div className="dashboard-section">
          <WorkList
            work={work}
            setWork={setWork}
            loading={loading}
          />
        </div>


        <div className="dashboard-section">
          <Marks />
        </div>


      </div>
    </div>
  );
};
