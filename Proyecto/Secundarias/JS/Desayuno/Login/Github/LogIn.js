import { auth } from "../../Firebase.js";
import {GithubAuthProvider, signInWithPopup, fetchSignInMethodsForEmail} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { mensajes } from "../../Tostify.js";

const BtnGithubLogin = document.querySelector("#Login-github");
const modalLogin = document.querySelector("#login-modal");

BtnGithubLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    const githubProvider = new GithubAuthProvider()

    try {
        // Inicia sesión con GitHub
        const result = await signInWithPopup(auth, githubProvider);
        if (result.user.displayName === null){
            mensajes(`El email ${result.user.email} se ha registrado con éxito`, "success", result.user.photoURL);
            modalLogin.style.display = "none";
        }
        else{
            mensajes(`El usuario ${result.user.displayName} se ha registrado con éxito`, "success", result.user.photoURL);
            modalLogin.style.display = "none";
        }
    } catch (error) {
        console.log(error.code);

        if (error.code === "auth/account-exists-with-different-credential") {
            const email = error.customData?.email;

            if (email) {
                try {
                    const methods = await fetchSignInMethodsForEmail(auth, email);

                    let proveedor = "otro proveedor";
                    if (methods.includes("google.com")) proveedor = "Google";
                    else if (methods.includes("password")) proveedor = "correo y contraseña";
                    else if (methods.includes("facebook.com")) proveedor = "Facebook";

                    mensajes(`Este email ya está registrado con ${proveedor}. Por favor, inicia sesión con ese proveedor.`, "error");
                } catch (error) {}
            }

        } else if (error.code === "auth/popup-closed-by-user") {
            mensajes("El inicio de sesión con GitHub fue cancelado", "error");
        } else {
            console.error("Error durante el inicio de sesión con GitHub:", error);
            mensajes("Error al iniciar sesión con GitHub", "error");
        }
    }
});