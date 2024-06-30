import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../css/viewlog.css";

const ViewVisitorLog = () => {
  const navigate = useNavigate();
  const [visitors, setVisitors] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const q = query(
            collection(db, `users/${currentUser.uid}/visitorLogs`),
            orderBy("timestamp", "desc")
          );
          const querySnapshot = await getDocs(q);
          const visitorData = querySnapshot.docs.map((doc) => doc.data());
          setVisitors(visitorData);
        } catch (error) {
          if (error.code === "failed-precondition") {
            setError(
              "The query requires an index. Please create the required index in the Firebase Console."
            );
          } else {
            setError(`Error fetching visitors: ${error.message}`);
          }
          console.error("Error fetching visitors:", error);
        }
      } else {
        setError("No user is currently logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="visitor-log-page">
      <h1>Visitor Log</h1>
      {error && <p>{error}</p>}
      <div className="visitor-log-container">
        <table>
          <thead>
            <tr>
              <th>House No</th>
              <th>Visitor</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index}>
                <td>{visitor.houseNumber}</td>
                <td>{visitor.visitorName}</td>
                <td>{visitor.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => navigate("/user-dashboard")}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewVisitorLog;
