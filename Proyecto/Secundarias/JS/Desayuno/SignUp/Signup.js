import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, db } from "../Firebase.js";
import { mensajes } from "../Tostify.js";

const SignupForm = document.querySelector("#Registrarse");
var userCredentialsEmailRegister = {
    user: null
};

SignupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    var emailRegistro = SignupForm['Registro email'].value.trim();
    var conRegistro = SignupForm['Registro contraseña'].value;

    // Verificar métodos de inicio de sesión existentes
    const signInMethods = await fetchSignInMethodsForEmail(auth, emailRegistro);
    const ReferenceDocGoogle = doc(db, "usuariosRegistradosConGoogle", emailRegistro);
    const fetchdocGoogle = await getDoc(ReferenceDocGoogle);
    
    // Comprobar si el usuario ya está registrado con email y contraseña
    if (signInMethods.includes('password')) {
        mensajes(`El email ${emailRegistro} ya está registrado con email y contraseña`, "error");
    } 
    // Comprobar si el usuario ya está registrado con Google o GitHub
    else if (fetchdocGoogle.exists()) {
        const userData = fetchdocGoogle.data();
        const fotoUser  = userData.fotoUser ;
        const modalRegistro = document.getElementsByClassName('modal')[1];
        modalRegistro.style.display = "none";

        mensajes(`El email ${emailRegistro} ya está registrado con Google o GitHub`, "error", fotoUser );
    } 
    // Si no hay registros previos, proceder a crear el usuario
    else {
        try {
            const credenciales = await createUserWithEmailAndPassword(auth, emailRegistro, conRegistro);
            const modalRegistro = document.getElementsByClassName('modal')[1];
            modalRegistro.style.display = "none";

            mensajes("Usuario " + credenciales.user.email + " creado correctamente");
            userCredentialsEmailRegister.user = credenciales.user.email;

        } catch (error) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
                mensajes("Correo ya en uso", "error");
            } else if (error.code === 'auth/invalid-email') {
                mensajes("Correo no válido", "error");
            } else if (error.code === "auth/weak-password") {
                mensajes("Contraseña errónea, mínimo 6 caracteres", "error");
            } else {
                alert("Fallo");
            }
        }
    }
});

export { userCredentialsEmailRegister };