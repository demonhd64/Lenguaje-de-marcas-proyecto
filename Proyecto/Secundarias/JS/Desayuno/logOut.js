import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
import { mensajes } from "../Desayuno/Tostify.js"

const LogOut = document.getElementById("LogOut")

LogOut.addEventListener('click', async ()=>{
    let email = auth.currentUser?.email || "Desconocido" //Obtener el email cuando se pulse el boton, de modo que ya este guardado
    let fotosUsers = 
    mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success");

    await signOut(auth)
})


//Para saber cual es el provider y asi hacer el linkeo segun el provider:     console.log(auth.currentUser.providerData.map(p => p.providerId))