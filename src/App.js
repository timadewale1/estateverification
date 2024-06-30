// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSignup from "./components/UserSignup";
import UserLogin from "./components/UserLogin";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import ViewProfile from "./components/ViewProfile";
import GenerateAccessCode from "./components/GenerateAccessCode";
import VisitorLodge from "./components/VisitorLog";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import VerifyCode from "./components/VerifyCode";
import CaptureVisitorImage from "./components/CaptureVisitorImage";
import ViewVisitorLog from "./components/ViewVisitorLog";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/generate-access-code" element={<GenerateAccessCode />} />
        <Route path="/visitor-lodge" element={<VisitorLodge />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route
          path="/capture-visitor-image"
          element={<CaptureVisitorImage />}
        />
        <Route path="/view-visitor-log" element={<ViewVisitorLog />} />
      </Routes>
    </Router>
  );
};

export default App;
