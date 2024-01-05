// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnc4JIXWeyTf-HXap4FedIrmadM5-isn8",
  authDomain: "consulting-24bb2.firebaseapp.com",
  projectId: "consulting-24bb2",
  storageBucket: "consulting-24bb2.appspot.com",
  messagingSenderId: "486986156242",
  appId: "1:486986156242:web:3ef783263e9d1b1b8e450b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();