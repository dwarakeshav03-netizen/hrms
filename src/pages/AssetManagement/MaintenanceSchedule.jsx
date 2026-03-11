import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./assetManagement.css";

const MaintenanceSchedule = () => {
  const [activeTab, setActiveTab] = useState("schedule");

  const tasks = [
    {
      id: "AST001",
      asset: "Dell Latitude 5420",
      description: "Regular system cleanup and hardware check",
      category: "Laptop",
      type: "Preventive",
      date: "15 Jun 2025",
      duration: "2 hours",
      assignedTo: "IT Support",
      priority: "Medium",
      status: "Scheduled",
      cost: "Free",
    },
    {
      id: "AST005",
      asset: "Dell UltraSharp Monitor",
      description: "Screen flickering issue repair",
      category: "Monitor",
      type: "Corrective",
      date: "12 Jun 2025",
      duration: "4 hours",
      assignedTo: "External Vendor",
      priority: "High",
      status: "In Progress",
      cost: "₹5,000",
    },
    {
      id: "AST003",
      asset: "HP LaserJet Pro",
      description: "Quarterly maintenance and toner replacement",
      category: "Printer",
      type: "Preventive",
      date: "20 Jun 2025",
      duration: "1 hour",
      assignedTo: "HP Service",
      priority: "Low",
      status: "Scheduled",
      cost: "₹2,500",
    },
  ];

  return (
    <div className="maintenance-page">

      {/* HEADER */}
      <div className="maintenance-header">
        <div>
          <h1>Asset Maintenance</h1>
          <p>Schedule and track asset maintenance activities</p>
        </div>

        <button className="primary-btn">
          <FaPlus /> Schedule Maintenance
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="maintenance-summary">
        <div className="summary-card">
          <span>Total Scheduled</span>
          <h2>3</h2>
          <small>Maintenance tasks</small>
        </div>

        <div className="summary-card">
          <span>In Progress</span>
          <h2 className="orange">1</h2>
          <small>Currently ongoing</small>
        </div>

        <div className="summary-card">
          <span>Due This Week</span>
          <h2 className="red">0</h2>
          <small>Upcoming tasks</small>
        </div>

        <div className="summary-card">
          <span>Estimated Cost</span>
          <h2>₹7,500</h2>
          <small>This month</small>
        </div>
      </div>

      {/* TABS */}
      <div className="maintenance-tabs">
        <button
          className={activeTab === "schedule" ? "active" : ""}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>
        <button
          className={activeTab === "calendar" ? "active" : ""}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
      </div>

      {/* SCHEDULE TABLE */}
      {activeTab === "schedule" && (
        <div className="maintenance-table-card">

          <div className="table-header">
            <h2>Maintenance Schedule</h2>
            <p>Upcoming and ongoing maintenance activities</p>
          </div>

          {/* FILTERS */}
          <div className="table-filters">
            <input placeholder="Search maintenance tasks..." />
            <select>
              <option>All Types</option>
            </select>
            <select>
              <option>All Status</option>
            </select>
            <select>
              <option>All Priority</option>
            </select>
          </div>

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>Asset & Task</th>
                <th>Type</th>
                <th>Scheduled Date</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>

                  <td>
                    <strong>{task.asset}</strong>
                    <div className="sub-text">{task.description}</div>
                    <div className="sub-text">
                      {task.id} • {task.category}
                    </div>
                  </td>

                  <td>
                    <span className="badge type">
                      {task.type}
                    </span>
                  </td>

                  <td>
                    <div>{task.date}</div>
                    <div className="sub-text">{task.duration}</div>
                  </td>

                  <td>{task.assignedTo}</td>

                  <td>
                    <span className={`badge priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>

                  <td>
                    <span className={`badge status ${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>
                  </td>

                  <td>{task.cost}</td>

                  <td className="action-buttons">
                    <button className="secondary-btn">Edit</button>

                    {task.status === "Scheduled" && (
                      <button className="primary-btn-small">
                        Start
                      </button>
                    )}

                    {task.status === "In Progress" && (
                      <button className="success-btn">
                        Complete
                      </button>
                    )}
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

export default MaintenanceSchedule;