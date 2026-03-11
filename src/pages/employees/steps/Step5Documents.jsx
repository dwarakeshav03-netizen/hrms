import { useState, forwardRef, useImperativeHandle } from "react";

const Step5Documents = forwardRef(({ data, setData }, ref) => {
  const [errors, setErrors] = useState({});

  // 🔒 expose validation to parent (Next / step click)
  useImperativeHandle(ref, () => ({
    validate() {
      const newErrors = {};

      if (!data.resume) newErrors.resume = "Required";
      if (!data.photo) newErrors.photo = "Required";
      if (!data.idProof) newErrors.idProof = "Required";
      if (!data.addressProof) newErrors.addressProof = "Required";
      if (!data.educationCert) newErrors.educationCert = "Required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
  }));

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setData({
      ...data,
      [name]: files[0],
    });

    setErrors({ ...errors, [name]: "" });
  };

  return (
    <>
      <h2>Documents Upload</h2>
      <p className="subtitle">Step 5 of 6</p>

      <div className="form-grid">
        {/* Resume */}
        <div className="form-group">
          <label>
            Resume / CV <span className="required">*</span>
          </label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className={errors.resume ? "input-error" : ""}
          />
          {errors.resume && (
            <span className="error-text">{errors.resume}</span>
          )}
        </div>

        {/* Passport Photo */}
        <div className="form-group">
          <label>
            Passport Photo <span className="required">*</span>
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className={errors.photo ? "input-error" : ""}
          />
          {errors.photo && (
            <span className="error-text">{errors.photo}</span>
          )}
        </div>

        {/* ID Proof */}
        <div className="form-group">
          <label>
            ID Proof <span className="required">*</span>
          </label>
          <input
            type="file"
            name="idProof"
            onChange={handleFileChange}
            className={errors.idProof ? "input-error" : ""}
          />
          {errors.idProof && (
            <span className="error-text">{errors.idProof}</span>
          )}
        </div>

        {/* Address Proof */}
        <div className="form-group">
          <label>
            Address Proof <span className="required">*</span>
          </label>
          <input
            type="file"
            name="addressProof"
            onChange={handleFileChange}
            className={errors.addressProof ? "input-error" : ""}
          />
          {errors.addressProof && (
            <span className="error-text">{errors.addressProof}</span>
          )}
        </div>

        {/* Education Certificates */}
        <div className="form-group">
          <label>
            Education Certificates <span className="required">*</span>
          </label>
          <input
            type="file"
            name="educationCert"
            onChange={handleFileChange}
            className={errors.educationCert ? "input-error" : ""}
          />
          {errors.educationCert && (
            <span className="error-text">{errors.educationCert}</span>
          )}
        </div>

        {/* Optional */}
        <div className="form-group">
          <label>Experience Certificates</label>
          <input
            type="file"
            name="experienceCert"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
});

export default Step5Documents;
