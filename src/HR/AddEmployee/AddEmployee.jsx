import { useState } from "react";
import "./hrForms.css";

const AddEmployee = ({ onClose }) => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ stop page reload

    // TODO: API call can go here later

    setSuccess(true);

  };

  return (
    <>
      <h2 className="form-title">Add New Employee</h2>
      <p className="form-subtitle">
        Onboard a new employee into the system
      </p>

      {/* ✅ SUCCESS MESSAGE */}
      {success && (
        <div className="success-box">
          ✅ Employee added successfully!
        </div>
      )}

      <form className="form-grid" onSubmit={handleSubmit}>
        <input placeholder="Full Name" required />
        <input placeholder="Email Address" type="email" required />
        <input placeholder="Phone Number" required />

        <select required>
          <option value="">Department</option>
          <option>Engineering</option>
          <option>HR</option>
          <option>Finance</option>
        </select>

        <input placeholder="Designation" required />
        <input type="date" required />

        <div className="form-footer">
          <button
            type="button"
            className="btn-outline"
            onClick={onClose}
          >
            Cancel
          </button>

          <button type="submit" className="btn-primary">
            Add Employee
          </button>
        </div>
      </form>
    </>
  );
};

export default AddEmployee;