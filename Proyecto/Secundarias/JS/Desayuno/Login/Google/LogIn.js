import { GoogleAuthProvider, signInWithPopup, deleteUser } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../../Firebase.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js" //funciones para modificar la base de datos de firebase
import { mensajes } from "../../Tostify.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"

const googleLoginBtn = document.querySelector("#Login-google")

var credentialsNameLogIn = {
    user : null
}

var fotoUserLoginGOogle = {
    foto : null
}

googleLoginBtn.addEventListener("click", async () => {

    const provedor = new GoogleAuthProvider();

    provedor.setCustomParameters({
        prompt: "select_account"
    })

  try {
        const credenciales = await signInWithPopup(auth, provedor);
        const usuario = credenciales.user
        const usuarioCorto = usuario.email.split('@')[0]
        fotoUserLoginGOogle.foto = usuario.photoURL


        const docReference = doc(db, "usuariosRegistrados", usuario.uid)
        const docSnap = await getDoc(docReference)
        const modalLogIn = document.getElementsByClassName('modal')[0]

        if(docSnap.exists()){
            mensajes(`Bienvenido ${usuario.displayName}`, "success", fotoUserLoginGOogle.foto)
            modalLogIn.style.display = "none"
            credentialsNameLogIn.user = usuario.displayName
        } else{
            await deleteUser(usuario)
            await signOut(auth)
            mensajes(`El usuario ${usuarioCorto} no está registrado. Regístrate primero.`, "error", fotoUserLoginGOogle.foto)
        }
} catch(error){
    console.log(error)
    }
})

export {credentialsNameLogIn, fotoUserLoginGOogle}