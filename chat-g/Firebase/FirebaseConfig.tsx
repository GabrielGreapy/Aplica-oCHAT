import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKjBLmbBheTFZfKfaUyb-6A9ZVcZURznY",
  authDomain: "chat-g-be22c.firebaseapp.com",
  projectId: "chat-g-be22c",
  storageBucket: "chat-g-be22c.firebasestorage.app",
  messagingSenderId: "353627350419",
  appId: "1:353627350419:web:7feceb5bb76f5d63f53466",
  measurementId: "G-R1R4NPSPBL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
