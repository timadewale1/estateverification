// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQm9tyadaQBgnzuuAUv21DRIdvg4BE8iI",
  authDomain: "estateapp1.firebaseapp.com",
  projectId: "estateapp1",
  storageBucket: "estateapp1.appspot.com",
  messagingSenderId: "591459348535",
  appId: "1:591459348535:web:80f60e6cbc97f3f6aa0fb2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
