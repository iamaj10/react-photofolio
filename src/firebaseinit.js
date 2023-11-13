// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV9leeZ8kfxzMyj6qglx2QrFYI6645l34",
  authDomain: "photo-folio-70c94.firebaseapp.com",
  projectId: "photo-folio-70c94",
  storageBucket: "photo-folio-70c94.appspot.com",
  messagingSenderId: "332018789960",
  appId: "1:332018789960:web:de6730a97ca4e78dfab27d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
