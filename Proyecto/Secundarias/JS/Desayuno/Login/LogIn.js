import { signInWithEmailAndPassword, fetchSignInMethodsForEmail   } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../Firebase.js";
import { mensajes } from "../Tostify.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const formSignIn = document.getElementById("Sing in")
const ContadorErrores = {
    count: 0
} 
var userCredentialsEmailLogIn = {
    user : null
}

formSignIn.addEventListener('submit', async (e) => {
    e.preventDefault();

    
    var emailRegistro = formSignIn['LogIn_email'].value
    var conRegistro = formSignIn['LogIn passw'].value

    const ReferenceDocGoogle = doc(db, "usuariosRegistradosConGoogle", emailRegistro)
    const fetchdocGoogle = await getDoc(ReferenceDocGoogle)

    const ReferenceDocGithub = doc(db, "usuariosRegistradosConGithub", emailRegistro)
    const fetchdocGithub = await getDoc(ReferenceDocGithub)
    if(fetchdocGithub.exists() && fetchdocGithub.data().fotoUser.includes("github") && fetchdocGoogle.exists() && fetchdocGoogle.data().fotoUser.includes("google")){
        formSignIn['LogIn_email'].value = '';
        formSignIn['LogIn passw'].value = '';
        mensajes(`El email ${emailRegistro} está registrado con Google y Github, por favor use el boton de login de Google o el de Github`, "error", fetchdocGoogle.data().fotoUser)
        
    }else if(fetchdocGoogle.exists() && fetchdocGoogle.data().fotoUser.includes("google")){
        formSignIn['LogIn_email'].value = '';
        formSignIn['LogIn passw'].value = '';
        mensajes(`El email ${emailRegistro} está registrado con Google, por favor use el boton de login de Google`, "error", fetchdocGoogle.data().fotoUser)
    }else if(fetchdocGithub.exists() && fetchdocGithub.data().fotoUser.includes("github")){
        formSignIn['LogIn_email'].value = '';
        formSignIn['LogIn passw'].value = '';
        mensajes(`El email ${emailRegistro} está registrado con github, por favor use el boton de login de Github`, "error", fetchdocGithub.data().fotoUser)
    }else{
        // Verificar si el correo está registrado con el método de email/password
        const signInMethods = await fetchSignInMethodsForEmail(auth, emailRegistro);
        if (signInMethods.length === 0) {
            // Si el correo no está registrado con ningún método de autenticación
            formSignIn['LogIn passw'].value = '';
            mensajes(`El email ${emailRegistro} no está registrado. Por favor, regístrate primero.`, "error");
        } else {
            try {
                // Si el correo está registrado con el método de email/password
                const credenciales = await signInWithEmailAndPassword(auth, emailRegistro, conRegistro);
                const modalRegistro = document.getElementsByClassName('modal')[0];
                const ForgotPasww = document.getElementById("Forgotpassw")                        
                ForgotPasww.style.display = "none"
                modalRegistro.style.display = "none";
                mensajes("Usuario " + credenciales.user.email + " acceso permitido");
                userCredentialsEmailLogIn.user = credenciales.user.email;
                console.log(credenciales);
            } catch (error) {
                if(error.code === "auth/wrong-password"){
                    formSignIn['LogIn passw'].value = '';
                    mensajes("Contraseña incorrecta", "error")
                    ContadorErrores.count++
                    console.log(ContadorErrores)
                    if(ContadorErrores.count >= 3){
                        const ForgotPasww = document.getElementById("Forgotpassw")       
                        ForgotPasww.style.display = "block"                 
                    }
                }else if(error.code === "auth/too-many-requests"){
                    mensajes("Demasiados intentos de inicio de sesión fallidos. Por favor, inténtelo de nuevo más tarde.", "error")                
                }
            }
        }
    }
});



export {userCredentialsEmailLogIn, ContadorErrores}