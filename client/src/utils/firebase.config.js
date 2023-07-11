// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU0xyC2CTZ688RViugObKtUXyBeelMhGY",
  authDomain: "otpa-c4d48.firebaseapp.com",
  projectId: "otpa-c4d48",
  storageBucket: "otpa-c4d48.appspot.com",
  messagingSenderId: "1035250992459",
  appId: "1:1035250992459:web:77f368a770368665c554ce",
  measurementId: "G-BNZ13E9ZWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);