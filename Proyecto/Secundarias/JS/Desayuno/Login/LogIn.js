import { auth } from "../Firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { mensajes } from "../Tostify.js";

const BotonRegistro = document.querySelector("#Sign-up");
const ModalRegistro = document.querySelector("#login-modal");
const Email = document.querySelector("#LogIn_email");
const Passw = document.querySelector("#LogIn_passw");
const CardsNeedLogin = document.querySelectorAll("#need-login");   

BotonRegistro.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = Email.value;
    const password = Passw.value;
    
    try { // Intentar iniciar sesión con el correo y la contraseña
        await signInWithEmailAndPassword(auth, email, password);
        mensajes(`Se inició correctamente sesión con ${email} `, "success")
        CardsNeedLogin.forEach(card => {
            card.style.filter = "none";
        });
        ModalRegistro.style.display = "none";
    } catch (error) { // Si no se puede iniciar sesión, significa que el usuario no existe
    if (error.code === "auth/wrong-password") {
        mensajes("La contraseña es incorrecta", "error")
    }else if(error.code === "auth/user-not-found") {
        mensajes(`El usuario ${email} no está registrado`, "error")
    }}
})

