import { auth, db } from "../../Firebase.js";
import { createUserWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../../Tostify.js";

const BotonRegistro = document.querySelector("#Register");
const ModalRegistro = document.querySelector("#registro-modal");
const Email = document.querySelector("#Registro_email");
const Passw = document.querySelector("#Registro_contraseña");
const CardsNeedLogin = document.querySelectorAll("#need-login");   

const AsociarEmail = document.querySelector("#AsociarEmail-modal");
const AceptarLinkEmail = document.querySelector("#btnAceptarAsociarEmail");
const EmailAsociado = document.querySelector("#AsociarEmail_email");

BotonRegistro.addEventListener("click", async (e) => {
    e.preventDefault();

    const Name = Email.value; 
    const password = Passw.value;
    if(!Name.includes("@")){
        const NombreConEmail = Name.concat("@miapp.com")
        try {
            //Esto hace la comprobacion de que 1''% sea un email y que la contraseña sea valida, si ambos son validos se hace el resto
            await createUserWithEmailAndPassword(auth, NombreConEmail, password);    

            mensajes(`El usuario ${Name} se ha registrado con éxito`, "success");

            //Control de modales y blur
            ModalRegistro.style.display = "none";

            CardsNeedLogin.forEach((card) => {
                card.style.filter = "none";
            });

            AsociarEmail.style.display = "flex";

            //Hasta que no se haga aceptar el email escrito, no se podrá meter info a la base de datos
            AceptarLinkEmail.addEventListener("click", async () => {
                if( EmailAsociado.checkValidity()){
                    const EmailContact = EmailAsociado.value;
                        //Base de datos
                    const userRef = doc(collection(db, "UsuariosAutenticadosconEmailYPassw"), Name);
                    const docSnap = await getDoc(userRef);


                    if(!docSnap.exists()){
                        //Guardado de información
                        await setDoc(userRef, {
                            EmailContacto : EmailContact,
                            Password : password
                        })

                        AsociarEmail.style.display = "none";


                    }else{
                        mensajes(`El usuario ${Name} ya está registrado`, "error");
                        deleteUser(auth.currentUser);
                        ModalRegistro.style.display = "none";
                        AsociarEmail.style.display = "none";
                    }
            }else{
                mensajes("El correo electrónico no es válido", "error");
            }
            })

        } catch (error) {
            console.log(error);
            if(error.code == "auth/invalid-email"){
                mensajes("El correo electrónico no es válido", "error");
            } else if(error.code == "auth/weak-password"){
                mensajes("La contraseña debe tener al menos 6 caracteres", "error");
            }
        }
    }else{
        mensajes("El usuario no puede contener el caracter @", "error");
    }
});

