import React, { useState } from "react";
import '../../assets/styles/dashboard/dashboard.css';


/* ================= MOCK DATA (API READY) ================= */

const statsData = [
  { label: "Total Employees", value: 24, hint: "+2 this month" },
  { label: "Monthly Payroll", value: "₹12,45,000", hint: "Processed" },
  { label: "Active Assets", value: 156, hint: "12 maintenance" },
  { label: "Monthly Revenue", value: "₹45,67,890", hint: "+15%" },
];

const activitiesData = [
  { text: "John Doe applied for leave (Dec 15-17)", status: "pending" },
  { text: "Laptop LP001 assigned to Sarah", status: "done" },
  { text: "November payroll processed", status: "done" },
  { text: "Project Alpha completed", status: "done" },
  { text: "New intern onboarded", status: "pending" },
  { text: "HR policy updated", status: "done" },
  { text: "Asset audit scheduled", status: "pending" },
];

const tasksData = [
  { text: "Process December Payroll", priority: "high" },
  { text: "Asset Maintenance Review", priority: "medium" },
  { text: "Compliance Report", priority: "high" },
  { text: "Performance Reviews", priority: "low" },
  { text: "Laptop Inventory", priority: "medium" },
  { text: "Security Audit", priority: "high" },
];

/* ================= HELPERS ================= */

const ITEMS_PER_PAGE = 4;

const paginate = (data, page) => {
  const start = (page - 1) * ITEMS_PER_PAGE;
  return data.slice(start, start + ITEMS_PER_PAGE);
};

/* ================= PAGINATION COMPONENT ================= */

const Pagination = ({ current, total, onChange }) => (
  <div className="pagination">
    <span
      className="page-arrow"
      onClick={() => current > 1 && onChange(current - 1)}
    >
      ‹
    </span>

    {[...Array(total)].map((_, i) => (
      <span
        key={i}
        className={`page-number ${current === i + 1 ? "active" : ""}`}
        onClick={() => onChange(i + 1)}
      >
        {i + 1}
      </span>
    ))}

    <span
      className="page-arrow"
      onClick={() => current < total && onChange(current + 1)}
    >
      ›
    </span>
  </div>
);

/* ================= DASHBOARD ================= */

const Dashboard = () => {
  const [activityPage, setActivityPage] = useState(1);
  const [taskPage, setTaskPage] = useState(1);

  const activityPages = Math.ceil(activitiesData.length / ITEMS_PER_PAGE);
  const taskPages = Math.ceil(tasksData.length / ITEMS_PER_PAGE);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome, Admin</h1>

      {/* ===== STATS ===== */}
      <div className="stats-row">
        {statsData.map((stat, i) => (
          <div key={i} className="stat-card">
            <p>{stat.label}</p>
            <h2>{stat.value}</h2>
            <span>{stat.hint}</span>
          </div>
        ))}
      </div>

      {/* ===== MIDDLE ===== */}
      <div className="middle-row">

        {/* ACTIVITIES */}
        <div className="card large">
          <h3>Recent Activities</h3>

          {paginate(activitiesData, activityPage).map((item, i) => (
            <div key={i} className="item">
              <span>{item.text}</span>
              <span className={`pill ${item.status}`}>
                {item.status === "done" ? "Completed" : "Pending"}
              </span>
            </div>
          ))}

          <Pagination
            current={activityPage}
            total={activityPages}
            onChange={setActivityPage}
          />
        </div>

        {/* TASKS */}
        <div className="card">
          <h3>Upcoming Tasks</h3>

          {paginate(tasksData, taskPage).map((task, i) => (
            <div key={i} className="item">
              <span>{task.text}</span>
              <span className={`pill ${task.priority}`}>
                {task.priority}
              </span>
            </div>
          ))}

          <Pagination
            current={taskPage}
            total={taskPages}
            onChange={setTaskPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
