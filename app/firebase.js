// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFAQUp4LTyMAOTfw4JJXImKPS_BwXovyY",
  authDomain: "inventory-management-87e75.firebaseapp.com",
  projectId: "inventory-management-87e75",
  storageBucket: "inventory-management-87e75.appspot.com",
  messagingSenderId: "661063462688",
  appId: "1:661063462688:web:afcdf07256c53ff85b7145",
  measurementId: "G-TGGZT1YCKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}