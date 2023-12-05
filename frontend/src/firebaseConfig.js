// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChW6UTHyvsq_RW7biLrb3UNgbxkJgd4GY",
    authDomain: "myfinanceproject-97376.firebaseapp.com",
    projectId: "myfinanceproject-97376",
    storageBucket: "myfinanceproject-97376.appspot.com",
    messagingSenderId: "24243418078",
    appId: "1:24243418078:web:30f1dd071f989352cda34f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const appStorage = getStorage(app);