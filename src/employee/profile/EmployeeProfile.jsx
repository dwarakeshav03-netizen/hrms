import React, { useState } from "react";
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Bhuvanesh Kumar",
    designation: "Software Developer",
    employeeId: "CC1012",
    email: "bhuvanesh@gmail.com",
    phone: "+91 9876543210",
    dob: "12 Aug 2001",
    gender: "Male",
    address: "Salem, Tamil Nadu",
    department: "IT",
    manager: "HR Manager",
    employmentType: "Permanent",
    joiningDate: "10 Jan 2024",
    bank: "HDFC Bank",
    account: "XXXXXX4589",
    ifsc: "HDFC0001234",
    pan: "ABCDE1234F",
    emergencyName: "Ravi Kumar",
    emergencyRelation: "Father",
    emergencyPhone: "+91 9123456789",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully ✅");
  };

  return (
    <div className="profile-wrapper">
      {/* STICKY HEADER */}
      <div className="profile-header-card">
        <div className="profile-left">
          <div className="profile-avatar"></div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.designation}</p>
            <span>Employee ID: {profile.employeeId}</span>
          </div>
        </div>

        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="profile-scroll">
        <div className="profile-grid">
          {/* PERSONAL INFO */}
          <div className="profile-card">
            <h3>Personal Information</h3>
            <div className="info-grid">
              {Object.entries({
                email: "Email",
                phone: "Phone",
                dob: "Date of Birth",
                gender: "Gender",
                address: "Address",
              }).map(([key, label]) => (
                <div key={key}>
                  <label>{label}</label>
                  {isEditing ? (
                    <input
                      name={key}
                      value={profile[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* JOB DETAILS */}
          <div className="profile-card">
            <h3>Job Details</h3>
            <div className="info-grid">
              {Object.entries({
                department: "Department",
                manager: "Reporting Manager",
                employmentType: "Employment Type",
                joiningDate: "Date of Joining",
              }).map(([key, label]) => (
                <div key={key}>
                  <label>{label}</label>
                  {isEditing ? (
                    <input
                      name={key}
                      value={profile[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* BANK DETAILS */}
          <div className="profile-card">
            <h3>Bank Details</h3>
            <div className="info-grid">
              {Object.entries({
                bank: "Bank Name",
                account: "Account Number",
                ifsc: "IFSC Code",
                pan: "PAN Number",
              }).map(([key, label]) => (
                <div key={key}>
                  <label>{label}</label>
                  {isEditing ? (
                    <input
                      name={key}
                      value={profile[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* EMERGENCY */}
          <div className="profile-card">
            <h3>Emergency Contact</h3>
            <div className="info-grid">
              {Object.entries({
                emergencyName: "Name",
                emergencyRelation: "Relationship",
                emergencyPhone: "Contact Number",
              }).map(([key, label]) => (
                <div key={key}>
                  <label>{label}</label>
                  {isEditing ? (
                    <input
                      name={key}
                      value={profile[key]}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{profile[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className="profile-card full-width">
          <h3>Uploaded Documents</h3>
          <ul className="document-list">
            <li>
              PAN Card.pdf
              <button className="download-btn">Download</button>
            </li>
            <li>
              Aadhaar Card.pdf
              <button className="download-btn">Download</button>
            </li>
          </ul>
          <button className="upload-btn">+ Add Document</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
