import { auth } from "../../Firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { mensajes } from "../../Tostify.js";

const BotonRegistro = document.querySelector("#Register");
const ModalRegistro = document.querySelector("#registro-modal");
const Email = document.querySelector("#Registro_email");
const Passw = document.querySelector("#Registro_contraseña");
const CardsNeedLogin = document.querySelectorAll("#need-login");   

const nombreUsuario = {
    Name: null
}

BotonRegistro.addEventListener("click", async (e) => {
    e.preventDefault();
    const Name = Email.value; 
    const password = Passw.value;

    if (!Name.includes("@")) {
        const email = `${Name}@miapp.com`; 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            mensajes(`El usuario ${Name} se ha registrado con éxito`, "success");
            ModalRegistro.style.display = "none";
            CardsNeedLogin.forEach((card) => {
                card.style.filter = "none";
            });
            nombreUsuario.Name = Name;
        } catch (error) {
            console.log(error.code);
            if (error.code === "auth/weak-password") {
                mensajes("La contraseña es demasiado débil", "error");
            } else {
                mensajes(`Error al registrar el usuario ${Name}`, "error");
            }
        }
    } else {
        mensajes("El usuario no puede tener el carácter '@'", "error");
    }
});


export { nombreUsuario };