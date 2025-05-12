// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPS1nIVnhcPlnLZxwMmu3NHcaM73z4NyQ",
  authDomain: "qzly-36138.firebaseapp.com",
  projectId: "qzly-36138",
  storageBucket: "qzly-36138.firebasestorage.app",
  messagingSenderId: "760517676150",
  appId: "1:760517676150:web:5b84f6946cfa8024d7e357",
  measurementId: "G-W2Y3ZDDGB5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
