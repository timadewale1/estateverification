// src/components/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/verify-code">
        <button>Verify Code</button>
      </Link>
      <Link to="/view-visitor-log">
        <button>View Visitor Log</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;
