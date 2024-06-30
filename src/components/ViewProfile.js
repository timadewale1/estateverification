import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../css/profile.css"; // Ensure this path matches your project structure

const ViewProfile = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const profileDoc = await getProfileData(user.uid);
          setProfile(profileDoc.data());
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, []);

  const getProfileData = async (userId) => {
    const docRef = doc(db, "users", userId);
    return await getDoc(docRef);
  };

  return (
    <div className="profile-container">
      <form>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={profile.firstName || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={profile.lastName || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseNo">House No</label>
          <input
            type="text"
            id="houseNo"
            value={profile.houseNumber || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone No</label>
          <input
            type="text"
            id="phoneNo"
            value={profile.phoneNumber || ""}
            readOnly
          />
        </div>
        <button type="button" onClick={() => navigate("/user-dashboard")}>
          Go Back
        </button>
      </form>
    </div>
  );
};

export default ViewProfile;
