import { useState } from "react";
import "../AddEmployee/hrForms.css";

const PostJob = ({ onClose }) => {
  const [success, setSuccess] = useState(false);
  const [job, setJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    openings: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handlePostJob = (e) => {
    e.preventDefault();

    // simulate save
    setSuccess(true);
 
  };

  return (
    <>
      <h2 className="form-title">Post Job Opening</h2>
      <p className="form-subtitle">
        Create and publish a new job opening
      </p>

      <form className="form-grid" onSubmit={handlePostJob}>
        <input
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />

        <select
          name="department"
          value={job.department}
          onChange={handleChange}
          required
        >
          <option value="">Department</option>
          <option>Engineering</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Marketing</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={job.type}
          onChange={handleChange}
          required
        >
          <option value="">Employment Type</option>
          <option>Full-Time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>

        <input
          name="openings"
          type="number"
          min="1"
          placeholder="Number of Openings"
          value={job.openings}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description / Responsibilities"
          rows="4"
          value={job.description}
          onChange={handleChange}
          style={{
            gridColumn: "1 / -1",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
          required
        />

        {/* ✅ SUCCESS + SAVED JOB PREVIEW */}
        {success && (
          <div style={{ gridColumn: "1 / -1" }}>
            <div className="success-box">
              ✅ Job posted successfully!
            </div>

            <div className="info-box">
              <p><b>Saved Job Preview</b></p>
              <p><b>Title:</b> {job.title}</p>
              <p><b>Department:</b> {job.department}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Type:</b> {job.type}</p>
              <p><b>Openings:</b> {job.openings}</p>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="form-footer">
          <button
            type="button"
            className="btn-outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Post Job
          </button>
        </div>
      </form>
    </>
  );
};

export default PostJob;
