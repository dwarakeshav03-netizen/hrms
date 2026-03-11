import { useState, forwardRef, useImperativeHandle } from "react";

const Step2Contact = forwardRef(({ data, setData }, ref) => {
  const [errors, setErrors] = useState({});

  // 🔒 expose validation to parent
  useImperativeHandle(ref, () => ({
    validate() {
      const newErrors = {};

      if (!data.email?.trim()) newErrors.email = "Required";
      if (!data.phone?.trim()) newErrors.phone = "Required";
      if (!data.emergencyName?.trim()) newErrors.emergencyName = "Required";
      if (!data.emergencyPhone?.trim())
        newErrors.emergencyPhone = "Required";
      if (!data.currentAddress?.trim())
        newErrors.currentAddress = "Required";
      if (!data.permanentAddress?.trim())
        newErrors.permanentAddress = "Required";

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
      <h2>Contact Details</h2>
      <p className="subtitle">Step 2 of 6</p>

      <div className="form-grid">
        {/* Email */}
        <div className="form-group">
          <label>
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={data.email || ""}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
            placeholder="Enter email address"
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>
            Phone Number <span className="required">*</span>
          </label>
          <input
            name="phone"
            value={data.phone || ""}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <span className="error-text">{errors.phone}</span>
          )}
        </div>

        {/* Alternate Phone (optional) */}
        <div className="form-group">
          <label>Alternate Phone Number</label>
          <input
            name="alternatePhone"
            value={data.alternatePhone || ""}
            onChange={handleChange}
            placeholder="Enter alternate phone number"
          />
        </div>

        {/* Emergency Name */}
        <div className="form-group">
          <label>
            Emergency Contact Name <span className="required">*</span>
          </label>
          <input
            name="emergencyName"
            value={data.emergencyName || ""}
            onChange={handleChange}
            className={errors.emergencyName ? "input-error" : ""}
            placeholder="Enter emergency contact name"
          />
          {errors.emergencyName && (
            <span className="error-text">{errors.emergencyName}</span>
          )}
        </div>

        {/* Emergency Phone */}
        <div className="form-group">
          <label>
            Emergency Contact Phone <span className="required">*</span>
          </label>
          <input
            name="emergencyPhone"
            value={data.emergencyPhone || ""}
            onChange={handleChange}
            className={errors.emergencyPhone ? "input-error" : ""}
            placeholder="Enter emergency contact phone"
          />
          {errors.emergencyPhone && (
            <span className="error-text">{errors.emergencyPhone}</span>
          )}
        </div>

        {/* Current Address */}
        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <label>
            Current Address <span className="required">*</span>
          </label>
          <textarea
            rows="3"
            name="currentAddress"
            value={data.currentAddress || ""}
            onChange={handleChange}
            className={errors.currentAddress ? "input-error" : ""}
            placeholder="Enter current address"
          />
          {errors.currentAddress && (
            <span className="error-text">{errors.currentAddress}</span>
          )}
        </div>

        {/* Permanent Address */}
        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <label>
            Permanent Address <span className="required">*</span>
          </label>
          <textarea
            rows="3"
            name="permanentAddress"
            value={data.permanentAddress || ""}
            onChange={handleChange}
            className={errors.permanentAddress ? "input-error" : ""}
            placeholder="Enter permanent address"
          />
          {errors.permanentAddress && (
            <span className="error-text">{errors.permanentAddress}</span>
          )}
        </div>
      </div>
    </>
  );
});

export default Step2Contact;
