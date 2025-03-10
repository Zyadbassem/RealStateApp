// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-978c9.firebaseapp.com",
  projectId: "mern-real-estate-978c9",
  storageBucket: "mern-real-estate-978c9.firebasestorage.app",
  messagingSenderId: "365727503627",
  appId: "1:365727503627:web:6ff93a35ae341e2a21fe0e",
  measurementId: "G-B9W7FKBCWE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
