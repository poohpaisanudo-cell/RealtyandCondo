// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEpsk_TkK0iKS3S2X5qlLM9I6ljEJ011s",
  authDomain: "login-84e30.firebaseapp.com",
  projectId: "login-84e30",
  storageBucket: "login-84e30.firebasestorage.app",
  messagingSenderId: "238747875717",
  appId: "1:238747875717:web:a4c0b4e9b21ca9a0baecec",
  measurementId: "G-ZBJLDDQEY8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("ล็อกอินสำเร็จ! ยินดีต้อนรับ " + userCredential.user.email);
    window.location.href = "index.html"; // ไปหน้าเว็บหลัก
  } catch (error) {
    alert("เกิดข้อผิดพลาด: " + error.message);
  }
});
