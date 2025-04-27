import { GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../../Firebase.js"
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js" //funciones para modificar la base de datos de firebase
import { mensajes } from "../../Tostify.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"

const Githubboton = document.querySelector("#Signup-github")
var credentialsNameRegisterGithub = {
    user : null,
    email : null,
    credenciales: null,
    UID: null
}

var fotoUserSignUpGithub = {
    foto : null
}

Githubboton.addEventListener('click', async () => {

    const provedor = new GithubAuthProvider();

    provedor.setCustomParameters({
        prompt: "select_account"
    })

    try {
        const credenciales = await signInWithPopup(auth, provedor);
        const usuario = credenciales.user
        const usuarioCorto = usuario.email.split('@')[0]
        fotoUserSignUpGithub.foto = usuario.photoURL


        const docReference = doc(db, "usuariosRegistradosConGithub", usuario.email)
        const docSnap = await getDoc(docReference)
        

        if(docSnap.exists()){
            await signOut(auth)
            mensajes(`El email ${usuarioCorto} ya está registrado`,"error", fotoUserSignUpGithub.foto)
            console.log(usuario)
        } else{
            await setDoc(doc(db, "usuariosRegistradosConGithub", usuario.email), {
                email: usuario.email,
                displayName: usuario.displayName,
                UID: usuario.uid,
                fotoUser: usuario.photoURL
            })
    
            const modalRegistro = document.getElementsByClassName('modal')[1]
            let UsuariValido = null
            modalRegistro.style.display = "none";
    
            if(usuario.displayName === null){
                UsuariValido = usuarioCorto
                credentialsNameRegisterGithub.email = usuarioCorto
                credentialsNameRegisterGithub.credenciales = usuario
                credentialsNameRegisterGithub.UID = usuario.uid
            } else{
                UsuariValido = usuario.displayName
                credentialsNameRegisterGithub.user = usuario.displayName
                credentialsNameRegisterGithub.UID = usuario.uid
            }

            mensajes(`Usuario ${UsuariValido} permitido`, "success", fotoUserSignUpGithub.foto)
        }
    } catch (error) {
        console.log(error)
    }

})

export {credentialsNameRegisterGithub, fotoUserSignUpGithub}





