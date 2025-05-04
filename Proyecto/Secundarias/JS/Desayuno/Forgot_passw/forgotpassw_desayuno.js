const forgotpassword = document.getElementById("Forgotpassw");
const usuario = document.querySelector("#LogIn_email");

forgotpassword.addEventListener("click", function (e) {
    e.preventDefault();
    const Name = usuario.value;

    // Guardar el email en localStorage
    localStorage.setItem("email_recuperacion", Name);

    // Abrir la ventana de recuperación de contraseña
    const ventana = window.open("../html/Forgotpassw.html", "_blank");
    
    // Verificar que la ventana se abrió correctamente
    if (!ventana) {
        alert("No se pudo abrir la ventana. Por favor, habilita las ventanas emergentes en tu navegador.");
    }
});