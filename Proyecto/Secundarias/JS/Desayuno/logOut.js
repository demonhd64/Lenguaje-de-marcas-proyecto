import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"
import { auth } from "../Desayuno/Firebase.js";
const LogOut = document.getElementById("LogOut")


LogOut.addEventListener('click', async ()=>{
    await signOut(auth)
})
