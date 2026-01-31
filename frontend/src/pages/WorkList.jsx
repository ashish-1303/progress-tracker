import API from "../api/api";
import "./WorkList.css";

export const WorkList = ({ work, setWork, loading }) => 
{

  const toggleStatus = async (id, currentStatus) => 
  {
    try 
    {
      await API.put(`/work/${id}/complete`);
      
      setWork(
        work.map((w) =>
          w._id === id
            ? {
                ...w,
                status: currentStatus === "pending"
                  ? "completed"
                  : "pending",
              }
            : w
        )
      );
    } 
    catch (error) 
    {
      alert(error.response?.data?.message || "Failed to update status!");
    }
  };


  return (
    <div className="work-list">
      <h3> Assignments & Projects </h3>

      {loading ? (
        <p className="work-item">Loading...</p>
      ) : work.length === 0 ? (
        <p className="work-item">No work items added yet.</p>
      ) : (
        <ul>
          {work.map((w) => (
            <li
              key={w._id}
              className={`work-item ${w.status === "completed" ? "completed" : ""}`}
            >
              <span>
                {w.title} – {w.subject} ({w.type})
              </span>

              <button
                className={w.status === "pending" ? "complete-btn" : "undo-btn"}
                onClick={() => toggleStatus(w._id, w.status)}
              >
               {w.status === "pending" ? "Complete" : "Undo"}
              </button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
