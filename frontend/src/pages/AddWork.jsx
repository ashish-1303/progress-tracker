import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/api";
import "./AddWork.css";

export const AddWork = ({ onWorkAdded }) => 
{
  const [data, setData] = useState({
    title: "",
    subject: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    setLoading(true);

    try
    {
      await API.post("/work", data);
      toast.success("Work added successfully!");

      setData({
        title: "",
        subject: "",
        type: "",
      });

      onWorkAdded();
    } 
    catch (error) 
    {
      toast.error(
        error.response?.data?.message || "Failed to add work!"
      );
    } 
    finally 
    {
      setLoading(false);
    }
  };


  return (
    <div className="add-work">
      <h3> Add Assignment / Project </h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          required
          value={data.title}
          onChange={(e) =>
            setData({ ...data, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Subject"
          required
          value={data.subject}
          onChange={(e) =>
            setData({ ...data, subject: e.target.value })
          }
        />

        <select
          required
          value={data.type}
          onChange={(e) =>
            setData({ ...data, type: e.target.value })
          }
        >
          <option value="" disabled>
            Select Work Type
          </option>
          <option value="assignment">Assignment</option>
          <option value="project">Project</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};
