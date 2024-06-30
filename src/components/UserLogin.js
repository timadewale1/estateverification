import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/login.css"; // Make sure to import the CSS file

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      // Attempt to sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // On successful login, show toast and navigate to user dashboard
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/user-dashboard"); // Replace with your actual dashboard route
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      // Handle login errors
      setError(`Error logging in: ${error.message}`);
      toast.error(`Invalid login details: ${error.message}`);
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <a href="/admin" className="admin-link">
          Admin
        </a>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <a href="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </a>
        <button type="submit" className="submit-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
