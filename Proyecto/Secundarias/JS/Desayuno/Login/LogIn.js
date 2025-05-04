import { auth, db } from "../Firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../Tostify.js";

const BotonLogin = document.querySelector("#Sign-up");
const ModalLogin = document.querySelector("#login-modal");
const Email = document.querySelector("#LogIn_email");
const Passw = document.querySelector("#LogIn_passw");
const OlivdarCon = document.querySelector("#Forgotpassw");

const errores = {
    ContadorErrores: 0,
}

BotonLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    const Name = Email.value; // Obtener el nombre de usuario ingresado
    const NameTipoEmail = Name.concat("@miapp.com");
    const password = Passw.value;

    const infoRegistroUsuarios = doc(db, "UsuariosAutenticadosconEmailYPassw", Name);
    const RecogidaDeInfo = await getDoc(infoRegistroUsuarios)
 

    if (!RecogidaDeInfo.exists()){
        mensajes(`El usuario ${Name} no está registrado`, "error")
    } else{
        const datosDelUsuario = RecogidaDeInfo.data();
        const PasswordGuardadaDelUsuario = datosDelUsuario.password;

        if(!password === PasswordGuardadaDelUsuario){
            mensajes(`Contraseña equivocada`, "error")
        } else{
            try {
            await createUserWithEmailAndPassword(auth, NameTipoEmail, password);
            mensajes(`Acceso permitido al usuario ${Name}`, "success");
            ModalLogin.style.display = "none"
            } catch (error) {
                console.log(error)
                if (error.code === "auth/weak-password") {
                    mensajes("La contraseña debe tener al menos 6 caracteres", "error");
                    errores.ContadorErrores ++
                    if(errores.ContadorErrores >= 3){
                        OlivdarCon.style.display = "flex"
                        console.log(Usuario)
                    }
                }
            }

        }
    }

});


export { errores }
