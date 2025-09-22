import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCc5kN-4XbegafftA_HcCXfNmQLZsrqI14",
  authDomain: "n423-f594c.firebaseapp.com",
  projectId: "n423-f594c",
  messagingSenderId: "675344333046",
  appId: "1:675344333046:web:226c9ef0a3160f0aff54d7",
  measurementId: "G-WRE0DZFX6K"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);