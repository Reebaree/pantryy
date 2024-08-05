// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLNFub7MXak0IGio2f8m2xTMLJfF9SZkw",
  authDomain: "inventory-management-c690f.firebaseapp.com",
  projectId: "inventory-management-c690f",
  storageBucket: "inventory-management-c690f.appspot.com",
  messagingSenderId: "1038304577015",
  appId: "1:1038304577015:web:1c2309f4132003423b9af2",
  measurementId: "G-DY4PK165P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};