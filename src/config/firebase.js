// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSvBa25BpM5uMtXJ-Pbx0VEzAO1KTi7k8",
  authDomain: "garbagewalla-0730.firebaseapp.com",
  projectId: "garbagewalla-0730",
  storageBucket: "garbagewalla-0730.firebasestorage.app",
  messagingSenderId: "282210767876",
  appId: "1:282210767876:web:ee1f7332e9b41116979151",
  measurementId: "G-J352WVB4WD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
