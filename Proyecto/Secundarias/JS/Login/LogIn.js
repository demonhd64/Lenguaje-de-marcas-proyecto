import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
import { mensajes } from "../Desayuno/Tostify.js"

const formSignIn = document.getElementById("Sing in")
var userCredentialsEmailLogIn = {
    user : null
}

formSignIn.addEventListener('submit', async (e) => {
    e.preventDefault();

    var emailRegistro = formSignIn['LogIn email'].value
    var conRegistro = formSignIn['LogIn passw'].value

    try {
        const credenciales = await signInWithEmailAndPassword(auth, emailRegistro, conRegistro)
        const modalRegistro = document.getElementsByClassName('modal')[0]


        modalRegistro.style.display = "none"
        
        mensajes("Usuario " + credenciales.user.email + " acceso permitido")

        userCredentialsEmailLogIn.user = credenciales.user.email
        
        console.log(credenciales)
    } catch (error) {
        console.log(error.code)
        if(error.code === 'auth/invalid-credential'){
            mensajes("Contraseña o correo incorrecto", 'error')
        }else{
            mensajes(error.message,'error')
        }
    }
})

export {userCredentialsEmailLogIn}