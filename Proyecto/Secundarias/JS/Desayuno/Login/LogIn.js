import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../Firebase.js";
import { mensajes } from "../Tostify.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const formSignIn = document.getElementById("Sing in")
var userCredentialsEmailLogIn = {
    user : null
}

formSignIn.addEventListener('submit', async (e) => {
    e.preventDefault();

    
    var emailRegistro = formSignIn['LogIn email'].value
    var conRegistro = formSignIn['LogIn passw'].value

    const ReferenceDocGoogle = doc(db, "usuariosRegistradosConGoogle", emailRegistro)
    const fetchdocGoogle = await getDoc(ReferenceDocGoogle)

    const ReferenceDocGithub = doc(db, "usuariosRegistradosConGithub", emailRegistro)
    const fetchdocGithub = await getDoc(ReferenceDocGithub)
    if(fetchdocGithub.exists() && fetchdocGithub.data().fotoUser.includes("github") && fetchdocGoogle.exists() && fetchdocGoogle.data().fotoUser.includes("google")){
        formSignIn['LogIn email'].value = '';
        formSignIn['LogIn passw'].value = '';
        mensajes(`El email ${emailRegistro} está registrado con Google y Github, por favor use el boton de login de Google o el de Github`, "error", fetchdocGoogle.data().fotoUser)
        
    }else if(fetchdocGoogle.exists() && fetchdocGoogle.data().fotoUser.includes("google")){
        formSignIn['LogIn email'].value = '';
        formSignIn['LogIn passw'].value = '';
        mensajes(`El email ${emailRegistro} está registrado con Google, por favor use el boton de login de Google`, "error", fetchdocGoogle.data().fotoUser)
    }else if(fetchdocGithub.exists() && fetchdocGithub.data().fotoUser.includes("github")){
        formSignIn['LogIn email'].value = '';
        formSignIn['LogIn passw'].value = '';
        mensajes(`El email ${emailRegistro} está registrado con github, por favor use el boton de login de Github`, "error", fetchdocGithub.data().fotoUser)
    }else{
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
            }}
})

export {userCredentialsEmailLogIn}