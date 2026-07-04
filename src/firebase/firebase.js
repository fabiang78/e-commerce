import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1R0oB6gszGRe3LsBw00c43gQ8p46n76s",
  authDomain: "talento-tech-react-5983c.firebaseapp.com",
  projectId: "talento-tech-react-5983c",
  storageBucket: "talento-tech-react-5983c.firebasestorage.app",
  messagingSenderId: "179114627069",
  appId: "1:179114627069:web:4d4220c67939579975d394"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);