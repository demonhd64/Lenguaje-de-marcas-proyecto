import { auth, db } from "../../Firebase.js"
import { GoogleAuthProvider, signInWithPopup, signOut, deleteUser  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { collection ,doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../../Tostify.js"


const BtnGoogleLogin = document.querySelector("#Login-google");
const ModalLogin = document.querySelector("#login-modal");

BtnGoogleLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try{
        const resultado = await signInWithPopup(auth, provider);
        const user = resultado.user;
        const displayName = user.displayName;
        const photoURL = user.photoURL;

        const docGoogleauthorized = await getDoc(doc(collection(db, "UsuariosAutenticadosConGoogle"), user.email));
        if (docGoogleauthorized.exists()) { // Si el email está registrado con google   
            ModalLogin.style.display = "none";

            mensajes(`Se ha iniciado sesión con el usuario ${displayName}`, "success", photoURL);
        } else{
            mensajes(`El correo ${user.email} no está registrado, por favor registrelo con google`, "error", photoURL);
            ModalLogin.style.display = "none";
            deleteUser(user) //Para eliminar al usuario y evitar errores de autenticaciones erroneas
        }

    } catch (error) {
        if(error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request"){
                mensajes(`Se ha cancelado la operación de inicio de sesión`, "error");
        }
        console.log(error)
    }


})