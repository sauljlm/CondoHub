// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYNQznpqLEiJMU817c0sfURxgUF7CY6go",
  authDomain: "condoplus-6ad1a.firebaseapp.com",
  projectId: "condoplus-6ad1a",
  storageBucket: "condoplus-6ad1a.appspot.com",
  messagingSenderId: "609986614077",
  appId: "1:609986614077:web:be2d40a05e8b40c4112b54",
  measurementId: "G-Y9H2TQJPDQ",
};

// Initialize Firebase Yeah !
const app = initializeApp(firebaseConfig);
export const firebase = app;
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const myAuth = getAuth(app);
export const myGoogleAuthProvider = new GoogleAuthProvider();
export const myFacebookAuthProvider = new FacebookAuthProvider();
export const myEmailAuthProvider = new FacebookAuthProvider();
