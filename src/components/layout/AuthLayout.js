import { Outlet } from "react-router-dom";
import "../../pages/auth/login.css";

import loginVideo from "../../assets/login-bg.mp4";
import ccsLogo from "../../assets/ccs-logo.png";

const AuthLayout = () => {
  return (
    <div className="login-page">
      {/* 🎥 Video Background (LOADED ONCE) */}
      <video className="login-video" autoPlay loop muted playsInline>
        <source src={loginVideo} type="video/mp4" />
      </video>

      {/* 🔵 Overlay */}
      <div className="video-overlay"></div>

      {/* 🏷️ Logo */}
      <div className="login-brand">
        <img src={ccsLogo} alt="Crestclimber Software Solutions" />
      </div>

      {/* 🔁 Dynamic Card Content */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
