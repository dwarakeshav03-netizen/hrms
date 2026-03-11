import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./assetManagement.css";

const AssignAsset = () => {
  const [activeTab, setActiveTab] = useState("current");

  const assignments = [
    {
      id: "AST001",
      assetName: "Dell Latitude 5420",
      category: "Laptop",
      employee: "John Doe",
      department: "Engineering",
      empId: "EMP001",
      purpose: "Development work",
      assignedBy: "Admin",
      condition: "Good",
      from: "15 Jan 2025",
      until: "15 Jan 2026",
      status: "Active",
    },
    {
      id: "AST002",
      assetName: "iPhone 13",
      category: "Mobile",
      employee: "Sarah Wilson",
      department: "HR",
      empId: "EMP002",
      purpose: "Official communication",
      assignedBy: "Admin",
      condition: "Excellent",
      from: "10 Feb 2025",
      until: "10 Feb 2026",
      status: "Active",
    },
  ];

  return (
    <div className="assign-page">

      {/* HEADER */}
      <div className="assign-header">
        <div>
          <h1>Asset Assignment</h1>
          <p>Assign assets to employees and track assignments</p>
        </div>

        <button className="primary-btn">
          <FaPlus /> New Assignment
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="assign-summary">
        <div className="summary-card">
          <span>Total Assignments</span>
          <h2>3</h2>
          <small>All time assignments</small>
        </div>

        <div className="summary-card">
          <span>Active Assignments</span>
          <h2 className="green">3</h2>
          <small>Currently assigned</small>
        </div>

        <div className="summary-card">
          <span>Available Assets</span>
          <h2 className="blue">3</h2>
          <small>Ready for assignment</small>
        </div>

        <div className="summary-card">
          <span>Due Returns</span>
          <h2 className="orange">2</h2>
          <small>Expected this month</small>
        </div>
      </div>

      {/* TABS */}
      <div className="assign-tabs">
        <button
          className={activeTab === "current" ? "active" : ""}
          onClick={() => setActiveTab("current")}
        >
          Current Assignments
        </button>

        <button
          className={activeTab === "available" ? "active" : ""}
          onClick={() => setActiveTab("available")}
        >
          Available Assets
        </button>

        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          Assignment History
        </button>
      </div>

      {/* CURRENT ASSIGNMENTS TABLE */}
      {activeTab === "current" && (
        <div className="assign-table-card">

          <div className="table-header">
            <h2>Current Assignments</h2>
            <p>Active asset assignments to employees</p>
          </div>

          {/* FILTER BAR */}
          <div className="table-filters">
            <input placeholder="Search assignments..." />
            <select>
              <option>All Departments</option>
            </select>
            <select>
              <option>All Status</option>
            </select>
          </div>

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>Asset Details</th>
                <th>Assigned To</th>
                <th>Assignment Info</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((item) => (
                <tr key={item.id}>

                  <td>
                    <strong>{item.assetName}</strong>
                    <div className="sub-text">{item.id}</div>
                    <span className="badge category">
                      {item.category}
                    </span>
                  </td>

                  <td>
                    <strong>{item.employee}</strong>
                    <div className="sub-text">{item.department}</div>
                    <div className="sub-text">{item.empId}</div>
                  </td>

                  <td>
                    {item.purpose}
                    <div className="sub-text">
                      By: {item.assignedBy}
                    </div>
                    <div className="sub-text">
                      Condition:
                      <span className={`badge condition ${item.condition.toLowerCase()}`}>
                        {item.condition}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div>From: {item.from}</div>
                    <div>Until: {item.until}</div>
                  </td>

                  <td>
                    <span className="badge status active">
                      {item.status}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button className="secondary-btn">
                      View Details
                    </button>
                    <button className="outline-btn">
                      Request Return
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default AssignAsset;