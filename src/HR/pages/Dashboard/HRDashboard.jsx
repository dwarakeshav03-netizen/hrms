import { useState, useMemo } from "react";
import StatCard from "../../components/StateCard";
import "../../pages/Dashboard/hrDashboard.css";

import AddEmployee from "../../AddEmployee/AddEmployee";
import ApproveLeaves from "../../ApproveLeaves/ApproveLeaves";
import RunPayroll from "../../RunPayroll/RunPayroll";
import PostJob from "../../PostJob/PostJob";
import InitiateExit from "../../InitiateExit/InitiateExit";
import ViewReports from "../../ViewReports/ViewReports";

const HRDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);

  /* ===============================
     SOURCE OF TRUTH (Mock → API)
  =============================== */

  const [employees, setEmployees] = useState([
    { id: 1, name: "John", status: "ACTIVE", joinedMonth: "Jan", presentToday: true },
    { id: 2, name: "Priya", status: "ACTIVE", joinedMonth: "Jan", presentToday: false },
    { id: 3, name: "Rahul", status: "ACTIVE", joinedMonth: "Jan", presentToday: true },
  ]);

  const [leaves] = useState([
    { id: 1, empId: 2, status: "PENDING" },
    { id: 2, empId: 5, status: "APPROVED" },
  ]);

  const [jobs] = useState([
    { id: 1, title: "Frontend Dev", status: "OPEN" },
    { id: 2, title: "QA Engineer", status: "OPEN" },
  ]);

  const [projects] = useState([
    { id: 1, name: "HRMS Revamp", assigned: false },
    { id: 2, name: "Payroll Automation", assigned: true },
  ]);

  /* ===============================
     KPI CALCULATIONS (DYNAMIC)
  =============================== */

  const totalEmployees = employees.length;

  const newJoinees = useMemo(
    () => employees.filter(e => e.joinedMonth === "Jan").length,
    [employees]
  );

  const presentToday = employees.filter(e => e.presentToday).length;
  const onLeaveToday = totalEmployees - presentToday;

  const pendingLeaves = leaves.filter(l => l.status === "PENDING").length;

  const openPositions = jobs.filter(j => j.status === "OPEN").length;

  const pendingProjects = projects.filter(p => !p.assigned).length;

  return (
    <div className="hr-dashboard-container">
      <h1 className="page-title">HR Dashboard</h1>

      {/* KPI SECTION */}
      <div className="stats">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          subtitle="Active workforce"
        />

        <StatCard
          title="New Joinees"
          value={newJoinees}
          subtitle="Joined this month"
        />

        <StatCard
          title="Attendance Today"
          value={`${presentToday} / ${totalEmployees}`}
          subtitle={`${onLeaveToday} on leave`}
        />

        <StatCard
          title="Leaves Pending"
          value={pendingLeaves}
          subtitle="Approval required"
          status="warning"
        />

        <StatCard
          title="Open Positions"
          value={openPositions}
          subtitle="Hiring active"
        />

        <StatCard
          title="Project Assignments"
          value={pendingProjects}
          subtitle="Pending assignment"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <button className="qa-btn" onClick={() => setActiveModal("addEmployee")}>➕ Add Employee</button>
        <button className="qa-btn" onClick={() => setActiveModal("approveLeaves")}>🌴 Approve Leaves</button>
        <button className="qa-btn" onClick={() => setActiveModal("runPayroll")}>📄 Run Payroll</button>
        <button className="qa-btn" onClick={() => setActiveModal("postJob")}>📢 Post Job</button>
        <button className="qa-btn" onClick={() => setActiveModal("viewReports")}>📊 View Reports</button>
        <button className="qa-btn danger" onClick={() => setActiveModal("initiateExit")}>🚪 Initiate Exit</button>
      </div>

      {/* MODAL SYSTEM */}
      {activeModal && (
        <>
          <div className="dashboard-overlay" onClick={() => setActiveModal(null)} />

          <div className="dashboard-modal">
            <div className="modal-header">
              <h3>
                {activeModal === "addEmployee" && "Add New Employee"}
                {activeModal === "approveLeaves" && "Approve Leaves"}
                {activeModal === "runPayroll" && "Run Payroll"}
                {activeModal === "postJob" && "Post Job"}
                {activeModal === "viewReports" && "View Reports"}
                {activeModal === "initiateExit" && "Initiate Exit"}
              </h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
            </div>

            <div className="modal-body">
              {activeModal === "addEmployee" && (
                <AddEmployee
                  onClose={() => setActiveModal(null)}
                  onAdd={emp => setEmployees(prev => [...prev, emp])}
                />
              )}

              {activeModal === "approveLeaves" && <ApproveLeaves onClose={() => setActiveModal(null)} />}
              {activeModal === "runPayroll" && <RunPayroll onClose={() => setActiveModal(null)} />}
              {activeModal === "postJob" && <PostJob onClose={() => setActiveModal(null)} />}
              {activeModal === "viewReports" && <ViewReports onClose={() => setActiveModal(null)} />}
              {activeModal === "initiateExit" && <InitiateExit onClose={() => setActiveModal(null)} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HRDashboard;
