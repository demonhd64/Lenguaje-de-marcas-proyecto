import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import {getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"


// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDX7IW42ZKxsQoHsqPAgMtdIEMcyaILbNg",
    authDomain: "lenguaje-de-marcas-d778e.firebaseapp.com",
    projectId: "lenguaje-de-marcas-d778e",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}
