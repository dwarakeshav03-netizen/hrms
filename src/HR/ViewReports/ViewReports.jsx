import "../AddEmployee/hrForms.css";

const ViewReports = ({ onClose }) => {
  return (
    <>
      <h2 className="form-title">HR Reports</h2>
      <p className="form-subtitle">
        Reports will be available once sufficient data is generated
      </p>

      <div className="info-box">
        <p><b>📊 Attendance Reports</b></p>
        <p className="danger-text">No data available yet</p>
      </div>

      <div className="info-box">
        <p><b>📄 Payroll Reports</b></p>
        <p className="danger-text">Payroll not processed yet</p>
      </div>

      <div className="info-box">
        <p><b>👥 Workforce Reports</b></p>
        <p className="danger-text">Employee analytics will appear here</p>
      </div>

      <div className="info-box">
        <p><b>📢 Hiring Reports</b></p>
        <p className="danger-text">No job data available</p>
      </div>

      <div className="form-footer">
        <button className="btn-outline" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default ViewReports;
