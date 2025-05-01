const BtnGoogleRegister = document.querySelector("#Signup-google");
const ModalSolicitarPassw = document.querySelector("#SolicitarPassw-modal");
const ModalRegistro = document.querySelector("#registro-modal");
const OjoAbierto = document.querySelector("#OpenSolicitarPassw");
const OjoCerrado = document.querySelector("#eye-closedSolicitarPassw");

BtnGoogleRegister.addEventListener("click", async (e) => {
    e.preventDefault();
    ModalRegistro.style.display = "none";
    ModalSolicitarPassw.style.display = "flex";
})