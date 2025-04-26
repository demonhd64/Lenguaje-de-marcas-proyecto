import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
import { mensajes } from "../Desayuno/Tostify.js"
import {  userCredentialsEmailLogIn } from "./Login/LogIn.js"
import { userCredentialsEmailRegister } from "./SignUp/Signup.js"
import { credentialsNameLogIn } from "./Login/Google/LogIn.js";
import { credentialsNameRegister } from "./SignUp/Google/Signup.js"


const LogOut = document.getElementById("LogOut")

LogOut.addEventListener('click', async ()=>{
    const email = userCredentialsEmailLogIn.user || userCredentialsEmailRegister.user || credentialsNameRegister.user || credentialsNameLogIn.user

    mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success");
    await signOut(auth)

    userCredentialsEmailLogIn.user = null;

    userCredentialsEmailLogIn.user = null;

    credentialsNameRegister.user = null;

    credentialsNameLogIn.user = null;
})