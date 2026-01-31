import { useState } from "react";
import API from "../api/api";
import "./Marks.css";

export const Marks = () => 
{
  const [data, setData] = useState({ obtainedMarks: "", totalMarks: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    setLoading(true);

    try 
    {
      const res = await API.post("/marks", data);
      setResult(res.data);
      setData({
        obtainedMarks: "",
        totalMarks: "",
      });
    } 
    catch (error) 
    {
      const message =
        error.response?.data?.message || "Failed to calculate marks!";
      alert(message);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  return (
    <div className="marks">
      
      <h3>Calculate CGPA / Percentage</h3>

      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="number"
          placeholder="Obtained Marks"
          required
          value={data.obtainedMarks}
          onChange={(e) =>
            setData({ ...data, obtainedMarks: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Total Marks"
          required
          value={data.totalMarks}
          onChange={(e) =>
            setData({ ...data, totalMarks: e.target.value })
          }
        />

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </form>

      {result && (
        <p className="result">
         <strong> Percentage : </strong> {result.percentage} 
          &nbsp; &nbsp; 
          ||
          &nbsp; &nbsp; 
         <strong> CGPA : </strong>{result.cgpa}
        </p>
      )}
    </div>
  );
};
