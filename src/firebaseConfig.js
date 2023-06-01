// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNZnu0OhXj9ngf_RvWAHuZ20Ffnbf2-SM",
  authDomain: "fresh-fruity.firebaseapp.com",
  projectId: "fresh-fruity",
  storageBucket: "fresh-fruity.appspot.com",
  messagingSenderId: "858164168877",
  appId: "1:858164168877:web:f4d2733a4b7c31235f1e24",
  measurementId: "G-YCN1EBBS95",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
