import { createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db} from "../Firebase.js";
import { mensajes } from "../Tostify.js"

const SignupForm = document.querySelector("#Registrarse")
var userCredentialsEmailRegister = {
    user : null
}


SignupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var emailRegistro = SignupForm['Registro email'].value.trim()
    var conRegistro = SignupForm['Registro contraseña'].value

    const ReferenceDocGoogle = doc(db, "usuariosRegistradosConGoogle", emailRegistro)
    const fetchdocGoogle = await getDoc(ReferenceDocGoogle)

    if(fetchdocGoogle.exists()){
        const userData = fetchdocGoogle.data();
        const fotoUser = userData.fotoUser;
        const modalRegistro = document.getElementsByClassName('modal')[1]
        modalRegistro.style.display = "none"

        mensajes(`El email ${emailRegistro} ya está registrado con google o github`,"error", fotoUser)
    }else{
        try {
            const credenciales = await createUserWithEmailAndPassword(auth, emailRegistro, conRegistro)
            const modalRegistro = document.getElementsByClassName('modal')[1]


            modalRegistro.style.display = "none"

            mensajes("Usuario " + credenciales.user.email + " creado correctamente")

            userCredentialsEmailRegister.user = credenciales.user.email

        } catch (error) {
            console.log(error)
            if (error.code === "auth/email-already-in-use"){
                mensajes("Correo ya en uso", "error")
            } else if (error.code === 'auth/invalid-email'){
                mensajes("Correo no valido", "error")
            } else if (error.code === "auth/weak-password"){
                mensajes("contraseña erronea, minimo 6 caracteres", "error")
            }else if(error.code){
                alert("Fallo")
            }
        }}


})

export {userCredentialsEmailRegister}