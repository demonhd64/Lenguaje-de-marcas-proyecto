import { auth } from "../../Firebase.js"
import { GoogleAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { mensajes } from "../../Tostify.js"


const BtnGoogleLogin = document.querySelector("#Login-google");
const ModalLogin = document.querySelector("#login-modal");

BtnGoogleLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try{
        const resultado = await signInWithPopup(auth, provider);
        
        const user = resultado.user;
        const email = user.email;
        const photoURL = user.photoURL;

        ModalLogin.style.display = "none";

        mensajes(`El email ${email} se ha registrado con éxito`, "success", photoURL);

    } catch (error) {
        console.log(error)
    }


})