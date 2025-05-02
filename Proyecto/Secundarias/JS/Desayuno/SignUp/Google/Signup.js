import { auth } from "../../Firebase.js";
import {
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { mensajes } from "../../Tostify.js";

const BtnGoogleRegister = document.querySelector("#Signup-google");
const ModalRegistro = document.querySelector("#registro-modal");

BtnGoogleRegister.addEventListener("click", async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
        const resultado = await signInWithPopup(auth, provider);
        const user = resultado.user;
        const nombre = user.displayName || user.email;
        const photoURL = user.photoURL;

        mensajes(`El usuario ${nombre} se ha registrado con éxito`, "success", photoURL);
        ModalRegistro.style.display = "none";

    } catch (error) {
        console.error("Error:", error);

        if (error.code === "auth/account-exists-with-different-credential") {
            const email = error.customData?.email;

            if (email) {
                const methods = await fetchSignInMethodsForEmail(auth, email);

                if (methods.includes("github.com")) {
                    mensajes("Ya tienes una cuenta con GitHub. Por favor, inicia sesión con GitHub.", "error");
                } else {
                    mensajes("La cuenta ya existe con otro proveedor. Por favor, usa el proveedor original para iniciar sesión.", "error");
                }
            } else {
                mensajes("La cuenta ya existe con otro proveedor.", "error");
            }

            ModalRegistro.style.display = "none";

        } else if (error.code === "auth/popup-closed-by-user") {
            mensajes("El registro con Google fue cancelado", "error");
        } else {
            mensajes("Error al registrar con Google", "error");
        }
    }
});
