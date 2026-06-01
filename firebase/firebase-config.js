// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRW5EwPwc4Nqf58uVW6NkvHCBIPpnDB7U",
  authDomain: "beneficios-web.firebaseapp.com",
  projectId: "beneficios-web",
  storageBucket: "beneficios-web.firebasestorage.app",
  messagingSenderId: "884136543026",
  appId: "1:884136543026:web:19e8d8dc0b96df3e984d2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

const ADMIN_EMAILS = [
  'admin@seguas.com',
  'jorge.hoyo@seguas.com',
];

export function isAdminUser(user) {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
}