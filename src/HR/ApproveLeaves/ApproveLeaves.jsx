import { useState } from "react";
import "../AddEmployee/hrForms.css";

const initialLeaves = [
  {
    id: 1,
    name: "John Doe",
    from: "Jan 18",
    to: "Jan 20",
    days: 3,
    reason: "Family function",
    status: "PENDING",
  },
  {
    id: 2,
    name: "Priya Sharma",
    from: "Jan 22",
    to: "Jan 22",
    days: 1,
    reason: "Medical appointment",
    status: "PENDING",
  },
];

const ApproveLeaves = ({ onClose }) => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [denyModal, setDenyModal] = useState(false);
  const [denyReason, setDenyReason] = useState("");
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);

  const handleApprove = (id) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "APPROVED" } : leave
      )
    );
  };

  const openDenyModal = (id) => {
    setSelectedLeaveId(id);
    setDenyModal(true);
  };

  const confirmDeny = () => {
    if (denyReason.trim().length < 10) return;

    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === selectedLeaveId
          ? { ...leave, status: "DENIED" }
          : leave
      )
    );

    setDenyModal(false);
    setDenyReason("");
    setSelectedLeaveId(null);
  };

  return (
    <>
      <h2 className="form-title">Approve Leaves</h2>

      <ul className="list">
        {leaves.map((leave) => (
          <li key={leave.id} className="leave-item">
            <div>
              <strong>{leave.name}</strong>
              <p>Date: {leave.from} – {leave.to}</p>
              <p>Total Days: {leave.days}</p>
              <p>Reason: {leave.reason}</p>

              {leave.status !== "PENDING" && (
                <span
                  className={
                    leave.status === "APPROVED"
                      ? "status approved"
                      : "status denied"
                  }
                >
                  {leave.status}
                </span>
              )}
            </div>

            {leave.status === "PENDING" && (
              <div className="leave-actions">
                <button
                  className="btn-primary"
                  onClick={() => handleApprove(leave.id)}
                >
                  Approve
                </button>

                <button
                  className="btn-danger"
                  onClick={() => openDenyModal(leave.id)}
                >
                  Deny
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* ===== DENY MODAL ===== */}
      {denyModal && (
        <div
          className="modal-overlay"
          onClick={() => setDenyModal(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="danger-text">Deny Leave</h3>

            <textarea
              placeholder="Enter reason for denial (min 10 characters)"
              value={denyReason}
              onChange={(e) => setDenyReason(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setDenyModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-danger"
                disabled={denyReason.trim().length < 10}
                onClick={confirmDeny}
              >
                Confirm Deny
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="form-footer">
        <button className="btn-outline" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default ApproveLeaves;
