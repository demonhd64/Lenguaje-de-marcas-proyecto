import { deleteUser } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
import { mensajes } from "../Desayuno/Tostify.js"
import { errores } from "../Desayuno/Login/LogIn.js"

const LogOut = document.getElementById("LogOut")
const forgotpassw = document.querySelector("#Forgotpassw")

LogOut.addEventListener('click', async ()=>{
    let email = auth.currentUser.displayName || auth.currentUser.email.split("@")[0] || auth.currentUser.email//Obtener el email cuando se pulse el boton, de modo que ya este guardado
    let fotosUsers = auth.currentUser?.photoURL
    mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success", fotosUsers);
    errores.ContadorErrores = 0 //Reiniciar el contador de errores al cerrar sesión
    forgotpassw.style.display = "none" //Ocultar el botón de restablecimiento de contraseña al cerrar sesión
    await deleteUser(auth.currentUser) //Eliminar el usuario de la autenticación Ademas esto cierra sesion
})