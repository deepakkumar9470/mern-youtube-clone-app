
import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7NxAwc4XWT5Hu5FJKhWAp_UaS4WM_WBo",
  authDomain: "mern-video-stream-app.firebaseapp.com",
  projectId: "mern-video-stream-app",
  storageBucket: "mern-video-stream-app.appspot.com",
  messagingSenderId: "834214328846",
  appId: "1:834214328846:web:21fbaeab5658c3879b5a5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;