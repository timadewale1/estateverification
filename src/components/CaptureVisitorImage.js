import React, { useRef, useState } from "react";
import { storage, db, auth } from "../services/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CaptureVisitorImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef();
  // const navigate = useNavigate();
  const location = useLocation();
  const { verifiedCode, userDetails, visitorName } = location.state || {}; // Get details from location state

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCapturedImage(file);
      setImageUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!capturedImage) return;

    const storageRef = ref(storage, `visitorImages/${capturedImage.name}`);
    await uploadBytes(storageRef, capturedImage);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);

    // Save imageUrl and other details to Firestore
    const user = auth.currentUser;
    if (user && verifiedCode) {
      await addDoc(collection(db, "visitorLogs"), {
        imageUrl: url,
        code: verifiedCode,
        userId: user.uid,
        userName: userDetails.userName,
        userHouseNumber: userDetails.houseNumber,
        visitorName: visitorName,
        timestamp: new Date(),
      });
      // Show toast notification for successful upload
      toast.success("Image uploaded successfully");
      // No redirection here as per your request
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setImageUrl("");
    fileInputRef.current.value = null;
  };

  return (
    <div>
      <ToastContainer />
      <h1>Capture Visitor Image</h1>
      {!imageUrl ? (
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleCapture}
          capture="environment"
        />
      ) : (
        <div>
          <img src={imageUrl} alt="Visitor" />
          <button onClick={handleUpload}>Upload</button>
          <button onClick={handleRetake}>Retake</button>
        </div>
      )}
    </div>
  );
};

export default CaptureVisitorImage;
