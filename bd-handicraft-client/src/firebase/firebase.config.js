// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: import.meta.env.VITE_apiKey,
    // authDomain: import.meta.env.VITE_authDomain,
    // projectId: import.meta.env.VITE_projectId,
    // storageBucket: import.meta.env.VITE_storageBucket,
    // messagingSenderId: import.meta.env.VITE_messagingSenderId,
    // appId: import.meta.env.VITE_appId
    apiKey: "AIzaSyADH87TaLM-t60kqtChX8J9ztR1GcWs5AE",
    authDomain: "bd-handicrafts.firebaseapp.com",
    projectId: "bd-handicrafts",
    storageBucket: "bd-handicrafts.appspot.com",
    messagingSenderId: "135218056967",
    appId: "1:135218056967:web:acae03c6645fd9b18fbfa2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);