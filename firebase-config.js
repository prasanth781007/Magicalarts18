// ═══════════════════════════════════════════════════
//  firebase-config.js  —  MagicalArts Firebase Setup
//  Single source of truth for all Firebase config.
//  Imported by: index.html, login.html, admin.html,
//               contact.html
// ═══════════════════════════════════════════════════

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBe7jNWvfkNthXnpN6I8UUQwi5Ijfd9lR8",
    authDomain: "magicalarts-18.firebaseapp.com",
    projectId: "magicalarts-18",
    storageBucket: "magicalarts-18.firebasestorage.app",
    messagingSenderId: "168684333077",
    appId: "1:168684333077:web:19582d7010660900d0c61c"
};

// Re-use existing app instance if already initialized (avoids duplicate-app errors)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export { app, firebaseConfig };
