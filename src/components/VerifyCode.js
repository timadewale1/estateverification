import React, { useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const db = getFirestore();
  const navigate = useNavigate();

  const handleVerifyCode = async () => {
    try {
      const q = query(collection(db, "accessCodes"), where("code", "==", code));
      const codeQuerySnapshot = await getDocs(q);

      if (!codeQuerySnapshot.empty) {
        const codeDoc = codeQuerySnapshot.docs[0].data();

        // Fetch user details using the userId stored in the access code document
        const userRef = doc(db, "users", codeDoc.userId);
        const userSnapshot = await getDoc(userRef);
        const userDetails = userSnapshot.data();

        setMessage("Access code has been verified successfully");

        // Show toast notification for successful verification
        toast.success("Access code verified successfully");

        // Delay before redirecting to capture image
        setTimeout(() => {
          // Redirect to the capture visitor image page with the verified code and additional details
          navigate("/capture-visitor-image", {
            state: {
              verifiedCode: code,
              userDetails: {
                name: userDetails.name,
                houseNumber: userDetails.houseNumber,
              },
              visitorName: codeDoc.visitorName,
            },
          });
        }, 2000); // 2000 milliseconds = 2 seconds delay
      } else {
        setMessage("Invalid access code");

        // Show toast notification for invalid access code
        toast.error("Invalid access code");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setMessage("Error verifying access code");

      // Show toast notification for error while verifying access code
      toast.error("Error verifying access code");
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1>Verify Code</h1>
      <input
        type="text"
        placeholder="Access Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button onClick={handleVerifyCode}>Verify</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyCode;
