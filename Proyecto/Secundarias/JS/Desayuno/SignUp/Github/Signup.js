import { auth } from "../../Firebase.js";
import {GithubAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { mensajes } from "../../Tostify.js";

const BtnGithubRegister = document.querySelector("#Signup-github");
const modalRegistro = document.querySelector("#registro-modal");

BtnGithubRegister.addEventListener("click", async (e) => {
    e.preventDefault();
    const githubProvider = new GithubAuthProvider()

    try {
        // Inicia sesión con GitHub
        const result = await signInWithPopup(auth, githubProvider);
        if (result.user.displayName === null){
            mensajes(`El email ${result.user.email} se ha registrado con éxito`, "success", result.user.photoURL);
            modalRegistro.style.display = "none";
        }
        else{
            mensajes(`El usuario ${result.user.displayName} se ha registrado con éxito`, "success", result.user.photoURL);
            modalRegistro.style.display = "none";
        }
    } catch (error) {
        if (error.code === "auth/account-exists-with-different-credential") {
            console.error("Error: La cuenta ya existe con un proveedor diferente.");
            mensajes("La cuenta ya existe. Por favor, inicia sesión.", "error");
            modalRegistro.style.display = "none";
        } else if (error.code === "auth/popup-closed-by-user") {
            mensajes("El registro con GitHub fue cancelado", "error");
        } else {
            console.error("Error durante el registro con GitHub:", error);
            mensajes("Error al registrar con GitHub", "error");
        }
    }
});