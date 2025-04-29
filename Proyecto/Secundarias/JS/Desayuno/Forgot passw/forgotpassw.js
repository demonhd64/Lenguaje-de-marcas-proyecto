import { auth } from "../Firebase.js"
import { mensajes } from "../Tostify.js"
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


const email = document.getElementById("LogIn_email")
const forgotpassword = document.getElementById("Forgotpassw")

forgotpassword.addEventListener("click", function (){
    sendPasswordResetEmail(auth, email.value.trim())
    .then(() => {
        mensajes(`Correo de renovación de contraseña enviado a ${email.value.trim()}`, "success")
    })
    .catch((error) => {
        console.log(error)
    });
})