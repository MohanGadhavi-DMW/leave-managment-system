// Firebase core
import { initializeApp } from "firebase/app";

// Firebase auth
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN1bJejPYnqCqGthsEnF1rY-agdLDjsDU",
  authDomain: "testproject-42b54.firebaseapp.com",
  projectId: "testproject-42b54",
  storageBucket: "testproject-42b54.firebasestorage.app",
  messagingSenderId: "713965771706",
  appId: "1:713965771706:web:93443ad8972afcf8539b83",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔥 Export these (VERY IMPORTANT)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
