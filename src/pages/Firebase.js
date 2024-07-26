// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdAUkZEWkhhWjYoRv65otIbGwxnbMI8iw",
  authDomain: "todolist-97081.firebaseapp.com",
  projectId: "todolist-97081",
  storageBucket: "todolist-97081.appspot.com",
  messagingSenderId: "448309179464",
  appId: "1:448309179464:web:745c71fb6aa4f3d5f8d47d",
  measurementId: "G-61DZ6T8J20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;