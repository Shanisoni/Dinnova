// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyC4iYmOwTgIGuY_FCGgpP0kBEyW6_dK1Cc",

  authDomain: "dinetime-b5f20.firebaseapp.com",

  projectId: "dinetime-b5f20",

  storageBucket: "dinetime-b5f20.firebasestorage.app",

  messagingSenderId: "217189281051",

  appId: "1:217189281051:web:c40614136185b98cbe77be",

  measurementId: "G-RWKNHTWC45"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);