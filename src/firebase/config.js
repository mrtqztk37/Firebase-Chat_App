// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAt3uhnzfuakpp-n3C8hfQ3xLggRiQ2CFw",
  authDomain: "chat-app-e2372.firebaseapp.com",
  projectId: "chat-app-e2372",
  storageBucket: "chat-app-e2372.appspot.com",
  messagingSenderId: "923423447455",
  appId: "1:923423447455:web:0a0e3968f40d106ecf45aa",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
