import { signOut, deleteUser } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
import { mensajes } from "../Desayuno/Tostify.js"
import { errores } from "../Desayuno/Login/LogIn.js"
import { nombreUsuario } from "../Desayuno/SignUp/Email_Passw/Signup.js"

const LogOut = document.getElementById("LogOut")

LogOut.addEventListener('click', async ()=>{
    let email = errores.Name || nombreUsuario.Name || auth.currentUser.displayName || auth.currentUser.email//Obtener el email cuando se pulse el boton, de modo que ya este guardado
    let fotosUsers = auth.currentUser?.photoURL
    if (!auth.currentUser.email.endsWith("@miapp.com")){
        mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success", fotosUsers);
        errores.ContadorErrores = 0 //Reiniciar el contador de errores al cerrar sesión
        errores.Name = null //Reiniciar el nombre de usuario al cerrar sesión
        nombreUsuario.Name = null //Reiniciar el nombre de usuario al cerrar sesión
        await deleteUser(auth.currentUser) //Eliminar el usuario de la autenticación Ademas esto cierra sesion
    }else{
        mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success", fotosUsers);
        errores.ContadorErrores = 0 //Reiniciar el contador de errores al cerrar sesión
        errores.Name = null //Reiniciar el nombre de usuario al cerrar sesión
        nombreUsuario.Name = null //Reiniciar el nombre de usuario al cerrar sesión
        signOut(auth) //Cerrar sesión de la autenticación
    }
})