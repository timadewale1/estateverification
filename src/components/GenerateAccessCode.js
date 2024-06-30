import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebaseConfig";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/accesscode.css";

const GenerateAccessCode = () => {
  const [visitorName, setVisitorName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          console.error("No such document!");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGenerateCode = async () => {
    const code = Math.random().toString(36).substr(2, 8);
    setAccessCode(code);

    if (user && userDetails) {
      try {
        await addDoc(collection(db, "accessCodes"), {
          userId: user.uid,
          userName: userDetails.userName, // Ensure userName is accessed correctly
          houseNumber: userDetails.houseNumber,
          visitorName,
          code,
          timestamp: new Date(),
        });

        await addDoc(collection(db, `users/${user.uid}/visitorLogs`), {
          userId: user.uid,
          userName: userDetails.userName, // Ensure userName is accessed correctly
          houseNumber: userDetails.houseNumber,
          visitorName,
          code,
          timestamp: new Date(),
        });

        toast.success("Access code generated successfully!");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error(`Error generating access code: ${error.message}`);
      }
    } else {
      toast.error("User details not found. Please try again.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessCode);
    toast.success("Access code copied to clipboard!");
  };

  return (
    <div className="generate-code-page">
      <ToastContainer />
      <form className="generate-code-container">
        <div className="form-group">
          <label htmlFor="visitorName">Visitor’s Name</label>
          <input
            type="text"
            id="visitorName"
            placeholder="Visitor’s Name"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleGenerateCode}>
          Generate Code
        </button>
        {accessCode && (
          <div className="access-code-container">
            <input type="text" value={accessCode} readOnly />
            <button type="button" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
        )}
        <button type="button" onClick={() => navigate("/user-dashboard")}>
          Go Back
        </button>
      </form>
    </div>
  );
};

export default GenerateAccessCode;
