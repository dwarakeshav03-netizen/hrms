import { useState, forwardRef, useImperativeHandle } from "react";

const Step1Personal = forwardRef(({ data, setData }, ref) => {
  const [errors, setErrors] = useState({});

  // 🔹 expose validation to parent (Next / step click)
  useImperativeHandle(ref, () => ({
    validate() {
      const newErrors = {};

      if (!data.firstName?.trim()) newErrors.firstName = "Required";
      if (!data.lastName?.trim()) newErrors.lastName = "Required";
      if (!data.dob) newErrors.dob = "Required";
      if (!data.gender) newErrors.gender = "Required";
      if (!data.bloodGroup) newErrors.bloodGroup = "Required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    setErrors({ ...errors, [name]: "" });
  };

  return (
    <>
      <h2>Personal Information</h2>
      <p className="subtitle">Step 1 of 6</p>

      <div className="form-grid">
        {/* First Name */}
        <div className="form-group">
          <label>
            First Name <span className="required">*</span>
          </label>
          <input
            name="firstName"
            value={data.firstName || ""}
            onChange={handleChange}
            className={errors.firstName ? "input-error" : ""}
            placeholder="Enter first name"
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^A-Za-z ]/g, ""))
            }
          />
          {errors.firstName && (
            <span className="error-text">{errors.firstName}</span>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>
            Last Name <span className="required">*</span>
          </label>
          <input
            name="lastName"
            value={data.lastName || ""}
            onChange={handleChange}
            className={errors.lastName ? "input-error" : ""}
            placeholder="Enter last name"
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^A-Za-z ]/g, ""))
            }
          />
          {errors.lastName && (
            <span className="error-text">{errors.lastName}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>
            Date of Birth <span className="required">*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={data.dob || ""}
            onChange={handleChange}
            className={errors.dob ? "input-error" : ""}
          />
          {errors.dob && (
            <span className="error-text">{errors.dob}</span>
          )}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>
            Gender <span className="required">*</span>
          </label>
          <select
            name="gender"
            value={data.gender || ""}
            onChange={handleChange}
            className={errors.gender ? "input-error" : ""}
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && (
            <span className="error-text">{errors.gender}</span>
          )}
        </div>

        {/* Marital Status (optional) */}
        <div className="form-group">
          <label>Marital Status</label>
          <select
            name="maritalStatus"
            value={data.maritalStatus || ""}
            onChange={handleChange}
          >
            <option value="">Select marital status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="form-group">
          <label>
            Blood Group <span className="required">*</span>
          </label>

          <select
            name="bloodGroup"
            value={data.bloodGroup || ""}
            onChange={handleChange}
            className={errors.bloodGroup ? "input-error" : ""}
          >
            <option value="">Select blood group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          {errors.bloodGroup && (
            <span className="error-text">{errors.bloodGroup}</span>
          )}
        </div>
      </div>
    </>
  );
});

export default Step1Personal;
