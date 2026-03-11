import "./Profile.css";

const JobDetails = ({ data = {}, profileImage }) => {
  if (!Object.keys(data).length) {
    return (
      <div className="erp-card">
        <h3>Job Details</h3>
        <p className="empty-text">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="erp-card erp-jobdetails-wrapper">
      <h3>Job Details</h3>

      <div className="erp-jobdetails-layout">
        {/* LEFT SIDE - DETAILS */}
        <div className="erp-jobdetails-list">
          {Object.entries(data).map(([key, value]) => (
            <div className="erp-job-row" key={key}>
              <span className="job-label">{formatLabel(key)}</span>
              <span className="job-value">
                {value || <em className="muted">—</em>}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - PHOTO */}
        {profileImage && (
          <div className="erp-jobdetails-photo">
            <img src={profileImage} alt="Employee" />
          </div>
        )}
      </div>
    </div>
  );
};

const formatLabel = (text) =>
  text
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

export default JobDetails;
