import React from "react";
import Sidebar from "../common/sidebar/mainsidebar";
import Header from "../common/Header/header";
import Footer from "../footer/footer";
import "../../assets/styles/layout/layout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="layout-right">
        <Header />

        <div className="layout-content">
          {children}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
