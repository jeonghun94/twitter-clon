// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFSbA3Oblwsr1B_ZxVcUCaq2ZgoBJgbmw",
  authDomain: "twitter-clone-1fccd.firebaseapp.com",
  projectId: "twitter-clone-1fccd",
  storageBucket: "twitter-clone-1fccd.appspot.com",
  messagingSenderId: "298431747378",
  appId: "1:298431747378:web:6b9c455ee0b5f352ba332b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
