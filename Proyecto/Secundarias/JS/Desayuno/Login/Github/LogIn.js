import { GithubAuthProvider, signInWithPopup, deleteUser } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../../Firebase.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js" //funciones para modificar la base de datos de firebase
import { mensajes } from "../../Tostify.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"

const GithubLoginBtn = document.querySelector("#Login-github")

var credentialsNameLogInGithub = {
    user : null,
    email : null,
    credenciales : null
}

var fotoUserLoginGithub = {
    foto : null
}

GithubLoginBtn.addEventListener("click", async () => {

    const provedor = new GithubAuthProvider();

    provedor.setCustomParameters({
        prompt: "select_account"
    })

  try {
        const credenciales = await signInWithPopup(auth, provedor);
        const usuario = credenciales.user
        const usuarioCorto = usuario.email.split('@')[0]
        fotoUserLoginGithub.foto = usuario.photoURL

        const docReference = doc(db, "usuariosRegistradosConGithub", usuario.email)
        const docSnap = await getDoc(docReference)
        const modalLogIn = document.getElementsByClassName('modal')[0]

        if(docSnap.exists()){
            const UsuariValido = usuario.displayName || usuarioCorto
            if(usuario.displayName === null){
            mensajes(`Bienvenido ${UsuariValido}`, "success", fotoUserLoginGithub.foto)
            modalLogIn.style.display = "none"
            credentialsNameLogInGithub.user = usuario.displayName
            credentialsNameLogInGithub.email = usuarioCorto
            credentialsNameLogInGithub.credenciales = usuario
            }else{}
        } else{
            await deleteUser(usuario)
            await signOut(auth)
            mensajes(`El usuario ${usuarioCorto} no está registrado. Regístrate primero.`, "error", fotoUserLoginGithub.foto)
        }
} catch(error){
    console.log(error)
    }
})

export {credentialsNameLogInGithub, fotoUserLoginGithub}