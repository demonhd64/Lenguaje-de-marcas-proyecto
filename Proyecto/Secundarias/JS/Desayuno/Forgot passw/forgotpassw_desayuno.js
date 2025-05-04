import { auth, db } from "../Firebase.js"
import { collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../Tostify.js"


const email = document.getElementById("OlvidarPassw_email")
const forgotpassword = document.getElementById("Forgotpassw")
const modalOlvidarPassw = document.querySelector("#OlvidarPassw-modal")
const modalLogin = document.querySelector("#login-modal")
const AceptarBtn = document.querySelector("#btnAceptarOlvidarPassw")

forgotpassword.addEventListener("click", function (e){
    e.preventDefault();
    window.open("../html/Forgotpassw.html", "_blank")
    /* modalLogin.style.display = "none"
    modalOlvidarPassw.style.display = "flex"
    AceptarBtn.addEventListener("click", function (){
        const emailValue = email.value
        if (emailValue === "") {
            mensajes("Por favor, ingresa tu correo electrónico.", "error")
            return
        }
        sendPasswordResetEmail(auth, emailValue)
            .then(() => {
                mensajes("Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.","success", )
                modalOlvidarPassw.style.display = "none"
                modalLogin.style.display = "flex"
            })
            .catch((error) => {
                mensajes("error", error.message)
            })
    }) */

})