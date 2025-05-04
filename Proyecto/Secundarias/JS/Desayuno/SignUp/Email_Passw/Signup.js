import { auth, db } from "../../Firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../../Tostify.js";

const BotonRegistro = document.querySelector("#Register");
const ModalRegistro = document.querySelector("#registro-modal");
const Email = document.querySelector("#Registro_email");
const Passw = document.querySelector("#Registro_contraseña");
const CardsNeedLogin = document.querySelectorAll("#need-login");   

BotonRegistro.addEventListener("click", async (e) => {
    e.preventDefault();

    const Name = Email.value.trim(); 
    const password = Passw.value;
    
    if (!Name.includes("@")) {
        const NombreConEmail = Name.concat("@miapp.com");
        const userRef = doc(collection(db, "UsuariosAutenticadosconEmailYPassw"), Name);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            mensajes(`El usuario ${Name} ya está registrado, prueba a hacer login`, "error");
            ModalRegistro.style.display = "none";
            return;
        }

        try {
            // Crea el usuario en Firebase Auth
            await createUserWithEmailAndPassword(auth, NombreConEmail, password);

            // Guarda en Firestore
            await setDoc(userRef, {
                Password: password
            });

            mensajes(`El usuario ${Name} se ha registrado con éxito`, "success");

            // UI updates
            ModalRegistro.style.display = "none";
            CardsNeedLogin.forEach((card) => card.style.filter = "none");

        } catch (error) {
            console.error(error);

            // Si falla Auth, no intentes guardar en Firestore
            if (error.code === "auth/invalid-email") {
                mensajes("El correo electrónico no es válido", "error");
            } else if (error.code === "auth/weak-password") {
                mensajes("La contraseña debe tener al menos 6 caracteres", "error");
            }
        }

    } else {
        mensajes(`El usuario no puede contener el símbolo "@"`, "error");
    }
});

