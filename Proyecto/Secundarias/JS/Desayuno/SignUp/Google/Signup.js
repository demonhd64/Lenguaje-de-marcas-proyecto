import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../../Firebase.js"
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js" //funciones para modificar la base de datos de firebase
import { mensajes } from "../../Tostify.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"

const googleboton = document.querySelector("#Signup-google")
var credentialsNameRegister = {
    user : null
}

googleboton.addEventListener('click', async () => {

    const provedor = new GoogleAuthProvider();

    provedor.setCustomParameters({
        prompt: "select_account"
    })

    try {
        const credenciales = await signInWithPopup(auth, provedor);
        const usuario = credenciales.user

        const docReference = doc(db, "usuariosRegistrados", usuario.uid)
        const docSnap = await getDoc(docReference)
        

        if(docSnap.exists()){
            await signOut(auth)
            mensajes(`El email ${usuario.email} ya está registrado`,"error")
        } else{
            await setDoc(doc(db, "usuariosRegistrados", usuario.uid), {
                email: usuario.email,
                displayName: usuario.displayName
            })
            credentialsNameRegister.user = usuario.displayName
    
            const modalRegistro = document.getElementsByClassName('modal')[1]
    
            modalRegistro.style.display = "none";
    
            mensajes(`Usuario ${usuario.displayName} permitido`, "success")
        }
    } catch (error) {
        console.log(error)
    }

})

export {credentialsNameRegister}


