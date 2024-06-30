// src/components/UserSignup.js
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    houseNumber: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDetails = {
        ...details,
        email: email,
        userName: `${details.firstName} ${details.lastName}`, // Add userName field
      };
      await setDoc(doc(db, "users", userCredential.user.uid), userDetails);
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Redirect after 3 seconds
    } catch (error) {
      setError(`Error signing up: ${error.message}`);
      toast.error(`Error signing up: ${error.message}`);
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          placeholder="First Name"
          value={details.firstName}
          onChange={(e) =>
            setDetails({ ...details, firstName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={details.lastName}
          onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="House No"
          value={details.houseNumber}
          onChange={(e) =>
            setDetails({ ...details, houseNumber: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Phone No"
          value={details.phoneNumber}
          onChange={(e) =>
            setDetails({ ...details, phoneNumber: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserSignup;
