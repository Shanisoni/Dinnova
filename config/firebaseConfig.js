// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQtLXPJDa2slRUu3hpLGZG85wb2gIFT0k",
  authDomain: "dine-time-77851.firebaseapp.com",
  projectId: "dine-time-77851",
  storageBucket: "dine-time-77851.firebasestorage.app",
  messagingSenderId: "926275017091",
  appId: "1:926275017091:web:4a45ae1383eb11d9477eb6",
  measurementId: "G-XV2JVBPDC3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);