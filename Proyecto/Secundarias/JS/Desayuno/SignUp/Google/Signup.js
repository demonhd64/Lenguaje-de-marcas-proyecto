import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../../Firebase.js"
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js" 
import { mensajes } from "../../Tostify.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"

const googleboton = document.querySelector("#Signup-google")

var credentialsNameRegisterGoogle = {
    user : null,
    UID :null,
}

var fotoUserSignUpGOogle = {
    foto : null
}



googleboton.addEventListener('click', async () => {
    const provedor = new GoogleAuthProvider();

    provedor.setCustomParameters({
        prompt: "select_account"
    })

    try {
        const credenciales = await signInWithPopup(auth, provedor);
        const usuario = credenciales.user
        const usuarioCorto = usuario.email.split('@')[0]
        fotoUserSignUpGOogle.foto = usuario.photoURL

        const docReference = doc(db, "usuariosRegistradosConGoogle", usuario.email)
        const docSnap = await getDoc(docReference)
        

        if(docSnap.exists()){
            await signOut(auth)
            mensajes(`El email ${usuarioCorto} ya está registrado`,"error", fotoUserSignUpGOogle.foto)
            console.log(usuario)
        } else{
            await setDoc(doc(db, "usuariosRegistradosConGoogle", usuario.email), {
                email: usuario.email,
                displayName: usuario.displayName,
                UID: usuario.uid,
                fotoUser: usuario.photoURL
            })
            
            credentialsNameRegisterGoogle.user = usuario.displayName
            credentialsNameRegisterGoogle.UID = usuario.uid

            console.log(credentialsNameRegisterGoogle)
    
            const modalRegistro = document.getElementsByClassName('modal')[1]
            modalRegistro.style.display = "none";
    
            mensajes(`Usuario ${usuario.displayName} permitido`, "success", fotoUserSignUpGOogle.foto)
        }
    } catch (error) {
        console.log(error)
    }

})


export {credentialsNameRegisterGoogle, fotoUserSignUpGOogle}
