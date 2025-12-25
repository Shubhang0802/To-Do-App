import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  enableIndexedDbPersistence
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANNhveiZXeh84h88PNjXPma-HyEpRRUhA",
  authDomain: "task-calender-57dad.firebaseapp.com",
  projectId: "task-calender-57dad",
  storageBucket: "task-calender-57dad.firebasestorage.app",
  messagingSenderId: "776111971364",
  appId: "1:776111971364:web:73a83a889a378513660cb1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((e) => {
  console.warn("Persistence error:", e);
});

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged, db };
