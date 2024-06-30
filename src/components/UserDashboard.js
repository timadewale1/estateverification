import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/usedashboard.css"; // Make sure to import the CSS file

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast.success("Successfully logged out!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(`Error logging out: ${error.message}`);
    }
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <div className="navbar">
        <div className="home-icon">
          <Link to="/">
            <i className="fas fa-home"></i>
          </Link>
        </div>
      </div>
      <div className="buttons-container">
        <Link to="/view-profile">
          <button className="dashboard-button">View Profile</button>
        </Link>
        <Link to="/generate-access-code">
          <button className="dashboard-button">Generate Code</button>
        </Link>
        <Link to="/visitor-lodge">
          <button className="dashboard-button">Visitor Log</button>
        </Link>
        <button className="dashboard-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
