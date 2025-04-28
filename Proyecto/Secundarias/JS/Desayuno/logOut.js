import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
import { mensajes } from "../Desayuno/Tostify.js"
import {  userCredentialsEmailLogIn, ContadorErrores } from "./Login/LogIn.js"
import { userCredentialsEmailRegister } from "./SignUp/Signup.js"
import { credentialsNameLogInGoogle, fotoUserLoginGOogle} from "./Login/Google/LogIn.js";
import {credentialsNameLogInGithub, fotoUserLoginGithub} from "./Login/Github/LogIn.js"
import { credentialsNameRegisterGoogle, fotoUserSignUpGOogle } from "./SignUp/Google/Signup.js"
import {credentialsNameRegisterGithub, fotoUserSignUpGithub} from "./SignUp/Github/Signup.js"


const LogOut = document.getElementById("LogOut")
const Ojos = document.getElementsByClassName("Visibilidad")

LogOut.addEventListener('click', async ()=>{
    const email = userCredentialsEmailLogIn.user || userCredentialsEmailRegister.user || credentialsNameRegisterGoogle.user || credentialsNameLogInGoogle.user ||credentialsNameRegisterGithub.user || credentialsNameRegisterGithub.email || credentialsNameLogInGithub.user || credentialsNameLogInGithub.email
    const credenciales = credentialsNameRegisterGoogle.credenciales || credentialsNameLogInGoogle.credenciales ||credentialsNameRegisterGithub.credenciales || credentialsNameLogInGithub.credenciales
    const fotosUsers = fotoUserSignUpGOogle.foto || fotoUserLoginGOogle.foto || fotoUserSignUpGithub.foto ||  fotoUserLoginGithub.foto
    ContadorErrores.count = 0
    for (let i = 0; i < ojos.length; i++) {
        ojos[i].style.top = "43.8%"
    }
    mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success", fotosUsers);
    if(credenciales){
        deleteUser(credenciales)
    }
    await signOut(auth)
})