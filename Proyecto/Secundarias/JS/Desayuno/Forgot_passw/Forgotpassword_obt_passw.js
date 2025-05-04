import { db } from "../Firebase.js";
import { doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../Tostify.js";

const btnAceptar = document.querySelector("#Aceptar");

window.addEventListener("DOMContentLoaded", async function () {
    const Name = localStorage.getItem("email_recuperacion");
    console.log(Name)

    const BaseDeDatos = doc(db, "UsuariosAutenticadosconEmailYPassw", Name);

    // Comprobnar contraseñas y si son diferentes borrar documento de usuario y volverlo a crear
})
