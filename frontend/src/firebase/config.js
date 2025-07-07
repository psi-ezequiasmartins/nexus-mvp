/**
 * frontend/src/firebase/config.js
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBr6sYJghPB-m7TMW9i6jCpLkxyApXCggQ",
  authDomain: "psi-nexus-app.firebaseapp.com",
  projectId: "psi-nexus-app",
  storageBucket: "psi-nexus-app.firebasestorage.app",
  messagingSenderId: "373332128072",
  appId: "1:373332128072:web:b9777bf7fe2ad4ff8a837d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
