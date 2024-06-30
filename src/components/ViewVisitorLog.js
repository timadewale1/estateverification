// src/components/ViewVisitorLog.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const ViewVisitorLog = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitorLog = async () => {
      try {
        const q = query(
          collection(db, "visitorLogs"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const visitorData = querySnapshot.docs.map((doc) => doc.data());
        setVisitors(visitorData);
      } catch (error) {
        console.error("Error fetching visitors:", error);
      }
    };

    fetchVisitorLog();
  }, []);

  return (
    <div>
      <h1>Visitor Log</h1>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>House Number</th>
            <th>Visitor Name</th>
            <th>Visitor Image</th>
            <th>Access Code</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => (
            <tr key={index}>
              <td>{visitor.userName}</td>
              <td>{visitor.userHouseNumber}</td>
              <td>{visitor.visitorName}</td>
              <td>
                <img src={visitor.imageUrl} alt="Visitor" width="100" />
              </td>
              <td>{visitor.code}</td>
              <td>
                {new Date(
                  visitor.timestamp.seconds * 1000
                ).toLocaleDateString()}
              </td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewVisitorLog;
