import React, { useState, useRef } from "react";

import "./onboarding.css";

import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaGraduationCap,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";

import Step1Personal from "./steps/Step1Personal";
import Step2Contact from "./steps/Step2Contact";
import Step3Employment from "./steps/Step3Employment";
import Step4Education from "./steps/Step4Education";
import Step5Documents from "./steps/Step5Documents";
import Step6Review from "./steps/Step6Review";

const steps = [
  { label: "Personal Information", icon: <FaUser /> },
  { label: "Contact Details", icon: <FaEnvelope /> },
  { label: "Employment Details", icon: <FaBuilding /> },
  { label: "Education & Experience", icon: <FaGraduationCap /> },
  { label: "Documents Upload", icon: <FaFileAlt /> },
  { label: "Review & Submit", icon: <FaCheckCircle /> },
];

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);


  // 🔐 SINGLE SOURCE OF TRUTH
  const [formData, setFormData] = useState({
    personal: {},
    contact: {},
    employment: {},
    education: {},
    documents: {},
  });

  const stepRef1 = useRef();
const stepRef2 = useRef();
const stepRef3 = useRef();
const stepRef4 = useRef();
const stepRef5 = useRef();
const stepRef6 = useRef();

const stepRefs = [
  stepRef1,
  stepRef2,
  stepRef3,
  stepRef4,
  stepRef5,
  stepRef6,
];



  const next = () => {
    const ref = stepRefs[currentStep];
    if (ref?.current?.validate && !ref.current.validate()) return;
    setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleStepClick = (target) => {
    for (let i = 0; i < target; i++) {
      const ref = stepRefs[i];
      if (ref?.current?.validate && !ref.current.validate()) {
        setCurrentStep(i);
        return;
      }
    }
    setCurrentStep(target);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Personal
            ref={stepRefs[0]}
            data={formData.personal}
            setData={(d) => setFormData({ ...formData, personal: d })}
          />
        );
      case 1:
        return (
          <Step2Contact
            ref={stepRefs[1]}
            data={formData.contact}
            setData={(d) => setFormData({ ...formData, contact: d })}
          />
        );
      case 2:
        return (
          <Step3Employment
            ref={stepRefs[2]}
            data={formData.employment}
            setData={(d) => setFormData({ ...formData, employment: d })}
          />
        );
      case 3:
        return (
          <Step4Education
            ref={stepRefs[3]}
            data={formData.education}
            setData={(d) => setFormData({ ...formData, education: d })}
          />
        );
      case 4:
        return (
          <Step5Documents
            ref={stepRefs[4]}
            data={formData.documents}
            setData={(d) => setFormData({ ...formData, documents: d })}
          />
        );
      case 5:
        return <Step6Review data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <h2>Employee Onboarding</h2>
        <p>Add a new employee to the organization</p>
      </div>

      {/* STEPPER */}
      <div className="stepper-container">
        {steps.map((step, i) => (
          <div className="step-wrapper" key={i}>
            <div className="step-item clickable" onClick={() => handleStepClick(i)}>
              <div className={`step-circle ${i <= currentStep ? "active" : ""}`}>
                {step.icon}
              </div>
              <span className={`step-label ${i <= currentStep ? "active" : ""}`}>
                {step.label}
              </span>
            </div>
            {i !== steps.length - 1 && (
              <div className={`step-line ${i < currentStep ? "active" : ""}`} />
            )}
          </div>
        ))}
      </div>

      {/* CARD */}
      <div className="onboarding-card">
        {renderStep()}

        <div className="form-actions">
          {currentStep > 0 && (
            <button className="btn-outline" onClick={prev}>
              Previous
            </button>
          )}

          {currentStep < 5 && (
  <button className="btn-primary" onClick={next}>
    Next
  </button>
)}

        </div>
      </div>

     
    </div>
  );
};

export default OnboardingForm;
