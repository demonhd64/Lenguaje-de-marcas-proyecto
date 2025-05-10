import { deleteUser, reauthenticateWithCredential, EmailAuthProvider, GoogleAuthProvider, GithubAuthProvider, reauthenticateWithPopup  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth, db } from "../Desayuno/Firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { mensajes } from "../Desayuno/Tostify.js"
import { errores } from "../Desayuno/Login/LogIn.js"

const LogOut = document.getElementById("LogOut")
const forgotpassw = document.querySelector("#Forgotpassw")
const metodosDeRelogin = [document.querySelector("#Login-googleEnCasoDeError"), document.querySelector("#Login-githubEnCasoDeError"),  document.querySelector("#Sign-upEnCasoDeError")]
const modalReLogin = document.querySelector("#login-modalEnCasoDeError")

LogOut.addEventListener('click', async ()=>{
/*         console.log(auth.currentUser); */
        let email = auth.currentUser.displayName || auth.currentUser.email.split("@")[0] || auth.currentUser.email//Obtener el email cuando se pulse el boton, de modo que ya este guardado
        let fotosUsers = auth.currentUser?.photoURL
        try {
                await deleteUser(auth.currentUser) //Eliminar el usuario de la autenticación Ademas esto cierra sesion
                mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success", fotosUsers);
                errores.ContadorErrores = 0 //Reiniciar el contador de errores al cerrar sesión
                forgotpassw.style.display = "none" //Ocultar el botón de restablecimiento de contraseña al cerrar sesión
        } catch (error) {
                console.log(error);
                const metodoDeReautenticaciónObligado = auth.currentUser.providerData[0].providerId
                console.log(metodoDeReautenticaciónObligado)
                if (error.code === "auth/requires-recent-login"){
                        modalReLogin.style.display = "flex"
                        if (metodoDeReautenticaciónObligado == "password"){
                                metodosDeRelogin[0].style.cursor = "default"
                                metodosDeRelogin[1].style.cursor = "default"
                                metodosDeRelogin[0].addEventListener("click", (e) => {
                                        e.preventDefault();
                                        mensajes("No puedes reautenticar con este método de autenticación", "error", fotosUsers);
                                });
                                metodosDeRelogin[1].addEventListener("click", (e) => {
                                        e.preventDefault();
                                        mensajes("No puedes reautenticar con este método de autenticación", "error", fotosUsers);
                                });


                                metodosDeRelogin[2].addEventListener("click", async (e) => {
                                        e.preventDefault();
                                        const NomUsuario = document.querySelector("#LogIn_emailEnCasoDeError");
                                        const passwordUser = document.querySelector("#LogIn_passwordEnCasoDeError");
                                        const infoRegistroUsuarios = doc(db, "UsuariosAutenticadosconEmailYPassw", NomUsuario.value);
                                        const RecogidaDeInfo = await getDoc(infoRegistroUsuarios);

                                        if (!RecogidaDeInfo.exists()){
                                                mensajes(`El usuario ${email} no es correcto`, "error")
                                            } else{
                                                const datosDelUsuario = RecogidaDeInfo.data();
                                                const PasswordGuardadaDelUsuario = datosDelUsuario.Password;
                                                const emailUso = datosDelUsuario.Email;
                                        
                                                if(!passwordUser === PasswordGuardadaDelUsuario){
                                                    mensajes(`Contraseña equivocada`, "error")
                                                } else{
                                                        try {
                                                                const credenciales = EmailAuthProvider.credential(emailUso, PasswordGuardadaDelUsuario);
                                                                await reauthenticateWithCredential(auth.currentUser, credenciales);
                                                                await deleteUser(auth.currentUser) //Eliminar el usuario de la autenticación Ademas esto cierra sesion
                                                                modalReLogin.style.display = "none"
                                                        } catch (error) {
                                                            if(error.code === "auth/wrong-password"){
                                                                mensajes(`Contraseña equivocada`, "error")
                                                            }
                                                        }
                                        
                                                }
                                            }
                                })
                        }
                }
                if (metodoDeReautenticaciónObligado == "google.com"){
                                metodosDeRelogin[1].style.cursor = "default"
                                metodosDeRelogin[2].style.cursor = "default"
                                metodosDeRelogin[1].addEventListener("click", (e) => {
                                        e.preventDefault();
                                        mensajes("No puedes reautenticar con este método de autenticación", "error", fotosUsers);
                                });
                                metodosDeRelogin[2].addEventListener("click", (e) => {
                                        e.preventDefault();
                                        mensajes("No puedes reautenticar con este método de autenticación", "error", fotosUsers);
                                });


                                metodosDeRelogin[0].addEventListener("click", async (e) => {
                                        e.preventDefault();
                                        const provider = new GoogleAuthProvider();
                                        try {
                                                await reauthenticateWithPopup(auth.currentUser, provider);
                                                await deleteUser(auth.currentUser);
                                                mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success", fotosUsers);
                                                modalReLogin.style.display = "none"
                                        } catch (error) {
                                                console.log(error)
                                        }
                                })
                } 
                if (metodoDeReautenticaciónObligado == "github.com"){
                                metodosDeRelogin[0].style.cursor = "default"
                                metodosDeRelogin[2].style.cursor = "default"
                                metodosDeRelogin[0].addEventListener("click", (e) => {
                                        e.preventDefault();
                                        mensajes("No puedes reautenticar con este método de autenticación", "error", fotosUsers);
                                });
                                metodosDeRelogin[2].addEventListener("click", (e) => {
                                        e.preventDefault();
                                        mensajes("No puedes reautenticar con este método de autenticación", "error", fotosUsers);
                                });


                                metodosDeRelogin[1].addEventListener("click", async (e) => {
                                        e.preventDefault();
                                        const provider = new GithubAuthProvider();
                                        try {
                                                await reauthenticateWithPopup(auth.currentUser, provider);
                                                await deleteUser(auth.currentUser);
                                                mensajes(`Se ha cerrado la sesión del usuario ${ email }`, "success", fotosUsers);
                                                modalReLogin.style.display = "none"
                                        } catch (error) {
                                                console.log(error)
                                        }
                                })
                }
        }
})