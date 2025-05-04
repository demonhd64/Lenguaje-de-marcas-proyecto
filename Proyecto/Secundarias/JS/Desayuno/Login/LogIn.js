import { auth } from "../Firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { mensajes } from "../Tostify.js";

const BotonRegistro = document.querySelector("#Sign-up");
const ModalRegistro = document.querySelector("#login-modal");
const Email = document.querySelector("#LogIn_email");
const Passw = document.querySelector("#LogIn_passw");
const CardsNeedLogin = document.querySelectorAll("#need-login");
const OlivdarCon = document.querySelector("#Forgotpassw");

const errores = {
    ContadorErrores: 0,
}
BotonRegistro.addEventListener("click", async (e) => {
    e.preventDefault();
    const Name = Email.value; // Obtener el nombre de usuario ingresado
    const password = Passw.value;


    if (!Name.includes("@")) {
        // Crear un correo electrónico temporal con el nombre de usuario
        const email = `${Name}@miapp.com`;

        try {
            // Intentar iniciar sesión con el correo temporal y la contraseña
            await signInWithEmailAndPassword(auth, email, password);
            mensajes(`Se inició sesión correctamente con ${Name}`, "success");
            CardsNeedLogin.forEach(card => {
                card.style.filter = "none";
            });
            ModalRegistro.style.display = "none";
            errores.Name = Name;
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                mensajes("La contraseña es incorrecta", "error");
                errores.ContadorErrores++;
                if (errores.ContadorErrores >=3){
                    OlivdarCon.style.display = "flex";
                }
            } else if (error.code === "auth/user-not-found") {
                mensajes(`El usuario ${Name} no está registrado`, "error");
            }else if(error.code === "auth/missing-password") {
                mensajes("La contraseña no puede estar vacía", "error");
            }else {
                console.log(error)
                mensajes(`Demasiados intentos de inicio de sesión ${Name}`, "error");
                errores.ContadorErrores++;
                if (errores.ContadorErrores >=1){
                    OlivdarCon.style.display = "flex";
                }
            }
        }
    } else {
        mensajes("El usuario no debe contener el carácter '@'", "error");
    }
});


export { errores }