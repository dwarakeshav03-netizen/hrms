import { useState } from "react";
import StatusBadge from "../../components/StatusBadge";
import "../../../HR/pages/LeaveManagement/leave.css";
import "../../../HR/pages/Onboarding/onboarding.css";
import "../EmployeeManagement/employee.css";
import "../../AddEmployee/hrForms.css";
import "../TaskManagement/task.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Laptop Return",
      description: "Collect laptop and accessories",
      assignedTo: "John Doe",
      empId: "EMP001",
      department: "Engineering",
      category: "Exit",
      priority: "High",
      dueDate: "25 Jan 2026",
      status: "Pending",
    },
    {
      id: 2,
      title: "Policy Acknowledgment",
      description: "Sign updated HR policy",
      assignedTo: "Meena S",
      empId: "EMP003",
      department: "Finance",
      category: "Compliance",
      priority: "Medium",
      dueDate: "20 Jan 2026",
      status: "Completed",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);

  const total = tasks.length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const overdue = tasks.filter(t => t.status === "Overdue").length;

  const updateStatus = (status) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === selectedTask.id ? { ...t, status } : t
      )
    );
    setSelectedTask(null);
  };

  return (
    <div className="onboarding-page">
      <h1>Task Management</h1>

      {/* STATS */}
      <div className="onboarding-stats">
        <div className="card"><p>Total Tasks</p><h2>{total}</h2></div>
        <div className="card"><p>Pending</p><h2>{pending}</h2></div>
        <div className="card"><p>Completed</p><h2>{completed}</h2></div>
        <div className="card"><p>Overdue</p><h2>{overdue}</h2></div>
      </div>

      {/* =============================
          TASK FILTER BAR (SAME STYLE)
      ============================= */}
      <div className="leave-filter-bar">
        <div className="filter-item">
          <label>Select Date</label>
          <input type="date" />
        </div>

        <input
          type="text"
          className="filter-search"
          placeholder="Search Employee Name..."
        />

        <select className="filter-select">
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Finance</option>
          <option>HR</option>
        </select>

        <select className="filter-select">
          <option>All Status</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Overdue</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="card table-card">
        <h2>All Tasks</h2>

        <table className="onboarding-table">
          <thead>
            <tr>
              <th>TASK</th>
              <th>EMPLOYEE</th>
              <th>CATEGORY</th>
              <th>PRIORITY</th>
              <th>DUE DATE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>
                  <strong>{task.title}</strong>
                  <span className="muted-text">{task.description}</span>
                </td>

                <td>
                  {task.assignedTo}
                  <span className="muted-text">{task.empId}</span>
                </td>

                <td>{task.category}</td>
                <td>{task.priority}</td>
                <td>{task.dueDate}</td>

                <td>
                  <StatusBadge status={task.status} />
                </td>

                <td>
                  <div className="action-cell">
                    <button
                      className="btn-primary"
                      onClick={() => setSelectedTask(task)}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedTask && (
        <>
          <div
            className="dashboard-overlay"
            onClick={() => setSelectedTask(null)}
          />

          <div className="dashboard-modal">
            <div className="modal-header">
              <h3>Task Details</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedTask(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p><strong>Task:</strong> {selectedTask.title}</p>
              <p><strong>Description:</strong> {selectedTask.description}</p>
              <p><strong>Assigned To:</strong> {selectedTask.assignedTo}</p>
              <p><strong>Department:</strong> {selectedTask.department}</p>
              <p><strong>Category:</strong> {selectedTask.category}</p>
              <p><strong>Priority:</strong> {selectedTask.priority}</p>
              <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>

              <div className="form-footer">
                <button
                  className="btn-primary"
                  onClick={() => updateStatus("In Progress")}
                >
                  Mark In Progress
                </button>

                <button
                  className="btn-primary"
                  onClick={() => updateStatus("Completed")}
                >
                  Mark Completed
                </button>

                <button
                  className="btn-danger"
                  onClick={() => updateStatus("Overdue")}
                >
                  Mark Overdue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManagement;
