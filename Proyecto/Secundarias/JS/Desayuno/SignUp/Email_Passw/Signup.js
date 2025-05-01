import { auth } from "../../Firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { mensajes } from "../../Tostify.js";

const BotonRegistro = document.querySelector("#Register");
const ModalRegistro = document.querySelector("#registro-modal");
const Email = document.querySelector("#Registro_email");
const Passw = document.querySelector("#Registro_contraseña");
const CardsNeedLogin = document.querySelectorAll("#need-login");   

BotonRegistro.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = Email.value;
    const password = Passw.value;
    
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        mensajes(`El email ${email} se ha registrado con exito `, "success")
        ModalRegistro.style.display = "none"
        CardsNeedLogin.forEach((card) => {
            card.style.filter = "none";
        });
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            mensajes("El email ya está en uso, prueba a iniciar sesión", "error")
        } else if (error.code === "auth/invalid-email") {
            mensajes("El email no es válido", "error")
        } else if (error.code === "auth/weak-password") {
            mensajes("La contraseña es demasiado débil", "error")
        } else {
            mensajes("Error al registrar el usuario", "error")
        }
        
    }
})

