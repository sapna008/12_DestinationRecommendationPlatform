import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9pNI13K6gDRhYCsRs1uT50jRoJCxB0ac",
  authDomain: "react-app-bad19.firebaseapp.com",
  databaseURL: "https://react-app-bad19-default-rtdb.firebaseio.com",
  projectId: "react-app-bad19",
  storageBucket: "react-app-bad19.firebasestorage.app",
  messagingSenderId: "604428367621",
  appId: "1:604428367621:web:e97c6877cff5d4d801a96c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;