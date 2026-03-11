import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/employmentpersonal.css";

import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaGraduationCap,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";

const EmploymentPersonal = () => {
  const navigate = useNavigate();
  const currentStep = 0; // Step 1 of 6

  const steps = [
    { label: "Personal Information", icon: <FaUser /> },
    { label: "Contact Details", icon: <FaEnvelope /> },
    { label: "Employment Details", icon: <FaBuilding /> },
    { label: "Education & Experience", icon: <FaGraduationCap /> },
    { label: "Documents Upload", icon: <FaFileAlt /> },
    { label: "Review & Submit", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="employee-form-wrapper">

      {/* STEP PROGRESS */}
      <div className="step-progress-wrapper">
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <div
              className={`step-circle ${
                index === currentStep ? "active" : ""
              }`}
            >
              {step.icon}
            </div>

            {index !== steps.length - 1 && <div className="step-line" />}

            <span
              className={`step-label ${
                index === currentStep ? "active-label" : ""
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div className="form-header">
        <h2>Personal Information</h2>
        <span>Step 1 of 6</span>
      </div>

      {/* FORM */}
      <div className="form-grid">
        <div className="form-group">
          <label>First Name *</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Last Name *</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input type="date" />
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <select>
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Marital Status</label>
          <select>
            <option>Select</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nationality</label>
          <input type="text" />
        </div>
      </div>

      {/* FOOTER */}
      <div className="form-footer">
        <button className="btn-secondary" disabled>
          Previous
        </button>

        <button
          className="btn-primary"
          onClick={() => navigate("/employment-details")}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default EmploymentPersonal;
