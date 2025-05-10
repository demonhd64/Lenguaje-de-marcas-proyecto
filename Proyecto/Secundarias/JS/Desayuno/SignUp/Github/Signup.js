import { auth, db } from "../../Firebase.js";
import {GithubAuthProvider, signInWithPopup, signOut} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../../Tostify.js";

const BtnGoogleRegister = document.querySelector("#Signup-github");
const ModalRegistro = document.querySelector("#registro-modal");

BtnGoogleRegister.addEventListener("click", async (e) => {
    e.preventDefault();
    const provider = new GithubAuthProvider();

    try {
        
        const resultado = await signInWithPopup(auth, provider);
        const user = resultado.user;
        const nombre = user.displayName || user.email;
        const photoURL = user.photoURL;

        const docRef = doc(collection(db, "UsuariosAutenticadosConGithub"), user.email);
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()){
            await setDoc(docRef, {
                DisplayName : user.displayName,
                Email : user.email,
                PhotoURL : user.photoURL
            })
            mensajes(`El usuario ${nombre} se ha registrado con éxito`, "success", photoURL);
            ModalRegistro.style.display = "none";
        } else{
            mensajes(`El usuario ${nombre} ya está registrado`, "error", photoURL);
            await signOut(auth) // Para que si da error de que ya este registrado no inicie sesión
            ModalRegistro.style.display = "none";
        }
    } catch (error) {
            console.log("Error:", error);
            ModalRegistro.style.display = "none";
            } if (error.code === "auth/popup-closed-by-user") {
                mensajes("El registro con Github fue cancelado", "error");
            } else {
                mensajes("Error al registrar con Github", "error");
        }
    });