import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Firebase Config (Make sure this is correct)
const firebaseConfig = {
  apiKey: "AIzaSyDCeQXA916lzdt_9gGGzsnonYAWpllgwYU",
  authDomain: "garbagewalla-hm68.firebaseapp.com",
  projectId: "garbagewalla-hm68",
  storageBucket: "garbagewalla-hm68.appspot.com",  // ✅ Fixed Typo
  messagingSenderId: "391450089109",
  appId: "1:391450089109:web:da224413a55943113dad9c"
};

// Ensure Firebase initializes only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Ensure Auth uses AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };
