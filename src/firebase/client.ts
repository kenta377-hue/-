// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8ya0mysWrxC7I2HPWalPqKiu8B0USlj8",
  authDomain: "rollercoaster-e85aa.firebaseapp.com",
  projectId: "rollercoaster-e85aa",
  storageBucket: "rollercoaster-e85aa.firebasestorage.app",
  messagingSenderId: "1020854822544",
  appId: "1:1020854822544:web:27e14bbfcd341e2f661a15",
  databaseURL: "https://rollercoaster-e85aa-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

  const auth = getAuth(app);
  const database = getDatabase(app);

  export { auth, database };