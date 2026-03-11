import React from "react";

const AddEmployee = ({ onClose }) => {
  return (
    /* ===== DIM BACKGROUND ===== */
    <div className="modal-backdrop">
      
      {/* ===== CENTER MODAL ===== */}
      <div className="modal-container">

        {/* Close icon */}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {/* Title */}
        <h2 className="modal-title">Add Employee</h2>
        <p className="modal-subtitle">
          Enter employee details to add them to the system
        </p>

        {/* Form */}
        <form className="modal-form">

          <div className="modal-row">
            <label>Name</label>
            <input type="text" placeholder="Enter employee name" />
          </div>

          <div className="modal-row">
            <label>Email</label>
            <input type="email" placeholder="Enter email address" />
          </div>

          <div className="modal-row">
            <label>Phone</label>
            <input type="Number" placeholder="Enter Phone number" />
          </div>

          <div className="modal-row">
            <label>Department</label>
            <select>
              <option>Select department</option>
              <option>IT</option>
              <option>Finance</option>
              <option>HR</option>
              <option>Sales</option>
              <option>Engineering</option>
            </select>
          </div>

          <div className="modal-row">
            <label>Designation</label>
            <input type="text" placeholder="Enter Designation" />
          </div>

          {/* Footer */}
          <div className="modal-footer">
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
      </div>
    </div>
  );
};

export default AddEmployee;
