import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./Progress.css";

export const Progress = () => {
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => 
  {
    const fetchWork = async () => 
    {
      try 
      {
        const res = await API.get("/work");
        setWork(res.data);
      } 
      catch (error) 
      {
        console.error("Failed to load work data");
      } 
      finally 
      {
        setLoading(false);
      }
    };

    fetchWork();
  }, []);

  if (loading) {
    return <p className="progress-loading">Loading charts...</p>;
  }

  const completedWorks = work.filter(w => w.status === "completed");
  const pendingWorks = work.filter(w => w.status === "pending");

  const chartData = [
    { name: "Completed", value: completedWorks.length },
    { name: "Pending", value: pendingWorks.length },
  ];

  const COLORS = ["#22c55e", "#f97316"];

  return (
    <div className="progress-page">

      <div className="progress-header">

        <h2>My Progress Overview</h2>

        <Link to="/dashboard" className="dashboard-btn">
          ← Back to Dashboard
        </Link>

      </div>

      {work.length === 0 ? (
        <p className="no-data-text">
          No assignments or projects added yet.
        </p>
      ) : (

        <>
          <div className="chart-container">

            <ResponsiveContainer width="100%" height={280}>

              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="work-status-container">

            <div className="work-box completed">

              <h3>Completed</h3>
              
              {completedWorks.length === 0 ? (
                <p>No completed work</p>
              ) : (
                <ul>
                  {completedWorks.map(w => (
                    <li key={w._id}>{w.title}</li>
                  ))}
                </ul>
              )}

            </div>

            <div className="work-box pending">

              <h3>Pending</h3>

              {pendingWorks.length === 0 ? (
                <p>No pending work</p>
              ) : (
                <ul>
                  {pendingWorks.map(w => (
                    <li key={w._id}>{w.title}</li>
                  ))}
                </ul>
              )}
              
            </div>

          </div>
        </>
      )}
    </div>
  );
};
