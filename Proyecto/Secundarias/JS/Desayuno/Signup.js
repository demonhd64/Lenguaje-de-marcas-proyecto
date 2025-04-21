import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
import {} from "../Desayuno/Firebase.js"
import { mensajes } from "../Desayuno/Tostify.js"

const SignupForm = document.querySelector("#Registrarse")

SignupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var emailRegistro = SignupForm['Registro email'].value
    var conRegistro = SignupForm['Registro contraseña'].value


    try {
        const credenciales = await createUserWithEmailAndPassword(auth, emailRegistro, conRegistro)
        const modalRegistro = document.getElementsByClassName('modal')[1]


        modalRegistro.style.display = "none"

        mensajes("Usuario " + credenciales.user.email + " creado correctamente")

    } catch (error) {
        console.log(error.code)
        if (error.code === "auth/email-already-in-use"){
            mensajes("Correo ya en uso", "error")
        } else if (error.code === 'auth/invalid-email'){
            mensajes("Correo no valido", "error")
        } else if (error.code === "auth/weak-password"){
            mensajes("contraseña erronea, minimo 6 caracteres", "error")
        }else if(error.code){
            alert("Fallo")
        }
    }


})