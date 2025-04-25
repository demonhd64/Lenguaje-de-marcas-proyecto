import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
import { mensajes } from "../Desayuno/Tostify.js"
import {  userCredentialsEmailLogIn } from "./LogIn.js"
import { userCredentialsEmailRegister } from "./Signup.js"

const LogOut = document.getElementById("LogOut")

LogOut.addEventListener('click', async ()=>{
    const email = userCredentialsEmailLogIn || userCredentialsEmailRegister

    mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success");
    await signOut(auth)

})