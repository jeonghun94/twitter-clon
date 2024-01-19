// jjhcmcni@gmail.com
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbs0RJXlKhEl2nae778_pY-cZjdFuJSTM",
  authDomain: "twitter-clone-704f0.firebaseapp.com",
  projectId: "twitter-clone-704f0",
  storageBucket: "twitter-clone-704f0.appspot.com",
  messagingSenderId: "405649282527",
  appId: "1:405649282527:web:f3e97da12ad200047e606a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
