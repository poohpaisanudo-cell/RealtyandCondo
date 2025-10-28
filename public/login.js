// login.js
// -------------------- Firebase Config --------------------
var firebaseConfig = {
  apiKey: "AIzaSyCEpsk_TkK0iKS3S2X5qlLM9I6ljEJ011s",
  authDomain: "login-84e30.firebaseapp.com",
  projectId: "login-84e30",
  storageBucket: "login-84e30.firebasestorage.app",
  messagingSenderId: "238747875717",
  appId: "1:238747875717:web:a4c0b4e9b21ca9a0baecec",
  measurementId: "G-ZBJLDDQEY8"
};

if (typeof firebase !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// -------------------- DOM Elements --------------------
const loginModal = document.getElementById("loginModal");
const openLoginBtn = document.getElementById("btn-open-login");
const closeLoginBtn = document.getElementById("btn-close-login");
const authArea = document.getElementById("auth-area");

// -------------------- Modal Toggle --------------------
openLoginBtn.addEventListener("click", () => loginModal.classList.add("active"));
closeLoginBtn.addEventListener("click", () => loginModal.classList.remove("active"));
window.addEventListener("click", (e) => {
  if (e.target === loginModal) loginModal.classList.remove("active");
});

// -------------------- Firebase Auth Providers --------------------
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const lineProvider = new firebase.auth.OAuthProvider("oidc.line");

// -------------------- Login Handlers --------------------
document.getElementById("googleLogin").addEventListener("click", () => {
  firebase.auth().signInWithPopup(googleProvider)
    .then((result) => handleLoginSuccess(result.user))
    .catch((error) => alert(error.message));
});

document.getElementById("facebookLogin").addEventListener("click", () => {
  firebase.auth().signInWithPopup(facebookProvider)
    .then((result) => handleLoginSuccess(result.user))
    .catch((error) => alert(error.message));
});

document.getElementById("lineLogin").addEventListener("click", () => {
  firebase.auth().signInWithPopup(lineProvider)
    .then((result) => handleLoginSuccess(result.user))
    .catch((error) => alert(error.message));
});

// -------------------- Success Handler --------------------
function handleLoginSuccess(user) {
  loginModal.classList.remove("active");
  authArea.innerHTML = `
    <div class="user-badge">
      <img src="${user.photoURL || 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png'}" alt="user" class="user-avatar" />
      <span>${user.displayName || user.email}</span>
      <button id="logoutBtn" class="logout">Logout</button>
    </div>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    firebase.auth().signOut().then(() => location.reload());
  });
}

// -------------------- Stay Logged In --------------------
firebase.auth().onAuthStateChanged((user) => {
  if (user) handleLoginSuccess(user);
});
