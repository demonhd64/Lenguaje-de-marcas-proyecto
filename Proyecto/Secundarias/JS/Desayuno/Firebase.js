import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import {getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDX7IW42ZKxsQoHsqPAgMtdIEMcyaILbNg",
    authDomain: "lenguaje-de-marcas-d778e.firebaseapp.com",
    projectId: "lenguaje-de-marcas-d778e",
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)