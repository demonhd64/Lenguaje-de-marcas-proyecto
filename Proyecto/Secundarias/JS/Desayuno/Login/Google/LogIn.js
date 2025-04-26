import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../../Firebase.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js" //funciones para modificar la base de datos de firebase
import { mensajes } from "../../Tostify.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"

const googleLoginBtn = document.querySelector("#Login-google")

var credentialsNameLogIn = {
    user : null
}

googleLoginBtn.addEventListener("click", async () => {

    const provedor = new GoogleAuthProvider();

    provedor.setCustomParameters({
        prompt: "select_account"
    })

  try {
        const credenciales = await signInWithPopup(auth, provedor);
        const usuario = credenciales.user

        const docReference = doc(db, "usuariosRegistrados", usuario.uid)
        const docSnap = await getDoc(docReference)
        const modalLogIn = document.getElementsByClassName('modal')[0]
        

        console.log(usuario)
        if(docSnap.exists()){
            mensajes(`Bienvenido ${usuario.displayName}`)
            modalLogIn.style.display = "none"
            credentialsNameLogIn.user = usuario.displayName
        } else{
            await signOut(auth)
            mensajes(`El usuario ${usuario.email} no está registrado. Regístrate primero.`, "error")
        }
} catch(error){
    console.log(error)
    }
})

export {credentialsNameLogIn}