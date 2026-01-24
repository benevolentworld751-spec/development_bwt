
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
 //"https://firebase.google.com/docs/web/setup#available-libraries"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "benevolent-world.firebaseapp.com",
  projectId: "benevolent-world",
  storageBucket: "benevolent-world.firebasestorage.app",
  messagingSenderId: "295229854021",
  appId: "1:295229854021:web:d5ea1d08a0ec9c5e9b2e2c",
  measurementId: "G-V1W4YDFHYY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
