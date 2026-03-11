import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginVideo from "../../assets/login-bg.mp4";
import ccsLogo from "../../assets/ccs-logo.png";
import "./login.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const sendOtp = () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    if (
      email === "admin@hrms.com" ||
      email === "hr@hrms.com" ||
      email.endsWith("@employee.com")
    ) {
      alert(`OTP sent to ${email} (Use 123456)`);
      setStep(2);
    } else {
      alert("Email not registered");
    }
  };

  const verifyOtp = () => {
    if (otp === "123456") {
      navigate("/reset-password", { state: { email } });
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-page">
      {/* 🎥 Video Background */}
      <video className="login-video" autoPlay loop muted playsInline>
        <source src={loginVideo} type="video/mp4" />
      </video>

      {/* 🔵 Overlay */}
      <div className="video-overlay"></div>

      {/* 🏷️ Logo */}
      <div className="login-brand">
        <img src={ccsLogo} alt="Crestclimber Software Solutions" />
      </div>

      {/* 🔐 Card */}
      <div className="login-card">
        <h2 className="login-title">Forgot Password</h2>

        {step === 1 && (
          <>
            <div className="login-row">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="login-btn" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="login-row">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button className="login-btn" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
