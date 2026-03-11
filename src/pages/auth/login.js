import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/authSlice";
import "./login.css";

import loginVideo from "../../assets/login-bg.mp4";
import ccsLogo from "../../assets/ccs-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    let user = null;

    if (email === "admin@hrms.com" && password === "admin@123") {
      user = { id: 1, role: "ADMIN", name: "Admin User", email };
    } else if (email === "hr@hrms.com" && password === "hr@123") {
      user = { id: 2, role: "HR", name: "HR Admin", email };
    } else if (email.endsWith("@employee.com") && password === "emp@123") {
      user = { id: Date.now(), role: "EMPLOYEE", name: "Employee User", email };
    } else {
      alert("Invalid credentials");
      return;
    }

    dispatch(setUser(user));
    localStorage.setItem("token", "dummy-token");

    if (user.role === "ADMIN") navigate("/dashboard", { replace: true });
    else if (user.role === "HR") navigate("/hr/dashboard", { replace: true });
    else navigate("/employee/dashboard", { replace: true });
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

      {/* 🔐 Login Card */}
      <div className="login-card">
        <h2 className="login-title">HRMS</h2>

        <div className="login-row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className="login-actions">
          <span
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {/* SIGN UP */}
        <div className="signup-box">
          Don’t have an account?
          <span
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;