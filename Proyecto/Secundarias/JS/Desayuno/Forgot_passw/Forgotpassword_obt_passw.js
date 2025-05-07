import { db } from "../Firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../Tostify.js";

const btnAceptar = document.querySelector("#Aceptar");
const textoFinal = document.querySelector("#CambioRealizado");
const formulario = document.querySelector("#Formulario");
const NombreUsuaro = document.querySelector("#NomUsuario")
function ValidacionDeContraseña(password) {
    const errores = [];

    if (password.length < 6) {
        errores.push("La contraseña debe tener al menos 6 caracteres.");
    }
    if (!/[A-Z]/.test(password)) {
        errores.push("La contraseña debe contener al menos 1 letra mayúscula.");
    }
    if (!/[0-9]/.test(password)) {
        errores.push("La contraseña debe contener al menos 1 número.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>[\]\\\/]/.test(password)) {
        errores.push("La contraseña debe contener al menos 1 carácter especial.");
    }

    return errores;
}

window.addEventListener("DOMContentLoaded", async function (e) {
    e.preventDefault();
    const name = localStorage.getItem("email_recuperacion");
    NombreUsuaro.textContent = name
    const baseDeDatos = doc(db, "UsuariosAutenticadosconEmailYPassw", name);
    const infoBaseDeDatos = await getDoc(baseDeDatos);
    const dataUser = infoBaseDeDatos.data();
    const passwordAntigua = dataUser.Password;

    btnAceptar.addEventListener("click", async function (e) {
        e.preventDefault();
        const passwordNueva = document.querySelector("#password").value;
        const erroresPassword = ValidacionDeContraseña(passwordNueva);

        if (passwordNueva === passwordAntigua) {
            mensajes("La contraseña nueva no puede ser igual a la anterior.", "error");
        } else {
            if (erroresPassword.length === 0) {
                await updateDoc(baseDeDatos, {
                    Password: passwordNueva
                });
                formulario.style.display = "none";
                textoFinal.style.display = "flex";
                mensajes("Cambio de contraseña realizado.", "success");
                setTimeout(() => {
                    window.close();
                }, 5200);
            } else {
                erroresPassword.forEach(error => {
                    mensajes(error, "error");
                });
            }
        }
    });
    let ConstraseñaVisibleRegistro = false; // Variable para controlar la visibilidad

    function eyeRegistro() {
        const eyeOpen = document.getElementById("eye-OpenRegistro");
        const eyeClosed = document.getElementById("eye-closedRegistro");
        const passwInput = document.getElementById("password");
    
        // Alternar la visibilidad de la contraseña
        ConstraseñaVisibleRegistro = !ConstraseñaVisibleRegistro;
    
        if (ConstraseñaVisibleRegistro) {
            passwInput.type = "text"; 
            eyeClosed.style.display = "none"; 
            eyeOpen.style.display = "inline"; 
        } else {
            passwInput.type = "password"; 
            eyeClosed.style.display = "inline";
            eyeOpen.style.display = "none";
        }
    }
    
    // Asignar el evento a los íconos
    document.getElementById("eye-OpenRegistro").addEventListener('click', eyeRegistro);
    document.getElementById("eye-closedRegistro").addEventListener('click', eyeRegistro);
    
});
