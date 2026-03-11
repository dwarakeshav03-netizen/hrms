import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";

import loginVideo from "../../assets/login-bg.mp4";
import ccsLogo from "../../assets/ccs-logo.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const savePassword = () => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert(`Password updated for ${state?.email}`);
    navigate("/", { replace: true });
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
        <h2 className="login-title">Reset Password</h2>

        <div className="login-row">
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-row">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={savePassword}>
          Save Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
